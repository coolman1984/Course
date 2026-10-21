using System.IO.Compression;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace AIAcademy;

// Decrypts the embedded course files in memory; nothing decrypted is ever written to disk.
static partial class Vault
{
    static readonly Dictionary<string, byte[]> cache = new();

    public static byte[]? Open(string name)
    {
        lock (cache)
        {
            if (cache.TryGetValue(name, out var hit)) return hit;
            using var res = Assembly.GetExecutingAssembly().GetManifestResourceStream(name);
            if (res is null) return null;
            var blob = new byte[res.Length];
            res.ReadExactly(blob);

            var key = new byte[32];
            for (int i = 0; i < 32; i++) key[i] = (byte)(A[i] ^ B[i]);
            var plain = new byte[blob.Length - 28];
            using (var aes = new AesGcm(key, 16))
                aes.Decrypt(blob.AsSpan(0, 12), blob.AsSpan(28), blob.AsSpan(12, 16), plain, Encoding.UTF8.GetBytes(name));
            CryptographicOperations.ZeroMemory(key);

            using var gz = new GZipStream(new MemoryStream(plain), CompressionMode.Decompress);
            using var outMs = new MemoryStream();
            gz.CopyTo(outMs);
            return cache[name] = outMs.ToArray();
        }
    }
}
