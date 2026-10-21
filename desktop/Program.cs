using System.Diagnostics;
using System.Reflection;
using System.Runtime.InteropServices;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using Microsoft.Win32;

namespace AIAcademy;

static class Program
{
    public const string Host = "academy.app";
    public const string Origin = "https://" + Host + "/";
    public static CoreWebView2Environment? Env;

    // the full multi-size icon (16–256 px) so Windows picks a sharp frame for the title bar,
    // taskbar, Alt+Tab and every DPI; the exe file itself carries the same icon (ApplicationIcon)
    public static readonly Icon AppIcon = new(Assembly.GetExecutingAssembly().GetManifestResourceStream("app.ico")!);

    [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
    static extern int SetCurrentProcessExplicitAppUserModelID(string id);

    [STAThread]
    static void Main()
    {
        // one taskbar identity: windows group under this icon and pinning keeps it
        SetCurrentProcessExplicitAppUserModelID("AIAcademy.Course");
        ApplicationConfiguration.Initialize();
        if (Tampered(out var why))
        {
            MessageBox.Show(why, "AI Academy", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        Application.Run(new BrowserForm(Origin, main: true));
    }

    // WebView2 can be told from outside to open a debugging port or load another browser;
    // drop those overrides for this process and refuse to run when a machine policy forces them.
    static bool Tampered(out string why)
    {
        foreach (var v in new[] { "WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", "WEBVIEW2_BROWSER_EXECUTABLE_FOLDER",
                                  "WEBVIEW2_USER_DATA_FOLDER", "WEBVIEW2_RELEASE_CHANNEL_PREFERENCE",
                                  "WEBVIEW2_PIPE_FOR_SCRIPT_DEBUGGER", "WEBVIEW2_WAIT_FOR_SCRIPT_DEBUGGER" })
            Environment.SetEnvironmentVariable(v, null);

        var exe = Path.GetFileName(Environment.ProcessPath ?? "AI_Academy.exe");
        foreach (var hive in new[] { Registry.CurrentUser, Registry.LocalMachine })
            foreach (var policy in new[] { "AdditionalBrowserArguments", "BrowserExecutableFolder", "ChannelSearchKind", "ReleaseChannels" })
            {
                using var k = hive.OpenSubKey(@"Software\Policies\Microsoft\Edge\WebView2\" + policy);
                if (k is not null && (k.GetValue(exe) is not null || k.GetValue("*") is not null))
                {
                    why = "This computer has a WebView2 policy that changes how the course runs (" + policy + "). Remove it and try again.";
                    return true;
                }
            }
        why = "";
        return false;
    }

    public static async Task<CoreWebView2Environment> Environment2()
    {
        if (Env is not null) return Env;
        var data = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "AI Academy");
        // the tour video («▶ شاهد») starts as soon as its dialog opens
        var opts = new CoreWebView2EnvironmentOptions("--autoplay-policy=no-user-gesture-required");
#if DEBUG
        // local testing only; never compiled into the Release exe that build.ps1 ships
        opts.AdditionalBrowserArguments += " --remote-debugging-port=9333";
        data += " (debug)";
#endif
        return Env = await CoreWebView2Environment.CreateAsync(null, data, opts);
    }

    public static void OpenExternal(string uri)
    {
        if (uri.StartsWith("https://") || uri.StartsWith("http://") || uri.StartsWith("mailto:"))
            Process.Start(new ProcessStartInfo(uri) { UseShellExecute = true });
    }
}

sealed class BrowserForm : Form
{
    readonly WebView2 view = new() { Dock = DockStyle.Fill };
    readonly string start;
    FormWindowState before;

    [DllImport("dwmapi.dll")]
    static extern int DwmSetWindowAttribute(IntPtr hwnd, int attr, ref int value, int size);
    [DllImport("user32.dll")]
    static extern int GetSystemMetricsForDpi(int index, uint dpi);
    [DllImport("user32.dll")]
    static extern IntPtr SendMessage(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam);

    Icon? small, big;

    // pick the exact icon frame for this monitor's DPI (title bar 16/20/24/32, taskbar 32/40/48/64)
    void SetIcons(int dpi)
    {
        small?.Dispose(); big?.Dispose();
        small = new Icon(Program.AppIcon, GetSystemMetricsForDpi(49, (uint)dpi), GetSystemMetricsForDpi(50, (uint)dpi));   // SM_CXSMICON
        big = new Icon(Program.AppIcon, GetSystemMetricsForDpi(11, (uint)dpi), GetSystemMetricsForDpi(12, (uint)dpi));     // SM_CXICON
        SendMessage(Handle, 0x80, 0, small.Handle);   // WM_SETICON, ICON_SMALL
        SendMessage(Handle, 0x80, 1, big.Handle);     // WM_SETICON, ICON_BIG
    }

    public BrowserForm(string start, bool main)
    {
        this.start = start;
        Text = "AI Academy";
        Icon = Program.AppIcon;
        Width = 1280; Height = 820;
        MinimumSize = new Size(480, 400);
        StartPosition = FormStartPosition.CenterScreen;
        if (main) WindowState = FormWindowState.Maximized;
        ApplyTheme();
        Controls.Add(view);
        Load += async (_, _) => { SetIcons(DeviceDpi); await Init(); };
        DpiChanged += (_, e) => SetIcons(e.DeviceDpiNew);
        SystemEvents.UserPreferenceChanged += OnThemeChanged;
        FormClosed += (_, _) => SystemEvents.UserPreferenceChanged -= OnThemeChanged;
    }

    void OnThemeChanged(object? sender, UserPreferenceChangedEventArgs e)
    {
        if (e.Category == UserPreferenceCategory.General && IsHandleCreated) BeginInvoke(ApplyTheme);
    }

    // the page follows the Windows light/dark setting, so the title bar and the
    // background shown before the page paints follow it too (no white flash in dark mode)
    void ApplyTheme()
    {
        using var k = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize");
        bool dark = k?.GetValue("AppsUseLightTheme") is int v && v == 0;
        var bg = dark ? Color.FromArgb(0x0b, 0x0b, 0x0d) : Color.White;
        BackColor = bg;
        view.DefaultBackgroundColor = bg;
        int on = dark ? 1 : 0;
        DwmSetWindowAttribute(Handle, 20, ref on, sizeof(int));   // DWMWA_USE_IMMERSIVE_DARK_MODE
    }

    async Task Init()
    {
        try { await view.EnsureCoreWebView2Async(await Program.Environment2()); }
        catch (WebView2RuntimeNotFoundException)
        {
            MessageBox.Show("Microsoft Edge WebView2 Runtime is needed. Install it from https://go.microsoft.com/fwlink/p/?LinkId=2124703 and start the course again.",
                            "AI Academy", MessageBoxButtons.OK, MessageBoxIcon.Information);
            Close(); return;
        }
        var core = view.CoreWebView2;
        var s = core.Settings;
        s.AreDevToolsEnabled = false;
        s.AreDefaultContextMenusEnabled = false;
        s.AreBrowserAcceleratorKeysEnabled = false;   // no F12, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+Shift+I
        s.IsStatusBarEnabled = false;
        s.IsZoomControlEnabled = true;
        s.IsGeneralAutofillEnabled = false;
        s.IsPasswordAutosaveEnabled = false;
        s.AreHostObjectsAllowed = false;
        s.IsWebMessageEnabled = false;
        s.HiddenPdfToolbarItems = CoreWebView2PdfToolbarItems.Save | CoreWebView2PdfToolbarItems.SaveAs
                                | CoreWebView2PdfToolbarItems.Print | CoreWebView2PdfToolbarItems.MoreSettings;

        // downloads are blocked anyway; also hide the video player's own "Download" menu item
        await core.AddScriptToExecuteOnDocumentCreatedAsync(
            "addEventListener('loadstart',e=>{if(e.target instanceof HTMLVideoElement)e.target.controlsList.add('nodownload')},true);");
        core.AddWebResourceRequestedFilter(Program.Origin + "*", CoreWebView2WebResourceContext.All);
        core.WebResourceRequested += Serve;

        core.NavigationStarting += (_, e) =>
        {
            if (e.Uri.StartsWith(Program.Origin) || e.Uri.StartsWith("about:")) return;
            e.Cancel = true;
            Program.OpenExternal(e.Uri);
        };
        core.NewWindowRequested += (_, e) =>
        {
            e.Handled = true;
            if (e.Uri.StartsWith(Program.Origin)) new BrowserForm(e.Uri, main: false).Show(this);
            else Program.OpenExternal(e.Uri);
        };
        // only the learner's own notes/progress export (a blob made by the page) may be saved
        core.DownloadStarting += (_, e) =>
        {
            if (!e.DownloadOperation.Uri.StartsWith("blob:" + Program.Origin)) e.Cancel = true;
        };
        core.DocumentTitleChanged += (_, _) => Text = string.IsNullOrWhiteSpace(core.DocumentTitle) ? "AI Academy" : core.DocumentTitle;
        core.ContainsFullScreenElementChanged += (_, _) => FullScreen(core.ContainsFullScreenElement);

        core.Navigate(start);
    }

    void Serve(object? sender, CoreWebView2WebResourceRequestedEventArgs e)
    {
        var core = view.CoreWebView2;
        var path = Uri.UnescapeDataString(new Uri(e.Request.Uri).AbsolutePath).TrimStart('/');
        string? name = null, type = null;
        if (path is "" or "index.html" or "AI_Academy.html") { name = "course"; type = "text/html; charset=utf-8"; }
        else if (path.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase)) { name = "book"; type = "application/pdf"; }
        else if (path.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase)) { name = "tour"; type = "video/mp4"; }

        var bytes = name is null ? null : Vault.Open(name);
        if (bytes is null)
        {
            e.Response = core.Environment.CreateWebResourceResponse(null, 404, "Not Found", "");
            return;
        }
        // the video player asks for byte ranges (to start fast and to seek); answer them with 206
        if (e.Request.Headers.Contains("Range") && TryRange(e.Request.Headers.GetHeader("Range"), bytes.Length, out long from, out long to))
        {
            e.Response = core.Environment.CreateWebResourceResponse(new MemoryStream(bytes, (int)from, (int)(to - from + 1), writable: false), 206, "Partial Content",
                $"Content-Type: {type}\r\nCache-Control: no-store\r\nAccept-Ranges: bytes\r\nContent-Range: bytes {from}-{to}/{bytes.Length}\r\nContent-Length: {to - from + 1}");
            return;
        }
        e.Response = core.Environment.CreateWebResourceResponse(new MemoryStream(bytes, writable: false), 200, "OK",
            $"Content-Type: {type}\r\nCache-Control: no-store\r\nAccept-Ranges: bytes\r\nContent-Length: {bytes.Length}");
    }

    // "bytes=start-[end]" or "bytes=-suffix"
    static bool TryRange(string header, long length, out long from, out long to)
    {
        from = 0; to = length - 1;
        if (!header.StartsWith("bytes=") || header.Contains(',')) return false;
        var parts = header[6..].Split('-');
        if (parts.Length != 2) return false;
        if (parts[0] == "")
        {
            if (!long.TryParse(parts[1], out var suffix) || suffix <= 0) return false;
            from = Math.Max(0, length - suffix);
        }
        else
        {
            if (!long.TryParse(parts[0], out from) || from >= length) return false;
            if (parts[1] != "" && long.TryParse(parts[1], out var end)) to = Math.Min(end, length - 1);
        }
        return from <= to;
    }

    void FullScreen(bool on)
    {
        if (on)
        {
            before = WindowState;
            FormBorderStyle = FormBorderStyle.None;
            WindowState = FormWindowState.Normal;
            WindowState = FormWindowState.Maximized;
        }
        else
        {
            FormBorderStyle = FormBorderStyle.Sizable;
            WindowState = before;
        }
    }
}
