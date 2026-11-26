# Riset 6 Video Acuan TikTok: VFX Antarmuka, Kolaborasi Banyak Kursor & Transformasi Ikon

Catatan ini merekam hasil ukur teknis, bedah pola gerak, dan teknik baru yang diserap dari **6 video acuan TikTok** (**Vercel / v0**, **Apple Store AirPods Max**, **Grok Bots**, **Lovable**, **Spotify UI**, dan **Supabase**) ke dalam panduan **Motion Graphic Director**.

> **Catatan Arsip:** Seluruh berkas video pihak ketiga asli tidak disimpan atau diunggah ke repositori ini; hanya angka hasil ukur, temuan pola penyuntingan, kode pembantu gerak, dan pembaruan panduannya saja yang diserap.

---

## 1. Hasil Ukur Teknis 6 Video Acuan

| Video | Pembuat & Tema | Ukuran & Durasi | Tenang vs Cepat | Lonjakan Kontras | Puncak Suara (`-ac 2`) | Pelajaran Utama |
|---|---|---|---|---|---|---|
| **V1 · Vercel / v0** | `@__mcvisuals__` · Gelap pekat + kilau lensa | `1024×576` · `9,37 dtk` (`30 FPS`) | `52,8%` tenang / `47,2%` cepat | `3,07×` | `0,638` (bersih) · *Crest* `15,25 dB` · `19,9%` sunyi | Fokus kamera buram-ke-tajam dengan pendar cahaya lembut, lingkaran skor hijau `16 → 96`, dan tombol `Visit ↗` dari cahaya buram. |
| **V2 · Apple Store** | `@apollox_ae` · Biru es + kartu bunglon | `576×576` · `8,60 dtk` (`30 FPS`) | **`66,7%` tenang** / `33,3%` cepat | `6,56×` | **`0,398` (bersih)** · *Crest* **`20,33 dB`** · **`81,9%` sunyi** | Partikel logo memadat lalu memunculkan rumpun gawai 3D; satu kartu berubah warna seutuhnya saat warna *headphone* dipilih lalu melebar jadi daftar fitur. |
| **V3 · Grok Bots** | `@stepan.straufvfx` · Ombak gelap + 5 stiker bot | `1024×576` · `10,03 dtk` (`30 FPS`) | **`64,1%` tenang** / `35,9%` cepat | `3,69×` | `0,767` (bersih) · *Crest* `13,87 dB` · `27,0%` sunyi | Latar kain gelap berombak; klik tombol meluncurkan 5 maskot stiker bermata, lalu bot biru melompat memunculkan `G-r-o-k` dan mendarat sebagai titik akhir. |
| **V4 · Lovable** | `@rawedits.10` · Pesta transisi & galaksi layar 3D | `1024×576` · `21,50 dtk` (`30 FPS`) | `35,3%` tenang / **`64,7%` cepat** | **`18,11×`** | `0,924` *(nyaris batas `0,92`)* · *Crest* `13,72 dB` · `2,8%` sunyi | Tulisan merek raksasa di belakang kotak ketik, galaksi puluhan layar 3D, serta kotak sorot biru berlabel `Header` di atas judul. *(Terlalu padat gerak & minim jeda sunyi)* |
| **V5 · Spotify UI** | `@apollox_ae` · Kisi terang + pemutar gelap | `576×576` · `12,70 dtk` (`30 FPS`) | `34,0%` tenang / **`66,0%` cepat** | `5,57×` | **`0,343` (bersih)** · *Crest* `12,68 dB` · `20,2%` sunyi | Ikon aplikasi memanjang langsung menjadi kolom pencarian instan tanpa layar kosong di tengah, lalu berputar ulang mengikuti ketukan lagu. *(Cocok hanya untuk klip `<= 12 dtk`)* |
| **V6 · Supabase** | `@refined.motion` · Gelap berkas cahaya zamrud | `1024×576` · `22,03 dtk` (`30 FPS`) | **`80,5%` tenang** (`40,2%` hampir diam) / `19,5%` cepat | **`14,66×`** | **`0,258` (paling jernih)** · *Crest* **`19,61 dB`** · **`93,2%` sunyi** | Juara ritme & suara! Berkas cahaya hijau miring, ledakan matriks titik (*halftone*) dari perintah teks ke SQL, kamera menempel kursor, dan **4 kursor bernama bekerja bersamaan**. |

---

## 2. Tujuh Teknik Baru yang Diserap

1. **Gelap Berkas Cahaya & Matriks Titik (Gaya 11 · V6 + V1):**
   Latar arang gelap (`#080808`–`#181818`) diberi garis berkas cahaya diagonal yang bernapas lembut, kilau fokus lensa buram-ke-tajam, bola dunia garis (*wireframe globe*), dan **gelombang matriks titik bercahaya (*halftone*)** saat mengubah perintah manusia menjadi hasil kode/data.
2. **Koreografi Banyak Kursor Bernama (`evalMultiCursors` · V6):**
   Menjelaskan fitur kolaborasi atau kerja banyak agen secara instan tanpa paragraf panjang cukup lewat **3–4 kursor warna-warni berlabel nama** (`Alan`, `Jonny`, `Copple`, `Terry`) yang bergerak dan mengklik bagian layar berbeda secara bersamaan.
3. **Kamera Menempel pada Kursor (`tetheredCameraFollow` · V6 & V3):**
   Saat mengisi formulir atau memilih daftar tarik-turun 3–4 langkah berurutan, kamera melakukan *zoom* dekat (`1,8×–2,2×`) dan terus meluncur halus mengikuti arah tangan kursor dalam satu bidikan tanpa potong adegan.
4. **Ikon Memanjang Jadi Bilah Ketik (`iconToBarMorph` · V5):**
   Ikon aplikasi persegi meregang secara elastis dan berubah wujud langsung menjadi kotak ketik/pencarian sehingga hemat waktu transisi.
5. **Maskot Pemantul Pembentuk Kata (`mascotLetterHop` · V3):**
   Karakter bermata/ikon merek melompat-lompat memantul di atas garis dasar untuk memunculkan huruf demi huruf, lalu mendarat tenang tepat sebagai tanda titik di ujung logo/kata penutup.
6. **Kartu Bunglon Varian Warna (`moodCardBlend` · V2):**
   Menekan bulatan pilihan warna pada produk tidak hanya memutar objeknya, tetapi juga menggeser warna seluruh latar kartu secara mulus mengikuti varian yang dipilih.
7. **Bingkai Sorot Penyunting (`inspectorBoxPose` · V4):**
   Menampilkan kotak garis tipis dan label komponen kecil (misal `Header`) ketika kursor menyentuh judul atau blok halaman untuk menegaskan kemampuan sunting visual.

---

## 3. Peringatan Batas Kepadatan Gerak & Suara

Dari audit terhadap **V4 (`64,7%` gerak cepat, `2,8%` sunyi, `peak 0,924`)** dan **V5 (`66,0%` gerak cepat)**:
- Rasio gerak cepat di atas **`60%`** hanya aman untuk *teaser* musik singkat (`<= 12 dtk`) yang tidak menuntut penonton membaca informasi detail.
- Untuk demo produk atau penyampaian fitur nyata, tetap kunci ke zona tenang **`55%–83%`** (seperti **V6 Supabase `80,5%`** dan **V2 Apple Store `66,7%`**) dengan **2 jeda sunyi (`230–240 ms`)** serta puncak audio **`<= 0,92`** dan *crest* **`>= 14 dB`**.

---

## 4. Hasil Bedah Presisi `rea-video` (6 Video Acuan)

Seluruh 6 video juga sudah dibedah per bingkai (`30 FPS`) menggunakan alat `rea-video` yang kini diintegrasikan jalurnya ke modul [reference-video-extractor.md](../skill/motion-graphic-director/references/modules/reference-video-extractor.md):

| Video | Potongan Adegan | Babak Gerak (`scenes`) | Titik Kunci (`@frame`) | Tempo & Kunci Nada | Klip Suara Terpisah | Catatan Kamera & Koreksi Visual |
|---|---|---|---|---|---|---|
| **V1 · Vercel / v0** | `2` adegan | `4` babak | **`24` titik** (`@0..@280`) | `136 BPM` · `F mayor` | `1` ketukan (`4,4 dtk`) | Gerak *zoom* cepat (`+28%/dtk` masuk -> `-53%/dtk` mundur membuka kartu proyek). |
| **V2 · Apple Store** | `5` adegan | `1` babak kode | **`36` titik** (`@0..@257`) | `112 BPM` · `C mayor` | `2` klip (`1,2 dtk`, `4,3 dtk`) | Mesin offline melabeli kartu produk sebagai 3D (`88%`), wajib dikoreksi ke kode + foto produk. |
| **V3 · Grok Bots** | `3` adegan | `2` babak kode | **`27` titik** (`@0..@300`) | `112 BPM` · `F mayor` | `0` terdeteksi *(suara masuk ke musik)* | Terlihat putaran kamera halus `12,9°/dtk` saat menyusuri kolom ketik sebelum 5 maskot muncul. |
| **V4 · Lovable** | `14` adegan | `5` babak kode | **`83` titik** (`@0..@644`) | `144 BPM` · `F mayor` | `7` ketukan (`5` suara unik) | Paling padat perpindahan (`83` titik kunci). Label "AI/3D" di beberapa transisi gradien dikoreksi secara visual. |
| **V5 · Spotify UI** | `9` adegan | `5` babak kode | **`55` titik** (`@0..@380`) | `150 BPM` · `C mayor` | `1` klip (`3,5 dtk`) | Potongan adegan tercatat tepat jatuh di ketukan musik; *zoom* dorong masuk mencapai `+44%/dtk` ke layar pemutar. |
| **V6 · Supabase** | `7` adegan | `10` babak kode | **`44` titik** (`@0..@660`) | `178 BPM` · `C mayor` | `7` ketukan (`6` suara unik) | Paling lengkap untuk acuan: latar `#151515`, pendar `#305a42`, 4 kursor terpotong bersih; suara bernada tinggi sempat salah dikira TTS oleh alat offline (dikoreksi: non-VO). |

---

## 5. Daftar Berkas Baru & Pembaruan

- **Gaya Baru ke-11:** [11-dark-tech-beam-halftone.md](../skill/motion-graphic-director/references/styles/11-dark-tech-beam-halftone.md)
- **Modul Baru Pembedah Acuan:** [reference-video-extractor.md](../skill/motion-graphic-director/references/modules/reference-video-extractor.md)
- **Pembaruan Panduan, Modul & Cetakan:** [SKILL.md](../skill/motion-graphic-director/SKILL.md), [06-custom-reference-adapter.md](../skill/motion-graphic-director/references/styles/06-custom-reference-adapter.md), [pacing-choreography.md](../skill/motion-graphic-director/references/modules/pacing-choreography.md), [living-ui-physics.md](../skill/motion-graphic-director/references/modules/living-ui-physics.md), [camera-and-3d.md](../skill/motion-graphic-director/references/modules/camera-and-3d.md), [motion_primitives.ts](../skill/motion-graphic-director/templates/motion_primitives.ts)
- **Dokumentasi Proyek:** [README.md](../README.md) & catatan ini
