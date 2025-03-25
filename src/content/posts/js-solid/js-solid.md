---
title: "เขียนโค้ดด้วยหลักการ SOLID ด้วย JavaScript"
date: "2025-03-25"
---

“SOLID คือชุดของหลักการในการออกแบบซอฟต์แวร์ เพื่อให้โค้ดมีโครงสร้างที่ดี ยืดหยุ่น และดูแลรักษาได้ง่าย โดยเฉพาะเมื่อโปรเจกต์เติบโตขึ้น”

## SOLID ย่อมาจาก

- **S** – Single Responsibility Principle
- **O** – Open/Closed Principle
- **L** – Liskov Substitution Principle
- **I** – Interface Segregation Principle
- **D** – Dependency Inversion Principle

## 1. Single Responsibility Principle (SRP)

**“คลาส (หรือฟังก์ชัน) ควรมีเหตุผลในการเปลี่ยนแปลงเพียงอย่างเดียว”**

❌ ไม่ดี:

```js
class User {
  saveToDatabase() { ... }
  sendEmail() { ... }
}
```

✅ ดี:

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) { ... }
}

class EmailService {
  sendWelcomeEmail(user) { ... }
}
```

แยกความรับผิดชอบ: User เป็นข้อมูล, UserRepository จัดการฐานข้อมูล, EmailService ส่งอีเมล

## 2. Open/Closed Principle (OCP)

**“เปิดสำหรับการขยาย แต่ปิดสำหรับการแก้ไข”**

❌ ไม่ดี:

```js
function getDiscount(type) {
  if (type === "gold") return 0.2;
  if (type === "silver") return 0.1;
  return 0;
}
```

✅ ดี:

```js
class Discount {
  getRate() {
    return 0;
  }
}

class GoldDiscount extends Discount {
  getRate() {
    return 0.2;
  }
}

class SilverDiscount extends Discount {
  getRate() {
    return 0.1;
  }
}
```

เราสามารถเพิ่ม PlatinumDiscount ได้โดยไม่ต้องแก้โค้ดเดิม

## 3. Liskov Substitution Principle (LSP)

**“สามารถแทนที่คลาสแม่ด้วยคลาสลูกได้ โดยไม่ทำให้โปรแกรมพัง”**

❌ ไม่ดี:

```js
class Bird {
  fly() {
    console.log("flying");
  }
}

class Ostrich extends Bird {
  fly() {
    throw new Error("I can't fly");
  }
}
```

✅ ดี:

```js
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("flying");
  }
}

class Ostrich extends Bird {
  // ไม่สืบทอดฟังก์ชันที่ทำไม่ได้
}
```

อย่าสืบทอดพฤติกรรมที่คลาสลูกทำไม่ได้

## 4. Interface Segregation Principle (ISP)

**“อย่าบังคับให้คลาสลูกต้องใช้ interface ที่มันไม่ต้องการ”**
(ใน JavaScript ไม่มี interface แบบใน TypeScript หรือ Java, แต่แนวคิดยังใช้ได้)

❌ ไม่ดี:

```js
class Machine {
  print() {}
  scan() {}
  fax() {}
}

class PrinterOnly extends Machine {
  scan() {
    throw new Error("Not supported");
  }
  fax() {
    throw new Error("Not supported");
  }
}
```

✅ ดี:

```js
class Printer {
  print() {}
}

class Scanner {
  scan() {}
}
```

แยก interface ตามความสามารถจริง

## 5. Dependency Inversion Principle (DIP)

**“พึ่งพา abstraction ไม่ใช่ implementation”**

❌ ไม่ดี:

```js
class MySQLDatabase {
  save(data) { ... }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase();
  }
}
```

✅ ดี:

```js
class UserService {
  constructor(database) {
    this.database = database;
  }

  saveUser(user) {
    this.database.save(user);
  }
}

// ใช้งาน
const db = new MySQLDatabase();
const userService = new UserService(db);
```

ทำให้เปลี่ยน database เป็น MongoDB หรือ Mock สำหรับเทสต์ได้ง่าย

## 📌 สรุป

| หลักการ                               | คำอธิบาย                                                |
| ------------------------------------- | ------------------------------------------------------- |
| Single Responsibility Principle (SRP) | คลาสควรมีเหตุผลในการเปลี่ยนแปลงเพียงอย่างเดียว          |
| Open/Closed Principle (OCP)           | เปิดสำหรับการขยาย แต่ปิดสำหรับการแก้ไข                  |
| Liskov Substitution Principle (LSP)   | สามารถแทนที่คลาสแม่ด้วยคลาสลูกได้ โดยไม่ทำให้โปรแกรมพัง |
| Interface Segregation Principle (ISP) | อย่าบังคับให้คลาสลูกต้องใช้ interface ที่มันไม่ต้องการ  |
| Dependency Inversion Principle (DIP)  | พึ่งพา abstraction ไม่ใช่ implementation                |
