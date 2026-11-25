# Riset Skill Motion Graphic: Studi Kasus TA Modular Mentor (v1 → v4 Final)

Catatan ini merekam seluruh perjalanan eksperimen nyata dalam meracik skill **Motion Graphic Director**, termasuk hasil ukur dua video acuan (**Gojek** & **Pinterest**) serta seluruh pelajaran dari koreksi dan revisi langsung bersama Bima.

---

## 1. Hasil Bedah 2 Video Acuan (Gojek & Pinterest)

| Aspek | Video Acuan Gojek | Video Acuan Pinterest | Pelajaran Kunci |
|---|---|---|---|
| **Durasi Total** | `14,3 detik` | `20,8 detik` | Tidak memakai narasi suara (VO), fokus cerita visual singkat |
| **Porsi Tenang vs Cepat** | **81,2% tenang** / `18,8%` gerak cepat | **54,0% tenang** / `46,0%` gerak cepat | Kontras **Santai–Cepat–Santai**: beri `1,8–2,2 detik` agar mata lega membaca sebelum transisi gesit |
| **Gaya Kamera** | Dorong halus (`push-in`), fokus kedalaman kartu | Pindah panggung warna solid, dinding kartu miring 3D, hentakan teks | Kamera harus terasa hidup dan bereaksi (bukan diam di atas tripod) |
| **Dinamika Suara** | Tenang lalu klik renyah & penekanan bersih | Pergantian musik hangat-ke-cerah dengan jeda hening sebelum ketukan penting | Musik harus naik-turun mengikuti adegan + ada jeda sunyi pendek sebelum kejutan |

---

## 2. Kronologi Evolusi & Koreksi Nyata (v1 sampai v4 Final)

### Tahap 1 — Video Awal v1 (`60 detik` · `30 FPS` · Pakai VO)
- **Keluhan Bima:** *"kurang 3D, gerak belum mulus, terlalu kaku seperti presentasi PowerPoint."*
- **Akar Masalah:** Suara narator panjang memaksa gambar diam lama menunggu bacaan selesai; 30 FPS terasa kurang licin untuk gerak cepat; kartu cuma dimiringkan tipis (`2°`).

### Tahap 2 — Video v2 (`22 detik` · `60 FPS` · Tanpa VO · HP 3D Pertama)
- **Koreksi Penting Bima:** *"jangan asal bilang tidak mampu padahal punya alatnya"*, lalu *"kamera masih kurang interaktif banget dan SFX-nya terasa kosong."*
- **Temuan Audit Kode & Suara:**
  1. Penyaring pemotong nada rendah di `mix_v2.py` tidak sengaja **menghilangkan tenaga efek kartu sampai `-21,4 dB`** dan klik tombol `-13,5 dB`.
  2. Efek suara buatan terlalu tumpul dan tidak dipotong keheningan awalnya.
  3. Kamera bergerak linier tanpa hentakan balik saat diklik.

### Tahap 3 — Video v3 (`22 detik` · Efek Rekaman Nyata + Kamera Interaktif)
- **Keluhan Bima:** *"terlalu cepat videonya tidak santai, UI-nya juga masih sangat slop generik AI."*
- **Akar Masalah:** Memaksa **6 babak penuh kalimat** ke dalam `22 detik` bikin jeda baca cuma `0,76–1,1 detik` (jauh lebih sempit dibanding pola tenang Gojek & Pinterest). Secara visual, tampilan v3 masih memakai gradasi ungu-sian klise, titik lampu merah-kuning-hijau, kartu bertumpuk, ikon kilau, dan panah dekoratif tombol.

### Tahap 4 — Rombak Desain Anti-Slop + Referensi *Clean Liquid Glass*
- Memasang modul `miqdadbadjuber/anti-slop` v3.2.32 dan membangun panduan `DESIGN.md`.
- Bima mengirimkan gambar acuan eksplisit (*"clean, liquid glass, background warna gemini ambient"*).
- Solusi: latar lipatan sutra 3D gelap kobalt-indigo-periwinkle (area gelap di belakang teks, bagian terang hanya menyentuh bingkai kaca), maksimal 2 elemen kaca per layar, huruf `Plus Jakarta Sans` paduan **ExtraBold (800) + Light (300)** putih bersih, lolos audit keterbacaan WCAG AA `>= 4,5:1`.
- Ritme dilonggarkan ke **`34,0 detik`** (pola Santai–Cepat–Santai dengan `~65%` waktu tenang membaca + `2` jeda sunyi pendek).

### Tahap 5 — Poles Dekat, HP Besar, Suara ASMR + Musik Baru, IG Story & `< 10 MB` WA
- **Foto 1 (Zoom Ketik):** Kamera diubah ke sorot makro **`2,38x`** pada kiri kolom `Ce|` lalu menggeser linier ke kanan mengikuti ketikan hingga tombol kirim, sambil membatasi gerak latar belakang agar tepi kanvas tidak bocor.
- **Foto 2 (Ukuran HP 3D):** HP diperbesar mengisi **`~57%–60%`** tinggi layar. Audit tangkapan gambar langsung menyelamatkan dua bug nyata: (1) cincin cahaya di belakang HP sempat menembus layar depan sebelum dipindah ke belakang badan HP, dan (2) titik klik kursor dikunci persis ke pusat piksel tombol putih.
- **Tata Suara ASMR:** Semua efek keras (mesin ketik besi, jepretan kamera, tamparan, desingan kartun) diganti rekaman asli papan ketik mekanis empuk *Topre* (`~550 Hz`) per huruf, klik tetikus halus, gelembung lembut, desiran angin disaring lembut, dentuman bass hangat, serta tetes air bernada harmonis di detik `26` — dipadukan musik jazz lo-fi kiriman Bima dari detik `0:00`.
- **IG Story & WhatsApp `< 10 MB`:** Seluruh teks penting digeser masuk zona aman **`Y = 245..1655 px`** (bebas dari nama akun atas dan kotak balas pesan IG Story), kapsul bawah dibuat menghilang halus sebelum kamera mendekat ke HP, lalu diekspor dua versi.

---

## 3. Patokan Hasil Terverifikasi (Video v4 Final)

| Versi Berkas | Lokasi | Ukuran Berkas | Spesifikasi | Puncak Suara (`-ac 2`) | Dinamika |
|---|---|---|---|---|---|
| **Utama 60 FPS** | [ta-modular-mentor-v4-60fps.mp4](../videos/ta-modular-mentor-v4-60fps.mp4) | `29,14 MB` (`29.135.248` byte) | `1080×1920`, `60 FPS`, `34,005 dtk`, AAC 48kHz stereo | `0,902` (bersih) | Crest `16,24 dB` |
| **Ringan WA & IG Story `< 10 MB`** | [ta-modular-mentor-v4-igstory-wa-10mb.mp4](../videos/ta-modular-mentor-v4-igstory-wa-10mb.mp4) | `8,76 MB` (`8.757.864` byte) | `1080×1920`, `30 FPS`, `34,067 dtk`, 2-pass `aq-mode=3` | `0,908` (bersih) | Crest `16,32 dB` |
