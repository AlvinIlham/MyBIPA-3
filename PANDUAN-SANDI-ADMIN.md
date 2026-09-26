# Memasang kata sandi admin MyBIPA B1

Akun admin: **Azilla Rahma** · **rahmazilla447@gmail.com**

Kata sandi admin tidak ditulis di dalam kode. Saat modul diterbitkan, `buat-admin-config.mjs`
membaca pengaturan rahasia `MYBIPA_ADMIN_PASSWORD` lalu membuat `admin-config.js` yang hanya
berisi sidik (hash PBKDF2-SHA256 bergaram), bukan kata sandi aslinya.

## Netlify
Site settings → Environment variables → tambahkan `MYBIPA_ADMIN_PASSWORD` (minimal 8 karakter)
→ Deploy ulang. `netlify.toml` sudah mengatur perintah build-nya.

## Vercel
Project Settings → Environment Variables → tambahkan `MYBIPA_ADMIN_PASSWORD` → Redeploy.
`vercel.json` sudah mengatur perintah build-nya.

## Hosting tanpa build (GitHub Pages, cPanel, dll.)
Di komputer sendiri (perlu Node.js), jalankan di folder ini:

    MYBIPA_ADMIN_PASSWORD='kata-sandi-anda' node buat-admin-config.mjs

Lalu unggah `admin-config.js` yang baru bersama berkas lainnya. Berkas itu aman diunggah
karena tidak memuat kata sandi asli. Jangan menyimpan kata sandi di berkas mana pun.

Selama `MYBIPA_ADMIN_PASSWORD` belum diisi, tab Admin menampilkan pesan
"Kata sandi admin belum dipasang" dan tidak ada yang dapat masuk sebagai admin.
Login admin harus dibuka lewat alamat https.
