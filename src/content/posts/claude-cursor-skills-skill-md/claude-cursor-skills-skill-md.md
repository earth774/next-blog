---
title: "Claude Skills กับ Cursor Skills: เขียน SKILL.md ให้เอเจนต์ \"หยิบใช้\" ได้จริง"
date: "2026-04-19"
excerpt: "สรุปรูปแบบ Agent Skills (SKILL.md) ที่ Anthropic กับ Cursor ใช้ร่วมกัน วิธี progressive disclosure และเคล็ดลับเขียน description ให้ถูกดึงเข้างาน — พร้อมเช็กลิสต์และตารางเทียบพื้นผิวการใช้งาน"
author: "AI Research"
tags:
  - Claude
  - Cursor
  - Agent Skills
  - SKILL.md
  - Developer Experience
  - AI Engineering
---

ถ้าทีมคุณเริ่มพึ่ง coding agent แบบจริงจัง คำถามที่ตามมาเร็วที่สุดมักเป็นแบบนี้: *จะสอนเอเจนต์ให้ทำงานซ้ำ ๆ แบบเดิมได้อย่างไร โดยไม่ต้องคัดลอก prompt ยาว ๆ ทุกครั้ง?* คำตอบหนึ่งที่กำลังกลายเป็นมาตรฐานคือ **Agent Skills** — ชุดคำสั่งและทรัพยากรที่บรรจุเป็นโฟลเดอร์ มี `SKILL.md` เป็นศูนย์กลาง ให้ระบบค้นพบจาก metadata แล้วโหลดรายละเอียดเต็มเมื่อเกี่ยวข้อง

บทความนี้สำหรับนักพัฒนาและ tech lead ที่ต้องออกแบบ “ความรู้องค์กร” ให้เอเจนต์ใช้ได้ทั้งในแวดวง Anthropic (API, claude.ai, Claude Code) และใน Cursor โดยเน้นภาษาไทยที่อ่านง่าย สแกนได้ และชี้ไปที่เอกสารทางการเสมอเมื่อเรื่อง limit เวอร์ชัน หรือ API อาจเปลี่ยน

> **ข้อควรระวัง:** รายละเอียดเชิงตัวเลข (เช่น ความยาว description ต่อพื้นผิว, จำนวน skill ต่อคำขอ, พฤติกรรมของ IDE เวอร์ชันล่าสุด) เปลี่ยนได้บ่อย — ก่อนลง production ควรยืนยันกับเอกสารทางการและ release notes ล่าสุดเสมอ ไม่ควรถือตัวเลขในบทความนี้เป็นสัญญาเชิงเทคนิค

## Agent Skills คืออะไร และทำไมถึงเป็น “รูปแบบกลาง”

**Agent Skills** คือรูปแบบเปิด (open format) สำหรับบรรจุความเชี่ยวชาญเฉพาะทางให้โมเดล/เอเจนต์ใช้งาน โดยทั่วไปมีโครงสร้างแบบ **หนึ่ง skill ต่อหนึ่งโฟลเดอร์** ภายในมีอย่างน้อย:

- **`SKILL.md`** — ไฟล์หลักที่มี YAML frontmatter สำหรับ “การค้นพบ” และเนื้อหา Markdown สำหรับ “คำแนะนำการทำงาน”
- **โฟลเดอร์เสริม (ถ้ามี)** — เช่น `scripts/`, `references/`, `assets/` สำหรับสคริปต์ เอกสารอ้างอิง หรือไฟล์ประกอบที่โหลดเมื่อจำเป็น

แนวคิดสำคัญคือ skill ไม่ใช่แค่ “ข้อความยาว ๆ” แต่เป็น **แพ็กเกจความรู้** ที่ระบบสามารถเลือกเปิดทีละชั้นได้ — ทำให้ทั้งประสิทธิภาพและความชัดเจนของพฤติกรรมเอเจนต์ดีขึ้นเมื่อเทียบกับการยัดทุกอย่างใน system prompt เดียว

เอกสารภาพรวมจาก Anthropic และสเปกเปิดอยู่ที่:

- [Anthropic — Agent Skills overview](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview)
- [Agent Skills — สเปกเปิด (agentskills.io)](https://agentskills.io)
- [Claude — หน้า Skills และแนวทางสร้าง custom skill](https://www.claude.com/skills)

## Progressive disclosure: ทำไม frontmatter สำคัญกว่าที่คิด

**Progressive disclosure** หมายถึงการแบ่งการโหลดเป็นระดับ:

1. **ระดับ metadata** — ส่วนใหญ่คือ YAML frontmatter (โดยเฉพาะ `description`) ถูกนำไปใช้ตอน “ค้นหา/จับคู่” ว่า skill ไหนควรถูกพิจารณา
2. **ระดับเนื้อหา `SKILL.md`** — โหลดเมื่อ skill ถูกเลือกหรือเกี่ยวข้องกับงาน
3. **ระดับทรัพยากรเสริม** — สคริปต์ ไฟล์อ้างอิง ไฟล์ asset (`assets/`) — โหลดหรืออ่านเมื่อขั้นตอนงานต้องใช้จริง

ผลลัพธ์ทางปฏิบัติ: **คุณภาพของ `description` ตัดสินว่า skill จะถูก “หยิบมาใช้” บ่อยหรือถูกมองข้าม** ในขณะที่ตัว body ควรอธิบายขั้นตอน ข้อจำกัด และตัวอย่าง I/O ให้เอเจนต์ทำตามได้สม่ำเสมอ

แนวปฏิบัติการเขียน skill จากฝั่ง Anthropic:

- [Anthropic — Skill authoring best practices](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/best-practices)

(หากลิงก์ย้ายโครงสร้าง ให้ใช้การค้นหาใน docs ด้วยคำว่า “Agent Skills” / “best practices”.)

## พื้นผิวของ Anthropic: API, claude.ai, และ Claude Code (ข้อควรรู้ต่างกัน)

รากฐานรูปแบบไฟล์อาจคล้ายกัน แต่ **ไม่ใช่ runtime เดียวกัน** — วิธี deploy ขีดจำกัด และฟิลด์พิเศษต่างกันตามพื้นผิว

### Claude API

Skills ถูกผูกกับการใช้งานผ่าน API ตามคู่มือทางการ (รวมถึงหัวข้อ beta/เวอร์ชันที่เกี่ยวข้อง) — โปรดอ่านจากเอกสารล่าสุดก่อนออกแบบ pipeline การผลิต

### claude.ai (อัปโหลดชุด skill)

ผู้ใช้มักแพ็ก skill เป็น ZIP ตามขั้นตอนของผลิตภัณฑ์ ข้อจำกัดบางอย่างบนผลิตภัณฑ์ **อาจเข้มงวดกว่า** สเปกเปิด เช่น มีการกล่าวถึงขีดจำกัดความยาว `description` ที่แคบกว่าเมื่อเทียบกับช่วงที่สเปกนิยามไว้ — **อย่าสรุปตัวเลขจากบทความนี้** ให้เทียบกับ UI/เอกสารของ claude.ai และ [สเปก agentskills.io](https://agentskills.io) โดยตรง

### Claude Code

Claude Code รองรับ skill ในเส้นทางมาตรฐาน เช่น `~/.claude/skills/` (ส่วนบุคคล) และ `.claude/skills/` (ระดับโปรเจกต์) พร้อมกรณี monorepo ที่มี skill ซ้อนในโฟลเดอร์ย่อยได้ตามแนวทางของผลิตภัณฑ์

จุดที่มักต่างจาก Cursor คือ **frontmatter เสริม** สำหรับควบคุมพฤติกรรมเชิงเครื่องมือ เช่น การปิดการให้โมเดลเรียกเอง เงื่อนไขการใช้ รายการเครื่องมือที่อนุญาต pattern ของ path และ hooks — รวมถึง **ลำดับความสำคัญ** แบบ enterprise เหนือ personal เหนือ project ตามที่เอกสารระบุ

คู่มือเฉพาะ Claude Code:

- [Claude Code — Extend Claude with skills](https://code.claude.com/docs/en/skills)

## พฤติกรรมของ Cursor: เส้นทางไฟล์ การค้นพบ และการเรียกใช้

Cursor นำรูปแบบ skill เข้ามาใน workflow ของ Agent โดยเน้นการ **ค้นพบเมื่อเริ่มทำงาน** ให้เอเจนต์ประเมินความเกี่ยวข้องจาก metadata และสามารถมีทั้งการทำงานอัตโนมัติตามบริบทและการเรียกใช้แบบระบุชัด

เส้นทางที่พบบ่อย (ระดับโปรเจกต์และ global) ได้แก่:

- `.cursor/skills/`
- `~/.cursor/skills/`
- `.agents/skills/`
- ความเข้ากันได้กับ `.claude/skills/` และ `.codex/skills/` ตามที่เอกสาร Cursor ระบุ

ข้อกำหนดหลักโดยทั่วไป:

- ต้องมี **`name`** และ **`description`** ใน frontmatter
- **`name` ต้องสอดคล้องกับชื่อโฟลเดอร์** ของ skill
- **`disable-model-invocation`** เป็นตัวเลือก (เมื่อเปิดใช้ มักหมายถึง skill จะไม่ถูกดึงโดยอัตโนมัติจากโมเดล แต่ใช้เมื่อผู้ใช้ระบุชัดหรือเรียกผ่านคำสั่งแบบสแลช เช่น `/skill-name`)

การตั้งค่าใน IDE เกี่ยวกับว่าเอเจนต์จะตัดสินใจโหลด skill อย่างไร (เช่นกลไก “Agent Decides”) ควรตรวจใน UI/settings ของรุ่นที่คุณใช้งานจริง

หมายเหตุ: มีการกล่าวถึงเครื่องมือ/กระบวนการ migrate สู่รูปแบบ skills ในบริบทของ Cursor 2.4 — **ควรยืนยันใน release notes ทางการ** ก่อนสมมติว่ามีหรือไม่ใน build ของคุณ

เอกสารอ้างอิงหลัก:

- [Cursor Docs — Agent Skills](https://cursor.com/docs/context/skills)

## เขียน `description` อย่างไรให้ “ทริกเกอร์” ได้แม่น

ใช้หลักคิดเดียวกับการเขียนเอกสารให้เพื่อนร่วมทีมอ่าน: **บอกว่าทำอะไร ใช้เมื่อไหร่ ไม่ใช้เมื่อไหร่ และคำสำคัญที่ผู้ใช้มักพิมพ์**

แนวทางสั้น ๆ:

- ระบุ **กลุ่มงาน** ชัดเจน (เช่น “รีวิว PR”, “สร้าง migration DB”, “ตั้งค่า Sentry”)
- ใส่ **สัญญาณการเรียกใช้** ที่เป็นภาษาพูดของทีม (คำศัพท์โดเมน, ชื่อเครื่องมือ, ชื่อบริการ)
- แยก **ขอบเขต** — ถ้า skill นี้ไม่ควรแตะ production config ให้เขียนไว้ตรง ๆ
- หลีกเลี่ยงคำกว้าง ๆ ที่ทำให้ชนกับ skill อื่นทั้งหมด

อย่าลืมว่าในบางพื้นผิว ความยาว `description` ที่ UI ยอมรับ **อาจสั้นกว่า** ช่วงที่สเปกเปิดกำหนด — ถ้าทีมคุณแชร์ skill ข้ามเครื่องมือ ให้ทดสอบบนทุกปลายทางที่ต้องใช้จริง

## ตารางเปรียบเทียบสั้น ๆ (มุมมองนักพัฒนา)

| หัวข้อ | แนวคิดกลาง (สเปก/Anthropic) | Cursor (IDE Agent) | Claude Code (Terminal/CLI) |
|--------|------------------------------|--------------------|----------------------------|
| หน่วยบรรจุ | โฟลเดอร์ + `SKILL.md` + ทรัพยากรเสริมได้ | โครงสร้างเดียวกันใน `.cursor/skills/` ฯลฯ | `.claude/skills/`, `~/.claude/skills/` ฯลฯ |
| การค้นพบ | เน้น metadata + progressive load | ค้นพบตอนเริ่มงาน, เอเจนต์เลือกความเกี่ยวข้อง | ตามเอกสารผลิตภัณฑ์ + slash command `/skill-name` |
| ฟิลด์ควบคุมพิเศษ | ตาม API/ผลิตภัณฑ์ | `disable-model-invocation` (optional), การตั้งค่า Agent | frontmatter เสริม (เช่น tools, paths, hooks) — ดู docs |
| ความเสี่ยงด้านความปลอดภัย | ถือว่าเหมือนติดตั้งซอฟต์แวร์ — ตรวจสอบแหล่งที่มา | เช่นเดียวกันกับการรวมสคริปต์ใน repo | เช่นเดียวกัน — ระวังสคริปต์ที่รันได้ |

## ความปลอดภัย: อย่ามอง skill เป็นแค่ “ข้อความ”

Anthropic เตือนว่า skill ควรได้รับการตรวจสอบเหมือน **การติดตั้งซอฟต์แวร์จากบุคคลที่สาม** — เพราะอาจมีสคริปต์ คำสั่ง หรือทรัพยากรที่ส่งผลต่อระบบของคุณได้

แนวทางขั้นต่ำสำหรับทีม:

- รีวิว diff ของ skill ใหม่ก่อน merge เข้า `main`
- แยก skill “อ่านอย่างเดียว” กับ skill ที่ “แตะโครงสร้างโปรเจกต์/รันคำสั่ง”
- จำกัดสิทธิ์การ merge โฟลเดอร์ `.cursor/skills/` / `.claude/skills/`
- บันทึกแหล่งที่มาและเวอร์ชัน (ใน repo หรือ package ภายในองค์กร)

## เช็กลิสต์ก่อนปล่อย skill สู่ทีม

- [ ] มี `name` ตรงกับชื่อโฟลเดอร์ และสอดคล้องกับกฎ naming ของสเปก/เครื่องมือ
- [ ] `description` อธิบาย *งาน + บริบท + ขอบเขต* ครบ และผ่านข้อจำกัดความยาวของแต่ละพื้นผิวที่คุณใช้
- [ ] เนื้อหา `SKILL.md` แยกเป็น: เป้าหมาย → ขั้นตอน → ตัวอย่าง → ข้อควรระวัง
- [ ] ทรัพยากรหนัก (PDF, log ยาว, สเปก API) อยู่ใน `references/` และถูกอ้างถึงแบบต้องเปิดเมื่อจำเป็น
- [ ] ทดสอบบน Cursor และ/หรือ Claude Code อย่างน้อยหนึ่งรอบด้วยคำสั่งจริงของทีม
- [ ] รันเครื่องมือตรวจสอบจากสเปกเปิดเมื่อมี — เช่น `skills-ref validate` ตาม [agentskills.io](https://agentskills.io)
- [ ] มีแผนเมื่อ skill ซ้ำซ้อนกัน (ปรับ description หรือรวม skill)

## ตัวอย่างโครง `SKILL.md` (โครงร่างพร้อมต่อยอด)

ใช้เป็นจุดเริ่มสำหรับ skill ภายในองค์กร — ปรับฟิลด์เสริมตามเครื่องมือที่คุณ deploy จริง

```markdown
---
name: nextjs-api-review
description: >
  รีวิว API routes / server actions ใน Next.js App Router ให้สอดคล้องกับมาตรฐานทีม
  (validation, error shape, auth boundary). ใช้เมื่อมีคำว่า "รีวิว API", "route handler",
  "server action", หรือเมื่อแก้ไฟล์ใน app/api หรือ actions ที่เกี่ยวข้อง
# disable-model-invocation: true   # เปิดเมื่อต้องการให้เรียกเฉพาะตอนพิมพ์คำสั่งแบบสแลช
---

# Next.js API review

## เมื่อไหร่ควรใช้ skill นี้
- มีการเพิ่ม/แก้ route handler หรือ server action
- มีการเปลี่ยน schema ของ request/response ที่ผู้บริโภค API แบบสาธารณะใช้

## ขั้นตอนการรีวิว
1. ระบุขอบเขต auth: ใครเรียกได้ ต้องมี session/token อะไร
2. ตรวจ validation ของ input (ชนิดข้อมูล, ขีดจำกัด, error message)
3. ตรวจ error handling และ status code ให้สอดคล้องกับแนวทางทีม
4. ตรวจ logging/PII — ห้ามลง log ที่เป็นข้อมูลส่วนบุคคลโดยไม่จำเป็น

## สิ่งที่ไม่ทำใน skill นี้
- ไม่รีวิวดีไซน์ UI
- ไม่รัน migration ฐานข้อมูลให้โดยอัตโนมัติ

## อ้างอิงเพิ่มเติม
- ดู `references/team-api-style.md` เมื่อต้องการตาราง status code และรูปแบบ error มาตรฐาน
```

## สรุปสำหรับผู้นำทางเทคนิค

Agent Skills คือ **สัญญากลาง** ระหว่างมนุษย์กับเอเจนต์: มนุษย์รวบรวมขั้นตอนและข้อจำกัด เอเจนต์ดึงมาใช้เมื่อจำเป็น ทั้ง Cursor และระบบของ Anthropic ต่างก็อาศัย **metadata ที่แม่น** และ **progressive disclosure** เพื่อให้ทั้งความเร็วและความปลอดภัยอยู่ด้วยกัน

ถ้าคุณจะลงทุนแค่จุดเดียว ให้ลงที่ **`description`** — นั่นคือปุ่ม “เรียกใช้งาน” ที่แท้จริงของ skill

---

### ลิงก์อ้างอิงหลัก (เก็บเป็นแถวเดียวสำหรับทีม)

- [Cursor — Agent Skills](https://cursor.com/docs/context/skills)
- [Anthropic — Agent Skills overview](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview)
- [Anthropic — Skill authoring best practices](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [Claude Code — Skills](https://code.claude.com/docs/en/skills)
- [agentskills.io — สเปกเปิด](https://agentskills.io)
- [Claude — Skills & custom workflows](https://www.claude.com/skills)
