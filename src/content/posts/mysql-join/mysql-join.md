---
title: "Mysql Join"
date: "2023-09-18"
---


การใช้งาน MySQL JOIN เป็นเทคนิคที่สำคัญในการรวมข้อมูลจากตารางต่าง ๆ เข้าด้วยกันเพื่อให้ได้ข้อมูลที่ต้องการตามเงื่อนไขที่กำหนด มีหลายประเภทของ JOIN ที่สามารถใช้ได้ตามสภาพการใช้งานต่าง ๆ

##INNER JOIN
ใช้เพื่อเลือกแถวที่มีคีย์สอดคล้องในทั้งสองตารางที่มีการรวมกัน

```sql
SELECT customers.customer_id, customers.name, orders.order_id
FROM customers
INNER JOIN orders ON customers.customer_id = orders.customer_id;
```

## LEFT JOIN (LEFT OUTER JOIN)
ใช้เพื่อแสดงแถวจากตารางซ้ายที่มีคีย์สอดคล้องแม้ว่าไม่มีคีย์สอดคล้องในตารางขวา หรือ อธิบายอีกอย่างคือดึงข้อมูลโดยเน้น table หลัก โดยที่ table ที่ join ไม่จำเป็นต้องมีข้อมูลก็ได้

```sql
SELECT customers.customer_id, customers.name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```

##RIGHT JOIN (RIGHT OUTER JOIN)
ใช้เพื่อแสดงแถวจากตารางขวาที่มีคีย์สอดคล้องแม้ว่าไม่มีคีย์สอดคล้องในตารางซ้าย หรือ อธิบายอีกอย่างคือดึงข้อมูลโดยเน้น table ที่ join โดยที่ table หลัก ไม่จำเป็นต้องมีข้อมูลก็ได้

```sql
SELECT customers.customer_id, customers.name, orders.order_id
FROM customers
RIGHT JOIN orders ON customers.customer_id = orders.customer_id;
```

##FULL OUTER JOIN (FULL JOIN)
ใช้เพื่อแสดงแถวที่มีคีย์สอดคล้องในทั้งสองตารางแม้ว่าจะไม่มีคีย์สอดคล้องในตารางใดตารางหนึ่ง

```sql
SELECT customers.customer_id, customers.name, orders.order_id
FROM customers
FULL OUTER JOIN orders ON customers.customer_id = orders.customer_id;
```

ตัวอย่าง code ข้างต้นเป็นแค่ตัวอย่างพื้นฐานเราสามารถเอา การ join แต่ละแบบมาใช้รวมกันได้ แต่ก็ขึ้นอยู่การประยุกต์ของแต่ละคน ลองเอาไปเล่นกันดูครับ