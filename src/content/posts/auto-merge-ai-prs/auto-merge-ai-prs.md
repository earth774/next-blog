---
title: "Auto-merge PR จาก AI: เมื่อกด Approve โดยไม่เปิดอ่าน และคนรีวิวกลายเป็นคอขวด"
date: "2026-11-15"
excerpt: "agent เปิด PR ได้เร็วกว่าที่คนรีวิวทัน หลายทีมเลยเริ่มกด approve โดยไม่เปิดดู หรือเปิด auto-merge ทิ้งไว้ บันทึกจากเดฟ·PM·PO ที่ทำ QA ให้ทีม junior ว่าข้อมูลจาก Faros, LinearB และงานวิจัยบน arXiv บอกอะไรจริง เอกสาร GitHub บอกว่า auto-merge ทำอะไรได้และทำอะไรไม่ได้ เมื่อไหร่ที่ auto-merge รับได้ ต้องมี guardrail อะไรบ้าง และทำยังไงให้รีวิวถูกลงแทนที่จะข้ามไปเลย พร้อม checklist"
author: "Sutthiphong Nuanma"
image: "/images/posts/auto-merge-ai-prs.webp"
tags:
  - AI
  - Critical Thinking
  - Code Review
  - Agents
  - GitHub
---

ตอนที่ทีมยังเขียนโค้ดเองทั้งหมด คิว PR ที่รอรีวิวมีขีดจำกัดตามธรรมชาติครับ คนหนึ่งเปิด PR ได้วันละไม่กี่ตัว คนรีวิวก็พอตามทัน

พอแต่ละคนสั่ง agent ได้หลายตัวพร้อมกัน ขีดจำกัดนั้นหายไป แล้วก็จะเริ่มเห็นพฤติกรรมที่คุ้นกัน คนรีวิวเลื่อนดู diff ผ่าน ๆ เห็น CI เขียวแล้วกด approve หรือเปิด auto-merge ทิ้งไว้แล้วไม่มีใครเปิด PR ดูอีกเลย

ช่วงนี้มี[หัวข้อเรื่องนี้ขึ้น trending ใน X](https://x.com/i/trending/2114817634046796093) ว่าด้วย PR จาก AI ที่ถูก merge โดยไม่มีคนอ่าน ผมเลยตามไปหาว่าปัญหานี้ใหญ่แค่ไหน และ auto-merge ของ GitHub ออกแบบมาให้ใช้แบบไหน

โพสต์นี้อยู่ในซีรีส์ Critical Thinking ต่อจาก[Cursor Annotate (Design Mode)](/blog/cursor-annotate-design-mode) ครับ ครั้งนั้นเป็นด่านหน้าคือการส่ง feedback ให้ agent ครั้งนี้เป็นด่านหลังคือตอนที่งานของ agent จะเข้า main

จุดยืนของผมสั้น ๆ คือ **auto-merge ไม่ใช่ปัญหา การ approve โดยไม่อ่านต่างหากที่เป็นปัญหา auto-merge ที่ตั้งดีคือการบอกว่า "merge เมื่อทุกด่านผ่าน" ส่วนการกด approve ทั้งที่ไม่ได้อ่าน คือการเอาด่านที่สำคัญที่สุดออกไปโดยที่ทุกคนยังคิดว่ามันอยู่**

## แหล่งต้นทาง: อะไรที่ผมยืนยันได้ และอะไรที่ยืนยันไม่ได้

**ยืนยันไม่ได้**

- หน้า trending ของ X ผมเปิดอ่านไม่ได้ (หน้าตอบกลับเป็น error ไม่มีเนื้อหา) เลยไม่รู้ว่าสรุปในหน้านั้นเขียนว่าอะไร และจะไม่อ้างถึงเนื้อหาในนั้น
- รายงานของ LinearB ผมอ่านจากหน้าเว็บสรุป benchmark ไม่ได้อ่านไฟล์ PDF ฉบับเต็ม และหน้านั้นไม่ได้ระบุวันที่เผยแพร่
- ผมไม่ได้วัดผลในทีมตัวเองด้วยตัวเลข ส่วนที่เป็นวิธีตั้งค่าข้างล่างคือวิธีที่ผมจะตั้งและสิ่งที่ผมจะตรวจ ไม่ใช่ผลที่วัดมาแล้ว

**ยืนยันได้**

ผมอ่านจากแหล่งเหล่านี้โดยตรงครับ

- [AI Engineering Report 2026 "The Acceleration Whiplash" ของ Faros AI (PDF)](https://pages.faros.ai/hubfs/AI_Engineering_Report_2026_The_Acceleration_Whiplash_Faros.pdf) ไฟล์ไม่ได้พิมพ์วันที่ไว้ในเนื้อหา แต่ metadata ของไฟล์ระบุว่าสร้างวันที่ 9 เมษายน 2026
- [หน้า Engineering benchmarks 2026 ของ LinearB](https://linearb.io/library/engineering-benchmarks-and-research)
- เปเปอร์ ["Early-Stage Prediction of Review Effort in AI-Generated Pull Requests"](https://arxiv.org/abs/2601.00753) บน arXiv ส่งครั้งแรก 2 มกราคม 2026 หน้า arXiv ระบุว่าได้รับคัดเลือกไปงาน MSR '26
- เอกสารของ GitHub สามหน้า คือ [auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) และ [code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) รวมถึง [changelog](https://github.blog/changelog/2021-02-04-pull-request-auto-merge-is-now-generally-available/) วันที่ 4 กุมภาพันธ์ 2021 ที่ประกาศว่า auto-merge เปิดให้ใช้ทั่วไป

ข้อควรรู้คือทั้ง Faros และ LinearB เป็นบริษัทที่ขายเครื่องมือวัดผลทีมวิศวกรรม ข้อมูลมาจากลูกค้าบนแพลตฟอร์มตัวเอง ผมใช้ตัวเลขเป็นสัญญาณ ไม่ใช่ข้อสรุปของทั้งอุตสาหกรรมครับ

## ข้อมูลบอกอะไร

**Faros 2026: PR ที่ merge โดยไม่มีใครรีวิวเพิ่มขึ้น** รายงานนี้ใช้ข้อมูลราวสองปีจากนักพัฒนา 22,000 คนใน 4,000 ทีม ในบทสรุปมีประโยคตรง ๆ ว่า

> 31% more PRs are merging without any review.

ในตารางของหัวข้อ pre-merge code quality ตัวเลขเต็มคือ "+31.3% PRs merged without any review" และผู้เขียนเรียกมันว่าข้อค้นพบที่เร่งด่วนที่สุดของหัวข้อนั้น รายงานยังบอกว่าเวลารอก่อนมีคนหยิบ PR ไปรีวิว (ค่ามัธยฐาน) เพิ่มขึ้น 156.6% และขนาด PR เฉลี่ยเพิ่มขึ้น 51.3%

ต้องอ่านวิธีวัดประกอบด้วยครับ ตัวเลขเหล่านี้คือการเปลี่ยนแปลงของแต่ละทีม ระหว่างสองไตรมาสที่ใช้ AI น้อยที่สุดกับสองไตรมาสที่ใช้มากที่สุด วิเคราะห์ด้วย Spearman's rank correlation แปลว่าเป็นความสัมพันธ์ ไม่ได้พิสูจน์ว่า AI เป็นสาเหตุ

**LinearB: PR จาก AI รอนานกว่า และ merge น้อยกว่า** หน้า benchmark ของ LinearB บอกว่าใช้ข้อมูล PR 8,109,244 ตัวจาก 4,813 ทีม และเขียนว่า

> Manual pull requests merge within 30 days at 84.4% versus 32.7% for AI pull requests, which also run 2.6x larger at the 75th percentile.

ในตารางเวลาที่ PR รอให้มีคนหยิบไปรีวิว (pickup time) ที่เปอร์เซ็นไทล์ 75 PR แบบ Agentic AI รอ 17.6 ชั่วโมง เทียบกับ PR ที่ไม่ได้ใช้ AI รอ 3.4 ชั่วโมง และ LinearB เตือนเองใน FAQ ว่า "Frame every AI finding as correlation rather than causation."

**arXiv: PR จาก agent มีสองแบบชัดเจน** เปเปอร์นี้วิเคราะห์ PR ที่ agent เป็นคนเปิด 33,707 ตัว แล้วพบว่า agent ทำงานแคบ ๆ ได้ดี (28.3% merge ทันที) แต่บ่อยครั้งที่ไปไม่รอดเมื่อต้องแก้ตาม feedback หลายรอบ ผู้เขียนเรียกต้นทุนที่ตกกับคนดูแล repo ว่า "attention tax" และเสนอโมเดลทำนาย PR ที่จะกินแรงรีวิวมากตั้งแต่ตอนเปิด โดยดูสัญญาณอย่างชนิดไฟล์และขนาด patch

## auto-merge ของ GitHub ทำอะไรจริง ๆ

ตรงนี้คือจุดที่ผมว่าคนเข้าใจคลาดกันบ่อยที่สุดครับ เอกสารของ GitHub นิยามไว้ว่า

> Auto-merge merges a pull request automatically after all required reviews and status checks pass.

คำสำคัญคือ "required" auto-merge ไม่ได้ข้ามการรีวิว มันแค่รอจนด่านที่ repo บังคับไว้ผ่านครบแล้วค่อย merge ถ้า repo ไม่ได้บังคับอะไรเลย มันก็ merge ได้ทันที

เอกสารยังบอกอีกสองข้อที่ควรรู้

- ต้องเปิดใช้ auto-merge ที่ระดับ repo ก่อน และคนที่มีสิทธิ์ write เป็นคนเปิดให้ PR แต่ละตัว
- "Auto-merge is disabled if someone without write permissions pushes new changes to the head branch or switches the base branch." แต่ถ้า agent ทำงานด้วย token ที่มีสิทธิ์ write ข้อนี้ก็ไม่ได้ช่วย (เป็นการตีความของผมจากเงื่อนไขนี้)

ดังนั้นเวลามีคนบอกว่า "ทีมเราเปิด auto-merge แล้ว PR เข้าไปโดยไม่มีใครดู" ปัญหาจริงอยู่ที่ branch protection ไม่ได้อยู่ที่ปุ่ม auto-merge ครับ คือไม่ได้บังคับรีวิว หรือบังคับแต่คน approve โดยไม่อ่าน

## ทำไมคนถึง approve โดยไม่อ่าน

จากตรงนี้ไปเป็นความเห็นของผมครับ ผมไม่คิดว่าคนกด approve ผ่าน ๆ เพราะขี้เกียจ ส่วนใหญ่เป็นผลของระบบ

**อัตราส่วนเปลี่ยนไป** agent เปิด PR ได้ในไม่กี่นาที แต่การอ่านให้เข้าใจยังใช้เวลาเท่าเดิม ฝั่งผลิตเร็วขึ้นหลายเท่า ฝั่งตรวจเท่าเดิม แรงกดดันที่จะ "เคลียร์คิว" ก็ตกที่คนรีวิว

**CI เขียวให้ความรู้สึกว่ามีคนตรวจแล้ว** แต่ CI ตรวจได้แค่สิ่งที่มี test ครอบไว้ (ผมเขียนไว้ละเอียดใน[Green Check ไม่ได้แปลว่าถูก](/blog/verify-and-supervision-paradox)) และเมื่อ agent เขียน test มาพร้อมโค้ด test มักทดสอบสิ่งที่โค้ดทำ ไม่ใช่สิ่งที่ลูกค้าต้องการ

**PR จาก agent ไม่มีเจ้าของ** PR ที่คนเขียนเองมีคนคอยตามคอยทวง PR ที่ agent เปิด คนสั่งคิดว่าคนรีวิวจะดู คนรีวิวคิดว่าคนสั่งดูมาแล้ว ผมคิดว่าข้อนี้อธิบาย pickup time ของ LinearB ได้ส่วนหนึ่ง แต่เป็นการตีความของผม หน้าที่ผมอ่านไม่ได้บอกสาเหตุ

**การ approve กลายเป็นการตาม** ใน[โพสต์เรื่องการตาม AI โดยไม่รู้ตัว](/blog/anthropic-unconscious-ai-deferral) งานของ Anthropic พบว่าคนที่ตรวจงานของ agent มักรับเหตุผลของ agent มาเป็นของตัวเอง PR description ที่ agent เขียนมั่นใจและเรียบร้อย ทำให้กด approve ง่ายขึ้นแม้ไม่ได้ตรวจเอง

## ความเสี่ยงที่เกิดขึ้นจริง

ถ้ามองจากมุม QA บั๊กหลุดเป็นความเสี่ยงที่ชัดที่สุด แต่ผมกังวลอีกสามเรื่องมากกว่าครับ

**test ที่ถูกแก้ให้ผ่าน** agent ที่ถูกสั่งให้ "ทำให้ CI เขียว" อาจทำได้หลายแบบ รวมถึงแก้ assertion ให้ตรงกับผลที่ผิด ลบ test ที่ fail หรือข้าม test ด้วย skip ถ้าไม่มีใครเปิด diff ของ test สีเขียวก็ไม่มีความหมาย

**หนี้ความเข้าใจ** ทุก PR ที่เข้าไปโดยไม่มีใครอ่าน คือโค้ดที่ไม่มีใครในทีมอธิบายได้ ผมเรียกสิ่งนี้ว่า[หนี้ความเข้าใจ](/blog/comprehension-debt) และการ approve โดยไม่อ่านคือวิธีสะสมหนี้ที่เร็วที่สุด

**ไม่มีใครตอบได้ว่าใครอนุมัติ** สำหรับงานลูกค้า ผมต้องตอบได้ว่าการเปลี่ยนแปลงนี้ใครตรวจ ใครยอมให้เข้า ถ้าชื่อคนอนุมัติคือคนที่ไม่ได้อ่าน ประวัติใน git ก็ดูครบแต่ไม่ได้บอกความจริง

## เมื่อไหร่ที่ auto-merge รับได้

ผมไม่คิดว่าคำตอบคือ "ทุก PR ต้องมีคนอ่านทุกบรรทัด" ครับ Faros เองก็เขียนในข้อเสนอแนะว่าข้อบังคับแบบนั้นจะพังเมื่อปริมาณ PR โต แต่เขาก็เขียนต่อว่า

> What is not acceptable under any policy is no review at all.

และเสนอให้แบ่งตามความเสี่ยง ระบบที่เดิมพันสูง โค้ดส่วนที่เกี่ยวกับความปลอดภัย และบริการที่ลูกค้าใช้ ควรมีคนดู ส่วนที่เสี่ยงต่ำอาจให้ agent รีวิวได้ ซึ่งเป็นแนวเดียวกับที่ผมเคยเขียนไว้ตอน[Claude Code ที่ Anthropic](/blog/anthropic-claude-code-pr) เรื่องการรีวิวแบบแบ่งชั้นตามความเสี่ยง

ผมจะแบ่งเป็นสามชั้นแบบนี้ครับ (เป็นการแบ่งของผมเอง ไม่ใช่มาตรฐานจากแหล่งไหน)

| ชั้น | ตัวอย่าง | วิธี merge |
| --- | --- | --- |
| ต่ำ | อัปเดต dependency ระดับ patch, แก้คำผิดในเอกสาร, แก้ lint | auto-merge ได้ ถ้า CI และเครื่องมือรีวิวอัตโนมัติผ่าน |
| กลาง | ฟีเจอร์ใหม่หลัง feature flag, refactor ในขอบเขตเดียว, หน้า UI ใหม่ | คน approve อย่างน้อยหนึ่งคน auto-merge ได้หลังจากนั้น |
| สูง | auth, payment, สิทธิ์ผู้ใช้, migration ฐานข้อมูล, infra, CI workflow, ไฟล์ test | code owner ต้อง approve และอ่านจริง ไม่เปิด auto-merge จนกว่าจะอ่านเสร็จ |

auto-merge ในชั้นต่ำรับได้เพราะสามเงื่อนไขครับ ผิดแล้วเสียหายน้อย ตรวจด้วยเครื่องได้เกือบหมด และย้อนกลับได้ง่าย ถ้าขาดข้อใดข้อหนึ่ง ผมจะไม่ให้อยู่ชั้นต่ำ

## guardrail ที่ผมจะตั้ง

ส่วนนี้คือวิธีที่ผมจะตั้งบน GitHub ครับ ตัวกลไกอ้างจากเอกสาร ส่วนการเลือกใช้เป็นความเห็นของผม

**1. test ที่ agent แก้เองไม่ได้** ใช้ CODEOWNERS กำหนดเจ้าของให้โฟลเดอร์ test และ `.github/workflows/` เป็นคนในทีม แล้วเปิด "Require review from Code Owners" เอกสารบอกว่า "Code owners are automatically requested for review when someone opens a pull request that modifies code that they own." และเมื่อเปิดตัวเลือกนี้ ต้องได้ approve จากเจ้าของก่อน merge agent จึงแก้โค้ดได้ แต่ถ้าแตะ test หรือ CI ต้องมีคนดูเสมอ (code owner ต้องมีสิทธิ์ write ใน repo)

**2. approve แล้วต้องเป็นของล่าสุด** เปิด dismiss approval เก่าเมื่อมี commit ใหม่ที่เปลี่ยน diff และ "require that the most recent reviewable push must be approved by someone other than the person who pushed it." กันกรณีที่ approve ไปแล้ว agent ค่อย push ของเพิ่มก่อน merge

**3. CI ที่บังคับจริง** ตั้ง required status checks ให้ครอบ build, test, lint และ type check เอกสารบอกว่า "all required status checks must pass before collaborators can merge changes into the protected branch." ถ้า repo ไม่ได้ตั้งไว้ auto-merge ก็ไม่มีอะไรให้รอ

**4. ปิดทาง admin bypass** ข้อนี้คนมองข้ามบ่อยครับ เอกสารบอกว่า "By default, the restrictions of a branch protection rule do not apply to people with admin permissions to the repository" ต้องเปิดตัวเลือกให้กฎบังคับกับ admin เอง และผมจะไม่ให้ agent ใช้ token ของ admin

**5. จำกัดขนาด PR** สั่ง agent ให้แบ่งงานเป็น PR เล็ก และตั้ง check ที่เตือนหรือ block PR ที่ใหญ่เกินเกณฑ์ของทีม Faros เขียนข้อเสนอแนะไว้ตรง ๆ ว่า "Set PR size guidelines for your coding agents and enforce them." ส่วนตัวเลขเกณฑ์แต่ละ codebase ต้องตั้งเอง

**6. feature flag และแผนย้อนกลับ** สำหรับชั้นกลาง ฟีเจอร์ใหม่ต้องอยู่หลัง flag ที่ปิดไว้ก่อน merge เข้า main ได้โดยยังไม่กระทบผู้ใช้ และทุก PR ต้อง revert ได้ด้วย commit เดียว ช่วยลดความเสียหายเวลารีวิวพลาด แต่ไม่ได้แทนการรีวิวครับ

## ทำให้รีวิวถูกลง แทนที่จะข้ามไป

guardrail ข้างบนกันความเสียหาย แต่ไม่ได้แก้ต้นเหตุคือคนรีวิวไม่ทัน ทางที่ถูกคือลดต้นทุนต่อการรีวิวหนึ่งครั้ง ไม่ใช่ลดจำนวนครั้ง

**ให้ PR บอกเองว่าต้องดูตรงไหน** ผมจะให้ agent เขียน PR description ตาม template เดียวกันทุกครั้ง คือแก้อะไร เพราะ ticket ไหน ไฟล์ไหนเป็นหัวใจ ตัดสินใจอะไรไปเอง และแตะ test หรือ config ไหม คนรีวิวจะเริ่มจากจุดเสี่ยงที่สุดได้เลย

**อ่าน test ก่อนอ่านโค้ด** ถ้าเวลาน้อย ผมจะอ่าน diff ของ test ก่อนครับ ถ้า test ตรงกับ acceptance criteria และไม่ได้ถูกแก้ให้อ่อนลง โค้ดที่ผ่าน test พวกนั้นก็น่าเชื่อขึ้นมาก และถ้า[AC ชัดตั้งแต่ต้น](/blog/agent-era-write-ac-like-po) การตรวจว่า test ครอบ AC ครบไหมเร็วกว่าการเดาว่าโค้ดถูกไหมมาก

**ให้เครื่องรีวิวรอบแรก** ให้ agent หรือเครื่องมือรีวิวจับเรื่องรูปแบบโค้ดและ pattern ที่ผิดบ่อย คนจะเหลือแค่คำถามที่เครื่องตอบแทนไม่ได้ คือแก้ปัญหาที่ถูกไหม และถูกที่ไหม

**คนสั่ง agent คือเจ้าของ PR** ข้อนี้เป็นกติกาที่ผมจะตั้งกับทีมครับ ใครสั่ง agent ให้เปิด PR คนนั้นต้องอ่าน PR ของตัวเองก่อนขอรีวิว และตามให้ PR จบ การรีวิวจะได้ไม่ใช่ครั้งแรกที่มีมนุษย์เห็นโค้ดนั้น

**จำกัด PR ที่เปิดค้าง และนับการรีวิวเป็นงาน** ตั้งเพดานว่าคนหนึ่งมี PR รอรีวิวได้กี่ตัว ถ้าเต็มต้องเคลียร์ของเก่าก่อน และกันเวลารีวิวไว้ในแผน sprint เป็นงานจริง ไม่ใช่งานแทรก

## Checklist ก่อนเปิด auto-merge ให้ PR จาก agent

**ตั้งค่า repo**

- [ ] branch หลักบังคับ PR และจำนวน approve ขั้นต่ำตามชั้นความเสี่ยงที่ทีมตกลงกัน
- [ ] required status checks ครอบ build, test, lint และ type check
- [ ] เปิด dismiss stale approvals และ require approval of the most recent reviewable push
- [ ] CODEOWNERS ครอบโฟลเดอร์ test, `.github/workflows/`, auth, payment, migration และ infra
- [ ] เปิด Require review from Code Owners
- [ ] เปิดตัวเลือกที่ห้าม admin bypass กฎของ branch
- [ ] agent ใช้ token ที่ไม่ใช่ของ admin และมีสิทธิ์น้อยที่สุดที่ทำงานได้

**ตกลงกับทีม**

- [ ] มีตารางชั้นความเสี่ยงที่เขียนไว้ ว่าการเปลี่ยนแปลงแบบไหนอยู่ชั้นไหน
- [ ] auto-merge ใช้ได้เฉพาะชั้นต่ำ หรือหลังจากคน approve แล้วเท่านั้น
- [ ] มีเพดาน PR ที่เปิดค้างต่อคน และกันเวลารีวิวไว้ในแผน

**ตอนรีวิวแต่ละ PR**

- [ ] PR description บอกว่าแก้อะไร เพราะ ticket ไหน และ agent ตัดสินใจอะไรไปเอง
- [ ] เปิด diff ของ test ก่อน ดูว่าไม่มี test ถูกลบ ถูก skip หรือ assertion ถูกแก้ให้อ่อนลง
- [ ] test ครอบ acceptance criteria ครบ ไม่ใช่แค่ครอบสิ่งที่โค้ดทำ
- [ ] PR ไม่ใหญ่เกินเกณฑ์ ถ้าใหญ่ให้แตก ไม่ใช่ approve ผ่าน ๆ
- [ ] ถ้าผมเป็นคน approve ผมอธิบายได้ว่า PR นี้เปลี่ยนอะไรและทำไม โดยไม่ต้องเปิด description ของ agent
- [ ] ทบทวนเป็นระยะว่ามี PR ที่ merge โดยไม่มีรีวิวหลุดเข้ามาไหม ผ่านช่องทางไหน

## ท้ายที่สุด

ผมว่าข้อมูลที่มีตอนนี้บอกได้ค่อนข้างชัดครับว่าปัญหามีจริง แต่ตัวเลขทั้งหมดมาจากบริษัทที่ขายเครื่องมือวัดผล เป็นความสัมพันธ์ไม่ใช่เหตุและผล และผมยังไม่เห็นข้อมูลว่า PR ที่หลุดไปก่อความเสียหายจริงแค่ไหน

สิ่งที่ผมเก็บไว้คือการแยกสองเรื่องที่มักถูกพูดรวมกัน การให้เครื่อง merge แทนเราไม่ใช่เรื่องผิด ถ้าด่านที่เครื่องรอนั้นมีความหมาย แต่การกด approve โดยไม่อ่านทำให้ด่านนั้นไม่มีความหมาย ทั้งที่ทุกคนยังเห็นว่ามันอยู่

ก่อนกด approve PR จาก agent ตัวต่อไป ผมจะถามตัวเองข้อเดียวครับ "ถ้า PR นี้พังตอนตีสอง และลูกค้าถามว่าใครเป็นคนตรวจ ผมพร้อมให้ชื่อผมอยู่ตรงนั้นไหม" ถ้าคำตอบคือไม่ ก็ยังไม่ควรกดครับ
