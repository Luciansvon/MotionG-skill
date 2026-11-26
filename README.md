# Motion-editing · Markas Riset & Skill Video Motion Graphic

Folder ini menyimpan hasil video jadi, catatan riset pembelajaran, dan skill resmi pembuat video *motion graphic* vertikal yang dirumuskan langsung dari eksperimen proyek **TA Modular Mentor** beserta studi dua video acuan (**Gojek** & **Pinterest**).

## Contoh Hasil Video

Dua contoh video promo vertikal `9:16` yang diproduksi menggunakan panduan `motion-graphic-director` (kiri: gaya studio terang bebas kotak kartu; kanan: gaya kaca cair gelap):

<table>
  <thead>
    <tr>
      <th width="50%" align="center">Promo Robot 3D · 36 detik (<code>9:16</code>)</th>
      <th width="50%" align="center">TA Modular Mentor v4 · 34 detik (<code>9:16</code>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%" align="center" valign="bottom">

https://github.com/user-attachments/assets/66298f51-0c47-4619-8bc5-f3afdd2fa9dd

</td>
      <td width="50%" align="center" valign="bottom">

https://github.com/user-attachments/assets/22af1907-480d-463c-9066-c33f80e4c4cf

</td>
    </tr>
    <tr>
      <td width="50%" valign="top">Gaya studio terang + robot 3D <code>Three.js</code> (<code>Idle</code>, <code>Walk</code>, <code>Wave</code>) + tata letak bebas kotak kartu <code>antislop</code> + suara ASMR.</td>
      <td width="50%" valign="top">Gaya kaca cair gelap (<em>Liquid Glass Ambient</em>) + ponsel 3D <code>Three.js</code> + transisi portal mulus + suara ASMR.</td>
    </tr>
  </tbody>
</table>

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
  - [riset-integrasi-antislop.md](./riset-skill/riset-integrasi-antislop.md) — evaluasi suite `antislop` dan integrasi sistem mutu 3 lapisan, takaran daya hidup, saringan naskah, tata letak ulang `9:16`, alat uji kontras `check_contrast.py`, serta gerbang kelulusan 4 blok.
  - [riset-6-acuan-tiktok-vfx-ui.md](./riset-skill/riset-6-acuan-tiktok-vfx-ui.md) — hasil ukur dan bedah **6 video acuan TikTok** (**Vercel**, **Apple Store**, **Grok Bots**, **Lovable**, **Spotify UI**, **Supabase**) yang melahirkan Gaya 11 (gelap berkas cahaya & matriks titik), kolaborasi banyak kursor bernama, kamera menempel kursor, kartu bunglon, serta transformasi ikon.
- **`skill/motion-graphic-director/`**
  Salinan kerja dari skill modular **Motion Graphic Director** dengan **alur kerja 8 gerbang** (mulai dari tanya-jawab ruang lingkup, papan cerita per segmen, gerbang anti-slop 3 lapisan + pengukur kontras `check_contrast.py`, hierarki aset Kode/`Three.js`/opsi `PNG`, antarmuka bernapas & membal, tata letak ulang layar tegak `9:16`, hingga **11 berkas panduan gaya**). Skill ini dipasangkan pula secara global ke:
  `~/.gemini/config/skills/motion-graphic-director/`
  sehingga otomatis terbaca saat kamu membuat video baru di proyek mana pun.

## Catatan Pengembangan Lanjutan

Kalau kamu ingin menambah gaya editing baru (misal gaya animasi papan ketik retro, kartu majalah terang, atau efek transisi tertentu), cukup tambahkan berkas panduan baru di dalam `skill/motion-graphic-director/references/styles/`, daftarkan tautannya di `SKILL.md`, lalu salin ulang isinya ke folder skill global.

## Kredit & Referensi

- **[miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop)** (lisensi `MIT`, versi acuan `v3.2.32`) — referensi utama kerangka mutu anti-slop 3 lapisan, batas takaran efek, perangkat daya hidup tampilan, saringan naskah, tata letak layar tegak, dan konsep pemeriksa kontras WCAG 2.x eksak yang diadaptasi ke `motion-graphic-director`.
