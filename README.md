# Remix Rainbow Vibe Quiz 🌈✨

แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ พร้อมภาพประกอบสุดจึ้ง สรุปผล % ความปัง และระบบแชร์โซเชียล / QR Code / PWA

- **GitHub Repository**: [panupong24/55](https://github.com/panupong24/55)
- **GitHub Pages URL**: [https://panupong24.github.io/55/](https://panupong24.github.io/55/)

---

## 🚀 การตั้งค่า Deployment บน GitHub Pages (panupong24/55)

โปรเจกต์นี้ได้รับการตั้งค่าพร้อมสำหรับการ Build และ Deploy ผ่าน **GitHub Actions** ไปยัง GitHub Pages ของ repository **`panupong24/55`** โดยอัตโนมัติ

### 1. Base Path ใน `vite.config.ts`
ไฟล์ `vite.config.ts` มีการตั้งค่า:
```ts
export default defineConfig(() => {
  return {
    base: '/55/', // สำหรับ repository panupong24/55 บน GitHub Pages
    // ...
  };
});
```

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
เมื่อมีการ `git push` ไปยัง branch `main` หรือ `master` ใน repository `panupong24/55`:
- ติดตั้ง Dependencies อัตโนมัติ (`npm ci || npm install`)
- สั่ง Build โฟลเดอร์ `dist` (`npm run build`)
- อัปโหลดและ Deploy โฟลเดอร์ `dist` ขึ้น **GitHub Pages** โดยตรงผ่าน Action ทางการของ GitHub

---

## 🛠️ ขั้นตอนการเปิดใช้งาน GitHub Pages ครั้งแรกบน `panupong24/55`

1. ทำการ Push โค้ดทั้งหมดไปยัง repository:
   ```bash
   git remote add origin https://github.com/panupong24/55.git
   git branch -M main
   git push -u origin main
   ```
2. เปิดเบราว์เซอร์ไปที่ repository: [https://github.com/panupong24/55](https://github.com/panupong24/55)
3. ไปที่เมนู **Settings** > **Pages** (แถบเมนูด้านซ้าย)
4. ในส่วน **Build and deployment**:
   - เลือก **Source** เป็น **GitHub Actions**
5. ระบบจะเรียกใช้ Workflow จาก `.github/workflows/deploy.yml` อัตโนมัติ
6. เข้าใช้งานเว็บไซต์ได้ทันทีที่:
   👉 **`https://panupong24.github.io/55/`**

---

## 💻 การรันบนเครื่อง Local

```bash
# ติดตั้ง dependencies
npm install

# รันโหมด Development
npm run dev

# ทดสอบ Build ตรวจสอบความถูกต้อง
npm run build

# ทดสอบรันไฟล์ที่ build แล้ว
npm run preview
```

---

## ✨ ฟีเจอร์เด่น
- 🏳️‍🌈 แบบทดสอบ 15 ข้อจัดเต็ม พร้อมคะแนนและฉายาตัวแม่สายรุ้ง 5 ระดับ
- 📱 รองรับการติดตั้งเป็นแอป (PWA: Progressive Web App) บน iPhone, iPad, Android และ Desktop
- 📲 สร้าง QR Code ของเว็บอัตโนมัติ พร้อมปุ่มดาวน์โหลดรูปไปแชร์
- 🖼️ ระบบสร้างการ์ดรูปภาพสรุปผลขนาด 9:16 สำหรับโพสต์ลง Instagram / Facebook Story
- 🔗 ปุ่มแชร์ตรงลง LINE, Facebook, และ X (Twitter)
- ⚡ ใช้งานออฟไลน์ได้ (Offline-ready with Service Worker)
