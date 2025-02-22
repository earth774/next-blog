---
title: "กำหนด primary key เป็นเลขล่าสุดทุก table"
date: "2024-02-22"
---

ขอผิดพลาดที่เจอเลยเวลาเรา migrate แล้วยกเฉพาะ data เข้าไป import จะมีกรณีนึงคือเลขที่ autoincrement มันดันไม่อัพเดตเป็นตัวล่าสุดให้ด้วยสิ ไม่รู้ว่าเป็นกันไหม แต่นี้พึ้งย้ายมาใช้ postgres ติดบ่อยมาก วันนี้เลยเอา code sql สำหรับอัพเดต primary key ให้เป็นตัวล่าสุดทุก table ให้เพื่อนเอาไปใช้งานกัน

```sql
DO $$
DECLARE
    seq RECORD;
    max_id BIGINT;
BEGIN
    FOR seq IN
        SELECT
            s.relname AS seqname,
            n.nspname AS schemaname,
            tab.relname AS tablename,
            col.attname AS columnname
        FROM pg_class s
        JOIN pg_namespace n ON n.oid = s.relnamespace
        LEFT JOIN pg_depend d ON d.objid = s.oid
        LEFT JOIN pg_class tab ON tab.oid = d.refobjid
        LEFT JOIN pg_attribute col ON col.attrelid = tab.oid AND col.attnum = d.refobjsubid
        WHERE s.relkind = 'S'  -- ค้นหาเฉพาะ sequences
    LOOP
        -- ถ้ามีตารางที่เกี่ยวข้อง
        IF seq.tablename IS NOT NULL THEN
            EXECUTE format('SELECT COALESCE(MAX(%I), 0) FROM %I.%I', seq.columnname, seq.schemaname, seq.tablename)
            INTO max_id;

            -- ตรวจสอบให้แน่ใจว่า max_id >= 1
            max_id := GREATEST(max_id, 1);

            -- ตั้งค่า sequence
            EXECUTE format(
                'SELECT setval(''%I.%I'', %s, true);',
                seq.schemaname, seq.seqname, max_id
            );
        END IF;
    END LOOP;
END $$;
```

### ✅ ผลลัพธ์ที่คาดหวัง

- แก้ปัญหา `value 0 is out of bounds`
- ทุก sequence จะถูกตั้งค่าเป็น ค่ามากสุดของ id ในตารางนั้น ๆ
- ถ้าตารางยังไม่มีข้อมูล sequence จะถูกตั้งค่าเป็น 1 แทน 0

ลองรันกันดูครับ 🚀
