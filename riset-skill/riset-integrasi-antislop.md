# Riset Evaluasi & Integrasi `antislop` ke `motion-graphic-director`

Catatan ini merangkum hasil evaluasi menyeluruh terhadap rangkaian panduan `antislop` (modul inti, tampilan antarmuka, keterbacaan kontras, naskah, tata letak layar tegak, dan catatan kode), bukti kegagalan dari uji coba nyata video promo Robot 3D, serta detail penerapannya ke dalam skill `motion-graphic-director`.

## Kredit Sumber

- **Repositori acuan:** [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) (`miqdadbadjuber`, lisensi `MIT`, versi acuan `v3.2.32`).
- Seluruh konsep sistem 3 lapisan, batas takaran efek, perangkat daya hidup tampilan, standar keahlian `C-1..C-5`, saringan naskah, aturan tata letak ulang layar tegak, dan disiplin perhitungan kontras WCAG 2.x eksak diadaptasi khusus untuk kebutuhan produksi video motion graphic pada repositori ini.

---

## 1. Mengapa Aturan Lama `ui-antislop-gate.md` (26 Baris) Belum Cukup?

Sebelum pembaruan ini, berkas `references/modules/ui-antislop-gate.md` hanya berisi 5 larangan ringkas (titik lampu merah-kuning-hijau, kartu bertumpuk, ikon kilau 4 titik, angka rekaan, dan blob pelangi). Saat diuji pada proyek nyata video promo **Robot 3D** (`9:16`), aturan lama masih meloloskan pratinjau awal yang terasa seperti buatan mesin:

1. **Objek 3D terkurung dalam kotak kartu:** Model robot 3D justru dimasukkan ke dalam kotak kartu gelap, sehingga kesan ruang tiga dimensinya mati dan terasa statis.
2. **Tata letak seragam antar-babak:** Ketiga pratinjau memakai cetakan yang sama persis (judul di tengah + kotak kartu di tengah + bilah 5 langkah di bawah).
3. **Teks terlalu padat & tombol hiasan mati:** Banyak teks panjang (~45 kata per layar) dan bilah langkah atau tombol pajangan yang tidak pernah diklik kursor selama video.
4. **Kontras warna gagal tanpa disadari:** Warna teks putih (`#FFFFFF`) di atas biru langit (`#0284C7`) terlihat oke sekilas oleh mata, padahal rasio aslinya hanya **`4,10:1`** (di bawah syarat baca teks normal **`4,5:1`**).
5. **Tabrakan gerak horizontal pada layar tegak `9:16`:** Pola belah kalimat ke kiri-kanan (`splitInsertGap`) yang cocok di layar lebar `16:9` justru bertabrakan dengan bilah perintah lebar di layar sempit `1080px` portrait.

---

## 2. Enam Mekanisme Kunci yang Diserap & Diadaptasi untuk Video

| Sumber `antislop` | Mekanisme yang Diambil | Bentuk Adaptasi di `motion-graphic-director` |
|---|---|---|
| `antislop` (Inti) + `antislop-ui` | **Sistem 3 Lapisan + Batas Takaran (`Dose Caps`)** | Memisahkan **Aturan Mutlak** (`R-02`, `R-17..38`, `R-23`, `R-25`, `R-26`, `R-35`, `R-37`), **Aturan Bersyarat + Takaran** (kaca maks `1–2`, pendar maks `1–2`, bayangan selektif, **larangan mengurung model 3D di dalam kartu `R-14`**), dan **Pengunci Mutu** (`R-05` variasi antar-babak, `R-20` uji tukar logo, `R-29` batas `2–3` warna inti + `1` aksen, `R-31` alasan 1 baris wajib di `DESIGN.md`). |
| `antislop` (Bagian 3) | **Perangkat Daya Hidup (`Liveliness Toolkit`)** | Wajib menulis 1 baris **Design Read** dan mengunci 3 takaran rasa (`ENERGY`, `RHYTHM`, `MOTION` skala `1–3`) plus 5 tuas penguat visual sebelum membuat 3 pratinjau Gerbang 3, agar video tidak slop tapi juga tidak kaku. |
| `antislop` (`C-1..C-5`) | **Lima Standar Keahlian Khusus Video** | Menegakkan kelengkapan fungsi (`C-2` / `R-26`): setiap tombol, dropdown, atau penunjuk babak yang digambar wajib benar-benar diklik/dipakai kursor, atau dihapus bersih. |
| `antislop-copywriting` | **Saringan Naskah Layar (`Draft -> Audit -> Final`)** | Melarang kosakata kosong AI, inflasi klaim, paralelisme klise (*"Bukan sekadar X, tapi Y"*), drama patah-patah beruntun, ajakan aksi pasaran, emoji di judul, serta tanda pisah panjang (`—`), sambil menjaga batas `2–6` kata per ketukan. |
| `antislop-layoutmobile` | **Hukum Tata Letak Ulang `9:16` vs `16:9` (`C-4`)** | Layar tegak `9:16` bukan layar mendatar yang diperkecil: wajib mengganti belah kata horizontal menjadi belah vertikal-diagonal saat bilah perintah lebar muncul, menjaga batas margin `X = 72..1008px`, dan menarik mundur jarak kamera 3D agar bagian atas model (seperti antena) tidak menabrak judul. |
| `antislop-human` + Inti | **Skrip Kontras Eksak Mandiri & Gerbang Kelulusan 4 Blok** | Membawa rumus kontras WCAG 2.x eksak tanpa pembulatan palsu (`4,498:1` tetap dinilai gagal pada batas `4,5:1`) menjadi `scripts/check_contrast.py` mandiri (termasuk batas komponen `>= 3,0:1`), serta mewajibkan laporan kelulusan 4 blok berbasis bukti sebelum penyerahan final. |

### Batas Ruang Lingkup (Apa yang Sengaja Tidak Diambil)
Aturan yang hanya berlaku untuk halaman peramban web di `antislop` (seperti daftar FAQ halaman `R-28`, navigasi papan ketik `Tab`/`Escape` `R-32`, atribut tautan `aria-label` `R-39`, metrik muat peramban `LCP`/`CLS` `R-40`) dan aturan komentar kode sumber (`antislop-code`) sengaja **tidak** dicampurkan ke panduan visual video agar alur tetap ramping dan relevan.

---

## 3. Studi Kasus Perbaikan Nyata (Uji Coba Video Promo Robot 3D)

Penerapan prinsip di atas terbukti langsung meningkatkan mutu pratinjau dan render akhir pada uji coba video `9:16`:
- **Melepas Kurungan Kartu (`R-14`):** Model robot 3D dipindah langsung ke panggung `<ThreeCanvas>` penuh dengan warna studio serasi (`#F5F5F3` & `#02050F`), sehingga proporsi dan material langsung bernapas.
- **Keringkasan & Fokus (`2–4` kata/layar + `C-2`):** Memangkas teks panjang menjadi ketukan pendek yang tajam dan membuang tombol/bilah hiasan yang tidak diklik kursor.
- **Kontras Terukur (`R-25`):** Memperbaiki tombol biru `#FFFFFF` di atas `#0284C7` (`4,10:1` -> gagal) menjadi `#FFFFFF` di atas `#0369A1` (`5,93:1`) dan teks `#082F49` di atas `#38BDF8` (`6,48:1`).
- **Reflow Portrait (`C-4`):** Mengubah belah kalimat pembuka menjadi arah miring atas-bawah (`translateY ±165px`) agar bersih dari bilah perintah selebar `880px`, serta menarik jarak kamera 3D (`2,48m -> 3,18m`) agar antena robot bebas dari teks penutup.

---

## 4. Berkas yang Diperbarui & Hasil Verifikasi Alat

- `skill/motion-graphic-director/scripts/check_contrast.py` — alat hitung kontras mandiri WCAG 2.x eksak (mode tunggal, `--batch`, dan `--selftest` termasuk kasus batas `4,498:1`, `4,10:1`, `5,93:1`, `6,48:1`).
- `skill/motion-graphic-director/references/modules/ui-antislop-gate.md` — panduan anti-slop 3 lapisan, takaran efek, daya hidup, saringan naskah, standar `C-1..C-5`, dan Gerbang Kelulusan 4 Blok.
- `skill/motion-graphic-director/references/modules/export-safezones.md` — penambahan hukum reflow `9:16` vs `16:9`.
- `skill/motion-graphic-director/references/checklists/pre-render-qc.md` — penyelarasan daftar periksa Fase A dan penambahan Fase D (Laporan 4 Blok).
- `skill/motion-graphic-director/SKILL.md` — pembaruan Gerbang 3, 6, 7, dan indeks berkas/alat.
