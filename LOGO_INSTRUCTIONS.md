# Instruksi Menambahkan Logo UNSRI

## 📁 Lokasi File Logo

Letakkan file logo UNSRI Anda di folder `public` dengan nama:
```
public/logo-unsri.png
```

## 📐 Spesifikasi Logo

### Format File:
- **Format:** PNG (dengan background transparan lebih baik)
- **Rasio:** Kotak (1:1) - misal 512x512px, 1024x1024px
- **Ukuran file:** Maksimal 500KB untuk performa optimal
- **Resolusi:** Minimal 256x256px, rekomendasi 512x512px

### Kualitas:
- Gunakan logo resolusi tinggi untuk hasil terbaik
- Background transparan (PNG) akan terlihat lebih profesional
- Jika menggunakan JPG, pastikan background putih bersih

## 🎨 Di Mana Logo Muncul?

Logo UNSRI akan muncul di 4 lokasi:

### 1. **Header (Setelah Login)**
   - Posisi: Kiri atas di header
   - Ukuran: 40x40px (mobile), 48x48px (desktop)
   - Fungsi: Klik logo → kembali ke Dashboard
   - Border: Abu-abu tipis dengan shadow
   - Hover effect: Opacity 80%

### 2. **Login Page**
   - Posisi: Tengah atas
   - Ukuran: 80x80px
   - Background: Putih dengan border abu-abu
   - Shadow: XL untuk efek mengambang
   - Hover effect: Scale 1.05x
   - Fallback: Huruf "U" dengan gradient orange-yellow

### 3. **Register Page**
   - Posisi: Tengah atas
   - Ukuran: 80x80px
   - Sama dengan Login Page
   - Background gradient orange-blue di halaman

### 4. **Admin Login Page**
   - Posisi: Tengah atas
   - Ukuran: 80x80px
   - Background: Putih dengan border orange
   - Badge overlay: Icon shield di pojok kanan bawah
   - Background halaman: Dark theme (abu-abu gelap - orange)

## 📋 Langkah-Langkah Instalasi

### Opsi 1: Via File Explorer (Mudah)
1. Buka folder project Anda
2. Masuk ke folder `public`
3. Copy file logo dengan nama `logo-unsri.png`
4. Paste ke folder `public`
5. Refresh browser (Ctrl + F5)

### Opsi 2: Via Terminal
```bash
# Dari root project
# Windows
copy "C:\path\to\your\logo.png" "public\logo-unsri.png"

# Mac/Linux
cp /path/to/your/logo.png public/logo-unsri.png
```

### Opsi 3: Drag & Drop di VS Code
1. Buka folder `public` di VS Code Explorer
2. Drag & drop file logo Anda
3. Rename menjadi `logo-unsri.png`

## ✅ Cara Verifikasi

### 1. Check File Ada:
Pastikan file ada di path:
```
public/logo-unsri.png
```

### 2. Test di Browser:
Buka URL langsung:
```
http://localhost:3000/logo-unsri.png
```
Jika muncul, logo sudah siap!

### 3. Test di Aplikasi:
- Logout (jika sudah login)
- Refresh halaman login
- Logo seharusnya muncul di atas form login
- Login dan check header - logo muncul di kiri atas

## 🔧 Troubleshooting

### Problem: Logo tidak muncul
**Solusi:**
1. Check nama file harus PERSIS `logo-unsri.png` (huruf kecil semua)
2. Check file ada di folder `public` (bukan di folder lain)
3. Hard refresh browser: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
4. Clear browser cache
5. Restart dev server (`npm run dev`)

### Problem: Logo terpotong atau tidak proporsional
**Solusi:**
1. Pastikan logo rasio kotak (1:1)
2. Crop logo jika perlu menggunakan image editor
3. Gunakan background transparan (PNG)
4. Ukuran minimal 256x256px

### Problem: Logo terlalu besar (file size)
**Solusi:**
1. Compress logo menggunakan tool online:
   - TinyPNG: https://tinypng.com
   - Squoosh: https://squoosh.app
2. Target ukuran: < 500KB
3. Kualitas: 80-90% sudah cukup

### Problem: Logo blur atau pixelated
**Solusi:**
1. Gunakan logo resolusi lebih tinggi (minimal 512x512px)
2. Pastikan format PNG atau SVG (bukan JPG berkualitas rendah)
3. Jika ada, gunakan versi SVG untuk hasil terbaik

## 🎨 Kustomisasi Logo (Opsional)

Jika Anda ingin mengubah ukuran atau posisi logo, edit file berikut:

### Header Logo:
File: `app/components/Header.tsx`
```tsx
<div className="w-10 h-10 lg:w-12 lg:h-12 ...">
  // Ubah w-10 h-10 untuk mobile
  // Ubah lg:w-12 lg:h-12 untuk desktop
```

### Login/Register Logo:
File: `app/components/auth/LoginPage.tsx` atau `RegisterPage.tsx`
```tsx
<div className="inline-flex h-20 w-20 ...">
  // Ubah h-20 w-20 untuk mengubah ukuran
```

## 📱 Preview di Berbagai Device

Logo akan otomatis responsive:
- **Mobile (< 640px):** 40x40px di header
- **Tablet (640-1024px):** 44x44px di header  
- **Desktop (> 1024px):** 48x48px di header
- **Login/Register/Admin:** 80x80px di semua device

## 🔄 Fallback System

Jika logo tidak ditemukan, sistem akan otomatis menampilkan:
- **Login/Register:** Huruf "U" dengan gradient orange-yellow
- **Admin:** Icon shield dengan gradient orange-red
- **Header:** Huruf "U" dengan text orange

Jadi aplikasi tetap terlihat bagus meski logo belum ditambahkan.

## 🎯 Rekomendasi Logo

Untuk hasil terbaik:
1. **Format:** PNG dengan background transparan
2. **Ukuran:** 512x512px atau 1024x1024px
3. **Rasio:** Perfect square (1:1)
4. **File size:** 100-500KB
5. **Content:** Logo UNSRI resmi dari website unsri.ac.id

## 📞 Support

Jika ada masalah:
1. Check console browser (F12) untuk error messages
2. Pastikan nama file dan path sudah benar
3. Restart dev server
4. Clear browser cache dan cookies

---

**Setelah menambahkan logo, aplikasi akan terlihat lebih profesional dan branded dengan identitas UNSRI! 🎓**
