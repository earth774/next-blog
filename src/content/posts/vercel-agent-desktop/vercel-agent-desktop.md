---
title: "agent-desktop ของ Vercel Labs: ให้ AI agent คุมแอป desktop ผ่าน accessibility tree แทนการดูภาพหน้าจอ ใช้กับงาน QA ได้แค่ไหน และต้องระวังอะไรก่อนให้สิทธิ์"
date: "2026-11-19"
excerpt: "Vercel Labs มีเครื่องมือชื่อ agent-desktop ที่ให้ AI agent อ่านและสั่งงานแอป desktop บน macOS, Windows และ Linux ผ่าน accessibility tree ของระบบปฏิบัติการ ไม่ใช้ภาพหน้าจอ ไม่จับ pixel ทำงานแบบ headless เป็นค่าเริ่มต้น และติดตั้งผ่าน npm ผมอ่าน README กับเอกสารทางการแล้วพบว่าของจริงมีเงื่อนไขมากกว่าคำสรุปสั้น ๆ ทั้งเรื่องสิทธิ์ ข้อมูลส่วนตัวใน snapshot คำสั่งที่ headless ทำไม่ได้ และแอปที่ไม่มี accessibility tree บันทึกจากเดฟ·PM·PO ที่ทำ QA ว่ามันเหมาะกับงานไหน ไม่เหมาะกับงานไหน พร้อม checklist ก่อนลอง"
author: "Sutthiphong Nuanma"
image: "/images/posts/vercel-agent-desktop.webp"
tags:
  - AI
  - Critical Thinking
  - Agents
  - Automation
  - Tooling
  - QA
---

งาน QA ที่ผมเบื่อที่สุดคืองานกดแอป desktop ซ้ำ ๆ ครับ เปิดโปรแกรม กดเมนูเดิม กรอกฟอร์มเดิม ดูว่าปุ่มเดิมยังอยู่ที่เดิมไหม ฝั่งเว็บเรามีเครื่องมือ automate browser ให้เลือกเยอะ แต่พอเป็นแอป native ทีมผมยังจบที่ให้ junior นั่งกดตาม test case ใน spreadsheet อยู่บ่อย ๆ

ช่วงนี้ผมเห็น[หัวข้อที่กำลังเป็นกระแสใน X](https://x.com/i/trending/2116444562667483168) เรื่อง agent-desktop ของ Vercel Labs เครื่องมือที่ให้ AI agent คุมแอป desktop ได้โดยไม่ต้องดูภาพหน้าจอ คำสรุปที่ผมได้ยินมาคือมันอ่าน accessibility tree ของระบบปฏิบัติการ ทำงานแบบ headless ได้ รันขนานกันได้ และติดตั้งด้วย npm คำสั่งเดียว

ฟังแล้วผมอยากลองทันทีครับ ซึ่งเป็นสัญญาณว่าควรอ่านเอกสารก่อน โพสต์นี้อยู่ในซีรีส์ Critical Thinking ต่อจาก[Claude Managed Agents กับคำเปรียบ "agent คือพนักงาน"](/blog/claude-managed-agents-employees) ครั้งนั้นผมถามว่าใครรับผิดชอบเมื่อ agent ทำพลาดใน sandbox บน cloud ครั้งนี้ agent ขยับเข้ามาใกล้กว่าเดิม คือมาอยู่บนเครื่องที่เราล็อกอินทำงานอยู่ ผมเลยขอถามสองข้อ คือ agent-desktop ตามเอกสารคืออะไรกันแน่ และก่อนจะให้มันแตะเครื่องของทีม ต้องรู้อะไรบ้าง

จุดยืนของผมสั้น ๆ คือ **การอ่าน accessibility tree แทนการดูภาพเป็นแนวทางที่ผมเห็นด้วยสำหรับงาน QA และงานซ้ำ ๆ บนแอป desktop แต่มันดีได้เท่าที่แอปเปิดเผย tree ไว้ดี และสิทธิ์ที่ต้องให้คือสิทธิ์อ่านและสั่งงานแอปบนเครื่องในนามของเรา คำว่า headless แปลว่าไม่มีใครเห็นมันทำงาน เราจึงต้องเป็นคนออกแบบจุดตรวจเอง**

## แหล่งต้นทาง: อะไรที่ผมยืนยันได้ และอะไรที่ยืนยันไม่ได้

**ยืนยันไม่ได้**

- หน้า trending ใน X ผมเปิดอ่านไม่ได้ (ตอบกลับ HTTP 403) เลยไม่รู้ว่าโพสต์ต้นทางเขียนว่าอะไร ใครเขียน และมีคนพูดถึงมากแค่ไหน ที่ผมเล่าในย่อหน้าเปิดคือคำสรุปที่ได้ยินต่อมา ไม่ใช่การอ้างคำพูดของใคร
- **เรื่อง "รันขนานกันได้" ผมหาประโยคที่เขียนตรง ๆ ไม่เจอในหน้าที่อ่าน** README, หน้า Introduction และหน้า Commands ไม่มีคำว่า parallel หรือ concurrent สิ่งที่มีคือคำสั่ง `session` กับ `sandbox` และ flag `--session`, `--agent-id` ซึ่งอาจเกี่ยวข้อง แต่หน้า Sessions, Sandboxes และ Configuration ผมไม่ได้เปิดอ่าน เลยไม่ยืนยันว่ารันขนานได้กี่ตัว แยกกันยังไง หรือชนกันได้ไหม
- **ไม่มีตัวเลขความเร็ว ความแม่น หรือการประหยัด token ในหน้าที่ผมอ่าน** ใครบอกว่ามันเร็วกว่าหรือถูกกว่าการใช้ภาพหน้าจอกี่เท่า ผมยืนยันให้ไม่ได้ และเอกสารเองก็ไม่ได้เทียบกับเครื่องมือ computer use เจ้าไหนโดยตรง
- หน้า npm (`npmjs.com/package/agent-desktop`) ตอบกลับ HTTP 403 ผมเลยอ่านข้อมูลแพ็กเกจจาก npm registry โดยตรงแทน และไม่รู้ยอดดาวน์โหลด
- วันที่เผยแพร่ของเวอร์ชัน 1.3.1 (13 พ.ย. 2026) และประวัติเวอร์ชันก่อนหน้า ผมได้จากเอกสาร registry ฉบับเต็มซึ่งยาวมากและส่วนท้ายผมได้อ่านเป็นสรุป ไม่ใช่ตัวเต็ม ให้ถือเป็นข้อมูลที่ต้องเช็กซ้ำ
- หน้าเอกสารบน `agent-browser.dev` (Introduction, Commands, Snapshots and refs และหน้า platform ของ macOS, Windows, Linux) ผมอ่านผ่านเครื่องมือดึงหน้าเว็บ ประโยคที่ยกมาจากหน้าเหล่านี้ควรเทียบกับต้นฉบับก่อนนำไปอ้างต่อ ส่วน README ผมอ่านตัวเต็ม
- หน้าที่ผมไม่ได้อ่าน: Installation, Quick start, Configuration, JSON output, Errors and recovery, Skills, Sessions, Sandboxes, C library, CONCEPTS.md, CONTRIBUTING.md และ CHANGELOG.md
- จำนวนดาวและ issue ใน GitHub (ตอนผมเปิดหน้า repo แสดง 25.3k stars และ 94 issues) เป็นตัวเลข ณ ขณะนั้น และผมไม่ได้อ่าน issue ทีละอันว่ามีปัญหาอะไรค้างอยู่
- **ผมยังไม่ได้ติดตั้งหรือรัน agent-desktop เอง** ทุกอย่างข้างล่างคือสิ่งที่เอกสารเขียน ไม่ใช่สิ่งที่ผมทดสอบแล้ว คำสั่งตัวอย่างทั้งหมดยกมาจาก README และเอกสาร ผมยังไม่ได้ลองรัน

**ยืนยันได้**

ผมอ่านจากแหล่งเหล่านี้เมื่อวันที่ 19 พฤศจิกายน 2026 ครับ

- [README ของ repo vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) และ [SECURITY.md](https://github.com/vercel-labs/agent-desktop/blob/main/SECURITY.md)
- ข้อมูลแพ็กเกจจาก npm registry ([`registry.npmjs.org/agent-desktop/latest`](https://registry.npmjs.org/agent-desktop/latest)) ซึ่งระบุเวอร์ชันล่าสุด 1.3.1, license Apache-2.0, `os` เป็น darwin, win32, linux, `cpu` เป็น arm64, x64 และต้องใช้ Node 18 ขึ้นไป
- เอกสารบน agent-browser.dev หน้า [Introduction](https://agent-browser.dev/desktop), [Commands](https://agent-browser.dev/desktop/commands), [Snapshots and refs](https://agent-browser.dev/desktop/snapshots-and-refs), [macOS](https://agent-browser.dev/desktop/platforms/macos), [Windows](https://agent-browser.dev/desktop/platforms/windows) และ [Linux](https://agent-browser.dev/desktop/platforms/linux)

เรื่องนี้เปลี่ยนเร็วครับ ข้อมูลจาก registry ที่ผมได้อ่านเป็นสรุประบุว่าเวอร์ชัน 1.0.0 เพิ่งออกปลายเดือนตุลาคม 2026 และมีเวอร์ชันใหม่ตามมาแทบทุกสัปดาห์ ป้ายบน README ก็เขียนว่าเป็น "Labs Product" ทุกอย่างในโพสต์นี้คือสิ่งที่เอกสารเขียน ณ วันที่เขียน (19 พ.ย. 2026) ถ้าอ่านทีหลัง ให้กลับไปเช็กเอกสารต้นทางก่อนเสมอ

## agent-desktop คืออะไรตามเอกสาร

README เปิดด้วยประโยคเดียวว่า

> Computer use for AI agents: see and operate desktop apps on macOS, Windows, and Linux through the OS accessibility tree.

และอธิบายวิธีทำงานไว้ว่า

> agent-desktop gives an AI agent computer use without screenshots or pixel matching. It reads the accessibility tree of a desktop app and returns it as JSON, with a ref for every element the agent can act on. The agent clicks or types on a ref, reads the UI again to check the result, and repeats. The loop lives in your agent; agent-desktop has no model inside. It ships as a CLI and a C library.

ประโยคที่ผมอยากให้อ่านช้า ๆ คือ "The loop lives in your agent; agent-desktop has no model inside." ครับ มันไม่ใช่ agent มันคือมือกับตาที่ agent ตัวอื่นเรียกใช้ หน้า Introduction ย้ำอีกรอบว่ามันเป็น "A tool that agents call. It is not an agent." ไม่มี LLM ข้างใน ไม่มี GUI และไม่มี prompt โต้ตอบ สมองยังเป็น Claude Code, Codex, Cursor หรือ agent ตัวไหนก็ตามที่เราใช้อยู่ แปลว่าคุณภาพของงานขึ้นกับ agent ที่เรียกมัน และค่า token ก็ยังจ่ายที่ agent ตัวนั้น

accessibility tree คือโครงสร้างที่ระบบปฏิบัติการมีไว้ให้เครื่องมืออย่าง screen reader รู้ว่าบนหน้าจอมีปุ่มอะไร ช่องกรอกอะไร ชื่ออะไร README บอกว่าแต่ละ OS ใช้ API ของตัวเอง

| Platform | ข้อกำหนดตาม README | Accessibility API |
|---|---|---|
| macOS | macOS 13 ขึ้นไป Intel หรือ Apple Silicon | AX API |
| Windows | Windows 10 1809 ขึ้นไป x64 หรือ ARM64 | UI Automation |
| Linux | Ubuntu 24.04 ขึ้นไป x86_64 หรือ aarch64 ทั้ง X11 และ Wayland | AT-SPI |

รายละเอียดอื่นที่ควรรู้ก่อนตื่นเต้น

- **ติดตั้งผ่าน npm** คำสั่งจาก README คือ `npm install -g agent-desktop` และบอกว่า Bun, Yarn, pnpm ติดตั้งแพ็กเกจเดียวกันได้ ส่วน macOS กับ Linux ใช้ `brew install agent-desktop` ได้ด้วย แพ็กเกจมี native binary มาในตัว และข้อมูลใน registry ระบุว่ามี `postinstall` script
- **ตัวโค้ดเป็น Rust** หน้า repo มี `Cargo.toml` กับโฟลเดอร์ `crates/` และ README อธิบายว่า binary แต่ละตัว build สำหรับ OS เดียว
- **มีคำสั่งเยอะ** README เขียนว่า "agent-desktop has 61 command names, 57 operational commands." แบ่งเป็นกลุ่มสังเกต (`snapshot`, `find`, `screenshot`) กลุ่มกระทำกับ ref (`click`, `type`, `set-value`) กลุ่มจัดการแอปและหน้าต่าง clipboard การแจ้งเตือน และอื่น ๆ
- **ต่อเป็น MCP server ได้** README บอกว่า `agent-desktop mcp` เปิดทุกคำสั่งเป็น MCP tool ผ่าน stdio
- **ใช้กับแอป desktop เท่านั้น** หน้า Introduction เขียนว่า "It does not automate web pages; use agent-browser for those."

## มันทำงานยังไง: snapshot, ref แล้วสังเกตซ้ำ

ตัวอย่างข้างล่างยกมาจากหัวข้อ Quick start ใน README ครับ ผมยังไม่ได้ลองรันเอง

```bash
agent-desktop snapshot --app Finder -i      # interactive elements, each with a ref
agent-desktop click @s8f3k2p9:e8            # act on a ref from that snapshot
agent-desktop snapshot --app Finder -i      # observe again to verify
```

ทุกคำสั่งตอบกลับเป็น JSON ก้อนเดียว ตัวอย่าง snapshot ที่ README ตัดมาให้ดูคือ

```json
{
  "version": "2.6",
  "ok": true,
  "command": "snapshot",
  "data": {
    "app": "Finder",
    "snapshot_id": "s8f3k2p9",
    "ref_count": 59,
    "complete": true,
    "tree": {
      "role": "window",
      "name": "Downloads",
      "children": [
        { "role": "treeitem", "name": "Documents", "ref_id": "@s8f3k2p9:e8", "available_actions": ["Click"] }
      ]
    }
  }
}
```

มีสามเรื่องในการออกแบบนี้ที่ผมในฐานะคนทำ QA ชอบครับ

**1. ref ผูกกับ snapshot** README เขียนว่า "Refs belong to their snapshot." ref แบบสั้น `@e8` จะถูกปฏิเสธด้วย `INVALID_ARGS` และเมื่อหน้าจอเปลี่ยน คำสั่งจะตอบ `STALE_REF` หรือ `AMBIGUOUS_TARGET` ให้ไปถ่าย snapshot ใหม่ สำหรับผม นี่คือพฤติกรรมที่ถูกต้อง เครื่องมือที่ปฏิเสธเมื่อไม่แน่ใจ ดีกว่าเครื่องมือที่เดาแล้วกดผิดปุ่ม

**2. สังเกตซ้ำหลังทำทุกครั้ง** บรรทัดที่สามของตัวอย่างคือ snapshot อีกรอบเพื่อดูว่าผลเกิดจริงไหม หน้า macOS ของเอกสารเขียนไว้ตรง ๆ ว่า "AX return codes do not prove an effect." แปลว่าการที่คำสั่ง click ตอบว่าสำเร็จ ยังไม่ใช่หลักฐานว่าแอปทำตาม ข้อนี้คือเรื่องเดียวกับที่ผมบอก junior เสมอ ว่ากดปุ่ม Save แล้วไม่ error ไม่ได้แปลว่าข้อมูลถูกบันทึก

**3. error บอกว่าลองใหม่ได้ไหม** README เขียนว่า "Retry a failed command only when `error.disposition.retry` is `safe`." คนที่เคยเจอ automation script กดซ้ำจนสร้างรายการซ้ำสิบรายการจะเข้าใจว่าบรรทัดนี้สำคัญแค่ไหน

สำหรับคนที่จะให้ coding agent ใช้ README แนะนำให้ติดตั้ง skill หรือใส่ข้อความนี้ใน `AGENTS.md`

```markdown
Use `agent-desktop` to see and operate desktop apps. Before the first use, run
`agent-desktop skills get desktop` and `agent-desktop skills get platform`, and follow them.
```

ใครอ่าน[โพสต์เรื่อง AGENTS.md กับ CLAUDE.md](/blog/agents-md-vs-claude-md) มาแล้วคงเดาได้ว่าผมจะพูดอะไรต่อครับ ใส่ไว้แล้วต้องตรวจด้วยว่า agent ที่ทีมใช้โหลดไฟล์นั้นจริง

## ต่างจาก computer use แบบดูภาพหน้าจอยังไง

เอกสารไม่ได้เทียบกับเครื่องมือเจ้าไหนโดยตรง ตารางข้างล่างเลยเป็นการวิเคราะห์ของผมเองครับ ฝั่ง accessibility tree อิงจากสิ่งที่เอกสารของ agent-desktop เขียน ส่วนฝั่งภาพหน้าจอคือความเข้าใจทั่วไปของผมต่อแนวทางที่ให้โมเดลดูภาพแล้วกดตามพิกัด ไม่ได้หมายถึงผลิตภัณฑ์ตัวใดตัวหนึ่ง

| ประเด็น | แบบดูภาพหน้าจอ | แบบ accessibility tree (agent-desktop) |
|---|---|---|
| สิ่งที่ agent ได้รับ | ภาพ แล้วโมเดลต้องตีความเองว่าอะไรคือปุ่ม | JSON ที่บอก role, ชื่อ และ action ที่ทำได้ของแต่ละ element |
| การระบุเป้าหมาย | พิกัดบนจอ | ref ที่ผูกกับ snapshot |
| เมื่อหน้าจอเปลี่ยน | พิกัดเดิมอาจไปตกที่อื่น | ref เก่าถูกปฏิเสธ ต้อง snapshot ใหม่ |
| การรบกวนคนใช้เครื่อง | ต้องขยับเมาส์และ focus จริง | ค่าเริ่มต้นไม่ขยับ pointer และไม่แย่ง focus |
| แอปที่วาด UI เองไม่มี tree | ยังเห็นได้เพราะดูจากภาพ | มองไม่เห็น |
| สิ่งที่ตรวจได้ | สิ่งที่ตาเห็น รวมถึง layout และสี | โครงสร้างและสถานะ ไม่ใช่หน้าตา |

สองแถวสุดท้ายคือแถวที่คนสรุปมักข้ามครับ หน้า Introduction เขียนข้อจำกัดไว้เองว่า

> It reads accessibility trees and does not match pixels, so it cannot see a UI that publishes no accessibility tree.

แอปที่วาดหน้าจอเองทั้งหมดโดยไม่เปิดเผย tree agent-desktop จะมองไม่เห็นอะไรเลย และต่อให้แอปมี tree มันก็บอกได้แค่ว่ามีปุ่มชื่อ "บันทึก" อยู่และกดได้ บอกไม่ได้ว่าปุ่มนั้นโดน dialog ทับ ตัวหนังสือล้นกรอบ หรือสีเพี้ยนจาก design งาน visual regression ยังต้องใช้ภาพอยู่ดี (agent-desktop มีคำสั่ง `screenshot` ให้ แต่การตีความภาพเป็นงานของ agent ไม่ใช่ของเครื่องมือ)

ผมเลยไม่มองว่าสองแนวทางนี้แทนกันได้ครับ แบบ tree เหมาะกับคำถามว่า "flow นี้ยังทำงานไหม" แบบภาพเหมาะกับคำถามว่า "หน้าจอนี้ยังดูถูกต้องไหม" ซึ่งเป็น test case คนละชุดกันตั้งแต่แรก

## headless เป็นค่าเริ่มต้น แต่ไม่ใช่ทุกคำสั่ง

README เขียนว่า

> Headless by default. Ref actions use the accessibility API without moving the pointer or taking focus. The global `--headed` flag allows physical input.

ข้อนี้คือจุดขายที่ผมสนใจที่สุดในฐานะคนที่เคยรัน UI test บนเครื่องตัวเองแล้วทำงานอื่นไม่ได้ทั้งบ่าย แต่พออ่านหน้า platform แต่ละตัว ก็พบว่า "headless" มีขอบเขตต่างกันตาม OS ครับ

- **macOS** คำสั่ง `triple-click`, `hover`, `drag`, `mouse-move`, `mouse-click`, `mouse-wheel` ตอบ `POLICY_DENIED` เมื่อรันแบบ headless และ `double-click` ทำได้เฉพาะ element ที่มี action `AXOpen` นอกจากนี้ shortcut ปิดแอปอย่าง `cmd+q` ถูกปฏิเสธถ้าไม่ใส่ `--force` เอกสารให้ใช้ `close-app` แทน
- **Windows** `right-click` กับ `type` แบบ headless ตอบ `POLICY_DENIED` เอกสารเขียนว่า "Use `set-value` to write text headless." คำสั่งเมาส์ทั้งหมดต้องใช้ `--headed` และ shortcut อย่าง `alt+f4` กับ `win+l` ถูกปฏิเสธถ้าไม่ใส่ `--force`
- **Linux** การ scroll ด้วย wheel และ gesture ของ pointer ใช้ได้บน X11 เท่านั้น บน Wayland ตอบ `ACTION_NOT_SUPPORTED`

มีสองเรื่องที่ผมอ่านจากรายการนี้ครับ

เรื่องแรก `set-value` กับ `type` ไม่เหมือนกันในมุม QA การตั้งค่าลงช่องกรอกตรง ๆ ผ่าน accessibility API ไม่ได้ผ่านเส้นทางเดียวกับที่ผู้ใช้พิมพ์ทีละตัว ถ้าแอปมี validation ตอนพิมพ์ มี autocomplete หรือ input mask การทดสอบแบบ headless อาจผ่านทั้งที่ผู้ใช้จริงเจอบั๊ก ข้อนี้เป็นข้อสังเกตของผมเอง ไม่ใช่สิ่งที่เอกสารเขียน แต่ผมจะแยก test case ที่ต้องพิสูจน์พฤติกรรมการพิมพ์ออกมารันแบบ `--headed` ต่างหาก

เรื่องที่สอง การที่เครื่องมือปฏิเสธ shortcut ปิดแอปและล็อกเครื่องเป็นค่าเริ่มต้น เป็นการออกแบบที่ผมเห็นด้วย แต่ `--force` มีอยู่ และ agent ที่อยากให้งานเสร็จอาจเลือกใช้มันเองเมื่อเจอ `POLICY_DENIED` เหมือนที่ผมเคยเขียนไว้ใน[โพสต์เรื่อง agent แก้ test ให้ CI เขียว](/blog/agent-rewrites-tests-ci-green) กติกาห้ามใช้ `--force` กับ `--headed` โดยไม่ถามคน ควรอยู่ในไฟล์กติกาของทีมตั้งแต่วันแรก

## ความเสี่ยงและข้อจำกัดที่ต้องรู้

### 1. สิทธิ์: ให้กับแอปที่เรียก ไม่ใช่ให้กับเครื่องมือ

บน macOS ต้องให้สิทธิ์ Accessibility ก่อน คำสั่งจาก README คือ

```bash
agent-desktop status                # platform, permissions, supported surfaces
agent-desktop permissions --guide   # macOS: walks you through the Accessibility grant
```

รายละเอียดที่ต้องอ่านอยู่ในหน้า macOS ของเอกสารครับ สิทธิ์นี้ให้กับแอปที่เป็นคนเรียก agent-desktop เช่น Terminal, iTerm2, VS Code หรือแอปที่ agent รันอยู่ เอกสารเขียนว่า "The grant belongs to the app that launched agent-desktop, not to the shell." ส่วน Screen Recording ต้องให้เฉพาะตอนใช้ `screenshot`

ผมอ่านข้อนี้ว่า (เป็นการตีความของผม) สิ่งที่เราตัดสินใจไม่ใช่ "ให้ agent-desktop เข้าถึงเครื่องไหม" แต่คือ "ให้ terminal หรือ editor ตัวนี้อ่านและสั่งงานแอปอื่นบนเครื่องได้ไหม" ซึ่งรวมถึงทุกอย่างที่รันในแอปนั้นต่อจากนี้ และแอปที่ agent มองเห็นได้ก็รวมถึงอีเมล แชต และ password manager ที่เปิดค้างอยู่

ฝั่ง Windows กับ Linux กลับกันครับ คือไม่มีหน้าต่างขอสิทธิ์เลย หน้า Windows เขียนว่า "Windows has no grant dialog for UI Automation; access is controlled by integrity level." และหน้า Linux เขียนว่า "Linux has no permission dialog for accessibility." แปลว่าบนสอง OS นี้ไม่มีด่านของระบบปฏิบัติการมาถามเราก่อน ด่านเดียวที่มีคือด่านที่เราตั้งเองที่ agent

บน Windows ยังมีเรื่อง integrity level อีกชั้น แอปที่รันแบบ administrator อ่านได้แต่สั่งงานไม่ได้จาก terminal ที่สิทธิ์ต่ำกว่า และทางแก้ตามเอกสารคือรัน agent-desktop จาก terminal ที่ยกสิทธิ์ขึ้นเท่ากัน ผมจะคิดหนักมากก่อนให้ agent รันใน terminal แบบ administrator เพื่อจะทดสอบแอปตัวเดียว

### 2. ข้อมูลส่วนตัวใน snapshot

README เตือนไว้ตั้งแต่ย่อหน้าที่สองว่า

> Snapshots, clipboard reads, screenshots, command output, and debug artifacts can contain private desktop content. Keep them out of public logs and uploads.

snapshot คือข้อความทั้งหมดที่แอปแสดงอยู่ ในรูป JSON ที่ถูกส่งเข้า context ของ agent ซึ่งปกติแปลว่าถูกส่งไปหาผู้ให้บริการโมเดลด้วย ถ้าแอปที่ทดสอบแสดงข้อมูลลูกค้าจริง ข้อมูลนั้นก็ออกจากเครื่องไปแล้ว เรื่องนี้ต้องคุยกับคนดูแลข้อมูลแบบเดียวกับที่ผมเขียนไว้ในโพสต์ Managed Agents

README ยังมีรายละเอียดเรื่อง secret ที่ผมชอบ คือ `type`, `set-value` และ `clipboard-set` รับ `--stdin` เพื่อไม่ให้ข้อความไปโผล่ใน process arguments และเตือนว่า "Run secret steps as separate commands; batch JSON text appears in process arguments." คนเขียนเครื่องมือคิดเรื่องนี้มาแล้ว แต่ agent ที่เรียกใช้จะทำตามหรือไม่ เป็นหน้าที่ของเราที่ต้องตรวจ

### 3. prompt injection จากหน้าจอ

ข้อนี้เป็นข้อกังวลของผมเอง เอกสารที่ผมอ่านไม่ได้พูดถึงครับ agent อ่านข้อความทุกอย่างที่อยู่ใน tree ของแอป ถ้าแอปนั้นแสดงเนื้อหาจากคนนอก เช่นอีเมล ข้อความแชต หรือชื่อไฟล์ที่คนอื่นส่งมา ข้อความพวกนั้นก็เข้า context ของ agent ที่มีมือกดปุ่มบนเครื่องเราได้ มันคือปัญหาเดียวกับ memory store ที่ถูกเขียนของปลอมในโพสต์ที่แล้ว แต่ครั้งนี้ไม่ได้อยู่ใน sandbox ผมจะไม่ให้ agent คุมแอปที่แสดงเนื้อหาจากภายนอกบนเครื่องที่มีข้อมูลจริง

### 4. คุณภาพของ accessibility tree

เครื่องมือดีได้เท่าที่แอปเปิดเผย tree ไว้ครับ จากเอกสารที่ผมอ่าน มีข้อจำกัดที่เขียนไว้ชัดหลายข้อ

- snapshot มี field `complete` ถ้าเป็น `false` แปลว่าการอ่านหมดงบก่อนอ่านครบ agent ที่ไม่เช็ก field นี้จะสรุปจากหน้าจอครึ่งเดียว
- บน Windows และ Linux ถ้ามี element สองตัวที่หน้าตาเหมือนกันทุกอย่าง จะเลือกด้วย ref ไม่ได้เลย หน้า Snapshots and refs บอกว่าทางเดียวคือคลิกตามพิกัดด้วย `agent-desktop --headed mouse-click --xy X,Y` ซึ่งแย่ง foreground และใช้ไม่ได้บน Linux Wayland ตารางที่มีปุ่ม "ลบ" เหมือนกันทุกแถวโดยไม่มีชื่อกำกับคือตัวอย่างที่ผมนึกออกทันที
- หน้า Windows บอกว่าแอป Chromium หรือ Electron ตอนเปิดใหม่ ๆ การอ่านครั้งแรกได้ tree มาแค่ส่วนเล็ก ๆ และ "A cold launch takes 10 to 25 seconds to settle." ส่วนหน้า Linux บอกว่า native dialog ของ Electron ไม่อยู่บน AT-SPI tree
- หน้า Windows ระบุว่า menu ของ WinUI 3 และ MSIX host ไม่ถูกครอบคลุม และหน้าต่างที่ minimize อยู่ทุก element จะรายงานว่า `offscreen`

มุมที่ผมว่าน่าสนใจสำหรับ PM คือ tree ที่ agent อ่านคือ tree เดียวกับที่ screen reader อ่านครับ แอปของทีมเราที่ agent-desktop ใช้งานไม่ได้ ก็มีโอกาสสูงว่าผู้ใช้ screen reader ใช้ไม่ได้เหมือนกัน (ข้อนี้เป็นการอนุมานของผม) การลองเครื่องมือนี้กับแอปของตัวเองเลยได้ผลพลอยได้เป็นการสำรวจ accessibility ไปด้วย และงานใส่ชื่อให้ปุ่มที่เคยอยู่ท้าย backlog ก็มีเหตุผลทางธุรกิจเพิ่มขึ้นอีกข้อ

### 5. สภาพแวดล้อมที่รันได้

คนที่คิดจะเอาไปใส่ CI ต้องอ่านข้อนี้ครับ headless ของ agent-desktop หมายถึงไม่ขยับเมาส์และไม่แย่ง focus ไม่ได้หมายถึงรันบนเครื่องที่ไม่มีหน้าจอหรือไม่มีคนล็อกอิน

- **Windows** ต้องรันใน desktop session ของผู้ใช้ที่ล็อกอินอยู่ เอกสารระบุว่าไม่รองรับ Session 0 (service และ SYSTEM task), Server Core, หน้าจอ UAC, เครื่องที่ล็อกจออยู่ และ session ของผู้ใช้อื่น อีกข้อคือ "The binary is unsigned." SmartScreen อาจเตือน antivirus อาจกักไฟล์ และ Smart App Control บน Windows 11 ที่ติดตั้งใหม่จะบล็อก ทีมที่ใช้เครื่องบริษัทควรคุยกับ IT ก่อน
- **Linux** ต้องมี graphical session ของผู้ใช้ มี AT-SPI bus และมี window manager เอกสารเขียนว่า TTY login, SSH shell ที่ไม่มีตัวแปรที่ต้องใช้ หรือ container ที่ไม่มี bus จะมองไม่เห็นแอปเลย ตัวอย่างในเอกสารรันบน Xvfb กับ openbox ซึ่งบอกใบ้ว่าทำบนเครื่อง CI ได้ถ้าเตรียมสภาพแวดล้อมให้ครบ แต่ผมยังไม่ได้ลอง และเอกสารเตือนว่า at-spi2-core ของ Ubuntu 22.04 มีปัญหา ต้องใช้ 24.04 ขึ้นไป
- **macOS** สิทธิ์ผูกกับแอปที่เรียก เครื่อง build ที่รัน agent ผ่านช่องทางอื่นที่ไม่ใช่ Terminal ต้องดูว่าสิทธิ์ไปอยู่กับ process ไหน

### 6. เพิ่งออก และอยู่ใน Labs

เวอร์ชัน 1.x เพิ่งเริ่มได้ไม่กี่สัปดาห์ตามข้อมูล registry ที่ผมมี และ README ติดป้าย Labs ผมไม่ได้มองว่าเป็นข้อเสียครับ แต่มันบอกว่าคำสั่งและพฤติกรรมอาจเปลี่ยน ทีมที่จะสร้าง test suite บนเครื่องมือนี้ควร pin เวอร์ชัน และถือว่า test ชุดนั้นเป็นงานทดลองจนกว่าจะเห็นว่านิ่ง ข้อดีคือ license เป็น Apache-2.0 และ SECURITY.md มีช่องทางรายงานช่องโหว่แบบส่วนตัวผ่าน GitHub ชัดเจน

## เหมาะกับงานแบบไหน และไม่เหมาะกับงานแบบไหน

ผมยังไม่ได้ใช้กับงานจริงครับ ข้างล่างคือการประเมินจากเอกสารในมุมของคนที่ต้องตัดสินใจว่าจะให้ทีมเสียเวลาลองไหม

**งานที่ผมว่าน่าลอง**

- **Smoke test ของแอป desktop ที่ทีมทำเอง** เปิดแอป ล็อกอินด้วยบัญชีทดสอบ เดินผ่าน flow หลัก แล้วเช็กว่า element ที่ควรมีอยู่ครบ งานแบบนี้ถามเรื่องโครงสร้างและสถานะ ซึ่งตรงกับสิ่งที่ tree บอกได้ และเราแก้ tree ของแอปตัวเองได้ถ้ามันไม่ดี
- **งานเตรียมสภาพแวดล้อมทดสอบที่ต้องกดผ่าน GUI** เช่นตั้งค่าแอปให้อยู่ในสถานะเริ่มต้นก่อนที่คนจะเข้าไปทดสอบส่วนที่ต้องใช้วิจารณญาณ
- **งานซ้ำ ๆ กับแอปที่ไม่มี API** ที่ผลลัพธ์ตรวจง่ายและย้อนได้ เช่นดึงข้อมูลจากโปรแกรมเก่าออกมาทีละหน้าจอ
- **สำรวจ accessibility ของแอปตัวเอง** ให้ agent ถ่าย snapshot แล้วรายงานว่า element ไหนไม่มีชื่อ

**งานที่ผมจะยังไม่ใช้**

- **Visual regression และงานที่ถามว่าหน้าตาถูกไหม** tree ตอบคำถามนี้ไม่ได้
- **แอปที่วาด UI เองไม่มี tree** เอกสารบอกตรง ๆ ว่ามองไม่เห็น
- **งานบนเครื่องที่มีข้อมูลจริงของลูกค้าหรือบัญชีส่วนตัว** จนกว่าจะมีคำตอบเรื่องข้อมูลใน snapshot
- **งานที่ย้อนไม่ได้** เช่นกดส่ง กดจ่าย กดลบ ในระบบจริง โดยไม่มีคนอนุมัติ
- **เว็บ** เอกสารบอกให้ใช้ agent-browser

และเหมือนทุกครั้งครับ ก่อนจะให้ agent ไปกด GUI ผมจะถามก่อนว่างานนี้มี API, CLI หรือ script ที่ทำได้ตรงกว่าไหม การกดหน้าจอแทนคนควรเป็นทางเลือกสุดท้ายของ automation ไม่ใช่ทางเลือกแรก ยกเว้นกรณีที่หน้าจอนั่นแหละคือสิ่งที่เราต้องการทดสอบ

## สิ่งที่ผมจะทำถ้าทีมจะลอง

- **ลองบนเครื่องแยกหรือ VM ที่ไม่มีข้อมูลจริง** ใช้บัญชีทดสอบ ไม่ล็อกอินอีเมลหรือแชตของบริษัทบนเครื่องนั้น
- **เริ่มจากคำสั่งอ่านอย่างเดียว** ให้คนในทีมรัน `status` กับ `snapshot` ของแอปที่จะทดสอบด้วยมือก่อน แล้วอ่าน JSON ดูว่า tree ของแอปเราใช้ได้แค่ไหน ถ้าปุ่มครึ่งหนึ่งไม่มีชื่อ งานแรกคือแก้แอป ไม่ใช่เขียน prompt
- **เขียน test case ให้มีเกณฑ์ผ่านที่ตรวจจาก snapshot ได้** เช่น "หลังกดบันทึก ต้องมี element ชื่อ X ที่มีค่า Y" ไม่ใช่ "ดูว่าบันทึกสำเร็จ"
- **ให้คนทำ flow เดียวกันเทียบกับ agent ช่วงแรก** เพื่อหากรณีที่ agent รายงานว่าผ่านแต่คนเห็นว่าพัง โดยเฉพาะ flow ที่ใช้ `set-value` แทนการพิมพ์
- **เก็บ log ของคำสั่งที่ agent เรียก** README มีคำสั่ง `trace` และ flag `--trace` ผมยังไม่ได้อ่านรายละเอียด แต่จะดูเป็นอย่างแรก เพราะ headless แปลว่าไม่มีใครเห็นมันทำงาน log คือหลักฐานเดียวที่เหลือ

## Checklist ก่อนลอง agent-desktop

**ก่อนเริ่ม**

- [ ] ถามก่อนว่างานนี้มี API, CLI หรือ script ที่ทำได้ตรงกว่าการกด GUI ไหม
- [ ] เช็กเวอร์ชันล่าสุด เอกสาร platform ของ OS ที่ใช้ และ CHANGELOG ณ วันนั้น
- [ ] pin เวอร์ชันที่ทีมใช้ และตกลงว่าใครเป็นคนตัดสินใจอัปเดต
- [ ] ถ้าเป็นเครื่องบริษัท คุยกับ IT เรื่อง binary ที่ไม่ได้ sign บน Windows และ postinstall script ของแพ็กเกจ

**สิทธิ์และเครื่อง**

- [ ] รู้ว่าสิทธิ์ Accessibility บน macOS ไปอยู่กับแอปตัวไหน และอะไรอีกบ้างที่รันในแอปนั้น
- [ ] ไม่รัน agent ใน terminal แบบ administrator บน Windows ถ้าไม่จำเป็นจริง
- [ ] ใช้เครื่องแยก VM หรือบัญชีผู้ใช้แยก ที่ไม่มีอีเมล แชต หรือ password manager เปิดอยู่
- [ ] บน Linux ตรวจว่า `~/.agent-desktop` ไม่เปิดสิทธิ์ให้ผู้ใช้อื่นอ่าน (เอกสารให้ `chmod 700`)

**ข้อมูล**

- [ ] แอปที่ทดสอบใช้ข้อมูลทดสอบ ไม่ใช่ข้อมูลลูกค้าจริง
- [ ] snapshot, screenshot, trace และ log ไม่ถูกอัปโหลดขึ้นที่สาธารณะหรือแนบใน issue
- [ ] ขั้นตอนที่มี secret ใช้ `--stdin` และแยกเป็นคำสั่งเดี่ยว ไม่ใส่ใน `batch`
- [ ] agent ไม่ได้คุมแอปที่แสดงเนื้อหาจากคนนอกบนเครื่องที่มีข้อมูลสำคัญ

**แอปเป้าหมาย**

- [ ] คนในทีมเคยอ่าน snapshot ของแอปด้วยตาแล้ว และ element สำคัญมีชื่อกับ role ครบ
- [ ] รู้ว่า flow ไหนมี element ซ้ำที่เลือกด้วย ref ไม่ได้บน Windows หรือ Linux
- [ ] ถ้าเป็นแอป Electron หรือ Chromium เผื่อเวลาให้ tree พร้อมหลังเปิดแอป
- [ ] แยก test case ที่ต้องดูหน้าตาออกไปใช้วิธีอื่น

**กติกาสำหรับ agent**

- [ ] ไฟล์กติกาของทีมบอกให้ agent รัน `skills get desktop` กับ `skills get platform` ก่อนใช้ และตรวจแล้วว่า agent โหลดไฟล์นั้นจริง
- [ ] ห้ามใช้ `--force` และ `--headed` โดยไม่ถามคน
- [ ] ทุก action ต้องตามด้วย snapshot เพื่อยืนยันผล และต้องเช็ก `complete` ก่อนสรุป
- [ ] ลองใหม่ได้เฉพาะเมื่อ `error.disposition.retry` เป็น `safe`
- [ ] action ที่ย้อนไม่ได้ต้องมีคนอนุมัติ

**การตรวจผล**

- [ ] เกณฑ์ผ่านของแต่ละ test case เขียนเป็นสิ่งที่ตรวจจาก snapshot ได้
- [ ] มีคนสุ่มทำ flow เดียวกันด้วยมือเทียบกับผลของ agent เป็นระยะ
- [ ] มีชื่อคนที่เป็นเจ้าของ test ชุดนี้ และเป็นคนอ่าน trace เมื่อผลไม่ตรงกัน

## ท้ายที่สุด

ผมชอบแนวทางของ agent-desktop ครับ การให้ agent อ่านโครงสร้างที่ระบบปฏิบัติการมีอยู่แล้ว แทนที่จะให้เดาจากภาพ เป็นวิธีที่สมเหตุสมผล และรายละเอียดอย่าง ref ที่ผูกกับ snapshot การปฏิเสธเมื่อเป้าหมายกำกวม และการบอกว่า error ไหนลองใหม่ได้ บอกผมว่าคนทำเข้าใจปัญหาของ automation จริง สิ่งที่ผมยืนยันให้ไม่ได้คือคำสรุปที่มาพร้อมกระแส ทั้งเรื่องรันขนานและเรื่องความเร็ว เพราะในหน้าที่ผมอ่านวันนี้ไม่มีประโยคหรือตัวเลขรองรับ อาจมีอยู่ในหน้าที่ผมยังไม่ได้เปิดก็ได้ครับ

สิ่งที่เอกสารบอกจริง ๆ นั้นมีเงื่อนไขมากกว่าคำว่า "คุมแอป desktop ได้โดยไม่ต้องดูจอ" แอปที่ไม่มี tree มันมองไม่เห็น คำสั่งบางตัว headless ทำไม่ได้ snapshot มีข้อมูลส่วนตัว บน Windows กับ Linux ไม่มีหน้าต่างขอสิทธิ์มาคั่น และการที่คำสั่งตอบว่าสำเร็จไม่ได้พิสูจน์ว่าเกิดผล ทุกข้อเป็นเรื่องที่ทีมต้องออกแบบรับมือเอง

ก่อนจะให้ agent ตัวไหนมีมือบนเครื่องของทีม ผมจะถามตัวเองข้อเดียวครับ "ถ้ามันกดอะไรบนเครื่องนี้ตอนที่ไม่มีใครมองจอ ผมจะรู้ได้จากที่ไหนว่ามันกดอะไรไป และของที่อยู่บนเครื่องนั้นมีอะไรที่ผมรับไม่ได้ถ้าถูกอ่านหรือถูกกด" ถ้าตอบไม่ได้ ผมจะยังไม่ติดตั้งครับ
