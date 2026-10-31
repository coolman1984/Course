## Lessons that repeat in every tool

1. **The DRM decides who may open a file.** On a laptop with NASCA, an Excel or Word file is encrypted on disk, and
   any program other than Office sees scrambled bytes. That is why the tool lets Excel and Word read the files through
   COM, and PowerShell writes the values as plain CSV. If Python says a file "cannot be read as a plain file", run the
   whole tool from Run_Tool.bat instead of the Python step on its own.
2. **Packages are blocked, and the standard library is enough.** xlsx and docx are read with zipfile and xml.etree,
   PDF text with re and zlib, sums with a dictionary, the database with sqlite3. No step runs pip install.
3. **Data is read-only.** Every file is opened ReadOnly and every result goes to Output. An older result is moved to
   Output\Previous, never deleted.
4. **Excel must close even after an error.** Every script has a finally block that closes the file, quits Excel and
   releases the COM objects. After a run, Task Manager should show no EXCEL.EXE.
5. **Read a sheet once, write it once.** Cell-by-cell reads through COM are very slow. The tool reads the whole
   UsedRange.Value2 at once, and writes a whole table at once.
6. **Dates arrive as numbers.** Value2 returns a date as an Excel day number (such as 46204); the tool turns it into
   yyyy-mm-dd.
7. **Text that looks like a date must be protected.** The month "2026-07" typed into a normal cell may become a date,
   so the column is formatted as Text first.
8. **Every step checks itself.** Row counts and totals against the source files, #N/A must be zero, every pivot's
   grand total must equal the table. If one figure differs, the tool stops with a clear message.
9. **Execution policy.** Run_Tool.bat starts PowerShell with -ExecutionPolicy Bypass for this tool only. If IT blocks
   that with a machine policy, the tool will not run: ask them to allow this folder; never try to get around the policy.
10. **No Python?** The tool looks for python and for py, and ignores the Microsoft Store shortcut. If neither is there,
    ask IT for the approved Python; never download it yourself.
