# Rainbow Vibe Quiz 🌈✨

แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ พร้อมภาพประกอบสุดจึ้ง สรุปผล % ความปัง และระบบแชร์โซเชียล / QR Code / PWA

- **Production Custom Domain**: [https://www.gaykub.online/](https://www.gaykub.online/)
- **GitHub Repository**: [panupong24/55](https://github.com/panupong24/55)

---

## 🚀 การตั้งค่า Custom Domain & GitHub Actions Deployment (panupong24/55)

โปรเจกต์นี้ได้รับการตั้งค่าเพื่อรันบน Custom Domain **`https://www.gaykub.online/`** จาก Root (`/`) พร้อม Deploy อัตโนมัติผ่าน GitHub Actions ของ repository **`panupong24/55`**

### 1. Base Path ใน `vite.config.ts`
ไฟล์ `vite.config.ts` มีการตั้งค่า base และ PWA scope สำหรับ root domain:
```ts
export default defineConfig(() => {
  return {
    base: '/', // รันจาก Root สำหรับ custom domain www.gaykub.online
    // ...
    manifest: {
      id: '/',
      start_url: '/',
      scope: '/',
      // ...
    }
  };
});
```

### 2. Custom Domain CNAME (`public/CNAME`)
มีไฟล์ `public/CNAME` ระบุ:
```
www.gaykub.online
```
เมื่อ GitHub Actions ทำการ build จะคัดลอกไฟล์นี้ไปยัง `dist/CNAME` เพื่อให้ GitHub Pages ผูกกับโดเมน `www.gaykub.online` เสมอ

### 3. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
เมื่อมีการ `git push` ไปยัง branch `main` หรือ `master` ใน repository `panupong24/55`:
- ติดตั้ง Dependencies อัตโนมัติ (`npm install`)
- สั่ง Build โฟลเดอร์ `dist` (`npm run build`)
- อัปโหลดและ Deploy โฟลเดอร์ `dist` ขึ้น **GitHub Pages** อัตโนมัติ

---

## 🛠️ ขั้นตอนการเปิดใช้งาน Custom Domain บน GitHub Pages (`panupong24/55`)

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
5. ในส่วน **Custom domain**:
   - ตรวจสอบว่าโดเมนเป็น `www.gaykub.online`
   - ทำเครื่องหมายที่ **Enforce HTTPS**
6. เข้าใช้งานเว็บไซต์ได้ทันทีที่:
   👉 **`https://www.gaykub.online/`**

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
