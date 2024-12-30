---
title: "Clear Cache DNS Mac"
date: "2024-12-30"
---

ตัวนี้ขอเอามาเขียนสั้นๆ ไว้ในบทความนี้หน่อยละ เพราะตอนย้าย blog จากเดิมที่เป็น wordpress มา nextjs ติดปัญหาเรื่องเปิดเว็บไม่ได้เพราะ
cache ของ dns ทำให้ไม่สามารถเข้าถึงได้ ตอนนี้ก็ลองทำตามนี้ดูครับถ้าใครใช้ mac 

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
