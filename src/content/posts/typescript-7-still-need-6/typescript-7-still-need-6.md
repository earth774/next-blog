---
title: "TypeScript 7 เร็วขึ้น 10 เท่า แล้วทำไมหลายโปรเจกต์ยังต้องลง TS6 คู่กัน"
date: "2026-11-05"
excerpt: "tsc ที่พอร์ตเป็น Go เร็วขึ้นราว 8–12 เท่าตามตัวเลขของ Microsoft แต่ 7.0 ไม่มี programmatic API ทำให้ typescript-eslint และเครื่องมือของ Vue, Svelte, Astro, MDX, Angular ยังต้องพึ่ง 6.0 บันทึกจากเดฟ·PM·PO ว่าทำไมคอขวดจริงคือ tooling และ checklist ว่าเมื่อไรควรลงคู่กัน"
author: "Sutthiphong Nuanma"
image: "/images/posts/typescript-7-still-need-6.webp"
tags:
  - TypeScript
  - TS7
  - TS6
  - Developer
  - Tooling
---

ข่าว TypeScript 7 อ่านแล้วอยากอัปเกรดทันทีครับ compiler พอร์ตเป็น Go แล้ว เร็วขึ้นราว 10 เท่า พิมพ์ `npm install -D typescript` ก็ได้มาเลย

แต่พออ่านประกาศของทีม TypeScript จนจบ จะเจอส่วนหนึ่งที่สอนวิธีติดตั้ง TypeScript 6 ไว้ข้าง ๆ กัน มีแพ็กเกจแยก มีคำสั่ง `tsc6` แยก

ผมเป็นทั้ง developer, PM และ PO ที่ Mulberrysoft ใช้ Next.js กับ agent แทบทุกวัน เรื่องแบบนี้ผมเลยมองสองชั้น ชั้นเดฟถามว่าเร็วแค่ไหน ชั้น PM ถามว่าอัปแล้วอะไรในทีมจะพังบ้าง และโพสต์นี้เกิดจากชั้นที่สองครับ

จุดยืนของผมมีอยู่ว่า **ความเร็วเป็นของ compiler แต่ความพร้อมเป็นของทั้ง toolchain และ toolchain เดินช้าเท่ากับตัวที่ช้าที่สุดเสมอ**

## ไทม์ไลน์สั้น ๆ

ก่อนเข้าเรื่อง ขอเรียงลำดับให้เห็นภาพครับ

- **23 มี.ค. 2026** [TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) ออก ทีมเรียกมันว่าสะพานระหว่าง 5.9 กับ 7.0 และตั้งใจให้เป็นรุ่นสุดท้ายที่ใช้ codebase JavaScript เดิม [หลังจากนั้น 6.0 เข้าโหมด maintenance](https://github.com/microsoft/TypeScript/issues/62963) รับแก้แค่เรื่องจำเป็นอย่าง security และ regression ร้ายแรง
- **8 ก.ค. 2026** [TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) ออก เป็น native port ด้วย Go ที่หลายคนเคยรู้จักในชื่อ tsgo
- **20 ต.ค. 2026** [TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/) ออก เริ่มมี API ใหม่ให้เครื่องมือต่าง ๆ

## เร็วจริง และเป็นตัวเลขของ Microsoft เอง

Microsoft บอกว่าโดยทั่วไป full build เร็วขึ้นระหว่าง 8 ถึง 12 เท่า ตัวอย่างจากตารางในประกาศ ซึ่งวัดกับ open-source codebase ที่ค่า default `--checkers 4`:

| Codebase | TS 6 | TS 7 | เร็วขึ้น |
|---|---|---|---|
| vscode | 125.7 วินาที | 10.6 วินาที | 11.9 เท่า |
| sentry | 139.8 วินาที | 15.7 วินาที | 8.9 เท่า |
| playwright | 12.8 วินาที | 1.47 วินาที | 8.7 เท่า |
| tldraw | 11.2 วินาที | 1.46 วินาที | 7.7 เท่า |

ตารางนี้เป็นตัวเลขของผู้ผลิตบนโปรเจกต์ที่เขาเลือก โปรเจกต์ของเราจะได้เท่าไรต้องวัดเอง แต่ต่อให้หักลบแล้ว ผมก็ไม่สงสัยว่าเร็วขึ้นในระดับที่รู้สึกได้

ส่วนนี้เป็นความเห็นของผมครับ ความเร็วนี้มีความหมายเพิ่มขึ้นในยุค agent เพราะ type check คือหนึ่งในสัญญาณแรกที่ agent ใช้รู้ว่าเพิ่งแก้อะไรพัง ยิ่งรอบสั้น ยิ่งวนแก้ได้หลายรอบก่อนงานจะมาถึงมือเรา ทีมที่ปล่อย agent รัน `tsc` ซ้ำใน loop น่าจะได้ประโยชน์ตรงนี้ชัด แต่ type check ที่เร็วขึ้นบอกได้แค่ว่า type ตรงกัน ไม่ได้บอกว่า[คนในทีมเข้าใจโค้ดนั้น](/blog/comprehension-debt)

## แล้วติดตรงไหน: 7.0 ไม่มี API

ประกาศเขียนไว้ตรง ๆ ว่า *"While TypeScript 7.0 is here, it does not ship with an API."*

ประโยคนี้สั้นแต่กระทบเยอะครับ เพราะ `tsc` ที่เราพิมพ์เองเป็นแค่หนึ่งในผู้ใช้ TypeScript ของโปรเจกต์ เครื่องมืออีกหลายตัว `import` แพ็กเกจ `typescript` เข้าไปเรียก compiler, type checker และ language service ตรง ๆ พอ 7.0 ไม่มีทางเข้านั้น เครื่องมือพวกนี้ก็ไปต่อไม่ได้ ไม่ว่า compiler จะเร็วแค่ไหน

ตามประกาศ กลุ่มที่โดนมีประมาณนี้:

- **typescript-eslint** ต้องการเข้าถึง compiler แบบ programmatic และคาดว่าจะ import จาก `typescript` ผ่าน peer dependency
- **Vue, MDX, Astro, Svelte และอื่น ๆ** เครื่องมืออย่าง Volar ฝัง TypeScript ไว้ใน compiler และ language service ของตัวเอง ตอนออก 7.0 จึงพึ่งได้แค่ 6.0
- **Angular** มี type check เฉพาะทางใน template ซึ่งประกาศบอกว่ามีแนวโน้มยังไม่ใช้ 7

เคส typescript-eslint น่าอ่านเป็นพิเศษครับ เพราะหลายโปรเจกต์มีมันอยู่แบบไม่รู้ตัว blog ตัวนี้ก็เป็นหนึ่งในนั้น ผมเปิด `package.json` ดูแล้วไม่มีชื่อมันโดยตรง แต่ `eslint-config-next` ดึงมาเป็น dependency

ใน [issue ติดตามงาน TS7](https://github.com/typescript-eslint/typescript-eslint/issues/10940) ซึ่งตอนที่ผมอ่านยังเปิดอยู่ คอมเมนต์ล่าสุดเมื่อ 29 ก.ย. 2026 ของ maintainer บอกว่างานรองรับ TypeScript 7.1 นิ่งขึ้นเรื่อย ๆ แต่ยังเป็น work in progress และมีประโยคที่ตรงกับหัวข้อโพสต์นี้มาก *"we're not expecting performance to be significantly better with TS7 than TS6 at least for this initial IPC-based version."*

พูดง่าย ๆ คือ `tsc` อาจเร็วขึ้นสิบเท่า แต่ typed linting ในรุ่นแรกที่จะรองรับ อาจไม่ได้เร็วขึ้นตามไปด้วย คนที่อัปเพราะอยากให้ CI ทั้งเส้นเร็วขึ้นสิบเท่าจึงควรวัดเป็นขั้น ๆ ไม่ใช่ดูแค่ขั้น `tsc`

## ทางออกของทีม TS: วาง 6 ไว้ข้าง 7

ทีม TypeScript แก้เรื่องนี้ด้วยแพ็กเกจ `@typescript/typescript6` ซึ่งให้คำสั่ง `tsc6` และ re-export API ของ 6.0

ถ้าโปรเจกต์ยังไม่พร้อมใช้ 7 เลย ให้ alias ชื่อ `typescript` ไปที่แพ็กเกจนี้ เครื่องมือที่ import จาก `typescript` ก็ยังทำงานได้:

```bash
npm install -D typescript@npm:@typescript/typescript6
```

แต่วิธีนี้จะเหลือแค่ `tsc6` ถ้าอยากได้ `tsc` ของ 7 มาใช้คู่กันด้วย ประกาศแนะนำแบบนี้:

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

จุดที่ต้องอ่านดี ๆ คือชื่อมันสลับกับที่คุ้นครับ ในโปรเจกต์แบบนี้ แพ็กเกจชื่อ `typescript` คือ 6.0 เพื่อให้เครื่องมือเดิมเจอ API ที่ต้องการ ส่วน 7.0 อยู่ใต้ชื่อ `@typescript/native` คำสั่ง `tsc` คือ 7 และ `tsc6` คือ 6 ใครเข้ามาอ่าน `package.json` ทีหลังอาจงงได้ ผมว่าควรเขียนโน้ตเหตุผลไว้ใน README หรือไฟล์คำสั่งของ agent ด้วย ไม่อย่างนั้นวันหนึ่งจะมีคนหรือ agent มา "แก้ให้ถูก" แล้วงานพังโดยไม่รู้สาเหตุ

สำหรับเฟรมเวิร์กที่ต้องพึ่ง 6.0 ประกาศแนะนำให้แบ่งหน้าที่แบบนี้ครับ ใช้ 7 กับ `tsc` เพื่อหา error ทั้งโปรเจกต์ให้เร็วใน CLI และใช้ 6.0 ฝั่ง editor ส่วนใน VS Code ถ้า language server ใหม่มีปัญหา มีคำสั่ง "Disable TypeScript 7 Language Server" ให้ย้อนกลับไป 6.0 ได้

## มุม Next.js: ต้องดูเวอร์ชันของเราเอง

เรื่องนี้ผมเช็กกับ repo ของ blog ตัวเองแล้วได้คำตอบที่ไม่ตรงกับหน้า docs ล่าสุดครับ

[เอกสาร TypeScript ของ Next.js](https://nextjs.org/docs/app/api-reference/config/typescript) ฉบับปัจจุบันบอกว่า `next build` ใช้ `tsc` ของโปรเจกต์เป็น default จึงรองรับ TypeScript 7 ได้โดยไม่ต้องตั้งค่าเพิ่ม ถ้าอยากกลับไปใช้ compiler API ให้ตั้ง `experimental.useTypeScriptCli` เป็น `false` แต่ docs ก็เตือนว่า flag นี้ยังเป็น experimental และการตรวจผ่าน CLI จะได้ diagnostics ของ `tsc` ตรง ๆ ไม่มี code frame หรือการแปล error เฉพาะของ Next.js

แต่ blog นี้ยังอยู่ที่ Next.js 16.0.10 กับ TypeScript 5 ครับ ผมไล่ใน `node_modules` แล้วไม่เจอ `useTypeScriptCli` เลย และ `runTypeCheck.js` เรียก `createProgram` กับ `createIncrementalProgram` ตรง ๆ ซึ่งเป็น API ที่ 7.0 ไม่มี ดังนั้นถ้าผมเปลี่ยนแค่ TypeScript โดยไม่อัป Next.js ด้วย ก็คาดได้ว่าขั้น type check ใน `next build` จะมีปัญหา หน้า docs ไม่ได้ระบุว่า flag นี้เริ่มมีตั้งแต่รุ่นไหน ใครจะอัปจึงควรเช็กกับเวอร์ชันที่ใช้จริง

บทเรียนจากจุดนี้เล็กแต่ใช้ได้ทุกโปรเจกต์ครับ docs ล่าสุดตอบคำถามของ Next.js รุ่นล่าสุด ไม่ได้ตอบคำถามของ lockfile เรา

## ทำไมไม่ข้าม 6 ไปเลย

คำถามถัดมาที่น่าจะเจอคือ ถ้า 6 เป็นแค่สะพาน กระโดดจาก 5.x ไป 7 เลยไม่ได้หรือ คำแนะนำของทีม TS คือขึ้น 6.0 ก่อน และผมเห็นด้วยครับ เหตุผลมีสองข้อ

**ข้อแรก default เปลี่ยนชุดใหญ่** 7.0 รับ default ใหม่จาก 6.0 มาทั้งหมด เช่น `strict` เป็น `true`, `module` เป็น `esnext`, `target` เป็น ECMAScript รุ่น stable ปัจจุบัน, `rootDir` เป็น `./` และ `types` เป็น `[]` ข้อท้ายสองข้อนี้ดูเล็กแต่ทำให้โปรเจกต์ที่เคยปล่อยค่าไว้ให้ระบบเดาต้องกลับมาระบุเอง เช่น ตั้ง `"types": ["node"]` และ `"rootDir": "./src"`

**ข้อสอง ของที่ 6 แค่เตือน 7 จะ error** ตัวอย่างจากรายการในประกาศ:

- `target: es5` และ `downlevelIteration`
- `moduleResolution: node` (หรือ `node10`) และ `classic`
- `module: amd`, `umd`, `systemjs`, `none`
- `baseUrl`
- `esModuleInterop` หรือ `allowSyntheticDefaultImports` ที่ตั้งเป็น `false`
- keyword `asserts` บน import ซึ่งต้องเปลี่ยนเป็น `with`

ใน 6.0 เรายังปิดคำเตือนชั่วคราวได้ด้วย `"ignoreDeprecations": "6.0"` แต่ประกาศของ 6.0 ย้ำว่า 7.0 จะไม่รองรับ option ที่ deprecate แล้วเหล่านี้ นี่คือประโยชน์ของการมีสะพานครับ เราได้เห็นรายการหนี้ทั้งหมดในรุ่นที่ยังทำงานอยู่ แทนที่จะเจอมันพร้อมกันตอนย้ายรุ่นใหญ่

ที่ผมชอบที่สุดคือเงื่อนไขความพร้อมที่ทีม TS ให้มาค่อนข้างวัดได้ โค้ดที่ compile ผ่านสะอาดบน 6.0 โดยเปิด `stableTypeOrdering` และไม่ได้ตั้ง `ignoreDeprecations` ควร compile ได้เหมือนกันบน 7.0 แทบทั้งหมด แปลเป็นภาษา PM ได้ว่า **definition of done ของการขึ้น 6 คือไม่ต้องพึ่ง `ignoreDeprecations` อีกต่อไป**

เครื่องมือช่วยมีครับ `ts5to6` ซึ่งยังเป็น experimental ช่วยปรับ `baseUrl` กับ `rootDir` ให้ทั้ง codebase ส่วน `--stableTypeOrdering` ใช้เทียบความต่างระหว่าง 6 กับ 7 เท่านั้น ทีม TS เตือนว่าไม่ได้มีไว้ใช้ยาว และอาจทำให้ type check ช้าลงได้ถึง 25%

งานเก็บ deprecation แบบนี้เหมาะจะให้ agent ช่วยทำ เพราะมี error เป็นตัวบอกว่าเสร็จหรือยัง แต่ผมจะยังอ่าน diff ของ `tsconfig` เองครับ ค่าใน `paths`, `rootDir` หรือ `types` คือการตัดสินใจเรื่องขอบเขตของโปรเจกต์ ไม่ใช่แค่การทำให้ error หาย

## แล้ว 7.1 ล่ะ รอไปเลยดีไหม

7.1 Beta เริ่มเติมของที่ขาดแล้วครับ มี API ใหม่ทั้งแบบ sync และ async (`typescript/sync`, `typescript/async`) และมีจุดต่อ plugin ใหม่ชื่อ content mapper ซึ่งแปลงไฟล์นามสกุลอื่นเป็นตัวแทนเสมือนให้ TypeScript อ่าน ประกาศบอกว่ามีการทำ prototype หรือ implement ไว้แล้วสำหรับ Astro, CSS Modules, Ember, MDX, Svelte และ Vue

ฟังดูดี แต่ผมอ่านแล้วยังไม่ถือเป็นเหตุผลให้ข้าม 6 ด้วยเหตุผลสามข้อ:

- มันยังเป็น Beta และ API นี้เป็นของใหม่ที่ "different" จากเดิม เครื่องมือต้องพอร์ตมา ไม่ใช่แค่ bump เวอร์ชัน
- คำว่า "prototyped or implemented" ยังไม่เท่ากับเครื่องมือในโปรเจกต์เรารองรับแล้ว ตัวอย่าง `@vue/content-mapper` ในประกาศเองก็ระบุว่ายังไม่อยู่บน npm
- ของที่ deprecate ใน 6 ก็ยังเป็น error เหมือนเดิม ไม่ว่าจะรอไปถึงรุ่นไหน งานขึ้น 6 จึงไม่ได้เปล่าประโยชน์เลย

ดังนั้นคำตอบของผมคือไม่ต้องรีบย้ายมาที่ 7 แต่เริ่มงานขึ้น 6 ได้เลยครับ

## Checklist: เมื่อไรควรลงคู่ TS6 + TS7

ข้อนี้เป็นกรอบคิดของผมเอง ไม่ใช่คำแนะนำทางการ ปรับตามโปรเจกต์ได้ครับ

**ลง 7 อย่างเดียวได้เลย ถ้า**

- โปรเจกต์เป็น TypeScript ล้วน ไม่มี Vue, Svelte, Astro, MDX หรือ Angular
- ไม่ใช้ typescript-eslint และไม่มีเครื่องมือหรือสคริปต์อื่นที่ import `typescript` มาเรียก API
- framework ที่ใช้รองรับการ type check ด้วย 7 ในเวอร์ชันที่เราล็อกไว้จริง

**ลงคู่กัน ถ้า**

- ใช้ typescript-eslint อยู่ แต่อยากได้ `tsc` ที่เร็วขึ้นใน CI
- ใช้ framework ที่ editor หรือ template ยังพึ่ง 6.0 แต่อยากตรวจ `.ts` ทั้งโปรเจกต์ให้เร็วใน CLI
- มีสคริปต์ codegen หรือเครื่องมือภายในที่เรียก compiler API

**อยู่ 6 ไปก่อน ถ้า**

- ยังมี deprecation ค้างและต้องพึ่ง `ignoreDeprecations`
- type check ไม่ใช่คอขวดของทีมตอนนี้ การดูแลสองเวอร์ชันจะเป็นภาระมากกว่าประโยชน์

**ไม่ว่าเลือกทางไหน ก่อนเริ่มควรทำ**

1. ไล่ดูว่ามีอะไรใน repo ที่พึ่งแพ็กเกจ `typescript` บ้าง `npm ls typescript` เป็นจุดเริ่มที่ดี
2. วัดเวลาแต่ละขั้นใน CI แยกกัน เพื่อดูว่า `tsc` กินเวลาจริงแค่ไหนเทียบกับ lint และ build
3. เขียนเหตุผลของการลงคู่ไว้ใน repo พร้อมเงื่อนไขว่าจะถอด `tsc6` ออกเมื่อไร

ข้อสุดท้ายสำคัญกว่าที่คิดครับ การลงคู่กันเป็นของชั่วคราว ถ้าไม่เขียนเงื่อนไขถอดไว้ มันจะกลายเป็นของถาวรที่ไม่มีใครกล้าแตะ

## ท้ายที่สุด

TypeScript 7 เป็นงานวิศวกรรมที่น่าทึ่ง และตัวเลขก็ทำให้อยากลองจริง ๆ ครับ แต่ `tsc` ที่เร็วขึ้นสิบเท่าไม่ได้แปลว่าวันทำงานของทีมเร็วขึ้นสิบเท่า เพราะงานของเราผ่าน linter, framework, editor และสคริปต์อีกหลายตัวที่ต้องคุยกับ compiler ให้รู้เรื่องก่อน

แพ็กเกจ `@typescript/typescript6` จึงไม่ใช่เรื่องน่าอายของรุ่นใหม่ แต่เป็นการยอมรับตรง ๆ ว่า compiler ออกรุ่นใหม่ได้ในวันเดียว ส่วน ecosystem ต้องใช้เวลาตาม

ดังนั้นก่อนพิมพ์ `npm install -D typescript` ในโปรเจกต์จริง ผมจะถามแค่ว่า ในเครื่องมือทั้งหมดที่ใช้ `typescript` อยู่ ตัวไหนยังไม่พร้อม

ถ้าตอบได้ นั่นคือแผนอัปเกรดครับ ถ้าตอบไม่ได้ ก็เริ่มจาก `npm ls typescript` ก่อนเลย
