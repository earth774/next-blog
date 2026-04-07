---
title: "OWASP สำหรับแอป Agentic/LLM — Threat Model + Controls"
date: "2026-04-07"
excerpt: "ทำไมระบบ agentic/LLM ขยาย attack surface อย่างมีนัยสำคัญ — ผูกภาพรวมกับ OWASP Top 10 for LLM Applications (2025) ทั้งมุมเฉพาะ agent (tools, memory, MCP) และแนวปฏิบัติควบคุมความเสี่ยงที่วิศวกรนำไปใช้ได้จริง"
---

แอปที่ใช้เพียง LLM กับแอปแบบ **agent** ที่วางแผนหลายขั้น เรียกเครื่องมือ (tools/plugins) อ่าน/เขียนหน่วยความจำ และเชื่อมต่อระบบภายนอกผ่าน connector นั้น **ไม่ใช่แค่เพิ่มฟีเจอร์** — แต่เป็นการขยายพื้นที่โจมตีแบบเชิงระบบ: ข้อความที่ไม่น่าไว้วางใจสามารถไหลเข้า chain-of-thought, นโยบาย, การดึงข้อมูล (RAG) และคำสั่งที่สั่งให้โค้ดหรือ API ทำงานจริงได้ บทความนี้ใช้ภาษากลางจาก [OWASP Top 10 for LLM Applications (2025)](https://genai.owasp.org/llm-top-10/) เป็นโครง threat model แล้วต่อยอดมุมเฉพาะ agentic — **รายละเอียดคำจำกัดความและคำแนะนำ mitigation ล่าสุดควรตรวจสอบกับเอกสารทางการของ OWASP และผู้ให้บริการโมเดล/แพลตฟอร์มที่คุณใช้อยู่เป็นประจำ** เพราะข้อมูลในพื้นที่ GenAI เปลี่ยนเร็ว

---

## ทำไม Agentic/LLM ถึงขยาย attack surface

- **ช่องทางอินพุตหลายชั้น**  
  นอกจากข้อความผู้ใช้โดยตรง ยังมีเนื้อหาจากเว็บ/อีเมล/เอกสารที่ถูก ingest, ผลจากเครื่องมือ, บริบทจาก memory store และข้อความจากผู้ใช้คนอื่นในระบบหลายผู้ใช้ — แต่ละชั้นอาจพา **indirect prompt injection** เข้ามาได้

- **พฤติกรรมไม่ตายตัวแบบโค้ดทั่วไป**  
  LLM ตอบสนองต่อรูปแบบภาษาที่ยืดหยุ่น ทำให้ "กฎ" ใน system prompt ไม่เทียบเท่ากับ policy enforcement แบบ deterministic — ต้องออกแบบ **controls รอบนอกโมเดล** (authorization, validation, sandbox)

- **สะพานจาก "ข้อความ" ไป "การกระทำ"**  
  Agent ที่ invoke function calling, รันโค้ด, เรียก HTTP หรือเขียน ticket/อีเมล คือการยกระดับผลกระทบจากการรั่วของข้อความไปสู่ **การเปลี่ยนสถานะในระบบจริง**

- **Orchestration และ state**  
  แผนหลายขั้น (multi-step plans), คิวงาน และ memory ข้ามเซสชันทำให้การโจมตีแบบ "เล่นยาว" มีที่ให้ซ่อน เช่น ปลูกคำสั่งใน memory หรือ chain ที่รอจังหวะ human-in-the-loop ผิดพลาด

- **Supply chain ของโมเดลและข้อมูล**  
  โมเดล base/fine-tune, ชุดข้อมูลฝึก, embedding model, vector DB และ MCP server ภายนอก — ทั้งหมดเป็นทรัพยากรที่ต้องมีความไว้วางใจ (trust) และกลไกตรวจสอบ

---

## แผนที่ความเสี่ยงกับ OWASP Top 10 for LLM Applications (2025)

รายการด้านล่างอ้างอิงชื่อหมวด **LLM01:2025–LLM10:2025** ตาม [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (เวอร์ชัน 2025) — ใช้เป็น "สารบัญ" แล้วตีความในบริบท agentic

### LLM01:2025 Prompt Injection

- **ลักษณะใน agentic:** คำสั่งแฝงในเนื้อหาที่ถูก retrieve, ผล tool ที่ถูก poison หรือข้อความที่ส่งต่อในแผนหลายขั้น — เป้าหมายมักเป็นการ override นโยบาย, เรียก tool ที่อันตราย หรือ exfil ข้อมูลผ่านช่องทางที่ระบบอนุญาต
- **ประเด็นที่ต้องออกแบบ:** แยกบทบาท (user vs system vs tool output), ลดการ "เชื่อ" เนื้อหาที่ไม่น่าไว้วางใจเป็น instruction ชั้นสูง และใช้การตีความ/ดำเนินการแบบมีขั้นตอนที่ควบคุมได้

### LLM02:2025 Sensitive Information Disclosure

- **ลักษณะใน agentic:** การรั่วของ PII/ความลับผ่านคำตอบ, log ของ prompt/completion, trace ของ tool arguments หรือการดึง chunk จาก RAG ที่มีข้อมูลอ่อนไหวเกินจำเป็น
- **ประเด็นที่ต้องออกแบบ:** data minimization ใน context, การ redact/mask ใน observability และ policy ว่า tool ใดเห็นข้อมูลชั้นใด

### LLM03:2025 Supply Chain

- **ลักษณะใน agentic:** แพ็กเกจ SDK, adapter ของผู้ให้บริการโมเดล, MCP server ของบุคคลที่สาม, pipeline สำหรับ fine-tune/eval — จุดใดก็ตามที่แทรกโค้ดหรือโมเดลที่ไม่ผ่านการตรวจสอบอาจกลายเป็นช่อง persistency
- **ประเด็นที่ต้องออกแบบ:** pin เวอร์ชัน, ตรวจ checksum, รีวิวแหล่งที่มา และแยก environment สำหรับทดลองกับ production

### LLM04:2025 Data and Model Poisoning

- **ลักษณะใน agentic:** ข้อมูลใน corpus สำหรับ RAG, feedback loop จากผู้ใช้ที่ย้อนกลับไปเป็น knowledge หรือชุดข้อมูลที่ใช้ปรับพฤติกรรม — ถูกใส่คำสั่งหรือ bias ที่ส่งผลต่อการตัดสินใจของ agent ในระยะยาว
- **ประเด็นที่ต้องออกแบบ:** provenance ของเอกสาร, การอนุมัติก่อน ingest และการ monitor drift/พฤติกรรมผิดปกติหลังอัปเดตข้อมูล

### LLM05:2025 Improper Output Handling

- **ลักษณะใน agentic:** นำ string จากโมเดลไป render เป็น HTML, ส่งต่อเป็น shell/SQL หรือ parse เป็นโครงสร้างที่รัน pipeline โดยไม่มี schema/allowlist — ใกล้เคียงปัญหา classic injection แต่จุดเริ่มคือ "ข้อความที่ดูสุภาพ"
- **ประเด็นที่ต้องออกแบบ:** treat model output as untrusted input, ใช้ structured output + validate และหลีกเลี่ยงการรวม string แบบ unsafe

### LLM06:2025 Excessive Agency

- **ลักษณะใน agentic:** agent มีสิทธิ์เรียก API กว้างเกินไป, อนุมัติการชำระเงิน/ส่งอีเมลภายนอก/แก้ไข config โดยไม่มี guardrail — เป็นหัวใจของความเสี่ยง "ทำได้จริง" ในระบบ production
- **ประเด็นที่ต้องออกแบบ:** least privilege ต่อ tool, แยก account สำหรับ automation และขั้นตอนอนุมัติสำหรับการกระทำที่กู้คืนยาก

### LLM07:2025 System Prompt Leakage

- **ลักษณะใน agentic:** ผู้โจมตีพยายามดึง system prompt, นโยบายภายใน หรือ schema/รายการ tool ที่เปิดเผยข้อมูลเกี่ยวกับสถาปัตยกรรม — ช่วยวางแผนโจมตีต่อเนื่องได้แม่นยำขึ้น
- **ประเด็นที่ต้องออกแบบ:** ลดการใส่ความลับใน prompt, แยก policy ที่ enforce นอกโมเดล และจำกัดรายละเอียดที่สะท้อนกลับสู่ผู้ใช้

### LLM08:2025 Vector and Embedding Weaknesses

- **ลักษณะใน agentic:** การค้นหาแบบ similarity ถูกจูงให้ดึง chunk ที่มีคำสั่งร้าย, การแยกสิทธิ์ระดับเอกสารไม่ละเอียด หรือ metadata ที่รั่วทำให้ข้ามการควบคุมการเข้าถึง
- **ประเด็นที่ต้องออกแบบ:** ACL ต่อ tenant/user, hygiene ของ chunking และการทดสอบ retrieval ภายใต้สมมติฐานข้อมูลถูก poison

### LLM09:2025 Misinformation

- **ลักษณะใน agentic:** agent สรุปหรือตัดสินใจจากแหล่งที่ไม่ครบ — โดยเฉพาะเมื่อมีเครื่องมือค้นหาหรือ RAG ที่ดึงเนื้อหาคุณภาพต่ำ — สร้างความเสียหายทางธุรกิจ/กฎหมายแม้ไม่มี "แฮ็ก" แบบดั้งเดิม
- **ประเด็นที่ต้องออกแบบ:** citation policy, confidence handling และ human review สำหรับ workflow ที่ตัดสินใจสำคัญ

### LLM10:2025 Unbounded Consumption

- **ลักษณะใน agentic:** loop การเรียกโมเดล/เครื่องมือไม่สิ้นสุด, การโจมตีแบบทำให้ต้นทุน API พุ่ง (denial-of-wallet) หรือคิวงานที่ขยายตัวจากแผนที่ล้มเหลว
- **ประเด็นที่ต้องออกแบบ:** budget, rate limit, timeout, max steps และ kill switch ระดับบริการ

---

## มุมมองเฉพาะระบบ Agentic

### Tools, plugins และ orchestration

- **Tool คือ RPC ที่ขับเคลื่อนด้วยภาษา** — ต้องมีสัญญา (schema), ขอบเขตพารามิเตอร์ และ **authorization แยกจาก "ความตั้งใจ" ของโมเดล**
- **Orchestrator** (workflow engine, planner, sub-agent) ต้องถูก threat model เหมือน service ตัวหนึ่ง: ใครส่ง event เข้ามาได้บ้าง, state เก็บที่ไหน และ retry/backoff จะถูกใช้เป็นช่อง DoS ได้หรือไม่

### Memory ข้ามรอบและแผนหลายขั้น

- **Long-term memory** อาจกลายเป็นที่เก็บ payload ถ้าไม่มีการ sanitize และการแยกสิทธิ์ — ผู้โจมตีอาจ "ปลูก" คำสั่งแล้วรอให้ session อื่นหรือขั้นตอนถัดไปหยิบไปใช้
- **แผนหลายขั้น** ควรมี **checkpoint** และเงื่อนไขหยุดฉุกเฉิน — พร้อมบันทึกเหตุผลที่มนุษย์ตรวจสอบย้อนหลังได้ (แต่ระวังอย่าเก็บข้อมูลอ่อนไหวเกินจำเป็น)

### Human-in-the-loop และการ bypass

- HITL ช่วยลดความเสี่ยง แต่ต้องออกแบบให้ **ไม่ถูกหลอกให้ "อนุมัติ" สิ่งที่ซ่อนบริบท** — เช่น UI ที่แสดง diff/พารามิเตอร์ครบ, แยกสิทธิ์ approver จากผู้ร้องขอ และบันทึก audit trail
- ตรวจสอบ path ที่ข้าม HITL ได้ทั้งหมด (exception, maintenance mode, feature flag) ว่าไม่กลายเป็นประตูหลัง

### Supply chain: โมเดล, ข้อมูล, MCP / connectors

- **Model lifecycle:** แหล่ง weight, adapter และบริการ inference — ควรมีแนวทางเทียบเท่า dependency management สำหรับไลบรารี
- **MCP และ connector:** โปรโตคอลเช่น [Model Context Protocol](https://modelcontextprotocol.io/) ช่วยมาตรฐานการเชื่อม tools แต่ **ไม่ได้แทนที่การออกแบบความปลอดภัย** — ยังต้องมีการยืนยันตัวตน server, การอนุญาตขอบเขตทรัพยากร และการบันทึกเหตุการณ์เมื่อ agent เรียกเครื่องมือภายนอก

---

## Controls ที่วิศวกรควรลงมือจริง

### Governance และ threat modeling

- [ ] กำหนด **data classification** และ flow diagram ของข้อมูลเข้า/ออก agent (รวม log/trace)
- [ ] จัดทำ **abuse case** คู่กับ user story — โดยเฉพาะฟีเจอร์ที่มีการกระทำภายนอกหรือการเข้าถึงข้อมูลลูกค้า
- [ ] ทบทวนเป็นระยะกับ [OWASP GenAI / LLM Top 10](https://genai.owasp.org/llm-top-10/) และคู่มือของผู้ให้บริการ — **อย่าอ้างอิงรายการเก่าโดยไม่ตรวจหมายเลข LLMxx:2025 ล่าสุด**

### Sandboxing และขอบเขตการรันโค้ด

- แยกการรันโค้ดที่มาจากข้อเสนอของโมเดลไปยัง **sandbox** (container จำกัดสิทธิ์, ephemeral environment, ไม่มี network โดยค่าเริ่มต้น ถ้า use case อนุญาต)
- ใช้หลัก **defense in depth** ร่วมกับแนวทางความปลอดภัยของเว็บทั่วไป เช่น [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security) สำหรับการคิดเรื่อง origin, การให้สิทธิ์ข้ามโดเมน และ hardening ของแอปที่รับผลลัพธ์จาก LLM

### Least privilege สำหรับ tools

- หนึ่ง tool หนึ่งหน้าที่ — หลีกเลี่ยง "super tool" ที่ทำได้ทุกอย่าง
- ผูกสิทธิ์กับ **ตัวตนของผู้ใช้/บริการ** ไม่ใช่แค่กับ session ของ agent โดยไม่แยกแยะ
- ใช้ **allowlist** ของ endpoint, พารามิเตอร์ และขนาดผลลัพธ์ — ปฏิเสธค่าแปลกโดยค่าเริ่มต้น

### Output validation และ safe composition

- Parse ด้วย schema (JSON schema / typed SDK) แล้ว validate ก่อนดำเนินการ
- หลีกเลี่ยงการ concatenate ไปยังคำสั่ง OS/SQL/HTML โดยตรง — ใช้ API ที่ parameterized หรือ renderer ที่ escape ตามบริบท

### Logging, monitoring และ anomaly detection

- บันทึก **tool call** แยกจากเนื้อหา prompt ทั้งก้อนเมื่อทำได้ — ลดการเก็บข้อมูลอ่อนไหวแต่ยังเห็นแนวโน้มการโจมตี
- ตั้งเมตริก: อัตราล้มเหลวของ tool, ความถี่การเรียกที่ผิดปกติ, ต้นทุน token, latency — เป็นเครื่องเตือนสำหรับปัญหาในระดับ LLM10

### Red teaming และการทดสอบ

- จัดชุดทดสอบสำหรับ **direct/indirect injection**, การหลีกเลี่ยง HITL, การลองดึง system prompt และการ poison RAG ในสภาพแวดล้อมจำลอง
- ทำ **regression** หลังเปลี่ยน prompt, ชุดข้อมูล หรือชุด tool

### Incident response และ data handling

- เตรียม playbook เมื่อพบการเรียก tool ผิดนโยบาย: ระงับ agent, rotate key, แจ้งเจ้าของข้อมูล, เก็บหลักฐาน trace
- กำหนด retention ของ log ที่มี user content และกระบวนการลบตามกฎหมายที่เกี่ยวข้องกับธุรกิจของคุณ — **รายละเอียดความสอดคล้องกฎหมายควรตรวจกับทีม legal/compliance**

---

## สรุปสั้น ๆ ที่เอาไปทำต่อได้ทันที

1. **ยึด OWASP LLM01:2025–LLM10:2025 เป็นภาษากลาง** แล้วเขียน threat model ว่าแต่ละข้อปรากฏที่ layer ไหนของ agent ของคุณ (prompt, RAG, tool, orchestrator, memory, connector)
2. **ลด Excessive Agency ก่อน:** ทำให้ทุกการกระทำร้ายมีต้นทุนสูง — ด้วย least privilege, allowlist และ human gate สำหรับงานเสี่ยง
3. **อย่าเชื่อ output ของโมเดล:** validate โครงสร้าง, อย่า feed เข้า execution path โดยตรง และแยก policy enforcement ออกจากข้อความใน prompt
4. **วัดและจำกัดทรัพยากร:** budget/rate limit/step cap เพื่อสกัด Unbounded Consumption และการโจมตีเชิงต้นทุน
5. **ตรวจเอกสารล่าสุดอย่างสม่ำเสมอ** — ทั้งจาก OWASP GenAI และผู้ให้บริการ — เมื่ออัปเดตโมเดล ชุดข้อมูล หรือ MCP server
