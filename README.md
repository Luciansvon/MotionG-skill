# Motion-editing · Markas Riset & Skill Video Motion Graphic

Folder ini menyimpan hasil video jadi, catatan riset pembelajaran, dan skill resmi pembuat video *motion graphic* vertikal yang dirumuskan langsung dari eksperimen proyek **TA Modular Mentor** beserta studi dua video acuan (**Gojek** & **Pinterest**).

## Susunan Folder

- **`videos/`**
  Berisi dua versi video final v4 yang sudah lolos pengecekan visual, suara ASMR, dan zona aman IG Story:
  - `ta-modular-mentor-v4-60fps.mp4` (`29,14 MB` · 60 FPS · kualitas utama untuk Reels, TikTok, dan YouTube Shorts)
  - `ta-modular-mentor-v4-igstory-wa-10mb.mp4` (`8,76 MB` · 30 FPS · versi ringan `< 10 MB` untuk kirim lewat WA & unggah IG Story)
- **`riset-skill/`**
  Berisi dokumentasi riset pembelajaran:
  - [riset-motion-graphic-ta-mentor.md](./riset-skill/riset-motion-graphic-ta-mentor.md) — perjalanan revisi **v1 → v2 → v3 → v4**, hasil ukur acuan **Gojek** & **Pinterest**, perbaikan bug nyata, dan patokan angka hasilnya.
  - [riset-acuan-starbucks-corpius.md](./riset-skill/riset-acuan-starbucks-corpius.md) — hasil bedah acuan ke-3 (**Starbucks / Corpius.ae**) yang melahirkan Gaya 07 (antarmuka terang interaktif & kartu sulap berkelanjutan).
  - [riset-7-acuan-visual-living-ui.md](./riset-skill/riset-7-acuan-visual-living-ui.md) — hasil ukur dan bedah **7 video acuan lanjutan** yang melahirkan rekonstruksi alur kerja 8 gerbang, aturan antarmuka bernapas & membal, hierarki aset, serta Gaya 08–10.
- **`skill/motion-graphic-director/`**
  Salinan kerja dari skill modular **Motion Graphic Director** dengan **alur kerja 8 gerbang** (mulai dari tanya-jawab ruang lingkup, papan cerita per segmen, hierarki aset Kode/`Three.js`/opsi `PNG`, antarmuka bernapas & membal, hingga **10 berkas panduan gaya**). Skill ini dipasangkan pula secara global ke:
  `~/.gemini/config/skills/motion-graphic-director/`
  sehingga otomatis terbaca saat kamu membuat video baru di proyek mana pun.

## Catatan Pengembangan Lanjutan

Kalau kamu ingin menambah gaya editing baru (misal gaya animasi papan ketik retro, kartu majalah terang, atau efek transisi tertentu), cukup tambahkan berkas panduan baru di dalam `skill/motion-graphic-director/references/styles/`, daftarkan tautannya di `SKILL.md`, lalu salin ulang isinya ke folder skill global.
