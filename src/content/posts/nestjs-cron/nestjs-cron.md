---
title: "Nestjs Cron"
date: "2025-08-24"
---

บทความนี้จะพาไปเรียนรู้วิธีการใช้งาน Cron ใน NestJS โดยใช้ @nestjs/cron เพื่อจัดการงานแบบ scheduled อย่างมีประสิทธิภาพ ตั้งแต่การติดตั้ง @nestjs/cron, การตั้งค่าโปรเจค NestJS, การติดตั้งแพ็กเกจที่จำเป็น ไปจนถึงการสร้างและใช้งาน cron พร้อมตัวอย่างโค้ดจริง เหมาะสำหรับผู้ที่ต้องการเพิ่มความสามารถในการประมวลผลงานแบบ scheduled ให้กับแอปพลิเคชันของตนเอง

# ติดตั้ง nestjs-cron

```bash
nest new nestjs-cron
```

# ติดตั้ง package

```bash
npm i @nestjs/schedule
```

# สร้างโครงสร้างโปรเจค

```text
src/
  app.module.ts
  main.ts
  jobs/
      jobs.module.ts
      jobs.controller.ts
      jobs.service.ts
```

# ตั้งค่า

```text
src/main.ts
```

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { JobsService } from "./jobs/jobs.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jobs = app.get(JobsService);

  // เพิ่ม cron แบบไดนามิก: ทุกนาที ณ เวลาเอเชีย/กรุงเทพ
  jobs.addCronJob("reportEveryMinute", "* * * * *", "Asia/Bangkok");

  await app.listen(3000);
}
bootstrap();
```

```text
src/app.module.ts
```

```ts
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { JobsModule } from "./jobs/jobs.module";

@Module({
  imports: [
    ScheduleModule.forRoot(), // เปิดระบบ scheduler ของ Nest
    JobsModule, // รวม cron jobs ของเรา
  ],
})
export class AppModule {}
```

```text
src/jobs/jobs.module.ts
```

```ts
import { Module } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
```

```text
src/jobs/jobs.service.ts
```

/\*\*

## อธิบายโค้ด jobs.service.ts (NestJS + @nestjs/schedule)

โค้ดนี้เป็นตัวอย่างการใช้งาน Scheduler ใน NestJS เพื่อจัดการงานที่ต้องรันตามเวลา (Cron, Interval, Timeout) และรองรับการสร้าง/ลบ/หยุด cron job แบบไดนามิก

### สรุปโครงสร้าง

- ใช้ `@Injectable()` เพื่อให้ class นี้ถูก inject ได้ในระบบ DI ของ NestJS
- ใช้ `Logger` สำหรับ log ข้อมูลต่าง ๆ
- Inject `SchedulerRegistry` เพื่อจัดการ job ที่รันอยู่ (เพิ่ม/ลบ/หยุด)

### ฟีเจอร์หลัก

1.  **Cron Job แบบ static**

-> ใช้ decorator `@Cron()` เพื่อกำหนดให้ method `handleHeartbeat` รันทุก 30 วินาที (ตาม timezone Asia/Bangkok)

-> เหมาะกับงานที่ต้องรันเป็นระยะ ๆ เช่น health check, sync ข้อมูล ฯลฯ

2.  **Interval Job**

-> ใช้ decorator `@Interval()` ให้ method `handleCleanup` รันทุก 5 นาที
-> เหมาะกับงานที่ต้องรันแบบ fixed delay เช่น cleanup, clear cache

3.  **Timeout Job**

-> ใช้ decorator `@Timeout()` ให้ method `seedOnce` รันครั้งเดียวหลังจากบูต 10 วินาที
-> เหมาะกับงานที่ต้องทำครั้งเดียว เช่น seed ข้อมูล, prime cache

4.  **Dynamic Cron Job**

`addCronJob(name, cronExpression, timeZone)` เพิ่ม cron job ใหม่ขณะรันระบบ (runtime)
ตรวจสอบก่อนว่ามี job ชื่อนี้อยู่แล้วหรือไม่
สร้าง `CronJob` ใหม่และเพิ่มเข้า `SchedulerRegistry`
เริ่ม job ทันที

- `stopCronJob(name)` หยุด job ชั่วคราว
- `deleteCronJob(name)` ลบ job ออกจากระบบ
- `listCronJobs()` คืนชื่อ cron jobs ทั้งหมดที่มีในระบบ

### จุดเด่น

- รองรับทั้ง static และ dynamic scheduling
- มีการ log ทุกขั้นตอนเพื่อ debug ได้ง่าย
- ใช้ type guard และ early return เพื่อป้องกัน error เช่น การเพิ่ม job ซ้ำชื่อ
- รองรับ timezone

### เหมาะกับงานแบบไหน?

- งานที่ต้องรันตามเวลาหรือเป็นระยะ ๆ (เช่น report, sync, health check)
- งานที่ต้องการเพิ่ม/ลบ/หยุด schedule ขณะระบบกำลังรัน (dynamic)

  ***

### อ้างอิง

- [NestJS Schedule Docs](https://docs.nestjs.com/techniques/task-scheduling)
- [node-cron](https://www.npmjs.com/package/cron)
  \*/

```ts
import { Injectable, Logger } from "@nestjs/common";
import {
  Cron,
  CronExpression,
  Interval,
  Timeout,
  SchedulerRegistry,
} from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  /**
   * รันทุก ๆ 30 วินาที (ตามเวลา Asia/Bangkok)
   * ใช้ชื่อ job = 'heartbeat'
   */
  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: "heartbeat",
    timeZone: "Asia/Bangkok",
  })
  handleHeartbeat() {
    // เขียน logic ที่อยากรันเป็นระยะ
    this.logger.debug("Heartbeat: ping…");
  }

  /**
   * ตัวอย่าง Interval – รันทุก 5 นาที
   * (เหมาะกับงานที่เป็น fixed delay)
   */
  @Interval("cleanup", 5 * 60 * 1000)
  handleCleanup() {
    this.logger.log("Cleanup running every 5 minutes");
    // … ทำความสะอาดแคช/ไฟล์/สเตตัส ฯลฯ
  }

  /**
   * ตัวอย่าง Timeout – รันครั้งเดียวหลังจากบูต 10 วินาที
   * (เหมาะกับงาน seed/prime cache ครั้งเดียว)
   */
  @Timeout("seedOnce", 10_000)
  seedOnce() {
    this.logger.warn("Seeding data once after app start");
    // … ทำงานครั้งเดียว
  }

  /**
   * ===== งานแบบไดนามิก (สร้าง/หยุด/ลบระหว่างรันได้) =====
   */

  // เพิ่ม cron job แบบกำหนด expression เอง
  addCronJob(name: string, cronExpression: string, timeZone = "Asia/Bangkok") {
    if (this.schedulerRegistry.doesExist("cron", name)) {
      this.logger.warn(`Cron job "${name}" already exists. Skipped.`);
      return;
    }

    const job = new CronJob(
      cronExpression,
      () => {
        this.logger.log(`[${name}] tick at ${new Date().toISOString()}`);
        // … ใส่ logic ของงานนี้
      },
      null,
      false, // start ตอนสร้างหรือไม่ (เราเลือก false ไว้ก่อน)
      timeZone
    );

    // To fix type incompatibility, cast job to 'any' when adding to schedulerRegistry
    this.schedulerRegistry.addCronJob(name, job as any);
    job.start();
    this.logger.log(
      `Added & started dynamic cron "${name}" (${cronExpression}, ${timeZone})`
    );
  }

  // หยุด job ชั่วคราว
  stopCronJob(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    job.stop();
    this.logger.warn(`Stopped cron "${name}"`);
  }

  // ลบ job ออกไปเลย
  deleteCronJob(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`Deleted cron "${name}"`);
  }

  // ดูรายการชื่อ cron ทั้งหมด
  listCronJobs(): string[] {
    const names = this.schedulerRegistry.getCronJobs().keys();
    return Array.from(names);
  }
}
```

```text
src/jobs/jobs.controller.ts
```

## อธิบายโค้ด JobsController

JobsController คือ NestJS Controller ที่ใช้จัดการและควบคุม dynamic cron jobs ผ่าน HTTP endpoint ต่าง ๆ โดยแต่ละ endpoint จะเรียกใช้เมธอดของ JobsService เพื่อดำเนินการกับ cron jobs ดังนี้

- `@Get('add/:name/:expr')`  
  สร้างและเริ่ม cron job ใหม่ตามชื่อ (`name`) และ cron expression (`expr`) ที่รับมาจาก URL parameter โดยจะเรียก `addCronJob` ของ JobsService ถ้าสร้างสำเร็จจะคืนชื่อ jobs ทั้งหมดกลับไป

- `@Get('stop/:name')`  
  หยุดการทำงานของ cron job ตามชื่อที่ระบุ โดยเรียก `stopCronJob` ของ JobsService

- `@Get('delete/:name')`  
  ลบ cron job ตามชื่อที่ระบุ โดยเรียก `deleteCronJob` ของ JobsService และคืนชื่อ jobs ที่เหลือกลับไป

- `@Get()`  
  คืนรายการชื่อ cron jobs ทั้งหมดที่มีอยู่ในระบบ

Controller นี้ช่วยให้สามารถจัดการ cron jobs ได้แบบ dynamic ผ่าน REST API เช่น การเพิ่ม, หยุด, ลบ, และดูรายการ jobs โดยไม่ต้องแก้ไขโค้ดหรือรีสตาร์ทเซิร์ฟเวอร์ เหมาะสำหรับงานที่ต้องการความยืดหยุ่นในการตั้งเวลาและควบคุม background jobs ในแอปพลิเคชัน NestJS

```ts
import { Controller, Get, Param } from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobs: JobsService) {}

  @Get("add/:name/:expr")
  add(@Param("name") name: string, @Param("expr") expr: string) {
    this.jobs.addCronJob(name, expr);
    return { ok: true, jobs: this.jobs.listCronJobs() };
  }

  @Get("stop/:name")
  stop(@Param("name") name: string) {
    this.jobs.stopCronJob(name);
    return { ok: true };
  }

  @Get("delete/:name")
  del(@Param("name") name: string) {
    this.jobs.deleteCronJob(name);
    return { ok: true, jobs: this.jobs.listCronJobs() };
  }

  @Get()
  list() {
    return this.jobs.listCronJobs();
  }
}
```

# ทดสอบการทำงาน

```bash
curl -X POST http://localhost:3000/jobs/add/heartbeat/0/0 * * * * *

curl -X POST http://localhost:3000/jobs/stop/heartbeat

curl -X POST http://localhost:3000/jobs/delete/heartbeat

curl -X POST http://localhost:3000/jobs/list
```

# สรุป

- NestJS Scheduler (`@nestjs/schedule`) ช่วยให้สามารถตั้งเวลา (Cron, Interval, Timeout) สำหรับรันงาน background ได้อย่างยืดหยุ่น
- สามารถกำหนด timezone, ตั้งชื่อ job, และควบคุมการทำงาน (เพิ่ม/หยุด/ลบ) job ได้แบบ dynamic ผ่าน `SchedulerRegistry`
- การแยก logic งาน background ออกเป็น service เฉพาะ ช่วยให้โค้ดสะอาดและดูแลรักษาง่าย
- สามารถสร้าง REST API สำหรับจัดการ job ได้ เช่น เพิ่ม, หยุด, ลบ, และดูรายการ job ทั้งหมด
- เหมาะกับงานที่ต้องการรันอัตโนมัติ เช่น ส่งอีเมล, ทำความสะอาดข้อมูล, หรือ sync ข้อมูลตามเวลาที่กำหนด

> ตัวอย่างโค้ดนี้สามารถนำไปต่อยอดกับงาน production ได้ทันที และรองรับการขยายฟีเจอร์ในอนาคต

สามารถดูตัวอย่างโค้ดและโปรเจกต์เต็มได้ที่ GitHub:
[https://github.com/earth774/nestjs-cron](https://github.com/earth774/nestjs-cron)
