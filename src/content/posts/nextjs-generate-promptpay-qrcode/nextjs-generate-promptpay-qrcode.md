---
title: "NextJS Generate PromptPay QR Code"
date: "2025-02-23"
---

ได้ลองใช้งาน PromptPay มาหลายปีแล้ว ยังไม่เคยลองสร้าง QR Code ด้วย PromptPay มาเลย จะลองสร้าง QR Code ด้วย PromptPay ด้วย NextJS ดูครับ

## สร้าง PromptPay QR Code ด้วย NextJS

```bash
npx create-next-app@latest nextjs-generate-promptpay-qrcode
```

## ติดตั้ง Library

```bash
npm install promptpay-qr qrcode

npm install @types/node --save-dev
```

## สร้าง Component สำหรับสร้าง PromptPay QR Code

`src/app/components/PromptPayQR.tsx`

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { generatePromptPayQR } from "@/lib/generatePromptPayQR";

const PromptPayQR = () => {
  const [id, setId] = useState("0864280331");
  const [amount, setAmount] = useState<number | null>(50);
  const [qrData, setQrData] = useState<string>("");

  // Generate QR Code when id or amount changes
  useEffect(() => {
    const fetchQR = async () => {
      const qr = await generatePromptPayQR(id, amount);
      setQrData(qr);
    };

    fetchQR();
  }, [id, amount]);

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-xl font-bold mb-4">PromptPay QR Code Generator</h2>

      {/* Toggle between Phone Number & National ID */}
      <label className="flex flex-col gap-2">
        <span>Enter PromptPay ID (Phone or National ID)</span>
        <span>Can you support me with QRCODE</span>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="0864280331 or 1234567890123"
          className="border p-2 rounded w-64 text-center"
        />
      </label>

      {/* Amount Input */}
      <label className="flex flex-col gap-2 mt-3">
        <span>Enter Amount (optional)</span>
        <input
          type="number"
          value={amount ?? ""}
          onChange={(e) =>
            setAmount(e.target.value ? parseFloat(e.target.value) : null)
          }
          placeholder="Amount in THB"
          className="border p-2 rounded w-64 text-center"
        />
      </label>

      {/* Render QR Code */}
      <div className="mt-4">
        {qrData ? (
          <img
            src={qrData}
            alt="QR Code"
            className="border rounded-md shadow-md"
          />
        ) : (
          <p>Generating QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default PromptPayQR;
```

## สร้าง lib สำหรับสร้าง PromptPay QR Code

`src/lib/generatePromptPayQR.ts`

```ts
import promptpay from "promptpay-qr";
import QRCode from "qrcode";

/**
 * Generate a PromptPay QR Code
 * @param {string} id - Phone number (0812345678) or National ID (1234567890123)
 * @param {number | null} amount - Optional amount to request (can be null)
 * @returns {Promise<string>} - QR Code Data URL
 */
export async function generatePromptPayQR(
  id: string,
  amount: number | null = null
): Promise<string> {
  try {
    // Generate QR Code payload
    console.log(id, amount);
    const qrPayload = promptpay(id, { amount: amount ?? 0 });

    // Convert to QR Code as a Data URL
    const qrDataURL = await QRCode.toDataURL(qrPayload, {
      errorCorrectionLevel: "H", // High error correction (to allow logos)
      scale: 10,
      margin: 1,
    });

    return qrDataURL;
  } catch (error) {
    console.error("Error generating QR Code:", error);
    throw error;
  }
}
```

## อัพเดตไฟล์ page.tsx

`src/app/page.tsx`

```tsx
import PromptPayQR from "./components/PromptPayQR";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <PromptPayQR />
    </div>
  );
}
```

## ทดสอบการทำงาน

```bash
npm run dev
```

## 💻 github

[nextjs-promptpay](https://github.com/earth774/nextjs-promptpay)

## 📝 Stack

- NextJS
- TailwindCSS
- TypeScript

## 📦 Library

- QRCode
- PromptPay

## 📌 สรุป

จากการทดสอบการสร้าง PromptPay QR Code ด้วย NextJS พบว่า การสร้าง QR Code ด้วย PromptPay สามารถทำได้ง่ายๆ โดยใช้ Library ที่มีอยู่แล้ว และ ใช้ Library ช่วยสร้าง QR Code ให้ง่ายขึ้น
