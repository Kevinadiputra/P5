# Portal Informasi Mahasiswa UNSRI

Portal modern untuk mahasiswa UNSRI yang menyediakan informasi event, seminar, beasiswa, dan kompetisi.

## 🆕 Fitur Baru (Update Terbaru)

### 🔐 **Sistem Authentication**
- **Register**: Mahasiswa dapat membuat akun baru dengan NIM dan email
- **Login**: Login untuk mengakses portal
- **Admin Login**: Panel khusus untuk administrator
  - Email: `admin@unsri.ac.id`
  - Password: `admin123`
- **Profile Completion**: Form lengkapi profil setelah registrasi pertama kali
- **Logout**: Keluar dari sistem dengan aman

### 📄 **Dedicated Pages**
Setiap menu sidebar sekarang memiliki halaman tersendiri:

1. **Dashboard** (`/dashboard`)
   - Overview statistik
   - Quick access cards
   - Calendar widget
   - Deadline reminders

2. **Event & Seminar** (`/events`)
   - List semua event dan seminar
   - Filter: All / Event / Seminar
   - Search functionality
   - Save dan register event
   - Status badges

3. **Beasiswa** (`/beasiswa`)
   - Daftar beasiswa tersedia
   - Deadline tracking
   - Status: Open / Deadline Soon / Closed
   - Apply beasiswa langsung

4. **Lomba & Kompetisi** (`/lomba`)
   - Grid view lomba
   - Informasi lengkap kompetisi
   - Registration system
   - Save favorite competitions

5. **Profile** (`/profile`)
   - View dan edit profil mahasiswa
   - Update informasi pribadi
   - Statistik aktivitas (events, beasiswa, lomba)
   - Upload avatar (coming soon)

### 👨‍💼 **Admin Dashboard**
Panel khusus untuk administrator dengan fitur:
- **Statistics Overview**: Total events, beasiswa, lomba, dan users
- **Event Management**: 
  - Lihat semua event dalam table
  - Tambah event baru (modal form)
  - Edit event (coming soon)
  - Delete event dengan konfirmasi
- **Dark Theme**: UI gelap khusus admin panel
- **Logout**: Keluar dari admin panel

### 🔒 **Authentication Guards**
- Redirect ke login jika belum authenticated
- Profile completion page untuk user baru
- Admin-only access untuk admin dashboard
- Protected routes untuk semua pages

### 💾 **State Persistence**
Data tersimpan otomatis di browser:
- Auth state (login status)
- User profile
- Saved events
- Registered events
- Preferences

## 🚀 Cara Menggunakan

### Untuk Mahasiswa:

1. **Pertama Kali**:
   ```
   1. Klik "Daftar sekarang" di halaman login
   2. Isi NIM, email, dan password
   3. Lengkapi profil (nama, prodi, tahun, dll)
   4. Mulai explore portal!
   ```

2. **Login Kembali**:
   ```
   1. Masukkan email dan password
   2. Centang "Ingat saya" (optional)
   3. Klik "Masuk"
   ```

3. **Explore Features**:
   - Browse events di menu "Event & Seminar"
   - Cari beasiswa di menu "Beasiswa"
   - Ikuti lomba di menu "Lomba & Kompetisi"
   - Update profil di menu "Profile"
   - Logout dari dropdown user menu

### Untuk Admin:

1. **Login Admin**:
   ```
   1. Klik "Login sebagai Admin" di halaman login
   2. Email: admin@unsri.ac.id
   3. Password: admin123
   4. Klik "Masuk sebagai Admin"
   ```

2. **Manage Events**:
   ```
   1. Klik "Tambah Event Baru"
   2. Isi form (judul, tipe, tanggal, lokasi, deskripsi)
   3. Klik "Tambah Event"
   4. Event otomatis muncul di table dan portal mahasiswa
   ```

3. **Delete Event**:
   ```
   1. Klik icon trash di table
   2. Konfirmasi delete
   3. Event dihapus dari sistem
   ```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with Persist
- **Icons**: Heroicons
- **Deployment**: Vercel

## 📦 Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Live Demo

**Production URL**: [https://portal-informasi-mahasiswa-ppz34diod.vercel.app](https://portal-informasi-mahasiswa-ppz34diod.vercel.app)

**Demo Accounts**:
- **Mahasiswa**: Register akun baru atau login dengan akun yang sudah dibuat
- **Admin**: 
  - Email: `admin@unsri.ac.id`
  - Password: `admin123`

## 📁 Project Structure

```
app/
├── components/
│   ├── auth/
│   │   ├── LoginPage.tsx          # Login mahasiswa
│   │   ├── RegisterPage.tsx       # Register akun baru
│   │   ├── AdminLoginPage.tsx     # Login admin
│   │   └── CompleteProfilePage.tsx # Form lengkapi profil
│   ├── pages/
│   │   ├── EventsPage.tsx         # Halaman event & seminar
│   │   ├── BeasiswaPage.tsx       # Halaman beasiswa
│   │   ├── LombaPage.tsx          # Halaman lomba
│   │   ├── ProfilePage.tsx        # Halaman profil user
│   │   └── AdminDashboardPage.tsx # Admin dashboard
│   ├── DashboardPage.tsx          # Main router dengan auth guard
│   ├── DashboardMain.tsx          # Dashboard content
│   ├── Header.tsx                 # Header dengan user menu & logout
│   ├── Sidebar.tsx                # Navigation sidebar
│   ├── Toast.tsx                  # Toast notifications
│   └── ... (other components)
├── lib/
│   └── store.ts                   # Zustand store dengan auth
└── page.tsx                       # Root page
```

## 🔄 Routing System

```typescript
// Auth States
- Not authenticated → LoginPage
- Register flow → RegisterPage → CompleteProfilePage → Dashboard
- Admin login → AdminLoginPage → AdminDashboardPage

// Main App Routes (authenticated)
- activeView = 'dashboard' → DashboardMain
- activeView = 'events' → EventsPage
- activeView = 'beasiswa' → BeasiswaPage
- activeView = 'lomba' → LombaPage
- activeView = 'profile' → ProfilePage
```

## 🎨 Features Highlights

### Interactive Components
- ✅ Toast notifications untuk semua actions
- ✅ Save/Unsave functionality
- ✅ Register/Apply functionality
- ✅ Search & filter
- ✅ Responsive design (mobile-first)
- ✅ Loading states
- ✅ Hover animations
- ✅ Modal forms

### User Experience
- ✅ Auto-save state
- ✅ Remember me (login)
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Confirmation dialogs
- ✅ Success/Error feedback
- ✅ Empty states
- ✅ Loading indicators

## 🚀 Deployment

Project ini sudah di-deploy ke Vercel:

```bash
# Deploy to Vercel (if you have Vercel CLI)
vercel --prod
```

Atau push ke GitHub dan connect ke Vercel dashboard untuk auto-deployment.

## 📝 Notes

- Data saat ini masih menggunakan mock data (demo)
- Untuk production, integrate dengan backend API
- Admin credentials di-hardcode untuk demo purposes
- State disimpan di localStorage browser

## 🤝 Contributing

Portal ini dikembangkan untuk Tugas Interaksi Manusia dan Komputer - Semester 5

---

**© 2025 Universitas Sriwijaya. All rights reserved.**
