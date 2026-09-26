/* Membuat admin-config.js dari pengaturan rahasia (environment) MYBIPA_ADMIN_PASSWORD.
   Berkas hasilnya hanya berisi sidik PBKDF2-SHA256 bergaram, bukan kata sandi asli.
   Jalankan otomatis oleh layanan hosting (Netlify/Vercel) atau secara manual:
     MYBIPA_ADMIN_PASSWORD='kata-sandi-anda' node buat-admin-config.mjs            */
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";

const sandi = process.env.MYBIPA_ADMIN_PASSWORD || "";
if (!sandi) {
  writeFileSync("admin-config.js", "window.MYBIPA_ADMIN_KUNCI = null;\n");
  console.warn("[MyBIPA] MYBIPA_ADMIN_PASSWORD belum diisi; login admin dinonaktifkan.");
  process.exit(0);
}
if (sandi.length < 8) {
  console.error("[MyBIPA] Kata sandi admin minimal 8 karakter.");
  process.exit(1);
}
const putaran = 210000;
const garam = randomBytes(16);
const sidik = pbkdf2Sync(sandi, garam, putaran, 32, "sha256").toString("hex");
writeFileSync("admin-config.js",
  "/* Dibuat otomatis oleh buat-admin-config.mjs. Tidak memuat kata sandi asli. */\n" +
  "window.MYBIPA_ADMIN_KUNCI = " + JSON.stringify({ garam: garam.toString("hex"), putaran, sidik }) + ";\n");
console.log("[MyBIPA] admin-config.js berhasil dibuat.");
