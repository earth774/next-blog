---
title: "Nestjs Queue"
date: "2025-08-17"
---

บทความนี้จะพาไปเรียนรู้วิธีการใช้งาน Queue ใน NestJS โดยใช้ Bull และ Redis เพื่อจัดการงานแบบ asynchronous อย่างมีประสิทธิภาพ ตั้งแต่การติดตั้ง Redis, การตั้งค่าโปรเจค NestJS, การติดตั้งแพ็กเกจที่จำเป็น ไปจนถึงการสร้างและใช้งาน queue พร้อมตัวอย่างโค้ดจริง เหมาะสำหรับผู้ที่ต้องการเพิ่มความสามารถในการประมวลผลงานแบบ background หรือ job processing ให้กับแอปพลิเคชันของตนเอง

# ติดตั้ง redis

```bash
docker run --name redis -d -p 6379:6379 redis
```

# ติดตั้ง nestjs-queue

```bash
nest new nestjs-queue
```

# ติดตั้ง package

```bash
npm i @nestjs/bull bull ioredis

npm i -D @types/bull

npm i @nestjs/config

# ติดตั้ง ui เพื่อ monitor queue
npm i @bull-board/api @bull-board/express

```

# สร้างโครงสร้างโปรเจค

```text
src/
  app.module.ts
  main.ts
  queues/
    email/
      email.module.ts
      email.processor.ts
      email.producer.ts
      email.controller.ts
```

# ตั้งค่า Bull + คิว email

```text
src/app.module.ts
```

โค้ดตัวอย่างนี้เป็นการตั้งค่า Bull queue ใน NestJS เพื่อใช้งานกับ Redis และแยกโมดูลสำหรับ email queue อย่างเป็นระบบ โดยมีรายละเอียดดังนี้

- **นำเข้าโมดูลที่จำเป็น**

  - `@nestjs/common` สำหรับประกาศโมดูลหลัก
  - `@nestjs/config` สำหรับจัดการ environment variables และ config
  - `@nestjs/bull` สำหรับเชื่อมต่อและจัดการ Bull queue
  - `./queues/email/email.module` โมดูลย่อยสำหรับ email queue

- **AppModule**

  - ใช้ `ConfigModule.forRoot({ isGlobal: true })` เพื่อให้ config ใช้งานได้ทั่วแอป
  - ใช้ `BullModule.forRootAsync` เพื่อกำหนดค่าเชื่อมต่อ Redis แบบ dynamic จาก environment variables
    - กำหนด host, port, password ของ Redis โดยดึงค่าจาก `ConfigService`
    - สามารถกำหนด `prefix` เพื่อป้องกันคิวชนกันข้ามโปรเจกต์ (คอมเมนต์ไว้)
    - ตั้งค่า `defaultJobOptions`
      - `removeOnComplete: 1000` ลบ job ที่สำเร็จ เก็บประวัติไว้ 1000 รายการ
      - `removeOnFail: false` ไม่ลบ job ที่ล้มเหลว
  - นำเข้า `EmailModule` เพื่อแยก logic ของ email queue ออกเป็นสัดส่วน

- **สรุปข้อดี**
  - แยก concerns ชัดเจน ดูแลและขยายระบบได้ง่าย
  - ปรับ config ได้จาก environment variables รองรับหลาย environment
  - ตั้งค่า Bull queue อย่างปลอดภัยและมีประสิทธิภาพ

**ตัวอย่างโครงสร้างการตั้งค่า Bull + Email Queue ใน NestJS**

```ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { EmailModule } from "./queues/email/email.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST", "localhost"),
          port: parseInt(config.get("REDIS_PORT", "6379"), 10),
          password: config.get("REDIS_PASSWORD") || undefined,
        },
        // prefix: 'myapp', // ป้องกันคิวชนกันข้ามโปรเจ็กต์
        defaultJobOptions: {
          removeOnComplete: 1000, // ลบ job ที่สำเร็จ เก็บประวัติไว้ 1000 รายการ
          removeOnFail: false,
        },
      }),
      inject: [ConfigService],
    }),
    EmailModule,
  ],
})
export class AppModule {}
```

```text
src/queues/email/email.module.ts
```

```ts
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { EmailProcessor } from "./email.processor";
import { EmailProducer } from "./email.producer";
import { EmailController } from "./email.controller";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "email",
    }),
  ],
  providers: [EmailProcessor, EmailProducer],
  controllers: [EmailController],
  exports: [EmailProducer],
})
export class EmailModule {}
```

```text
src/queues/email/email.producer.ts
```

// อธิบายโค้ด `email.producer.ts` (EmailProducer) แบบ bullet point

- **หน้าที่หลัก:**

  - เป็น Service สำหรับ enqueue งาน (job) ลงใน Bull queue ชื่อ `email`
  - แยก logic การสร้าง job แต่ละประเภท เช่น welcome email, newsletter, cron job

- **โครงสร้างและการใช้งาน:**

  - ใช้ `@Injectable()` เพื่อให้ NestJS จัดการ dependency injection
  - ใช้ `@InjectQueue("email")` เพื่อดึง queue ที่ชื่อว่า `email` มาใช้งาน
  - มีการสร้าง logger (`Logger`) สำหรับ debug/logging

- **เมธอดหลัก:**

  - `enqueueWelcomeEmail(userId: string)`
    - สร้าง job ชื่อ `welcome` พร้อมข้อมูล `userId`
    - กำหนด retry 5 ครั้ง, backoff แบบ exponential, priority สูง, timeout 60 วินาที
    - ใช้สำหรับส่งอีเมลต้อนรับผู้ใช้ใหม่
  - `enqueueBulkNewsletter(batchId: string)`
    - สร้าง job ชื่อ `newsletter` พร้อมข้อมูล `batchId`
    - retry 3 ครั้ง, backoff แบบ fixed, กำหนด jobId เพื่อป้องกัน enqueue ซ้ำ
    - ใช้สำหรับส่ง newsletter แบบ batch
  - `ensureReportCron()`
    - สร้าง job แบบ repeat (cron) ทุก 5 นาที
    - jobId คงที่เพื่อไม่สร้างซ้ำ
    - ใช้สำหรับงาน background ที่ต้องรันซ้ำ ๆ เช่น daily report

- **ข้อดีของการแยก Producer:**
  - ทำให้ controller/service อื่น ๆ เรียกใช้งาน queue ได้ง่ายและปลอดภัย
  - สามารถกำหนด options ของแต่ละ job ได้ละเอียด (retry, priority, backoff ฯลฯ)
  - รองรับการขยายประเภท job ในอนาคต

```ts
import { Injectable, Logger } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class EmailProducer {
  private readonly logger = new Logger(EmailProducer.name);

  constructor(@InjectQueue("email") private readonly emailQueue: Queue) {}

  async enqueueWelcomeEmail(userId: string) {
    this.logger.log(`Enqueue welcome email for user ${userId}`);
    return this.emailQueue.add(
      "welcome",
      { userId },
      {
        attempts: 5,
        backoff: { type: "exponential", delay: 5000 },
        priority: 2, // ยิ่งตัวเลขน้อยยิ่งสำคัญ (Bull v3: 1 สูงสุด)
        timeout: 60_000,
      }
    );
  }

  async enqueueBulkNewsletter(batchId: string) {
    return this.emailQueue.add(
      "newsletter",
      { batchId },
      {
        attempts: 3,
        backoff: { type: "fixed", delay: 3000 },
        jobId: `newsletter:${batchId}`, // กัน enqueue ซ้ำ
      }
    );
  }

  // ตัวอย่าง job แบบซ้ำ ๆ (cron ทุก 5 นาที)
  async ensureReportCron() {
    return this.emailQueue.add(
      "daily-report",
      {},
      {
        repeat: { cron: "*/5 * * * *" },
        jobId: "daily-report-cron",
      }
    );
  }
}
```

```text
src/queues/email/email.processor.ts
```

// อธิบายโค้ด `email.processor.ts` (EmailProcessor) พร้อม bullet point

- **หน้าที่หลัก:**

  - เป็น Processor สำหรับประมวลผลงาน (job) ที่ถูก enqueue ใน Bull queue ชื่อ `email`
  - แยก handler สำหรับแต่ละประเภท job เช่น welcome email, newsletter, และ cron job

- **โครงสร้างและการใช้งาน:**

  - ใช้ `@Processor("email")` เพื่อระบุว่า class นี้จะประมวลผล queue ชื่อ `email`
  - ใช้ `@Process` เพื่อกำหนด handler ของแต่ละ job type
    - สามารถกำหนด `concurrency` เพื่อควบคูณจำนวน job ที่ประมวลผลพร้อมกัน
  - ใช้ `Logger` สำหรับ logging/debugging

- **เมธอดหลัก:**

  - `handleWelcome`
    - ประมวลผล job ชื่อ `welcome`
    - รับข้อมูล `{ userId }`
    - mock การส่งอีเมล (สามารถเปลี่ยนเป็นบริการจริงได้)
    - รองรับการประมวลผลพร้อมกันสูงสุด 5 job
  - `handleNewsletter`
    - ประมวลผล job ชื่อ `newsletter`
    - รับข้อมูล `{ batchId }`
    - mock การส่ง newsletter
  - `handleDailyReport`
    - ประมวลผล job ชื่อ `daily-report`
    - ใช้สำหรับงาน background ที่ต้องรันซ้ำ ๆ (เช่น รายงานประจำวัน)

- **Event Hooks:**

  - `@OnQueueActive` — เรียกเมื่อ job เริ่มประมวลผล
  - `@OnQueueCompleted` — เรียกเมื่อ job สำเร็จ
  - `@OnQueueFailed` — เรียกเมื่อ job ล้มเหลว
  - ช่วยในการ debug และ monitor สถานะของ job

- **ข้อดีของการแยก Processor:**
  - ทำให้ logic การประมวลผลแต่ละประเภท job แยกกันชัดเจน
  - รองรับการขยายประเภท job ในอนาคตได้ง่าย
  - สามารถเพิ่ม event hooks เพื่อ monitor หรือแจ้งเตือนเมื่อเกิด error ได้สะดวก

```ts
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from "@nestjs/bull";
import { Job } from "bull";
import { Logger } from "@nestjs/common";

@Processor("email")
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  // ประมวลผล welcome email (ทำพร้อมกันสูงสุด 5 job)
  @Process({ name: "welcome", concurrency: 5 })
  async handleWelcome(job: Job<{ userId: string }>) {
    this.logger.log(
      `[welcome] user=${job.data.userId} attempt=${job.attemptsMade + 1}`
    );
    // mock ส่งอีเมล (แทนที่ด้วยบริการจริง SendGrid/SES/etc.)
    await new Promise((r) => setTimeout(r, 1500));
    // ถ้าอยาก fail ลองโยน error:
    // if (Math.random() < 0.1) throw new Error('random fail');
    return { ok: true };
  }

  @Process("newsletter")
  async handleNewsletter(job: Job<{ batchId: string }>) {
    this.logger.log(`[newsletter] batch=${job.data.batchId}`);
    await new Promise((r) => setTimeout(r, 2000));
    return { sent: 1234 };
  }

  @Process("daily-report")
  async handleDailyReport(job: Job) {
    this.logger.log(`[daily-report] generating ...`);
    await new Promise((r) => setTimeout(r, 1000));
    return { reportId: Date.now() };
  }

  // Events ช่วยดีบัก/มอนิเตอร์
  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Job ${job.id} is active [${job.name}]`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    this.logger.debug(`Job ${job.id} completed → ${JSON.stringify(result)}`);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    this.logger.error(`Job ${job.id} failed: ${err.message}`, err.stack);
  }
}
```

```text
src/queues/email/email.controller.ts
```

// อธิบายโค้ด `email.controller.ts` (EmailController) พร้อม bullet point

- **หน้าที่หลัก:**

  - เป็น Controller สำหรับจัดการการเรียกใช้งาน queue จากภายนอก
  - มี endpoint สำหรับส่งงานไปยัง queue ต่าง ๆ

- **โครงสร้างและการใช้งาน:**

  - ใช้ `@Controller("email")` เพื่อระบุว่า class นี้จะเป็น controller สำหรับ email queue
  - ใช้ `@Post` เพื่อกำหนด endpoint สำหรับส่งงานไปยัง queue
  - มี constructor สำหรับ inject `EmailProducer` เพื่อใช้งาน

- **เมธอดหลัก:**

  - `welcome`

    - ส่งงาน welcome email ไปยัง queue
    - รับ `userId` จาก parameter ของ endpoint
    - เรียกใช้ `enqueueWelcomeEmail` จาก `EmailProducer`

  - `newsletter`

    - ส่งงาน newsletter ไปยัง queue
    - รับ `batchId` จาก parameter ของ endpoint
    - เรียกใช้ `enqueueBulkNewsletter` จาก `EmailProducer`

  - `ensureReport`
    - ส่งงาน cron job ไปยัง queue
    - เรียกใช้ `ensureReportCron` จาก `EmailProducer`

- **ข้อดีของการแยก Controller:**
  - ทำให้ logic การเรียกใช้งาน queue แยกกันชัดเจน
  - รองรับการขยายประเภท job ในอนาคตได้ง่าย
  - สามารถเพิ่มการตรวจสอบสิทธิ์ หรือการจัดการ error ได้ง่าย

```ts
import { Controller, Param, Post } from "@nestjs/common";
import { EmailProducer } from "./email.producer";

@Controller("email")
export class EmailController {
  constructor(private readonly producer: EmailProducer) {}

  // POST /email/welcome/123
  @Post("welcome/:userId")
  async welcome(@Param("userId") userId: string) {
    const job = await this.producer.enqueueWelcomeEmail(userId);
    return { enqueued: true, jobId: job.id };
  }

  // POST /email/newsletter/batch-001
  @Post("newsletter/:batchId")
  async newsletter(@Param("batchId") batchId: string) {
    const job = await this.producer.enqueueBulkNewsletter(batchId);
    return { enqueued: true, jobId: job.id };
  }

  // POST /email/report/ensure
  @Post("report/ensure")
  async ensureReport() {
    await this.producer.ensureReportCron();
    return { ok: true };
  }
}
```

```text
src/main.ts
```

// อธิบายโค้ดใน `src/main.ts` และสรุปเป็น bullet ที่อ่านง่าย

**อธิบายโค้ด `src/main.ts`:**

- **นำเข้าโมดูลที่จำเป็น**

  - `NestFactory` สำหรับสร้าง NestJS application instance
  - `AppModule` คือ root module ของแอป
  - `createBullBoard`, `ExpressAdapter`, `BullAdapter` สำหรับตั้งค่า bull-board UI
  - `getQueueToken` สำหรับดึง queue instance จาก NestJS DI

- **ฟังก์ชัน `bootstrap`**
  - สร้างแอป NestJS ด้วย `AppModule`
  - สร้าง bull-board dashboard ด้วย `ExpressAdapter` และตั้ง path เป็น `/queues`
  - ดึง queue ที่ชื่อ `"email"` จาก DI container
  - สร้าง bull-board dashboard โดยผูก queue ที่ต้องการ monitor
  - นำ bull-board router ไปผูกกับ Express instance ที่ path `/queues`
  - สั่งให้แอปรันที่ port 3000

**สรุปขั้นตอนการทำงาน:**

- 🚀 สร้าง NestJS app ด้วย `AppModule`
- 📨 ดึง queue ที่ต้องการ monitor (เช่น `"email"`)
- 📊 ตั้งค่า bull-board dashboard สำหรับดูสถานะ queue
- 🔗 ผูก bull-board dashboard เข้ากับ Express ที่ path `/queues`
- 🟢 รันแอปที่ `http://localhost:3000`
- 👀 สามารถเปิดหน้า monitor queue ได้ที่ `http://localhost:3000/queues`

**ข้อดีของการตั้งค่า bull-board:**

- ดูสถานะ job ใน queue ได้แบบ real-time
- สามารถ retry, remove, หรือดูรายละเอียด job ได้จาก UI
- เหมาะสำหรับ dev และ ops ในการ debug หรือ monitor ระบบ queue

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { getQueueToken } from "@nestjs/bull";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // bull-board
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/queues");

  const emailQueue = app.get(getQueueToken("email"));

  createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter,
  });

  const express = app.getHttpAdapter().getInstance();
  express.use("/queues", serverAdapter.getRouter());

  await app.listen(3000);
}
bootstrap();
```

# เปิดดูหน้า monitor queue

```bash
http://localhost:3000/queues
```

# ทดสอบการทำงาน

```bash
curl -X POST http://localhost:3000/email/welcome/123

curl -X POST http://localhost:3000/email/newsletter/batch-001

curl -X POST http://localhost:3000/email/report/ensure
```

# สรุป

สรุปเนื้อหาสำคัญจากบทความนี้

- อธิบายการใช้งาน Bull Queue ร่วมกับ NestJS เพื่อจัดการงานแบบ asynchronous และ background jobs ได้อย่างมีประสิทธิภาพ
- แนะนำการติดตั้ง bull-board สำหรับ monitoring และจัดการ queue ผ่านหน้าเว็บ UI
- สามารถนำไปประยุกต์ใช้กับงานที่ต้องการความน่าเชื่อถือและการประมวลผลเบื้องหลัง เช่น การส่งอีเมล หรือประมวลผลข้อมูลขนาดใหญ่
- ควรให้ความสำคัญกับการจัดการ error และการ scaling queue worker เพื่อรองรับการใช้งานใน production อย่างเหมาะสม

## ตัวอย่างโค้ดและโปรเจกต์ตัวอย่าง

สามารถดูตัวอย่างโค้ดและโปรเจกต์เต็มได้ที่ GitHub:
[https://github.com/earth774/nestjs-queue-email](https://github.com/earth774/nestjs-queue-email)
