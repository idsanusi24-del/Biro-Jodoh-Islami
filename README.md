# Mawaddah – Biro Ta'aruf Islami

Aplikasi platform perantara perkenalan calon pasangan hidup (ta'aruf) berbasis syariat Islam dengan pendampingan mediator bersertifikat, privasi foto terjaga, dan verifikasi wali nasab.

---

## 🚀 Panduan Online / Deploy ke Internet

Aplikasi ini dapat di-host secara gratis dan online 24 jam melalui **Vercel** atau **Netlify** yang terhubung langsung dengan GitHub.

### 1. Upload ke GitHub
1. Buat repository baru di [github.com/new](https://github.com/new) (misal: `mawaddah-taaruf`).
2. Di komputer Anda, jalankan perintah git:
   ```bash
   git init
   git add .
   git commit -m "feat: rilis awal aplikasi mawaddah"
   git branch -M main
   git remote add origin https://github.com/USERNAME/mawaddah-taaruf.git
   git push -u origin main
   ```

### 2. Deploy Otomatis (Vercel)
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New"** > **"Project"**.
3. Pilih repository `mawaddah-taaruf` yang baru Anda buat, lalu klik **Import**.
4. Biarkan pengaturan default (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
5. Klik **Deploy**. Website Anda akan langsung online dalam 1-2 menit dengan link gratis seperti `https://mawaddah-taaruf.vercel.app`!

---

## 🗄️ Sinkronisasi Data Otomatis (Firebase Firestore & Auth)

Aplikasi ini telah terintegrasi dengan **Google Cloud Firebase**:
- **Firebase Authentication**: Login resmi menggunakan Google Sign-In.
- **Cloud Firestore**: Database cloud real-time (`users`, `memberDetails`, `taarufProcesses`).
- **Super Administrator**: Akun Google `idsanusi24@gmail.com` otomatis mendapatkan hak akses penuh sebagai Admin Pengelola.

### Menambahkan Domain Website ke Firebase Auth
Setelah website online di Vercel/Netlify:
1. Buka [Firebase Console](https://console.firebase.google.com).
2. Pilih proyek Firebase Anda (`galvanic-gearbox-dzbz0`).
3. Masuk ke menu **Build** > **Authentication** > tab **Settings** > **Authorized domains**.
4. Klik **Add domain** dan masukkan alamat domain website Anda (misal: `mawaddah-taaruf.vercel.app`).
5. Selesai! Login Google dan penyimpanan data akan berjalan otomatis 100% di cloud.
