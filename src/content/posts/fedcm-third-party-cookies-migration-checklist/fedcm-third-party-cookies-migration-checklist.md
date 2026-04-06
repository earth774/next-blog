---
title: "FedCM + Third-party Cookies Migration Checklist"
date: "2026-04-06"
excerpt: "เช็กลิสต์ย้าย sign-in / identity ออกจาก third-party cookies ไปสู่ FedCM และแนวทางที่เบราว์เซอร์รองรับ — ตั้งแต่สำรวจความเสี่ยง ไปจนถึง rollout และ monitoring"
---

เบราว์เซอร์หลักกำลังจำกัด third-party cookies มากขึ้นเรื่อย ๆ ซึ่งกระทบ flow ที่เคยพึ่ง iframe, redirect ข้ามโดเมน หรือ cookie จาก Identity Provider (IdP) โดยตรง บทความนี้รวมเช็กลิสต์แบบใช้งานจริงสำหรับทีมที่กำลังย้าย sign-in และ identity โดยไม่พยายาม “ทำนายวันที่” แบบตายตัว — **ควรตรวจ timeline ล่าสุดจาก Chrome และผู้ให้บริการ identity ที่คุณใช้อยู่เป็นประจำ** เพราะรายละเอียด rollout อาจเปลี่ยนตามช่องทางประกาศอย่างเป็นทางการ

---

## สิ่งที่กำลังเปลี่ยน (และทำไม FedCM ถึงเกี่ยวข้อง)

- **Third-party cookie phaseout (Chrome และแนวโน้มใน ecosystem)**  
  Cookie ที่ถูกส่งในบริบท “บุคคลที่สาม” (เช่น iframe จากโดเมน IdP บนเว็บ Relying Party) อาจถูกบล็อกหรือจำกัด ทำให้ session แบบเดิมที่พึ่ง cookie ข้ามไซต์หยุดทำงานตามที่เคยคุ้น

- **FedCM (Federated Credential Management)**  
  เป็น API ของเว็บที่ช่วยให้การ sign-in แบบ federated (เช่น “Sign in with …”) ทำงานผ่าน flow ที่เบราว์เซอร์เป็นตัวกลาง ลดการพึ่งพา third-party cookies ในบางรูปแบบ และช่วยให้ UX/ความเป็นส่วนตัวจัดการได้ชัดขึ้นเมื่อเทียบกับ trick เก่า ๆ  
  **หมายเหตุ:** FedCM ไม่ใช่ “ปุ่มเดียวแก้ทุกอย่าง” — ต้องสอดคล้องกับ IdP, client config, และนโยบายเบราว์เซอร์ในแต่ละช่วง

- **สิ่งที่ควรจำ**  
  - ตรวจเอกสารและ changelog ของ **Chrome**, **IdP ที่ใช้** (Auth0, Google, Okta, ฯลฯ), และ **SDK** ในโปรเจกต์  
  - แยกให้ชัดว่า flow ไหนใช้ **first-party** (โดเมนของคุณ) กับ **third-party** (โดเมนอื่น) จริง ๆ

---

## ข้อกำหนดเบื้องต้นและการประเมินความเสี่ยง

ก่อนลงมือ refactor ให้ทีมตอบคำถามเหล่านี้ให้ครบ (ใช้เป็น “gate” ก่อนเริ่ม sprint ใหญ่)

### ความพร้อมของทีมและระบบ

- [ ] มีรายการ **ทุกจุดที่ใช้ OAuth/OIDC/SAML** และ URL callback ที่เกี่ยวข้อง
- [ ] รู้ว่าแต่ละ flow ใช้ **popup, redirect, silent iframe, หรือ refresh token** อย่างไร
- [ ] มี **staging** ที่จำลองการบล็อก third-party cookies ได้ (เช่น เปิดฟีเจอร์ทดลองใน Chrome ตามคู่มือล่าสุด หรือใช้โปรไฟล์ทดสอบ)
- [ ] มี **contact กับผู้ให้บริการ IdP** หรือเอกสาร migration ที่เป็นทางการของ SDK

### ประเมินความเสี่ยงต่อธุรกิจ

- [ ] ระบุ **user journeys ที่ revenue / compliance สูง** (checkout, B2B login, admin)
- [ ] ประเมินจำนวนผู้ใช้บน **เบราว์เซอร์/เวอร์ชัน** ที่อาจได้รับผลก่อน (ใช้ analytics ของคุณเอง ไม่เดาจากตัวเลขกลาง)
- [ ] วางแผน **rollback**: feature flag, ปิด FedCM experimental path, หรือ fallback ที่ยอมรับได้ทางผลิตภัณฑ์ (ถ้ามี)

### กฎหมายและนโยบาย

- [ ] ทวน **privacy policy / consent** ว่ายังสอดคล้องกับวิธีเก็บ session ใหม่หรือไม่
- [ ] ถ้ามี **ลูกค้าองค์กร** แจ้งล่วงหน้าว่ามีการเปลี่ยน domain / cookie behavior

---

## เช็กลิสต์ migration แบบเป็นขั้นตอน

### 1) Discovery — สำรวจให้ครบก่อนแตะโค้ด

- [ ] สแกน repo หา **client_id**, **authority**, **issuer**, iframe ไปยังโดเมน login
- [ ] ใช้ DevTools (Application → Cookies, Network) ยืนยันว่า cookie ใดเป็น **third-party** จริง
- [ ] จัดทำ **แผนผัง flow**: จุดเริ่ม → redirect → callback → token storage
- [ ] อ่าน migration guide ของ SDK (เช่น MSAL, Auth0 SPA, Google Identity Services) — **เวอร์ชันที่ lock ไว้ใน lockfile อาจไม่รองรับ path ใหม่**

### 2) Implementation — ออกแบบให้ “first-party first”

- [ ] ให้ **token/session หลัก** อยู่ในโดเมนของแอป (first-party) ตามที่สถาปัตยกรรมอนุญาต
- [ ] อัปเดต SDK และ config ตามคำแนะนำของ IdP สำหรับ **FedCM / การไม่พึ่ง third-party cookie**
- [ ] ตั้งค่า **Content-Security-Policy**, **COOP/COEP** (ถ้าเกี่ยวข้อง) ไม่ให้บล็อก flow ใหม่โดยไม่ตั้งใจ
- [ ] ตรวจ **SameSite**, **Secure**, **Path** ของ cookie ที่คุณควบคุมเอง
- [ ] สำหรับ embedded experience (widget ในไซต์อื่น): แยกประเด็น — อาจต้อง **Breakout เป็น redirect ไป first-party** แทน silent iframe

### 3) Testing — อย่าให้ production เป็นที่ทดสอบแรก

- [ ] ทดสอบบน **Chrome stable + beta** และเบราว์เซอร์หลักอื่นที่ผู้ใช้ใช้จริง
- [ ] ทดสอบ **ล็อกอินครั้งแรก, ล็อกอินซ้ำ, ล็อกเอาต์, session หมดอายุ, หลายแท็บ**
- [ ] ทดสอบ **private/incognito** และโปรไฟล์ที่ปิด third-party cookies
- [ ] ทดสอบบน **มือถือ** (WebView ในแอปฝั่งลูกค้าอาจต่างจาก Chrome เต็มรูปแบบ)
- [ ] บันทึก **HAR / video** ของ flow ที่ fail เพื่อเปรียบเทียบกับของเดิม

### 4) Rollout — ค่อยเป็นค่อยไป

- [ ] ใช้ **feature flag** แยกเปอร์เซ็นต์ผู้ใช้หรือแยก tenant (ถ้ามีระบบรองรับ)
- [ ] มี **ช่องทาง support** รับเคส “ล็อกอินไม่ได้” พร้อมขั้นตอนเก็บ log ที่ไม่รั่ว PII
- [ ] แผนสื่อสารภายใน (CS, success, account manager) ว่ามีหน้าต่างเปลี่ยนแปลง

### 5) Monitoring — หลัง deploy ไม่ใช่จุดจบ

- [ ] ตั้ง **metric**: อัตรา success ของ login, error code จาก IdP, latency ของ redirect
- [ ] แยก **dimension** ตาม browser, OS, region (ตามที่ privacy policy อนุญาต)
- [ ] Alert เมื่อ error ประเภท **CORS, CSP, invalid client, consent ถูกปฏิเสธ** พุ่งผิดปกติ
- [ ] ทบทวนรายเดือน: ตรวจ timeline ล่าสุดจาก Chrome/ผู้ให้บริการ และอัปเดตเช็กลิสต์นี้

---

## กับดักที่พบบ่อยและแนวทางลดความเสี่ยง

| กับดัก | แนวทางเบื้องต้น |
|--------|------------------|
| คิดว่า “แค่อัปเดต library แล้วจบ” | อ่าน breaking changes และทดสอบ flow จริงบนสภาพแวดล้อมที่บล็อก third-party cookie |
| Silent renew / iframe ที่เคย work | วางทางเลือกเป็น **redirect หรือ refresh แบบ first-party** ตามที่ IdP รองรับ |
| Popup ถูกบล็อก | มี **fallback เป็น full-page redirect** และข้อความช่วยผู้ใช้เมื่อ popup fail |
| CSP ที่เข้มเกินไป | ทดสอบรายการ `connect-src`, `frame-src` กับ endpoint ใหม่ของ FedCM/IdP |
| ลืม **logout ข้ามโดเมน** | นิยามให้ชัดว่า “ล็อกเอาต์” หมายถึงอะไรในแต่ละโดเมน และทดสอบซ้ำ |
| WebView / in-app browser | แยกเคสทดสอบ — พฤติกรรมอาจไม่เท่ากับ Chrome desktop |

---

## Go-live checklist (สั้น ๆ ก่อนปล่อย production)

- [ ] Discovery ครบ: มีเอกสาร flow + รายการ third-party cookie ที่ยืนยันแล้ว
- [ ] Implementation ตรงกับ **เอกสารล่าสุด** ของ IdP และเวอร์ชัน SDK ที่ deploy จริง
- [ ] ทดสอบผ่านบน Chrome พร้อมสถานะ **จำกัด third-party cookies** ตามวิธีทดสอบที่ทีมกำหนด
- [ ] CSP / CORS / redirect URI บน production **ตรงกับ staging**
- [ ] Feature flag และแผน rollback พร้อม
- [ ] Dashboard + alert สำหรับอัตราล็อกอินล้มเหลว
- [ ] ทีม support รู้วิธี escalate และมี template คำถามเพื่อเก็บข้อมูล debug

---

## สรุป

การย้ายออกจาก third-party cookies เป็นงานข้ามทีม: เว็บแอป, identity provider, และบางครั้งแอปมือถือ ใช้เช็กลิสต์นี้เป็นโครง แล้วเติมรายละเอียดให้ตรงกับสแต็กของคุณ **อย่าอ้างอิง “กำหนดการในอดีต” จากบทความทั่วไป** — ให้ยึดแหล่งทางการและข้อมูล analytics ของคุณเองเป็นหลัก จะได้วางแผน rollout ได้แม่นขึ้นโดยไม่ต้องตื่นตระหนกเกินจริง
