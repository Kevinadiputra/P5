# 🚀 Panduan Deployment UNSRI Student Portal

## Pilihan Deployment

### 1️⃣ Vercel (Rekomendasi - Paling Mudah)

Vercel adalah platform dari pembuat Next.js, deployment otomatis dan gratis.

#### Cara Deploy ke Vercel:

**Metode A: Via Website (Termudah)**

1. **Buat akun di Vercel**
   - Kunjungi https://vercel.com
   - Sign up dengan GitHub, GitLab, atau Bitbucket
   
2. **Push code ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/unsri-portal.git
   git push -u origin main
   ```

3. **Import Project di Vercel**
   - Login ke Vercel Dashboard
   - Klik "Add New Project"
   - Import repository GitHub Anda
   - Vercel akan otomatis detect Next.js
   - Klik "Deploy"
   - ✅ Done! URL live dalam 1-2 menit

**Metode B: Via CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Untuk production
vercel --prod
```

**URL Live**: `https://your-project-name.vercel.app`

---

### 2️⃣ Netlify

**Via Website:**

1. Kunjungi https://netlify.com
2. Sign up/Login
3. Drag & drop folder project atau connect GitHub
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy

**Via CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

### 3️⃣ GitHub Pages (Static Export)

Next.js bisa di-export sebagai static HTML:

1. **Update `next.config.js`:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

2. **Build & Deploy:**
```bash
npm run build

# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d out
```

---

### 4️⃣ Railway

1. Kunjungi https://railway.app
2. Sign up dengan GitHub
3. New Project → Deploy from GitHub repo
4. Pilih repository
5. Railway auto-detect Next.js
6. Deploy

---

### 5️⃣ Render

1. Kunjungi https://render.com
2. Sign up/Login
3. New → Web Service
4. Connect GitHub repository
5. Build Command: `npm install && npm run build`
6. Start Command: `npm start`
7. Create Web Service

---

## 📝 Checklist Sebelum Deploy

- [x] `npm run build` berhasil tanpa error
- [x] File `.gitignore` sudah proper
- [x] Environment variables (jika ada) sudah di-setup
- [x] Package.json dependencies lengkap
- [x] Test di local dengan `npm start`

## 🔧 Environment Variables

Jika butuh environment variables di production:

**Vercel:**
- Settings → Environment Variables
- Tambahkan key-value pairs

**Netlify:**
- Site settings → Build & deploy → Environment
- Tambahkan variables

**Railway/Render:**
- Environment variables section
- Add variables

## 🌐 Custom Domain

Setelah deploy, Anda bisa menambahkan custom domain:

**Vercel:**
1. Settings → Domains
2. Add domain Anda
3. Update DNS records

**Netlify:**
1. Domain settings → Add custom domain
2. Update DNS

## 📊 Analytics & Monitoring

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

Tambahkan di `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🔄 Continuous Deployment

Dengan GitHub + Vercel/Netlify:
- Setiap push ke `main` → Auto deploy
- Pull requests → Preview deployment
- Rollback mudah ke versi sebelumnya

## ⚡ Performance Tips

1. **Image Optimization**: Gunakan Next.js Image component
2. **Code Splitting**: Sudah otomatis di Next.js
3. **Caching**: Vercel handle otomatis
4. **Compression**: Gzip/Brotli automatic

## 🆘 Troubleshooting

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Build timeout:**
- Increase build timeout di platform settings
- Optimize build process

**Environment variables not working:**
- Prefix dengan `NEXT_PUBLIC_` untuk client-side
- Restart deployment setelah add variables

## 📞 Support

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Create issue di repository

---

## ✅ Rekomendasi Saya

**Untuk pemula**: Gunakan **Vercel** via website
- Paling mudah
- Gratis unlimited
- Auto HTTPS
- Global CDN
- Perfect untuk Next.js

**Quick Deploy:**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

**Done!** 🎉

URL live Anda: `https://unsri-student-portal.vercel.app`

---

© 2025 UNSRI Student Portal
