---
title: "MySql เรียงตัวอักษรไทย UTF-8"
date: "2023-07-19"
---

เริ่มต้นเดิมที่ได้มีโอกาศทำการต้องดึงข้อมูลของสัตว์ที่เรียงชื่อสัตว์ ก-ฮ เพื่อนที่อ่านนี้คงคิด code ในหัวออกแล้วใช้ไหม ก็แค่เพียงใช้ ORDER BY ก็จบแล้วนี้จะมีอะไรยาก เดียวจะลองแสดงตัวอย่างให้ดู

## ยกตัวอย่างฐานข้อมูล ตามนี้
![Mysql Join](/images/posts/mysql-utf8/mysql-utf8-1.png)
สังเกตุผมจะเน้นไปที่ filed name_th นะครับ จะใช้เป็น utf-8 เนาะ แล้วเดียวมาดูกันต่อว่าเวลาเรา SELECT ORDER BY ASC ข้อมูลมันจะได้เป็นแบบไหน

##ข้อมูลในฐานข้อมูล
![Mysql Join](/images/posts/mysql-utf8/mysql-utf8-2.png)

##ลองเขียนคำสั่ง ORDER BY ASC แบบปกติ
```sql
SELECT * FROM `livestock_product_master` ORDER BY name_th ASC
```
![Mysql Join](/images/posts/mysql-utf8/mysql-utf8-3.png)
ดูข้อมูลในช่อง name_th จะเห็นได้ว่ามันเรียงตามตัวอักษรถูกต้องตามที่มันควรจะเป็น แต่ดันเอาเงื่อนไขที่เป็นสระเข้ามาด้วยนะสิ ตามโจทย์ เราต้องการ เรียง ก-ฮ เนาะ ควรเริ่มต้นจาก ไก่ ใช้ไหมครับ ถ้าตาม sense ของเราแล้ว เดียวจะมาเฉลยวิธีการที่จะทำให้มันเรียงตามตัวอักษาให้


##CODE เรียงตามตัวอังษร
```sql
SELECT * FROM `livestock_product_master` ORDER BY CONVERT( name_th USING tis620 ) ASC
```
![Mysql Join](/images/posts/mysql-utf8/mysql-utf8-4.png)

เพียงเท่านี้ก็ได้ การเรียงตัวอักษรที่เราต้องการแล้ว เดียวเรามาลองอธิบาย Code SQL กันหน่อยแล้วกัน

สำหรับรายละเอียดแต่ละส่วนของคำสั่ง SQL:
1. ```SELECT *```: คำสั่งในการเลือกข้อมูลทั้งหมด (ทุกคอลัมน์) จากตาราง ```livestock_product_master```.
2. ```FROM livestock_product_master```: ระบุตารางที่ต้องการใช้งานคือ ```livestock_product_master```.
3. ```ORDER BY CONVERT( name_th USING tis620 ) ASC```: ส่วนนี้ใช้ในการเรียงลำดับข้อมูลตามชื่อภาษาไทย โดยการแปลงชื่อเป็น TIS620 ก่อน และกำหนดให้เรียงลำดับข้อมูลจากน้อยไปหามาก (ASC หมายถึง Ascending order).

เพียงเท่านี้ก็จะได้ตามที่เราต้องการแล้ว ผมคิดว่าการ SELECT แนวนี้ถ้าใครทำเว็บไซต์ภาษาไทย ที่ใช้กับ mysql ก็น่าจะเจอปัญหานี้บ่อยๆเนาะ หรือใครที่ใช้เป็นภาษาอื่นก็ลองเอา keyword นี้ไปค้นหาดูนะครับ “.ชื่อภาษาที่ใช่. natural sorting”