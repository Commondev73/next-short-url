# ShortURL

เว็บแอปสำหรับย่อ URL สร้างด้วย [Next.js](https://nextjs.org) 16 ทำงานร่วมกับ Backend API ภายนอก ผู้ใช้สามารถสมัครสมาชิก ล็อกอิน สร้าง/แก้ไข/ลบ short link ของตนเองได้ ส่วน admin จัดการ short link ของผู้ใช้ทุกคนได้

## สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) 20 ขึ้นไป
- [pnpm](https://pnpm.io/)
- Backend API ที่รองรับ endpoint ด้านล่าง (ค่าเริ่มต้น: `http://localhost:8000/api`)

## ติดตั้ง

```bash
# 1. โคลนโปรเจกต์
git clone <repository-url>
cd next-short-url

# 2. ติดตั้ง dependencies
pnpm install

# 3. ตั้งค่า environment
cp .env.example .env
```

แก้ไขไฟล์ `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

เปลี่ยน URL ให้ตรงกับ Backend API ของคุณ

## รันโปรเจกต์

```bash
# โหมด development
pnpm dev

# build สำหรับ production
pnpm build

# รัน production (ต้อง build ก่อน)
pnpm start

# ตรวจสอบ lint
pnpm lint
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## วิธีใช้งาน

### 1. สมัครสมาชิก / ล็อกอิน

1. ไปที่ `/register` เพื่อสร้างบัญชี (ชื่อ, อีเมล, username, รหัสผ่าน)
2. ไปที่ `/login` เพื่อเข้าสู่ระบบ
3. หลังล็อกอินสำเร็จ ระบบจะ redirect ตาม role:
   - **user** → `/short-url`
   - **admin** → `/admin/short-url`

### 2. จัดการ Short URL (ผู้ใช้ทั่วไป)

| หน้า | URL | รายละเอียด |
|------|-----|------------|
| รายการ | `/short-url` | ดู short link ทั้งหมดของตัวเอง |
| สร้าง | `/short-url/create` | สร้าง short link ใหม่ |
| แก้ไข | `/short-url/[id]` | แก้ไข short link ที่มีอยู่ |

**ฟิลด์ตอนสร้าง short URL**

- **Original URL** — URL ต้นทาง (บังคับ)
- **Title** — ชื่อเรียก (ไม่บังคับ)
- **Active** — เปิด/ปิดการใช้งาน
- **Expires at** — วันหมดอายุ (ไม่บังคับ)

จากหน้ารายการสามารถดูจำนวนคลิก แก้ไข หรือลบ short link ได้

### 3. จัดการ Short URL (Admin)

| หน้า | URL | รายละเอียด |
|------|-----|------------|
| รายการทั้งหมด | `/admin/short-url` | ดู short link ของผู้ใช้ทุกคน |
| แก้ไข | `/admin/short-url/[id]` | แก้ไข short link ของผู้ใช้ |

หน้า admin ต้องล็อกอินด้วยบัญชีที่มี role `admin` เท่านั้น

### 4. ออกจากระบบ

กดปุ่ม **Logout** ที่ Navbar มุมขวาบน

## การป้องกัน route

Middleware จะตรวจสอบ cookie ก่อนเข้าหน้า `/short-url/*` และ `/admin/*`:

- ไม่มี token → redirect ไป `/login`
- เข้า `/admin/*` แต่ role ไม่ใช่ `admin` → redirect ไป `/`

## Backend API ที่ Frontend เรียกใช้

Frontend เรียก API ผ่าน `NEXT_PUBLIC_API_URL`:

**Auth**

| Method | Endpoint |
|--------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |
| POST | `/auth/refresh` |
| POST | `/auth/logout` |

**Short URLs (user)**

| Method | Endpoint |
|--------|----------|
| GET | `/short-urls` |
| GET | `/short-urls/info/:id` |
| POST | `/short-urls` |
| PUT | `/short-urls/:id` |
| DELETE | `/short-urls/:id` |

**Short URLs (admin)**

| Method | Endpoint |
|--------|----------|
| GET | `/admin/short-urls` |
| GET | `/admin/short-urls/:id` |
| PUT | `/admin/short-urls/:id` |
| DELETE | `/admin/short-urls/:id` |

Backend ต้องรันและพร้อมใช้งานก่อนเปิด Frontend มิฉะนั้นหน้า login และ CRUD จะ error

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Radix UI
- **State & Data:** TanStack Query, Zustand
- **Form & Validation:** React Hook Form, Zod

## โครงสร้างโปรเจกต์ (ย่อ)

```
app/                    # หน้าและ route (App Router)
  (auth)/               # login, register
  short-url/            # หน้าผู้ใช้ทั่วไป
  admin/short-url/      # หน้า admin
features/
  auth/                 # login, register, logout, token refresh
  short-urls/           # CRUD short URL, hooks, services
components/             # UI components ร่วม
lib/                    # API client, auth helpers
providers/              # React Query provider
middleware.ts           # ป้องกัน route ที่ต้อง login
```
