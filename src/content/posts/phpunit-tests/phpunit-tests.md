---
title: "PHPUnit tests"
date: "2023-08-17"
---

การเขียน PHPUnit tests เป็นส่วนสำคัญของกระบวนการพัฒนาซอฟต์แวร์ที่ช่วยให้คุณตรวจสอบและยืนยันว่าโค้ดของคุณทำงานได้ตามคาดหวังและไม่มีข้อผิดพลาดที่ไม่ตรงตามตั้งใจ ด้วย PHPUnit ซึ่งเป็นเครื่องมือสำหรับเขียนและเรียกใช้งานเทสในภาษา PHP คุณสามารถประเมินคุณภาพของโค้ดและรักษาความเสถียรได้โดยใช้การทดสอบหลากหลายรูปแบบ

## เหตุผลที่คุณควรเขียน PHPUnit tests

- **การป้องกันข้อผิดพลาด (Bugs Prevention)**: การเขียน unit tests ช่วยตรวจสอบความถูกต้องของโค้ดก่อนที่จะมีการนำไปใช้งานจริง นั่นหมายความว่าคุณสามารถตรวจหาข้อผิดพลาดและปรับปรุงโค้ดก่อนที่จะมีการปล่อยให้ผู้ใช้งานใช้งานจริง นี้ช่วยลดเวลาและค่าใช้จ่ายในการแก้ไขข้อผิดพลาดที่เกิดขึ้นในระหว่างการใช้งานจริง.
- **การบำรุงรักษา (Maintenance)**: การมี unit tests ช่วยให้คุณทราบถึงผลกระทบของการเปลี่ยนแปลงในโค้ดที่มีอยู่และทำให้คุณสามารถปรับปรุงหรือปรับแก้โค้ดเพื่อให้สอดคล้องกับความต้องการใหม่ได้อย่างมีความมั่นใจ.
- **การออกแบบ (Design)**: เขียน unit tests ช่วยให้คุณตรวจสอบว่าโค้ดของคุณมีการออกแบบที่ดีและสอดคล้องกับความต้องการ นี่ช่วยลดความเสี่ยงที่โค้ดอาจกลายเป็นโค้ดที่ซับซ้อนและยากต่อการบำรุงรักษาในอนาคต.
- **การเปิดโอกาสในการพัฒนา (Development Opportunities)**: เขียน tests ช่วยให้คุณทราบถึงว่าโค้ดที่คุณเขียนนั้นทำงานได้ตามที่คุณคาดหวัง และช่วยลดความกังวลเมื่อคุณทำการปรับปรุงหรือเพิ่มฟีเจอร์ใหม่ลงในโค้ด.

โดยเบื้องต้นเดียวผมจะแนะนำ วิธีการติดตั้งกับวิธีการ run PHPUnit tests ให้เบื้องต้นแลัวจะแปะ github ที่เป็น case stady ไว้ให้โดยตัวนี้จะเป็นคอร์สที่ผมไปเรียนในเว็บ [laracasts](https://laracasts.com/series/code-katas-with-phpunit) ครับ

##1. Setup PHPUnit tests
```bash
composer require phpunit/phpunit
```

## 2. ทำการเข้าไป update file composer.json

```json
{
    "require": {
        "phpunit/phpunit": "^9.6" // อาจจะไม่ใช้ version ตามนี้นะไม่ต้องตกใจ
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

## 3. ทำการสร้างโครงสร้างโปรเจคสำหรับทดสอบ

```
-| src
---| Abc.php
-| tests
---| AbcTest.php
-| vendor // -> ตัวนี้จะเป็น folder ไว้เก็บ package ที่เราสามารถยิบนำไปใช้
-| composer.json
-| composer-lock.json
```

## 4. อัพเดต code file Abc.php

```php
<?php

namespace App;

class Abc
{
    public static function generate($number)
    {
        return $number;
    }
}
```

## 5. อัพเดต code file AbcTest.php

```php
<?php

use App\Abc;
use PHPUnit\Framework\TestCase;

class AbcTest extends TestCase
{

    /** 
     * @test
     * */
    function it_generates_check_number_test_1()
    {
        $this->assertEquals('1', Abc::generate('1'));
    }

}
```

## 6. จากนั้นลอง Run test
วิธี run test ก็มีหลากหลายวิธีแต่ผมจะยกตัวอย่าง 2 วิธีนะครับ

1.วิธีที่ใช้ command

```bash
./vendor/bin/phpunit --verbose tests/AbcTest.php
```

2.วิธีโดยใช้ extensions vscode

[PHPUnit](https://marketplace.visualstudio.com/items?itemName=emallin.phpunit)

ติดตั้งจากตัวนี้ได้เลย วิธีใช้ก็ง่ายแสนง่ายเพียงเอาเมาส์ไปกดที่ function แล้วกด ```Cmd+Shift+P``` on OSX or ```Ctrl+Shift+P``` on Windows and Linux เลือก ```PHPUnit Test```

เพียงเท่านี้ระบบก็จำทำการ run test PHPUnit ให้แล้ว

ลองไปเล่น case ตาม github นี้ได้เลย ผมทำเป็น commit ให้นะ

[Github](https://github.com/earth774/coder-katas-phpunit)