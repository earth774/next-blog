---
title: "AGENTS.md กับ CLAUDE.md: ทีมที่ใช้ agent หลายตัว ควรเขียนกติกาไว้ไฟล์ไหน และกับดักที่ Claude Code ไม่อ่าน AGENTS.md"
date: "2026-11-17"
excerpt: "coding agent แต่ละตัวอยากได้ไฟล์กติกาของตัวเอง และชื่อไม่ตรงกันเลย กับดักที่เจอบ่อยคือ Claude Code จะไม่อ่าน AGENTS.md ทันทีที่มี CLAUDE.md อยู่ (ค่าเริ่มต้น) บันทึกจากเดฟ·PM·PO ที่ทำ QA ให้ทีม junior ว่าเอกสารทางการของ Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot และ Windsurf บอกอะไร ณ วันที่เขียน วิธีแก้ทั้ง CLAUDE.md ที่ import @AGENTS.md, setting Project instructions, symlink และการมีต้นฉบับเดียว พร้อม checklist"
author: "Sutthiphong Nuanma"
image: "/images/posts/agents-md-vs-claude-md.webp"
tags:
  - AI
  - Critical Thinking
  - Agents
  - Claude Code
  - Tooling
---

ทีมผมไม่ได้ใช้ coding agent ตัวเดียวครับ บางคนถนัด Claude Code บางคนใช้ Cursor บางงานส่งให้ Codex หรือ Copilot ทำใน PR สิ่งที่ตามมาโดยไม่มีใครตั้งใจคือไฟล์กติกาที่งอกขึ้นใน repo ทีละไฟล์ `AGENTS.md` บ้าง `CLAUDE.md` บ้าง `.cursor/rules/` บ้าง

ปัญหาไม่ได้อยู่ที่จำนวนไฟล์ แต่อยู่ที่เราคิดว่า agent ทุกตัวอ่านกติกาชุดเดียวกัน ทั้งที่จริงแต่ละตัวอ่านคนละไฟล์ และบางตัวเลือกอ่านไฟล์เดียวแล้วเมินอีกไฟล์ไปเลย

ช่วงนี้ผมเจอ[โพสต์ใน X ของ Sachin (@sachintwtss)](https://x.com/sachintwtss/status/2114947225780355191) ที่สรุปเรื่องนี้ไว้สั้น ๆ ว่า

> every coding agent wants its own rules file and none of them agree on the name

และชี้จุดที่เขาว่า "bites people" คือ

> claude code ignores your AGENTS.md the moment a CLAUDE.md exists

โพสต์นี้อยู่ในซีรีส์ Critical Thinking ต่อจาก[สั่ง agent ให้ CI เขียว แล้วมันแก้ test แทนแก้บั๊ก](/blog/agent-rewrites-tests-ci-green) ครับ ครั้งนั้นหนึ่งใน guardrail ที่ผมแนะนำคือเขียนกติกา "ห้ามแก้ skip หรือทำให้ test เดิมอ่อนลง" ไว้ใน AGENTS.md หรือ CLAUDE.md ครั้งนี้ขอย้อนมาถามคำถามที่ควรถามก่อนหน้านั้น คือกติกาที่เราเขียน agent ตัวไหนอ่านจริงบ้าง

จุดยืนของผมสั้น ๆ คือ **กติกาที่ agent ไม่ได้อ่าน ไม่ใช่กติกา ทีมควรมีต้นฉบับเดียว (ผมเลือก AGENTS.md) แล้วให้ไฟล์ของ agent แต่ละตัวชี้กลับมาที่ต้นฉบับนั้น และต้องตรวจว่า agent โหลดมันจริง ไม่ใช่เชื่อว่ามันโหลด**

## แหล่งต้นทาง: อะไรที่ผมยืนยันได้ และอะไรที่ยืนยันไม่ได้

**ยืนยันไม่ได้**

- โพสต์ของ Sachin เป็นแผนที่ที่คนคนหนึ่งสรุปจากการอ่านเอกสาร ไม่ใช่เอกสารทางการของเจ้าไหน ตัวแผนที่เต็มเป็นรูปที่แนบในโพสต์ ผมไม่ได้อ่านรูปนั้น เลยจะไม่อ้างอะไรจากในรูป ทุกอย่างข้างล่างผมตามไปอ่านจากเอกสารของแต่ละเจ้าเอง
- ตอนผมอ่าน โพสต์มี 25 likes และ 70 replies ผมไม่ได้อ่าน replies ทั้งหมด
- เอกสาร Claude Code หน้า memory ยาวมาก ส่วนท้ายของหน้าผมได้อ่านเป็นสรุป ไม่ใช่ตัวเต็ม รายละเอียดเรื่องขนาดไฟล์สูงสุดและข้อจำกัดจำนวนตัวอักษรต่อไฟล์ ผมเลยไม่ใส่ไว้ในโพสต์นี้
- changelog ของ Claude Code v2.1.277 ที่ผมจดไว้เขียนว่าตอนเพิ่มฟีเจอร์นี้ยัง "not yet on Bedrock, Vertex or Foundry" แต่ตอนผมอ่านหน้า memory เอกสารพูดถึงแค่ Amazon Bedrock และ session ที่ปิด telemetry ว่าก่อน v2.1.281 จะอ่านแค่ CLAUDE.md ไม่ได้พูดถึง Vertex หรือ Foundry ผมเลยยืนยันสถานะของสองตัวนี้ ณ วันนี้ไม่ได้
- ชื่อ key ใน settings ของ Claude Code ที่ใช้ตั้งค่านี้ เอกสารสองที่เขียนไม่ตรงกัน (รายละเอียดอยู่ในหัวข้อวิธีแก้) ผมยกทั้งสองแบบไว้ แต่ยังไม่ได้ลองเองว่าเวอร์ชันที่ทีมใช้รับแบบไหน
- เอกสาร Gemini CLI มีสองฉบับ (หน้าเว็บ docs กับไฟล์ใน GitHub) ที่เขียนต่างกันในบางจุด เช่นคำสั่ง `/memory refresh` กับ `/memory reload` ผมไม่รู้ว่าฉบับไหนตรงกับ release ปัจจุบัน และหน้า configuration ของ Gemini CLI ที่ผมลองเปิดตอบกลับ 404
- URL เอกสาร Windsurf ที่ผมเปิด redirect ไปที่ docs ของ "Devin Local" แล้ว ผมเลยอ่านได้แค่ฉบับใหม่ ไม่ได้อ่านเอกสาร Windsurf ฉบับเดิม
- หน้า Cursor rules ที่ผมอ่านไม่ได้พูดถึงไฟล์ `.cursorrules` เลย ผมเลยไม่ยืนยันว่ามันยังใช้ได้หรือเลิกใช้แล้ว
- เอกสารของ Codex, Cursor และ Windsurf/Devin ที่ผมอ่าน ไม่ได้พูดถึง CLAUDE.md เลย ผมเลยไม่สรุปว่ามันอ่านหรือไม่อ่าน
- ตัวอย่างไฟล์และคำสั่งข้างล่างผมเขียนขึ้นเองเพื่อประกอบโพสต์ ยังไม่ได้ทดสอบกับทุก agent ใน repo จริง ต้องลองกับเวอร์ชันที่ทีมใช้ก่อน

**ยืนยันได้**

ผมอ่านจากแหล่งเหล่านี้โดยตรงเมื่อวันที่ 17 พฤศจิกายน 2026 ครับ

- [โพสต์ใน X ของ @sachintwtss](https://x.com/sachintwtss/status/2114947225780355191) วันที่ 27 ตุลาคม 2026
- เอกสาร Claude Code หน้า [Memory](https://code.claude.com/docs/en/memory) และ [README ของ mods/agents-md](https://github.com/anthropics/claude-code/blob/main/mods/agents-md/README.md) ใน repo `anthropics/claude-code`
- เอกสาร [AGENTS.md ของ Codex](https://developers.openai.com/codex/guides/agents-md) (ตอนผมเปิด URL นี้ redirect ไปที่ `learn.chatgpt.com/docs/agent-configuration/agents-md`)
- เอกสาร [Rules ของ Cursor](https://cursor.com/docs/context/rules)
- เอกสาร [GEMINI.md ของ Gemini CLI](https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html) และ[ฉบับใน GitHub](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md)
- เอกสาร [repository custom instructions ของ GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- เอกสาร [Memories & Rules ของ Windsurf](https://docs.windsurf.com/windsurf/cascade/memories) (redirect ไปที่ `docs.devin.ai/desktop/cascade/memories`)
- เว็บ [agents.md](https://agents.md/)

ข้อควรรู้คือเรื่องนี้เปลี่ยนเร็วมากครับ แค่หน้าเดียวของ Claude Code ก็อ้างเวอร์ชันหลายเลขที่พฤติกรรมเปลี่ยน ทุกอย่างในโพสต์นี้คือสิ่งที่เอกสารเขียน ณ วันที่เขียน (17 พ.ย. 2026) ถ้าอ่านทีหลัง ให้กลับไปเช็กเอกสารต้นทางก่อนเสมอ

## แต่ละ agent อ่านไฟล์อะไร (ณ วันที่เขียน)

ผมสรุปจากเอกสารที่อ่านมาเป็นตารางก่อน แล้วค่อยลงรายละเอียดทีละตัวครับ

| Agent | ไฟล์หลักของตัวเอง | อ่าน AGENTS.md ไหม |
|---|---|---|
| Claude Code | `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, `.claude/rules/` | อ่าน แต่ค่าเริ่มต้นอ่านเฉพาะตอนที่ไม่มี CLAUDE.md |
| Codex | `AGENTS.md`, `AGENTS.override.md` | อ่าน เป็นไฟล์หลัก |
| Cursor | `.cursor/rules/*.mdc` | อ่าน ทั้งที่ root และโฟลเดอร์ย่อย |
| Gemini CLI | `GEMINI.md` | อ่านถ้าตั้ง `context.fileName` |
| GitHub Copilot | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` | อ่าน และยังรับ CLAUDE.md หรือ GEMINI.md ที่ root ได้ด้วย |
| Windsurf (Devin Local) | `.devin/rules/*.md`, `.devin/global_rules.md` | อ่าน เป็นกติกาแบบ always-on |

**Claude Code** ไฟล์ของมันคือ `CLAUDE.md` ซึ่งวางได้หลายระดับ ตั้งแต่ระดับองค์กร (managed) ระดับผู้ใช้ `~/.claude/CLAUDE.md` ระดับโปรเจกต์ `./CLAUDE.md` หรือ `./.claude/CLAUDE.md` ระดับส่วนตัว `./CLAUDE.local.md` และโฟลเดอร์ `.claude/rules/` เอกสารบอกว่ามันโหลด CLAUDE.md จากโฟลเดอร์ที่ทำงานอยู่และทุกโฟลเดอร์ที่อยู่เหนือขึ้นไป ส่วนโฟลเดอร์ย่อยจะโหลดเมื่อ Claude ไปอ่านหรือแก้ไฟล์ในโฟลเดอร์นั้น เรื่อง AGENTS.md มีกติกาเฉพาะซึ่งผมแยกไปอธิบายในหัวข้อถัดไป

**Codex** ใช้ AGENTS.md เป็นไฟล์หลัก ระดับ global อยู่ใน `~/.codex` (อ่าน `AGENTS.override.md` ก่อน ถ้าไม่มีค่อยอ่าน `AGENTS.md`) ระดับโปรเจกต์ เอกสารบอกว่ามันเดินจาก root ของโปรเจกต์ (ปกติคือ root ของ Git) ลงมาถึงโฟลเดอร์ปัจจุบัน แต่ละโฟลเดอร์หยิบได้ไม่เกินหนึ่งไฟล์ ไฟล์ที่ใกล้โฟลเดอร์ปัจจุบันจะอยู่ท้ายสุดจึงมีน้ำหนักกว่า และหยุดเพิ่มไฟล์เมื่อขนาดรวมถึง `project_doc_max_bytes` ซึ่งค่าเริ่มต้นคือ 32 KiB ถ้าอยากให้อ่านไฟล์ชื่ออื่น ต้องใส่ใน `project_doc_fallback_filenames` เอกสารเขียนไว้ว่า "Filenames not on this list are ignored for instruction discovery."

**Cursor** กติกาของโปรเจกต์อยู่ใน `.cursor/rules` เป็นไฟล์ `.mdc` ที่มี frontmatter เอกสารบอกชัดว่าไฟล์ `.md` ธรรมดาในโฟลเดอร์นั้นจะถูกข้าม แต่ละ rule เลือกได้ว่าจะใช้ตลอด ใช้เมื่อเจอไฟล์ที่ตรง glob ให้ agent เลือกเองจาก description หรือใช้เมื่อ @-mention เท่านั้น ส่วน AGENTS.md เอกสารเขียนว่า "Cursor supports AGENTS.md in the project root and subdirectories." และไฟล์ในโฟลเดอร์ย่อยจะรวมกับไฟล์ที่อยู่เหนือขึ้นไป โดยไฟล์ที่เจาะจงกว่ามีน้ำหนักกว่า

**Gemini CLI** ใช้ชื่อไฟล์เริ่มต้นว่า `GEMINI.md` มีทั้งระดับ global `~/.gemini/GEMINI.md` และระดับ workspace รองรับการ import ด้วย `@file.md` ถ้าอยากให้อ่าน AGENTS.md ต้องตั้ง `context.fileName` ใน settings.json ตัวอย่างในเอกสารคือ

```json
{
  "context": {
    "fileName": ["AGENTS.md", "CONTEXT.md", "GEMINI.md"]
  }
}
```

**GitHub Copilot** ไฟล์ทั้ง repo คือ `.github/copilot-instructions.md` และแยกตาม path ได้ด้วย `.github/instructions/NAME.instructions.md` ที่มี `applyTo` ใน frontmatter เอกสารบอกว่า AGENTS.md วางที่ไหนใน repo ก็ได้ และ "the nearest `AGENTS.md` file in the directory tree will take precedence." ที่น่าสนใจคือเอกสารยังเขียนว่า "Alternatively, you can use a single `CLAUDE.md` or `GEMINI.md` file stored in the root of the repository." หน้าที่ผมอ่านไม่ได้แจกแจงว่า surface ไหนของ Copilot ใช้ไฟล์ไหนบ้าง ต้องเช็กเพิ่มถ้าทีมใช้ Copilot หลายที่

**Windsurf** ตอนผมเปิดเอกสาร URL redirect ไปที่หน้า "Devin Local Customizations" แล้ว หน้านั้นบอกว่า `AGENTS.md`, `AGENTS.local.md` และ `AGENT.md` ถูกอ่านเป็นกติกาแบบ always-on ทั้งที่ root ของ workspace และทุกโฟลเดอร์ระหว่างทางลงไปถึงโฟลเดอร์ที่ทำงานอยู่ ไฟล์ rule ของตัวเองอยู่ใน `.devin/rules/*.md` และไฟล์เดิมอย่าง `.windsurf/rules/*.md`, `.windsurf/global_rules.md` และ `.windsurfrules` "are imported by default."

เห็นแบบนี้แล้วจะเข้าใจว่าทำไม[เว็บ agents.md](https://agents.md/) ถึงพยายามให้ AGENTS.md เป็นมาตรฐานกลาง เว็บนั้นเรียกมันว่า "README for agents" และบอกว่าตอนนี้ดูแลโดย Agentic AI Foundation ภายใต้ Linux Foundation ในรายชื่อเครื่องมือที่รองรับมีทั้ง Codex, Cursor, Gemini CLI, GitHub Copilot coding agent และ Windsurf ครับ ส่วน Claude Code รองรับผ่านกลไกของตัวเอง ซึ่งคือที่มาของกับดัก

## กับดัก: Claude Code อ่าน AGENTS.md ก็ต่อเมื่อไม่มี CLAUDE.md

เอกสาร Claude Code เขียนไว้ตรง ๆ ว่า

> Claude reads `AGENTS.md` only when you have no `CLAUDE.md` in your working directory or above it.

และมีตารางสรุปค่าเริ่มต้นไว้แบบนี้

| ใน repo มี | Claude Code อ่าน |
|---|---|
| AGENTS.md อย่างเดียว ไม่มี CLAUDE.md หรือ CLAUDE.local.md ในโฟลเดอร์ที่ทำงานหรือเหนือขึ้นไป | AGENTS.md |
| AGENTS.md และมี CLAUDE.md หรือ CLAUDE.local.md | CLAUDE.md อย่างเดียว |
| CLAUDE.md ที่ import AGENTS.md | CLAUDE.md พร้อม AGENTS.md ที่ถูก import เข้ามา |

ที่ทำให้มันเป็นกับดักจริง ๆ คือรายละเอียดว่าไฟล์ไหน "นับ" บ้างครับ เอกสารบอกว่าไฟล์ที่ทำให้ Claude Code ไม่อ่าน AGENTS.md คือ `CLAUDE.md`, `.claude/CLAUDE.md` หรือ `CLAUDE.local.md` ในโฟลเดอร์ที่ทำงานหรือโฟลเดอร์ใดก็ได้ที่อยู่เหนือขึ้นไป ส่วนที่ไม่นับคือ `~/.claude/CLAUDE.md` ของผู้ใช้ CLAUDE.md ระดับองค์กร และไฟล์ใน `.claude/rules/`

ลองนึกภาพทีมผมดูครับ repo มี AGENTS.md ที่ทีมดูแลร่วมกัน มีกติกาเรื่อง test ที่ผมเขียนไว้ในโพสต์ที่แล้ว วันหนึ่ง junior คนหนึ่งสร้าง `CLAUDE.local.md` ไว้จดเรื่องส่วนตัว (ไฟล์นี้ปกติอยู่ใน `.gitignore` ไม่มีใครเห็นใน PR) เอกสารเตือนเรื่องนี้ไว้ตรงตัวว่า "Because `CLAUDE.local.md` counts, adding one ... stops Claude from reading `AGENTS.md` for you." ตั้งแต่วันนั้น Claude Code ในเครื่องเขาก็ไม่เห็นกติกาของทีมอีกเลย ขณะที่ Codex และ Cursor ในเครื่องคนอื่นยังเห็นปกติ

อีกแบบที่เจอได้คือ monorepo ที่มี CLAUDE.md อยู่ที่ root แล้วมี AGENTS.md อยู่ในแต่ละ package ตามที่เว็บ agents.md แนะนำ เพราะ CLAUDE.md ที่อยู่เหนือขึ้นไปก็นับ AGENTS.md ใน package จึงไม่ถูกอ่านโดย Claude Code ตามค่าเริ่มต้น

สิ่งที่อันตรายคือมันเงียบครับ ไม่มี error ไม่มีอะไรพัง agent ก็ยังทำงานได้ แค่ทำงานโดยไม่รู้กติกาที่เราคิดว่ามันรู้ และเราจะมารู้ตัวตอนรีวิว PR แล้วเจอว่ามันทำสิ่งที่ AGENTS.md ห้ามไว้

รายละเอียดอื่นจากเอกสารที่ควรรู้

- การอ่าน AGENTS.md โดยตรง "requires Claude Code v2.1.277 or later" เวอร์ชันก่อนนั้นอ่านแค่ CLAUDE.md
- ก่อน v2.1.281 บาง session เช่นบน Amazon Bedrock หรือที่ปิด telemetry จะอ่านแค่ CLAUDE.md
- ถ้าใครปิด built-in plugin ตัวนี้ผ่าน `/plugin` ก็จะไม่อ่าน AGENTS.md เช่นกัน
- Claude Code ไม่อ่าน `AGENTS.local.md`, `AGENTS.override.md` หรือไฟล์ใต้ `.agents/` ซึ่งต่างจาก Codex ที่อ่าน `AGENTS.override.md` และ Windsurf/Devin ที่อ่าน `AGENTS.local.md`
- เมื่อไม่มี CLAUDE.md และ Claude Code โหลด AGENTS.md เอกสารบอกว่าจะมีข้อความทำนอง `no CLAUDE.md found; AGENTS.md loaded: ...` ตอนเริ่ม session

ข้อสุดท้ายนี่แหละที่ผมว่าสำคัญที่สุดสำหรับทีมครับ เพราะมันคือหลักฐานว่า agent โหลดอะไรจริง

## วิธีแก้ที่ผมจะเลือก

**1. ให้ CLAUDE.md import AGENTS.md (วิธีที่ผมเลือกเป็นหลัก)** CLAUDE.md รองรับ `@path` เพื่อดึงไฟล์อื่นเข้ามา เอกสารบอกว่า path แบบ relative จะอิงจากไฟล์ที่เขียน import ไม่ใช่โฟลเดอร์ที่ทำงานอยู่ และ import ซ้อนกันได้ไม่เกินสี่ชั้น ตัวอย่างที่เอกสารให้ไว้คือ

```markdown
@AGENTS.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

แบบนี้ทีมดูแลกติการ่วมใน AGENTS.md ที่เดียว และ CLAUDE.md มีไว้เฉพาะของที่เป็นเรื่องของ Claude Code จริง ๆ ข้อควรระวังจากเอกสารคือ import ที่อยู่ใน code span หรือ code block จะไม่ถูกอ่าน และ path ที่ใส่เครื่องหมายคำพูดก็ไม่ถูก import ส่วน import ที่ชี้ออกนอกโฟลเดอร์ที่ทำงานจะขึ้นหน้าต่างให้อนุมัติครั้งแรก ถ้ากดปฏิเสธ import นั้นจะปิดไปและไม่ถามอีก อันนี้ต้องบอก junior ไว้ เพราะกดปฏิเสธครั้งเดียวก็เงียบไปเลย

**2. ตั้งค่า Project instructions** ใน `/config` มีตัวเลือก "Project instructions" สี่ค่า ตามที่เอกสารเขียน

- `claude-md-or-agents-md` ค่าเริ่มต้น อ่าน CLAUDE.md หรืออ่าน AGENTS.md ถ้าไม่มี CLAUDE.md
- `claude-md-and-agents-md` อ่านทั้งคู่ CLAUDE.md ของแต่ละโฟลเดอร์ก่อนแล้วตามด้วย AGENTS.md และข้าม AGENTS.md ที่โหลดไปแล้วผ่าน import หรือ symlink จะได้ไม่อ่านซ้ำ
- `claude-md` อ่าน CLAUDE.md อย่างเดียว
- `managed-only` อ่านแค่ CLAUDE.md ระดับองค์กรกับ auto memory ตอนเริ่ม

ข้อจำกัดที่ทำให้ผมไม่เลือกวิธีนี้เป็นหลักคือมันเป็นการตั้งค่าต่อเครื่อง README ของ mods/agents-md เขียนว่าตั้งได้ใน user settings (`~/.claude/settings.json`), `--settings` หรือ managed settings และ "a project's `.claude/settings.json` is not read for plugin options." แปลว่าผมใส่ไว้ใน repo ให้ทั้งทีมไม่ได้ ต้องให้ทุกคนตั้งเอง หรือให้ฝั่งองค์กรตั้งผ่าน managed settings

เรื่องชื่อ key ต้องระวังครับ README ใช้ตัวอย่างแบบนี้

```json
{
  "pluginConfigs": {
    "agents-md@builtin": {
      "options": { "instructionFiles": "claude-md-and-agents-md" }
    }
  }
}
```

แต่หน้า memory ของเอกสารบอกว่าตั้งแต่ v2.1.285 key เปลี่ยนเป็น `cc-plugin-agents-md@builtin` เวอร์ชันก่อนหน้าจะไม่รู้จัก key ใหม่ ส่วน v2.1.285 ขึ้นไปรับได้ทั้งสองแบบ ถ้าจะใช้วิธีนี้ ผมแนะนำให้ตั้งผ่าน `/config` แทนการแก้ JSON เอง จะได้ไม่ต้องเดาว่าเวอร์ชันในเครื่องใช้ key ไหน

**3. symlink** เอกสารบอกว่า `ln -s AGENTS.md CLAUDE.md` ใช้ได้ Claude อ่านเนื้อหาผ่าน link และเครื่องมือ Edit กับ Write จะไม่เขียนผ่าน symlink แต่จะบอกให้ไปแก้ที่ AGENTS.md แทน ข้อเสียคือบน Windows เอกสารแนะนำให้ใช้ `@AGENTS.md` แทน เพราะ symlink ต้องใช้สิทธิ์ Administrator หรือ Developer Mode และ Git จะ checkout link เป็นไฟล์ข้อความธรรมดาถ้าไม่ได้เปิด `core.symlinks` ทีมผมมีคนใช้ Windows เลยไม่เลือกวิธีนี้ อีกข้อคือ symlink ทำให้ CLAUDE.md กับ AGENTS.md เป็นไฟล์เดียวกัน ไม่มีที่ให้ใส่กติกาเฉพาะของ Claude Code

**4. ต้นฉบับเดียว แล้วให้ไฟล์อื่นชี้กลับ** ข้อนี้คือหลักการที่ครอบสามข้อข้างบนครับ ผมเลือก AGENTS.md เป็นต้นฉบับ เพราะ Codex, Cursor, Copilot และ Windsurf/Devin อ่านมันได้เองตามเอกสาร Gemini CLI อ่านได้เมื่อตั้ง `context.fileName` ส่วน Claude Code ใช้ CLAUDE.md ที่ import เข้ามา

ไฟล์ของ agent แต่ละตัว (`CLAUDE.md`, `.cursor/rules/`, `.github/copilot-instructions.md`) มีไว้สำหรับของที่เฉพาะ agent นั้นจริง ๆ เท่านั้น ไม่ใช่ที่ก๊อปกติกาของทีมไปวางซ้ำ เพราะวันที่กติกาเปลี่ยน คนจะแก้แค่ไฟล์เดียวแล้วลืมอีกสี่ไฟล์เสมอ

สิ่งที่ผมจะไม่ทำคือเขียนกติกาเดียวกันไว้หลายไฟล์แล้วหวังว่ามันจะตรงกันตลอด ไฟล์กติกาก็คือโค้ดชิ้นหนึ่ง การก๊อปวางซ้ำในโค้ดเราไม่ชอบยังไง ในไฟล์กติกาก็ควรไม่ชอบแบบนั้น

## ตรวจว่า agent โหลดกติกาจริง

วิธีแก้ทั้งหมดข้างบนไม่มีความหมายถ้าไม่ตรวจครับ สิ่งที่ผมจะให้ทีมทำ

- **ดูจากเครื่องมือของ agent เอง** Claude Code มีข้อความตอนเริ่ม session เมื่อโหลด AGENTS.md และมีคำสั่ง `/memory` กับ `/context` (ผมยังไม่ได้ลองเองว่าเวอร์ชันที่ทีมใช้แสดง AGENTS.md ในสองคำสั่งนี้ครบไหม) Gemini CLI มี `/memory show` ที่แสดงเนื้อหาที่รวมแล้ว
- **ใส่ประโยคทดสอบ** ผมชอบใส่บรรทัดสั้น ๆ ใน AGENTS.md เช่นชื่อโปรเจกต์หรือกติกาที่เห็นผลง่าย แล้วถาม agent แต่ละตัวว่า "กติกาเรื่อง test ของ repo นี้คืออะไร" ถ้าตอบไม่ได้ แปลว่าไม่ได้โหลด อันนี้เป็นวิธีของผมเอง ไม่ใช่วิธีที่เอกสารแนะนำ
- **เช็กไฟล์ที่ซ่อนอยู่** `CLAUDE.local.md` อยู่ใน `.gitignore` ไม่มีใครเห็นใน PR เวลาใครบ่นว่า Claude Code ไม่ทำตามกติกา ข้อแรกที่ผมจะถามคือมีไฟล์นี้ในเครื่องไหม หรือมี CLAUDE.md อยู่ในโฟลเดอร์ที่เหนือ repo ขึ้นไปหรือเปล่า

## Checklist สำหรับทีมที่ใช้ agent หลายตัว

**ตั้งโครงสร้างไฟล์**

- [ ] เลือกต้นฉบับเดียวสำหรับกติกาของทีม (ผมเลือก AGENTS.md) และเขียนไว้ใน README ว่าแก้ที่ไหน
- [ ] CLAUDE.md ขึ้นต้นด้วย `@AGENTS.md` และมีเฉพาะของที่เป็นเรื่องของ Claude Code
- [ ] ถ้าใช้ Gemini CLI ตั้ง `context.fileName` ให้มี AGENTS.md
- [ ] `.cursor/rules/`, `.github/copilot-instructions.md` และไฟล์ของ agent อื่นไม่ก๊อปกติกาจาก AGENTS.md มาซ้ำ
- [ ] ถ้าเป็น monorepo ตรวจว่า CLAUDE.md ที่ root ไม่ได้บัง AGENTS.md ใน package

**ตกลงกับทีม**

- [ ] ทุกคนรู้ว่า `CLAUDE.local.md` ทำให้ Claude Code เลิกอ่าน AGENTS.md (ตามค่าเริ่มต้น)
- [ ] ทุกคนใช้ Claude Code v2.1.277 ขึ้นไป และถ้าใช้ผ่าน Bedrock หรือปิด telemetry ให้ใช้ v2.1.281 ขึ้นไป (ตามเอกสาร ณ วันที่เขียน)
- [ ] ถ้าจะใช้ setting Project instructions ตกลงกันว่าใครตั้ง ตั้งที่ระดับไหน เพราะใส่ใน `.claude/settings.json` ของโปรเจกต์ไม่ได้
- [ ] มีคนรับผิดชอบเช็กเอกสารของ agent ที่ทีมใช้เป็นระยะ เพราะพฤติกรรมเปลี่ยนตามเวอร์ชัน

**ทุกครั้งที่แก้กติกาหรือเพิ่ม agent ตัวใหม่**

- [ ] แก้ที่ต้นฉบับไฟล์เดียว
- [ ] ถาม agent ทุกตัวที่ทีมใช้ด้วยคำถามเดียวกันว่ากติกาคืออะไร และคำตอบตรงกัน
- [ ] PR ที่สร้างหรือลบไฟล์กติกา (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursor/rules/`, `.github/copilot-instructions.md`) ต้องมีคนรีวิวเสมอ ผมจะใส่ไฟล์เหล่านี้ใน CODEOWNERS แบบเดียวกับโฟลเดอร์ test ใน[โพสต์ที่แล้ว](/blog/agent-rewrites-tests-ci-green)

## ท้ายที่สุด

ผมไม่คิดว่าพฤติกรรมของ Claude Code เป็นบั๊กครับ เอกสารเขียนไว้ชัด มีตารางให้ดู และมีตัวเลือกให้เปลี่ยน การที่ CLAUDE.md มาก่อนก็มีเหตุผล เพราะคนที่เขียน CLAUDE.md ไว้แล้วคงไม่อยากให้กติกาจากไฟล์อื่นแทรกเข้ามาโดยไม่รู้ตัว ปัญหาจริงคือเราไม่ได้อ่านเอกสาร แล้วเชื่อว่าทุก agent ทำงานเหมือนกัน

แผนที่ของ Sachin มีประโยชน์ตรงที่ชี้จุดนี้ให้เห็น แต่ผมก็ยังไม่ได้อ่านแผนที่เต็มของเขา และเอกสารที่ผมอ่านวันนี้ก็อาจเปลี่ยนในอีกไม่กี่เดือน สิ่งที่ผมเก็บไว้เลยไม่ใช่ตารางว่าใครอ่านไฟล์ไหน แต่เป็นนิสัยว่าทุกครั้งที่เขียนกติกาให้ agent ต้องถามต่อว่าเรารู้ได้ยังไงว่ามันอ่าน

ก่อนจะโทษ agent ตัวต่อไปว่าไม่ทำตามกติกา ผมจะถามตัวเองข้อเดียวครับ "ผมเคยเห็นกับตาไหมว่า agent ตัวนี้โหลดไฟล์กติกาที่ผมแก้" ถ้าไม่เคย ปัญหาอาจไม่ได้อยู่ที่ agent ครับ
