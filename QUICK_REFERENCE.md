# Quick Reference Guide - New Features

## 🎯 1. Target System (Sistem Target Pencapaian)

### Mengatur Target:
1. **Via Profile Page:**
   - Klik "Profile" di sidebar
   - Scroll ke "Target Pencapaian"
   - Klik "Atur Target"
   - Masukkan angka untuk Events, Beasiswa, Lomba
   - Klik "Simpan"

2. **Via Dashboard ProfileCard:**
   - Di card "Progress Event"
   - Klik ikon pensil kecil di samping target
   - Masukkan angka baru
   - Klik ikon centang hijau

### Progress Bar Colors:
- 🔵 **Biru** = Events & Seminar
- 🟢 **Hijau** = Beasiswa
- 🟣 **Ungu** = Lomba & Kompetisi

---

## ⏰ 2. Deadline Page (Halaman Deadline Mendekat)

### Akses:
- Klik menu "Deadline Mendekat" di sidebar (ikon jam)

### Features:
- **Live Timer:** Update setiap detik
- **Urgency Colors:**
  - 🔴 Merah = 0-2 hari lagi (URGENT!)
  - 🟠 Orange = 3-5 hari lagi
  - 🟡 Kuning = 6-7 hari lagi

### Actions:
- Klik card → Lihat detail event
- Klik "Daftar Sekarang" → Buka link pendaftaran

---

## 🎨 3. Animations (Animasi Interaktif)

### Types:
1. **Card Animations:**
   - Fade in saat halaman load
   - Lift effect saat di-hover
   - Scale up saat di-hover

2. **Button Animations:**
   - Scale up 1.05x saat hover
   - Smooth transition 200ms
   - Shadow grows on hover

3. **Toast Notifications:**
   - Slide in dari kanan
   - Auto dismiss setelah 3 detik
   - Click X atau tunggu auto-close

### CSS Classes:
```css
.animate-fadeIn        /* Fade in dari bawah */
.animate-slideInRight  /* Slide dari kanan */
.animate-scaleIn       /* Scale dari kecil */
.hover-lift            /* Terangkat saat hover */
```

---

## 🖱️ 4. Event Click Handlers

### Card Click:
**Behavior:** Navigasi ke halaman detail event
```
Click anywhere on card → Event Detail Page
```

### Button Click:
**Behavior:** Register + open link (tidak navigasi)
```
Click "Daftar" button → 
  1. Mark as registered
  2. Show toast notification
  3. Open registration link in new tab
```

**Implementation:**
- Button menggunakan `e.stopPropagation()`
- Mencegah card onClick dari triggered
- Link dibuka dengan `window.open(link, '_blank')`

---

## 📏 5. Profile Card Height

### Before:
- Fixed height
- Content bisa terpotong atau ada space kosong

### After:
- Auto-adjust height based on content
- Menggunakan `min-h` instead of `h`
- Flex layout untuk optimal spacing
- Responsive padding

---

## ❌ 6. Removed Features

### "Lihat Profil Lengkap" Button
**Status:** ✅ Removed

**Why:** 
- Redundant dengan Profile page di sidebar
- Simplify UI
- Better UX dengan direct access via sidebar

**Replacement:**
- Use "Profile" menu di sidebar
- ProfileCard sekarang fokus pada quick stats dan edit

---

## 🔧 Troubleshooting

### Issue: Animasi tidak muncul
**Solution:**
1. Hard refresh (Ctrl + Shift + R)
2. Clear browser cache
3. Check console untuk CSS errors

### Issue: Target tidak tersimpan
**Solution:**
1. Check localStorage (DevTools → Application → Local Storage)
2. Key harus ada: `unsri-student-portal`
3. Clear localStorage dan set ulang

### Issue: Profile completion muncul terus
**Solution:**
1. Logout
2. Clear localStorage
3. Register ulang
4. Complete profile
5. Seharusnya tidak muncul lagi saat login

### Issue: Click handler tidak jalan
**Solution:**
1. Check console untuk JavaScript errors
2. Pastikan event memiliki `registrationLink`
3. Pastikan browser allow popups dari site

---

## 🎯 Best Practices

### Setting Targets:
- **Realistic:** Jangan set target terlalu tinggi
- **Achievable:** Sesuaikan dengan schedule
- **Trackable:** Review progress tiap minggu

### Using Deadline Page:
- Check setiap hari untuk deadline urgent
- Set reminder untuk deadline 2-3 hari sebelumnya
- Register early untuk menghindari quota penuh

### Interacting with Cards:
- Hover untuk preview information
- Click card untuk full details
- Use "Daftar" button untuk quick registration

---

## 📊 Progress Tracking

### Formula:
```
Progress % = (Current / Target) × 100
```

### Example:
- Target Events: 15
- Events Joined: 5
- Progress: (5/15) × 100 = 33.3%

### Visual Indicators:
- Progress bar fills based on percentage
- Color gradient for better visibility
- Percentage text shows exact progress

---

## 🎨 Color Guide

### Event Types:
- **Event/Seminar:** 🔵 Blue → Cyan gradient
- **Beasiswa:** 🟢 Green → Emerald gradient
- **Lomba:** 🟣 Purple → Pink gradient

### Status Colors:
- **Open:** 🟢 Green
- **Deadline Soon:** 🟡 Yellow/Orange
- **Closed:** 🔴 Red
- **Registered:** ✅ Green check

### UI Elements:
- **Primary Actions:** Blue gradient
- **Success States:** Green
- **Warning States:** Yellow/Orange
- **Error States:** Red
- **Info States:** Blue

---

## ⌨️ Keyboard Shortcuts (Future)

Currently not implemented, but recommended:
- `Ctrl + P` → Open Profile
- `Ctrl + D` → Open Deadline page
- `Ctrl + E` → Open Events page
- `Esc` → Close modal/dropdown

---

## 📱 Mobile Tips

### Touch Gestures:
- **Tap:** Navigate/Select
- **Long Press:** Preview (not implemented yet)
- **Swipe:** Scroll content

### Mobile-Specific:
- Cards auto-stack vertically
- Buttons sized for easy tapping (44x44px min)
- Text sizes adjust for readability
- Padding optimized for thumb reach

---

## 🚀 Performance Tips

### For Better Experience:
1. **Use Modern Browser:**
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge 90+

2. **Enable Hardware Acceleration:**
   - Chrome: Settings → System → Use hardware acceleration
   - Firefox: Options → Performance → Use recommended settings

3. **Close Unused Tabs:**
   - Animations use GPU
   - Multiple tabs can slow performance

---

## 🔐 Data Privacy

### What's Stored Locally:
- User profile data
- Authentication token (mock)
- Target preferences
- Saved/registered events
- Notification preferences

### What's NOT Stored:
- Password (in production, should be hashed server-side)
- Sensitive personal information
- Payment data

### Clear Data:
```javascript
// Open browser console and run:
localStorage.removeItem('unsri-student-portal');
// Then refresh page
```

---

**Quick Tips:**
- 💡 Set targets at start of semester
- ⏰ Check deadline page daily
- 🎯 Track progress weekly
- 📱 Use on mobile for on-the-go access
- 🔔 Enable browser notifications (future feature)

---

**Need Help?**
- Check UPDATE_SUMMARY.md for detailed changes
- Check console for error messages
- Clear localStorage if experiencing issues
