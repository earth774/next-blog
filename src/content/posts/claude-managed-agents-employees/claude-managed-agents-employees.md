---
title: "Claude Managed Agents กับคำเปรียบ \"agent คือพนักงาน\": job description, ด่านอนุมัติ, ตรวจงานตัวเอง และ memory อะไรมีจริงในเอกสาร อะไรเป็นแค่คำเปรียบ"
date: "2026-11-18"
excerpt: "ช่วงนี้มีคนสรุปว่า Anthropic สอนให้มอง AI agent เป็นพนักงานที่มี job description มีด่านให้คนอนุมัติ ตรวจงานตัวเองได้ และมี memory กับ skills ผมตามไปอ่านเอกสารทางการของ Claude Managed Agents และ Claude Academy แล้วพบว่าฟีเจอร์ทั้งสี่มีจริง แต่คำว่า \"พนักงาน\" ผมหาไม่เจอในแหล่งทางการที่อ่านได้ บันทึกจากเดฟ·PM·PO ที่ดูแลทีม junior ว่าคำเปรียบนี้ใช้ได้ถึงตรงไหน พังตรงไหน ค่าเริ่มต้นข้อไหนที่ต้องระวัง พร้อม checklist"
author: "Sutthiphong Nuanma"
image: "/images/posts/claude-managed-agents-employees.webp"
tags:
  - AI
  - Critical Thinking
  - Agents
  - Claude
  - Management
---

งานประจำของผมครึ่งหนึ่งคือดูแลทีม junior อีกครึ่งคือสั่ง coding agent ทำงานครับ สองอย่างนี้คล้ายกันมากกว่าที่คิด ทั้งคู่ต้องบอกขอบเขตงานให้ชัด ทั้งคู่ต้องมีจุดที่ผมเข้าไปดูก่อนของจะขึ้น production และทั้งคู่ทำงานพังได้ถ้าผมสั่งงานแบบขอไปที

ช่วงนี้ผมเห็น[หัวข้อที่กำลังเป็นกระแสใน X](https://x.com/i/trending/2116222746040357036) เรื่อง Claude Managed Agents กับคอร์สฟรีของ Anthropic โดยคนที่สรุปต่อ ๆ กันมาเล่าว่าแนวคิดหลักคือให้มอง agent เป็น "พนักงาน" คนหนึ่ง system prompt คือ job description มีด่านให้คนอนุมัติก่อนทำเรื่องเสี่ยง มีการตรวจงานตัวเองก่อนส่ง และมี memory กับ skills ไว้สะสมความรู้

ในฐานะคนที่ดูแลคนจริง ๆ อยู่ทุกวัน ผมชอบคำเปรียบนี้ครับ แต่ก็เพราะชอบนี่แหละเลยต้องระวัง คำเปรียบที่ฟังแล้วถูกใจมักทำให้เราเลิกถามต่อ โพสต์นี้อยู่ในซีรีส์ Critical Thinking ต่อจาก[AGENTS.md กับ CLAUDE.md](/blog/agents-md-vs-claude-md) ที่ผมถามว่ากติกาที่เราเขียน agent อ่านจริงไหม ครั้งนี้ขอถามสองข้อ คือ Claude Managed Agents ตามเอกสารทางการคืออะไรกันแน่ และคำเปรียบ "agent คือพนักงาน" ใช้ได้ถึงตรงไหน

จุดยืนของผมสั้น ๆ คือ **ฟีเจอร์ทั้งสี่อย่างมีอยู่จริงในเอกสาร แต่คำเปรียบเรื่องพนักงานเป็นของคนสรุป ไม่ใช่ของเอกสารเท่าที่ผมหาเจอ และจุดที่คำเปรียบนี้พังคือจุดเดียวกับที่ระบบจะพัง คือความรับผิดชอบยังอยู่ที่คนตั้งค่า ไม่ได้ย้ายไปอยู่ที่ agent**

## แหล่งต้นทาง: อะไรที่ผมยืนยันได้ และอะไรที่ยืนยันไม่ได้

**ยืนยันไม่ได้**

- หน้า trending ใน X ผมเปิดอ่านไม่ได้ (ตอบกลับ HTTP 402) เลยไม่รู้ว่าโพสต์ต้นทางเขียนว่าอะไร ใครเป็นคนเขียน และมีคนเห็นด้วยมากแค่ไหน ที่ผมเล่าในย่อหน้าเปิดคือสิ่งที่เห็นจากการสรุปต่อ ๆ กัน ไม่ใช่การอ้างคำพูดของใคร
- **คำเปรียบ "agent คือพนักงาน" และ "system prompt คือ job description" ผมหาไม่เจอในแหล่งทางการที่อ่านได้** หน้าเอกสาร Managed Agents, tutorial ใน Claude Academy และบทความ Building effective agents ไม่มีคำว่า employee, job description, onboarding หรือ hire เลย ที่ใกล้ที่สุดคือเอกสารใช้คำว่า "persona" กับ agent และคอร์ส human-agent teams ใช้คำว่า "teammate" กับ "clear roles"
- "คอร์สฟรีเรื่อง Managed Agents" ผมยืนยันไม่ได้ว่ามีอยู่ในรูปแบบคอร์สเต็ม เว็บ `anthropic.skilljar.com` ตอบกลับ 403 ผมเลยอ่าน catalog ที่นั่นไม่ได้ ส่วนใน [Claude Academy](https://academy.claude.com/) ซึ่ง `anthropic.com/learn` redirect ไปหา สิ่งเดียวที่มีชื่อ Managed Agents คือ tutorial วิดีโอยาว 4 นาที ไม่ใช่คอร์ส
- หน้าแรกของ Academy เขียนว่า "Free courses on Claude and AI, from Anthropic." แต่หน้าคอร์สและ tutorial แต่ละตัวที่ผมเปิดไม่ได้ระบุราคาไว้เอง
- คอร์ส "Building effective human-agent teams (beta)" ผมอ่านแค่หน้าแนะนำคอร์ส ไม่ได้เรียนบทเรียนข้างใน เลยไม่รู้ว่าข้างในใช้คำเปรียบเรื่องพนักงานหรือไม่
- วิดีโอ tutorial 4 นาทีผมไม่ได้ดู อ่านแค่คำบรรยายในหน้า
- เอกสารหน้า permission policies, memory และ multiagent orchestration ยาว ส่วนท้ายของแต่ละหน้าผมได้อ่านเป็นสรุป ไม่ใช่ตัวเต็ม ส่วนหัวข้อราคาในหน้า pricing ของเอกสารผมก็ได้อ่านเป็นสรุปเช่นกัน ตัวเลขราคาที่ผมยกเป็นคำพูดตรงจึงมาจากบล็อกเปิดตัวเท่านั้น
- ตัวเลข "up to 10 points" ในบล็อกเปิดตัวเป็นผลทดสอบภายในของ Anthropic เอง ผมไม่มีทางตรวจซ้ำ
- **ผมยังไม่ได้ลองรัน Managed Agents เอง** ทุกอย่างข้างล่างคือสิ่งที่เอกสารเขียน ไม่ใช่สิ่งที่ผมทดสอบแล้ว ตัวอย่าง config ในโพสต์ผมเขียนขึ้นเองเพื่อประกอบ ต้องเทียบกับเอกสารก่อนใช้

**ยืนยันได้**

ผมอ่านจากแหล่งเหล่านี้เมื่อวันที่ 18 พฤศจิกายน 2026 ครับ

- เอกสาร Claude Managed Agents หน้า [Overview](https://platform.claude.com/docs/en/managed-agents/overview), [Quickstart](https://platform.claude.com/docs/en/managed-agents/quickstart), [Define your agent](https://platform.claude.com/docs/en/managed-agents/agent-setup), [Permission policies](https://platform.claude.com/docs/en/managed-agents/permission-policies), [Define outcomes](https://platform.claude.com/docs/en/managed-agents/define-outcomes), [Using agent memory](https://platform.claude.com/docs/en/managed-agents/memory), [Dreams](https://platform.claude.com/docs/en/managed-agents/dreams), [Skills](https://platform.claude.com/docs/en/managed-agents/skills) และ [Multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)
- บล็อกเปิดตัว [Claude Managed Agents: get to production 10x faster](https://claude.com/blog/claude-managed-agents) วันที่ 8 เมษายน 2026
- บทความวิศวกรรม [Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents) วันที่ 8 เมษายน 2026
- บทความ [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) วันที่ 19 ธันวาคม 2024
- Claude Academy หน้า [Build with Claude](https://academy.claude.com/collections/build-with-claude), tutorial [What is Claude Managed Agents?](https://academy.claude.com/tutorials/what-is-claude-managed-agents) และหน้าแนะนำคอร์ส [Building effective human-agent teams (beta)](https://academy.claude.com/courses/building-effective-human-agent-teams)

เรื่องนี้เปลี่ยนเร็วเหมือนเดิมครับ ตัวอย่างชัด ๆ คือบล็อกเปิดตัวเดือนเมษายนเขียนว่า multi-agent coordination กับ outcomes อยู่ใน research preview แต่เอกสารที่ผมอ่านวันนี้ระบุสองอย่างนี้เป็น beta แล้ว และบอกว่าสิ่งที่ยังอยู่ใน research preview คือ MCP tunnels กับ dreaming ถ้าอ่านโพสต์นี้ทีหลัง ให้กลับไปเช็กเอกสารก่อนเสมอ

## Claude Managed Agents คืออะไรตามเอกสาร

เอกสารนิยามไว้ประโยคเดียวว่า

> Claude Managed Agents provides the harness and infrastructure for running Claude as an autonomous agent.

ส่วนบล็อกเปิดตัวเรียกมันว่า "a suite of composable APIs for building and deploying cloud-hosted agents at scale." พูดง่าย ๆ คือมันเป็น API สำหรับนักพัฒนาครับ ไม่ใช่แอปสำเร็จรูป และไม่ใช่ Claude Code สิ่งที่ Anthropic รับไปดูแลให้คือ loop ที่เรียกโมเดล sandbox ที่ agent รันโค้ด และ log ของ session ซึ่งเป็นของที่ทีมต้องเขียนเองถ้าจะทำ agent ขึ้น production

เอกสารแบ่งแนวคิดหลักไว้สี่ตัว

| แนวคิด | คำอธิบายในเอกสาร |
|---|---|
| Agent | "The model, system prompt, tools, MCP servers, and skills" |
| Environment | ที่ที่ session รัน เป็น cloud sandbox ของ Anthropic หรือ sandbox ที่ host เองก็ได้ |
| Session | "A running agent instance within an environment, performing a specific task and generating outputs" |
| Events | ข้อความที่แอปของเรากับ agent ส่งหากัน เช่น user turn, tool result, status update |

รายละเอียดที่ควรรู้ก่อนตื่นเต้น

- **ยังเป็น beta** เอกสารเขียนว่า "Claude Managed Agents is in beta." ทุก endpoint ต้องใช้ beta header `managed-agents-2026-04-01`
- **ราคา** บล็อกเปิดตัวเขียนว่า "Standard Claude Platform token rates apply, plus $0.08 per session-hour for active runtime." แปลว่าจ่ายสองทาง คือ token กับเวลาที่ session รัน
- **ข้อมูล** หน้า overview ระบุว่าไม่เข้าเงื่อนไข Zero Data Retention (ยกเว้นแบบ self-hosted) และไม่เข้าเงื่อนไข HIPAA ถ้างานของทีมมีข้อมูลลูกค้า ข้อนี้ต้องคุยกับฝ่ายที่ดูแลเรื่องข้อมูลก่อน
- **tutorial ใน Academy** บรรยายว่า "You define the tools, environments, and success criteria." แล้ว "Claude works until the job is done." และเดโมมีระบบ incident response หลาย agent ที่มี "human-in-the-loop approval"

ประโยค "works until the job is done" ฟังดูดีครับ แต่สังเกตครึ่งแรกของประโยค คนที่กำหนด tools, environment และเกณฑ์ความสำเร็จคือเรา งานส่วนที่ยากไม่ได้หายไปไหน

## เทียบคำเปรียบกับของจริงในเอกสาร

ผมเอาคำเปรียบสี่ข้อที่คนสรุปกันมาวางเทียบกับฟีเจอร์ที่เอกสารมีจริงครับ

| คำเปรียบ | ของจริงในเอกสาร | สิ่งที่คำเปรียบไม่ได้บอก |
|---|---|---|
| Job description | Agent config: `system`, `model`, `tools`, `mcp_servers`, `skills` | เป็น config ที่มีเวอร์ชัน และแก้ทับได้ต่อ session |
| ด่านอนุมัติจากคน | Permission policies | ค่าเริ่มต้นของ toolset หลักคือไม่ถาม |
| ตรวจงานตัวเอง | Outcomes: rubric กับ grader | คนตรวจก็ยังเป็นโมเดล และ rubric เราต้องเขียนเอง |
| ความจำและทักษะ | Memory stores กับ Skills | memory ถูกเขียนของปลอมลงไปได้ skill กิน context |

### 1. Job description คือ agent config

เอกสารนิยาม agent ว่า

> An agent is a reusable, versioned configuration that defines persona and capabilities.

มันรวม model, system prompt, tools, MCP servers และ skills ไว้ด้วยกัน คำเปรียบ job description ใช้ได้ดีตรงนี้ครับ เพราะ JD ที่ดีไม่ได้มีแค่ "คุณเป็นใคร" แต่บอกด้วยว่าคุณมีสิทธิ์แตะอะไร และ agent config ก็รวมสองเรื่องนี้ไว้ที่เดียวกัน

จุดที่ผมชอบกว่า JD ของคนจริงคือเอกสารบอกว่า "Updating an agent generates a new version when the configuration changes." JD ของทีมผมไม่เคยมี version history เลย ใครแก้เมื่อไหร่ไม่มีใครรู้

จุดที่ต้องระวังคือ `model`, `system`, `tools`, `mcp_servers` และ `skills` แก้ทับได้ต่อ session โดยไม่เปลี่ยนตัว agent สะดวกครับ แต่แปลว่า "JD ที่เราเห็นใน config" กับ "JD ที่ session นั้นใช้จริง" อาจไม่ตรงกัน เวลาสืบว่าทำไม agent ทำแบบนั้น ต้องดูทั้งสองที่

### 2. ด่านอนุมัติ: ค่าเริ่มต้นคือไม่ถาม

ข้อนี้คือข้อที่ผมอยากให้อ่านช้า ๆ ที่สุดครับ เอกสารมี permission policy สามแบบ

- `always_allow` "The tool executes automatically with no confirmation."
- `always_ask` "The session pauses and waits for your approval before executing."
- `auto` "The server evaluates each call and runs it, denies it, or pauses for your approval."

และค่าเริ่มต้นคือ "the agent toolset defaults to `always_allow`, and MCP toolsets default to `always_ask`." toolset หลักของ agent ตามหน้า overview มีทั้ง Bash, การอ่านเขียนไฟล์ และ web search กับ fetch แปลว่าถ้าไม่ตั้งค่าอะไรเลย agent รัน shell command ได้โดยไม่มีใครอนุมัติ

คนที่ได้ยินคำสรุปว่า "มี human approval gate" อาจเข้าใจว่าด่านนี้มีมาให้ตั้งแต่แรก ความจริงตามเอกสารคือด่านมีให้ใช้ แต่เราต้องเป็นคนเปิด เหมือนรับพนักงานใหม่แล้วให้สิทธิ์ production ตั้งแต่วันแรก โดยบอกตัวเองว่าบริษัทเรามีขั้นตอนอนุมัตินะ

เอกสารยังเตือนเรื่อง `auto` ไว้ตรง ๆ ว่า

> `auto` is not a human checkpoint. If the server determines that a call is safe, the call runs before anyone sees it.

ส่วนขั้นตอนเมื่อ tool ต้องรออนุมัติ เอกสารอธิบายว่า session จะหยุดด้วย event `session.status_idle` ที่มี `stop_reason.type` เป็น `requires_action` แล้วแอปของเราต้องส่ง `user.tool_confirmation` กลับไปพร้อม `result` เป็น `"allow"` หรือ `"deny"` ตรงนี้มีงานที่ต้องทำเองอีกชิ้นครับ คือต้องมีหน้าจอหรือช่องทางให้คนกดอนุมัติ และต้องมีคนที่ว่างมากดจริง

อีกข้อที่คนข้ามง่ายคือ policy ใช้กับ tool ที่รันฝั่ง server เท่านั้น custom tool ที่รันในแอปของเรา policy ไม่ครอบคลุม ด่านของ tool พวกนั้นเราต้องเขียนเอง

เอกสารบอกว่าตั้ง policy แยกราย tool ได้ผ่าน `configs` ตัวอย่างข้างล่างตัดมาจากตัวอย่างใน[หน้า permission policies](https://platform.claude.com/docs/en/managed-agents/permission-policies) (ตรวจเทียบเมื่อ 18 พ.ย. 2026) ให้ bash ต้องรอคนอนุมัติทุกครั้ง ส่วน tool อื่นตามค่าเริ่มต้น

```json
{
  "type": "agent_toolset_20260401",
  "configs": [
    { "name": "bash", "permission_policy": { "type": "always_ask" } }
  ]
}
```

### 3. ตรวจงานตัวเอง: grader แยก context แต่ rubric เป็นงานของเรา

ฟีเจอร์ที่ตรงกับคำว่า self-review คือ outcomes เอกสารเขียนว่า

> An outcome tells the session what the end result should look like and how to measure its quality. The agent works toward that target, self-evaluating and iterating until the outcome is met.

กลไกคือเราส่ง rubric เป็น markdown ที่ให้คะแนนเป็นข้อ ๆ แล้ว harness จะสร้าง grader ขึ้นมาตรวจผลงานเทียบกับ rubric เอกสารบอกว่า "The grader uses a separate context window to avoid being influenced by the main agent's implementation choices." และวนแก้ได้ตาม `max_iterations` ซึ่งค่าเริ่มต้นคือ 3 สูงสุด 20

การแยก context เป็นการออกแบบที่ผมเห็นด้วยครับ มันคือเหตุผลเดียวกับที่เราไม่ให้คนเขียนโค้ดรีวิว PR ของตัวเอง แต่มีสามเรื่องที่คำว่า "ตรวจงานตัวเอง" ไม่ได้บอก

- **คนตรวจก็ยังเป็นโมเดล** grader แยก context ก็จริง แต่มันไม่ใช่คน และไม่ใช่การรีวิวอิสระแบบที่ทีมผมเข้าใจกัน มันตรวจได้ว่างานตรง rubric ไหม ตรวจไม่ได้ว่า rubric ถูกไหม
- **rubric คืองานของเรา** เอกสารเขียนว่า "The rubric is required." ถ้า rubric หลวม agent ก็ผ่านเกณฑ์หลวม ๆ ได้อย่างถูกต้องตามกติกา ใครอ่าน[โพสต์เรื่อง agent แก้ test ให้ CI เขียว](/blog/agent-rewrites-tests-ci-green) จะจำได้ว่าเกณฑ์ที่วัดผิดจุดพาไปไหน
- **ผลลัพธ์ไม่ได้มีแค่ผ่าน** event ปิดการประเมินมีได้หลายค่า รวมถึง `needs_revision`, `max_iterations_reached` และ `failed` แอปของเราต้องรับมือกรณีวนครบรอบแล้วยังไม่ผ่านด้วย

บล็อกเปิดตัวอ้างว่าในการทดสอบภายใน "Managed Agents improved outcome task success by up to 10 points over a standard prompting loop." ผมอ่านตัวเลขนี้แบบระวังครับ คำว่า "up to" คือค่าสูงสุด ไม่ใช่ค่าเฉลี่ย งานที่ทดสอบคือการสร้างไฟล์แบบมีโครงสร้าง ไม่ใช่งานเขียนโค้ดใน repo แบบที่ทีมผมทำ และคนวัดคือคนขายเอง

### 4. Memory กับ Skills: ความจำที่ต้องมีคนดูแล

เอกสารบอกว่าค่าเริ่มต้น "Each Managed Agents session starts with a fresh context by default." พนักงานในคำเปรียบของเราจึงความจำเสื่อมทุกเช้า จนกว่าเราจะแนบ memory store ให้ ซึ่งเอกสารนิยามว่า

> Memory stores let the agent carry information across sessions: user preferences, project conventions, prior mistakes, and domain context.

store จะถูก mount เป็นโฟลเดอร์ใน sandbox ของ session ตั้งสิทธิ์เป็น `read_write` (ค่าเริ่มต้น) หรือ `read_only` ได้ และทุกการแก้ไขสร้าง "immutable memory version" ไว้ให้ย้อนดู

ข้อที่ผมว่าสำคัญที่สุดคือคำเตือนในหน้าเดียวกัน

> If the agent processes untrusted input... a successful prompt injection could write malicious content into the store.

ลองคิดตามคำเปรียบดูครับ พนักงานที่อ่านอีเมลหลอกลวงแล้วจดคำสั่งปลอมลงสมุดโน้ตของทีม จากนั้นทุกคนในทีมก็เปิดสมุดเล่มนั้นทุกเช้าแล้วทำตาม memory ที่เขียนได้จึงเป็นช่องทางโจมตีแบบค้างข้าม session ถ้า agent ต้องอ่านของจากภายนอก เช่นเว็บหรือ ticket ที่ลูกค้าเขียน ผมจะเริ่มจาก `read_only` ก่อน

ส่วน dreaming ที่เอกสารอธิบายว่าให้ Claude อ่าน memory store กับ transcript ของ session เก่าแล้วจัดระเบียบเป็น store ใหม่ ยังอยู่ใน research preview ผมจะไม่วางแผนงานบนของที่ยังต้องขอสิทธิ์เข้าใช้

เรื่อง skills เอกสารนิยามว่าเป็น "reusable, filesystem-based resources that give your agent domain-specific expertise" มีทั้งแบบสำเร็จรูปของ Anthropic (`pptx`, `xlsx`, `docx`, `pdf`) และ custom skill ที่เป็นโฟลเดอร์มี `SKILL.md` แบบเดียวกับที่ผมเคยเขียนถึงใน[โพสต์เรื่อง SKILL.md](/blog/claude-cursor-skills-skill-md) และเอกสารก็บอกต้นทุนไว้ตรง ๆ ว่า "Each skill you add incurs a modest cost on the session's context window." เหมือนคู่มือที่ให้พนักงานใหม่ครับ ยิ่งยัดให้เยอะ ยิ่งไม่มีเล่มไหนถูกอ่านจริง

## คำเปรียบนี้พังตรงไหน

ผมดูแลทั้งคนและ agent เลยเห็นว่ามีอย่างน้อยห้าจุดที่สองอย่างนี้ไม่เหมือนกัน และทุกจุดมีผลกับการออกแบบระบบ

**1. พนักงานรับผิดชอบได้ agent รับผิดชอบไม่ได้** junior ที่ทำ production พังจะจำไปอีกนาน และรู้ว่าตัวเองมีส่วนต้องรับผิดชอบ agent ไม่มีทั้งสองอย่าง คนที่รับผิดชอบคือคนที่ตั้ง policy คนที่เขียน rubric และคนที่กดอนุมัติ ถ้าคำเปรียบทำให้ใครพูดว่า "agent ตัวนั้นทำพลาด" โดยไม่มีชื่อคนตามมา แปลว่าคำเปรียบเริ่มทำงานผิดหน้าที่แล้ว

**2. พนักงานที่ดีถามเมื่อไม่แน่ใจ agent ถามเมื่อ policy บังคับให้ถาม** junior ที่ผมไว้ใจคือคนที่เดินมาถามก่อนลบ table ผมไม่ได้เขียนกฎข้อนี้ไว้ที่ไหน เขารู้เอง แต่ด่านอนุมัติของ Managed Agents ตามเอกสารทำงานตาม policy ที่เราตั้งราย tool สิ่งที่เราลืมตั้งคือสิ่งที่ไม่มีด่าน

**3. ความไว้ใจสะสมไม่เหมือนกัน** ผมให้สิทธิ์ junior เพิ่มขึ้นเพราะเห็นงานเขามาหลายเดือน กับ agent ความไว้ใจควรผูกกับ config เวอร์ชันนั้น ๆ เปลี่ยน system prompt เปลี่ยนโมเดล หรือเพิ่ม tool หนึ่งตัว ก็ควรนับเป็นการประเมินใหม่ ข้อดีคือ agent มีเวอร์ชันให้อ้างอิง แต่เราต้องใช้มันจริง

**4. จำนวนไม่เหมือนกัน** ผมดูแล junior ได้ไม่กี่คน แต่ session เปิดพร้อมกันได้เยอะ และหน้า multiagent orchestration บอกว่า agent ตัวหนึ่งมี child thread ได้ถึง 25 ตัว พร้อมเตือนว่า "Every agent in a run uses tokens, so set a session budget." ด่านอนุมัติที่ออกแบบมาสำหรับคนกดวันละสิบครั้งจะกลายเป็นการกดผ่านโดยไม่อ่านเมื่อมันเด้งวันละสามร้อยครั้ง ซึ่งแย่กว่าไม่มีด่าน เพราะมันให้ความรู้สึกว่ามีคนดูแล้ว

**5. ไม่ใช่ทุกงานที่ต้องจ้างคน** บทความ [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) ของ Anthropic เองเขียนไว้ว่า "we recommend finding the simplest solution possible, and only increasing complexity when needed. This might mean not building agentic systems at all." คำเปรียบเรื่องพนักงานชวนให้คิดว่ามีงานก็ต้องมี agent ทั้งที่หลายงานแค่ script ตัวเดียวหรือเรียกโมเดลครั้งเดียวก็จบ บทความนี้เขียนตั้งแต่ปี 2024 และหน้าเว็บเองก็ขึ้นหมายเหตุว่าเครื่องมือเปลี่ยนไปมากแล้ว แต่หลักข้อนี้ผมว่ายังใช้ได้

ถ้าจะหาคำที่ตรงกว่า ผมชอบคำที่หน้าแนะนำคอร์ส [Building effective human-agent teams](https://academy.claude.com/courses/building-effective-human-agent-teams) ใช้ครับ หน้านั้นพูดถึงหลักสี่ข้อของทีมคนกับ agent คือ "clear roles, a written north star, gradual release, and the right information access" คำว่า gradual release ตรงกับวิธีที่ผมดูแล junior ที่สุด คือเริ่มจากสิทธิ์น้อย แล้วค่อยปล่อยเมื่อมีหลักฐาน (ย้ำอีกรอบว่าผมอ่านแค่หน้าแนะนำ ไม่ได้เรียนเนื้อหาข้างใน)

## สิ่งที่ผมจะทำถ้าทีมจะลอง

ผมยังไม่ได้ใช้ Managed Agents กับงานจริงครับ แต่ถ้าทีมจะลอง ผมจะเริ่มแบบเดียวกับที่รับ junior ใหม่ คือให้งานที่พังแล้วไม่เจ็บก่อน

- **เริ่มจากงานที่ผลลัพธ์ตรวจง่ายและย้อนได้** เช่นงานค้นคว้าหรืองานร่างเอกสาร ไม่ใช่งานที่แตะฐานข้อมูลหรือส่งอะไรออกไปหาลูกค้า
- **เขียน system prompt ให้เหมือน JD ที่ดี** คือมีขอบเขต มีสิ่งที่ห้ามทำ และมีนิยามว่างานเสร็จคืออะไร ไม่ใช่แค่ "คุณคือผู้เชี่ยวชาญด้าน..."
- **ไล่ดู tool ทีละตัวแล้วตัดสินว่าตัวไหนต้อง `always_ask`** โดยไม่พึ่งค่าเริ่มต้น เริ่มจาก bash และทุกอย่างที่เขียนออกนอก sandbox
- **เขียน rubric ก่อนเขียน prompt** ถ้าผมเขียน rubric ไม่ออก แปลว่าผมยังไม่รู้ว่างานที่ดีหน้าตาเป็นยังไง และ agent ก็คงไม่รู้เหมือนกัน
- **ให้คนอ่านผลงานจริงเทียบกับผลของ grader ช่วงแรก** เพื่อดูว่า grader กับคนเห็นตรงกันแค่ไหน ก่อนจะเชื่อคำว่า `satisfied`

## Checklist ก่อนเรียก agent ว่า "พนักงาน"

**ก่อนเริ่ม**

- [ ] ถามก่อนว่างานนี้ต้องใช้ agent จริงไหม หรือ script กับการเรียกโมเดลครั้งเดียวก็พอ
- [ ] เช็กสถานะฟีเจอร์ที่จะใช้ในเอกสาร ณ วันนั้น ว่าเป็น beta หรือ research preview
- [ ] เช็กเงื่อนไขข้อมูล (ZDR, HIPAA) กับประเภทข้อมูลที่ agent จะเห็น
- [ ] ประมาณค่าใช้จ่ายทั้ง token และเวลาที่ session รัน และตั้งงบต่อ session

**Job description**

- [ ] system prompt ระบุขอบเขต สิ่งที่ห้ามทำ และนิยามของงานที่เสร็จ
- [ ] tool และ MCP server มีเท่าที่งานต้องใช้
- [ ] รู้ว่า session ไหนใช้ agent เวอร์ชันไหน และมีการแก้ทับต่อ session หรือไม่

**ด่านอนุมัติ**

- [ ] ไม่พึ่งค่าเริ่มต้น `always_allow` ของ agent toolset ไล่ตัดสินทีละ tool
- [ ] tool ที่ย้อนกลับไม่ได้หรือส่งผลออกนอกระบบ ตั้งเป็น `always_ask`
- [ ] ไม่นับ `auto` เป็นด่านที่มีคนดู
- [ ] custom tool ที่รันในแอปของเรามีด่านที่เราเขียนเอง
- [ ] มีชื่อคนที่รับผิดชอบกดอนุมัติ และจำนวนคำขอต่อวันอยู่ในระดับที่คนคนนั้นอ่านจริงได้

**ตรวจงาน**

- [ ] rubric เขียนเป็นข้อที่ตรวจได้ และมีคนรีวิว rubric เหมือนรีวิวโค้ด
- [ ] แอปรับมือผล `needs_revision`, `max_iterations_reached` และ `failed`
- [ ] มีคนสุ่มอ่านผลงานที่ grader ให้ผ่านเป็นระยะ

**Memory และ Skills**

- [ ] agent ที่อ่านข้อมูลจากภายนอกใช้ memory แบบ `read_only` หรือมีคนตรวจสิ่งที่ถูกเขียนลง store
- [ ] มีคนรับผิดชอบดูเนื้อหาใน memory store เป็นระยะ และรู้วิธีย้อนเวอร์ชัน
- [ ] skill ที่แนบมีเท่าที่ใช้จริง

**ความรับผิดชอบ**

- [ ] agent ทุกตัวมีชื่อเจ้าของที่เป็นคน
- [ ] เวลาเกิดปัญหา post-mortem ถามว่า policy, rubric หรือ prompt ข้อไหนที่ปล่อยให้เกิด ไม่ได้จบที่ "agent ทำพลาด"

## ท้ายที่สุด

ผมไม่ได้คิดว่าคำเปรียบ "agent คือพนักงาน" ผิดครับ มันช่วยให้คนที่ไม่ได้เขียนโค้ดเข้าใจว่า agent ต้องการขอบเขตงาน ต้องมีจุดตรวจ และต้องมีที่เก็บความรู้ ซึ่งตรงกับฟีเจอร์ที่ Managed Agents มีจริงทั้งสี่อย่าง สิ่งที่ผมไม่เห็นด้วยคือการเล่าเหมือนว่านี่คือสิ่งที่ Anthropic สอนในคอร์ส ทั้งที่ในแหล่งทางการที่ผมอ่านได้วันนี้ ผมไม่เจอทั้งคำเปรียบนั้นและคอร์สเต็มที่ว่า อาจมีอยู่ในที่ที่ผมเปิดไม่ได้ก็ได้ครับ แต่ผมยืนยันให้ไม่ได้

สิ่งที่เอกสารบอกจริง ๆ นั้นแห้งกว่าคำเปรียบ แต่มีประโยชน์กว่า ค่าเริ่มต้นของ toolset หลักคือไม่ถามใคร `auto` ไม่ใช่ด่านที่มีคนดู rubric ต้องเขียนเอง และ memory ถูกเขียนของปลอมลงไปได้ ทั้งหมดนี้ไม่มีข้อไหนอยู่ในคำว่า "พนักงาน" เลย

ก่อนจะบอกใครว่าทีมเรามี agent เป็นพนักงานอีกคน ผมจะถามตัวเองข้อเดียวครับ "ถ้าพนักงานคนนี้ทำพลาดคืนนี้ ใครคือคนที่ต้องตอบ และเขารู้ตัวหรือยังว่าเป็นเขา" ถ้าตอบไม่ได้ สิ่งที่ทีมเรามีคือ process ที่รันอยู่โดยไม่มีเจ้าของ ไม่ใช่พนักงานครับ
