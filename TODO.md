# TODO — DIAGA

Items ini belum bisa diselesaikan tanpa informasi dari luar.

## KRITIS (sebelum submit)

- [ ] **Font Noto Sans Rejang** — Download dari Google Fonts (atau Noto project) dan taruh di `public/assets/fonts/NotoSansRejang-Regular.ttf`. Tanpa ini aksara tampil sebagai kotak.
  - URL: https://fonts.google.com/noto/specimen/Noto+Sans+Rejang
  - Lisensi: SIL OFL 1.1 (boleh self-host)

- [ ] **Validasi ejaan aksara** — Konfirmasi kaidah transliterasi dengan narasumber adat Rejang. Khususnya:
  - Vokal e (U+A949): pepet atau taleng?
  - Cluster konsonan akhir kata (tanpa vokal): pakai virama atau tidak?
  - Urutan huruf dalam HURUF_DATA sudah sesuai konvensi?

- [ ] **Kunci API** — Set environment variable `AI_API_KEY` di Vercel sebelum deploy. Jangan commit ke repo.

- [ ] **Ambient music kredit** — File `ambient.mp3` (8.5MB). Tentukan sumber dan lisensi, atau ganti dengan musik bebas royalti (freemusicarchive.org, pixabay.com/music).

- [ ] **Foto aset** — Semua foto di `public/assets/images/` perlu konfirmasi lisensi dan sumber:
  - `pola-aksara.jpg`, `kain-upacara.jpg`, `kain-batik-asli.jpg`, `batik-emas.jpg`
  - Jika tidak bisa dikonfirmasi, ganti dengan foto asli atau CC0

- [ ] **Wajah anak di bagian-terakhir.jpg** — Jika ingin digunakan, crop area wajah dan dapatkan izin tertulis orang tua.

## PENTING (sebelum babak final)

- [ ] **Tim page** — Isi nama anggota tim, institusi, dan peran di `docs/TENTANG.md` dan halaman tentang.html

- [ ] **Sumber sejarah batik yang lebih kuat** — Blog Curup Kami (2009) belum terverifikasi. Cari:
  - Jurnal akademis tentang Batik Bengkulu / Batik Kaganga
  - Dokumen resmi Dinas Pariwisata Rejang Lebong
  - Buku tentang budaya Suku Rejang

- [ ] **Konten knowledge.json** — Tambahkan minimal 10 entri lagi yang terverifikasi (saat ini hanya dasar-dasar)

- [ ] **Konfirmasi info Arumbatik Roemah** — Alamat, jam buka, nomor kontak, foto asli dengan izin

- [ ] **Lighthouse audit** — Jalankan `npx lighthouse http://localhost:5173 --view` dan perbaiki skor di bawah 90

- [ ] **CSP nonce** — Ganti `unsafe-inline` di vercel.json dengan nonce untuk lebih aman

- [ ] **PWA manifest** — Tambahkan manifest.json dan service worker untuk instalasi offline

## NICE TO HAVE

- [ ] Dukungan multi-dialek ejaan Rejang (bila tervalidasi)
- [ ] TTS (Text-to-Speech) suara aksara dari narasumber asli
- [ ] Integrasi Google Maps untuk lokasi Arumbatik
- [ ] Sitemap.xml untuk SEO