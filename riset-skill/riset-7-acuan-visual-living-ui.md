# Riset 7 Video Acuan: Peragaan Visual, Papan Cerita & Antarmuka Hidup

Catatan ini merekam hasil ukur teknis, bedah pola penyuntingan, dan pelajaran inti dari **7 video acuan** yang menghasilkan rekonstruksi besar panduan **Motion Graphic Director** menjadi **alur kerja 8 gerbang** (mulai dari tanya-jawab pengunci ruang lingkup hingga antarmuka bernapas dan membal).

> **Catatan Arsip:** Seluruh berkas video pihak ketiga asli tidak disimpan atau diunggah ke repositori ini; hanya angka hasil ukur, temuan pola penyuntingan, dan pembaruan panduannya saja yang diserap.

---

## 1. Hasil Ukur Teknis 7 Video Acuan

| Video | Tema & Gaya | Ukuran & Durasi | Tenang vs Cepat | Lonjakan Kontras | Puncak Suara (`-ac 2`) | Pelajaran Utama |
|---|---|---|---|---|---|---|
| **V1 · Claude Gelap Bara** | Hitam pekat + gelombang bara merah + huruf klasik | `1024×576` · `12,0 dtk` | `68,1%` tenang / `31,9%` gerak cepat | `3,1×` | **`1,399` *(pecah)*** · Crest `13,2 dB` | Latar bara bernapas terus; sorot makro langsung ke pilihan menu tarik-turun; penutup 3 kata berganti cepat. *(Suara wajib diturunkan `<= 0,92`)* |
| **V2 · Apple Minimal (`Bart_VFX`)** | Putih ↔ hitam pekat, garis petak tipis, 1 aksen | `1024×576` · `46,5 dtk` | **`82,7%` tenang** / `17,3%` cepat | **`92,5×`** | `0,784` (bersih) · Crest `21,0 dB` | Penjelasan penuh lewat gambar; kapsul penghitung menciut-mekar; ikon hati membal kenyal berubah jadi kartu lalu menciut lagi sambil berdenyut. |
| **V3 · Peragaan Terstruktur (`Sleeko / HowDo`)** | Latar terang ungu lembut + peta babak bawah | `768×576` · `44,4 dtk` | **`78,0%` tenang** / `22,0%` cepat | `14,2×` | `1,009` · Crest `17,1 dB` | Linimasa 4 babak terpampang jelas di bawah (*Pembuka → Masalah → Contoh Pakai → Ajakan*); ikon melompat di sela kata; foto tangan & kode pindai asli. |
| **V4 · Pinterest Grafis** | Putih ↔ merah pekat + poster melayang berlapis | `1024×576` · `22,8 dtk` | `57,8%` tenang / `42,2%` cepat | `38,4×` | **`2,704` *(pecah berat)*** · Crest `17,9 dB` | Poster mengambang kedalaman buram-tajam; deretan kapsul meluncur membal; kamera melengkung mengikuti kursor klik Suka lalu geser tombol Simpan. |
| **V5 · ChatGPT Kenyal** | Hitam ↔ putih biru, super elastis padat | `1024×576` · `10,9 dtk` | `42,9%` tenang / `57,1%` cepat | `11,1×` | `0,633` (bersih) · Crest `15,9 dB` | Semua komponen membal kenyal seperti pegas; ikon aplikasi melompat ke beranda ponsel lengkap dengan lencana angka merah membal. |
| **V6 · Apple Kotak Pintasan (`dnyxstudios`)** | Putih ↔ hitam pekat ekstrem | `1024×576` · `12,2 dtk` | `64,6%` tenang / `35,4%` cepat | **`118,7×`** | `0,717` (bersih) · Crest `16,5 dB` | Kalimat *"Imagine building anything"* membelah menyisipkan kolom ketik di tengah; 4 kotak pintasan mengambang bernapas; 5 kartu warna mekar seperti kipas. |
| **V7 · ChatGPT Hidup (`HusniXD`)** | Putih bersih, sangat minim teks, aksi nyata | `1024×576` · `45,0 dtk` | **`78,8%` tenang** / `21,2%` cepat | `11,8×` | `0,847` (bersih) · Crest `19,1 dB` | Contoh terbaik peragaan visual: kursor menyeret foto ke kolom ketik yang tepiannya langsung berpendar biru bernapas; menu samping diklik; kapsul status berubah jadi hasil gambar; bola suara berdenyut. |

---

## 2. Empat Hukum Umum yang Ditemukan

1. **Linimasa Berbasis Segmen Jelas (Tanya-Jawab Dulu → Papan Cerita 8 Segmen):**
   Sebelum menggambar tampilan, ruang lingkup dikunci lewat sesi tanya-jawab singkat (Gerbang 1), lalu dipetakan ke 8 segmen baku (`Pancingan Awal`, `Agitasi Masalah`, `Kemunculan Produk`, `Peragaan Fitur #1`, `Peragaan Fitur #2`, `Bukti Nyata`, `Pengunci Pesan`, `Penutup & Ajakan`) sesuai paket durasi (`10–15 dtk`, `18–25 dtk`, atau `30–45 dtk`).
2. **Minim Teks (`2–6` Kata), Penuh Peragaan Visual:**
   Penonton langsung paham karena melihat kejadian nyata di layar — foto diseret masuk, menu pilihan diklik, kapsul berubah bentuk, atau kipas kartu mekar — bukan membaca paragraf panjang.
3. **Kamera Pemandu Mata + Kontras Ekstrem:**
   Kamera menyorot dekat tepat ke titik interaksi kecil (menu tarik-turun, tombol Simpan, menu samping), mengikuti lengkung kursor, lalu mundur memperlihatkan hasil besarnya sambil menjaga `60%–83%` durasi dalam keadaan tenang.
4. **Antarmuka Bernapas & Membal (Dua Lapisan Nyawa):**
   - **Saat diam (tenang):** Elemen mengambang halus, tepian kolom ketik berpendar saat didekati foto, atau bola suara berdenyut pelan.
   - **Saat bereaksi:** Elemen memakai pegas kenyal (sedikit memipih lalu memantul pas), lencana angka melompat, kapsul menciut-mekar berubah fungsi, atau kalimat membelah menyisipkan kolom ketik.

---

## 3. Aturan Prioritas Bahan (Anti Jalan Pintas Gambar Mati)

Dari pengamatan terhadap aset foto di video acuan (seperti benda antik pada V7 dan tangan memegang kode pindai pada V3), diterapkan aturan bertingkat tiga yang ketat:
1. **Prioritas 1 — Kode Antarmuka:** Semua kartu, tombol, kapsul, kolom ketik, daftar pilihan, tabel, grafik, ikon sederhana, dan tulisan wajib dibuat dengan kode agar tajam di sorot dekat dan bisa bernapas/membal.
2. **Prioritas 2 — Tiga Dimensi Nyata (`Three.js`):** Semua gawai tiga dimensi berputar dan transisi masuk layar wajib dibuat dengan `Three.js`.
3. **Prioritas 3 — Opsi `PNG` / `WebP` Hanya Jika Dibutuhkan:** Khusus benda fotografis/organik rumit (makanan/minuman, tangan manusia, benda fisik detail tinggi, poster seni, atau foto pemandangan). Jalur pengadaannya berurutan: bahan asli pemilik → buat gambar otomatis → stok bebas lisensi komersial (Unsplash/Pexels/Wikimedia/Pixabay tanpa menerobos anti-robot; Pinterest hanya untuk acuan inspirasi) → minta jujur ke pemilik.

---

## 4. Peringatan Mutu Suara dari Audit

Video mentah **V1 (`1,399`)** dan **V4 (`2,704`)** memiliki puncak suara yang pecah melampaui batas wajar. Karena itu, saat gaya visual dari acuan tersebut dipakai, seluruh tata suara tetap dikunci ke standar bersih proyek (`peak <= 0,92`, dinamika `crest >= 14 dB`, dan jeda hening sejenak sebelum momen penting).

---

## 5. Daftar 13 Berkas Baru & Pembaruan

- **Modul Baru:** [storyboard-segments.md](../skill/motion-graphic-director/references/modules/storyboard-segments.md), [living-ui-physics.md](../skill/motion-graphic-director/references/modules/living-ui-physics.md), [visual-assets-engine.md](../skill/motion-graphic-director/references/modules/visual-assets-engine.md)
- **Gaya Baru:** [08-apple-minimal-elastic.md](../skill/motion-graphic-director/references/styles/08-apple-minimal-elastic.md), [09-living-product-walkthrough.md](../skill/motion-graphic-director/references/styles/09-living-product-walkthrough.md), [10-dark-ember-editorial.md](../skill/motion-graphic-director/references/styles/10-dark-ember-editorial.md)
- **Pembaruan Panduan, Modul & Cetakan:** [SKILL.md](../skill/motion-graphic-director/SKILL.md), [pacing-choreography.md](../skill/motion-graphic-director/references/modules/pacing-choreography.md), [camera-and-3d.md](../skill/motion-graphic-director/references/modules/camera-and-3d.md), [pre-render-qc.md](../skill/motion-graphic-director/references/checklists/pre-render-qc.md), [motion_primitives.ts](../skill/motion-graphic-director/templates/motion_primitives.ts)
- **Dokumentasi Proyek:** [README.md](../README.md) & catatan ini
