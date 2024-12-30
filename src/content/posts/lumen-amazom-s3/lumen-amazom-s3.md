---
title: "Lumen Amazon S3"
date: "2023-07-16"
---


ช่วงหยุดวันแม่ไม่ได้ไปไหน ได้มีโอกาศจับตัว Amazon s3 เอามาเล่น ในบทความนี้อาจจะไม่ได้เขียนอธิบายอะไรเยอะนะครับ จะเน้นเนื้อหาไปทาง share code เป็นหลัก

## Amazon S3 คือ?

Amazon S3 (Simple Storage Service) เป็นบริการเก็บข้อมูลแบบคลังข้อมูลในคลาวด์ของ Amazon Web Services (AWS) ซึ่งให้คุณเก็บข้อมูลและไฟล์ต่าง ๆ ในรูปแบบของ “โอบเจกต์” ที่สามารถเรียกใช้ได้ผ่านอินเทอร์เน็ต จะเป็นรูปแบบที่คุณสามารถเก็บข้อมูลที่ไม่ได้เป็นโครงสร้างและมีค่าไม่เยอะ โดยเรียกข้อมูลด้วย URL (Uniform Resource Locator) สำหรับการเข้าถึงและจัดเก็บข้อมูลที่ใช้งานร่วมกันระหว่างแอพพลิเคชันและบริการต่าง ๆ บน AWS หรือที่อื่น ๆ ผ่านเครือข่ายอินเทอร์เน็ต

## คุณสมบัติ Amazon S3

- **การเก็บรักษาข้อมูล**: คุณสามารถเก็บข้อมูลที่สำคัญไว้ใน Amazon S3 เพื่อให้มั่นใจว่าข้อมูลของคุณจะไม่สูญหายเมื่อเกิดเหตุการณ์ที่ไม่คาดคิด เช่น คลังข้อมูลของแซมฟูอร์ด.
- **การถ่ายโอนข้อมูล**: Amazon S3 ให้คุณสร้างลิงก์สำหรับข้อมูลของคุณเพื่อให้ผู้อื่นสามารถดาวน์โหลดข้อมูลได้ สามารถใช้งานในการแชร์ไฟล์หรือเนื้อหาในแอพพลิเคชันแบบต่าง ๆ.
- **ข้อมูลแบบสาธารณะและเอกชน**: คุณสามารถกำหนดการเข้าถึงข้อมูลใน Amazon S3 ได้ตามความต้องการ จะเป็นการตั้งค่าให้เป็นข้อมูลสาธารณะ เพื่อให้สามารถเข้าถึงได้โดยไม่ต้องรับรองตัวตน หรือกำหนดให้เป็นข้อมูลเอกชนที่สามารถเข้าถึงได้เฉพาะผู้ที่มีสิทธิ์.
- **ความปลอดภัย**: Amazon S3 มีตัวเลือกความปลอดภัยที่หลากหลาย เช่น การใช้งานการรับรองตัวตนผ่านคีย์แอคเซส (Access Key) และคีย์ลับ (Secret Key) เพื่อความปลอดภัยในการเข้าถึงข้อมูล.
- **การสำรองข้อมูล**: คุณสามารถใช้ Amazon S3 เป็นส่วนหนึ่งของกลไกการสำรองข้อมูล (Backup) เพื่อรักษาข้อมูลสำคัญของคุณไว้ในที่ปลอดภัย.

## เริ่มติดตั้ง Lumen กันก่อน

```bash
composer create-project --prefer-dist laravel/lumen lumen-app
```

## ติดตั้ง Library

ส่วนตัวผมใช้เป็น v.1 นะครับ เหมือนลอง version ล่าสุดแล้วมีปัญหา แต่ก็ลองๆกันดูนะครับ เอา code ข้างล่างไปใส่ไว้ใน “require”

```bash
composer require league/flysystem-aws-s3-v3
```

## ทำการ set .env

ไปทำการขอ token เพื่อที่จะให้ code เราสามารถเชื่อมกับ aws ได้ เดียววิธีขอ token ถ้ามีเวลาเดียวจะมาเขียนบทความอัพเดตให้ แต่เบื้องต้นลองหาตามเน็ตดูกันก่อนนะ

```php
FILESYSTEM_DISK=s3
FILESYSTEM_DRIVER=s3

AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_DEFAULT_REGION=xxx
AWS_BUCKET=xxx
```

## สร้าง ไฟล์​ config/filesystems.php
```php 
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the CloudDisk instance in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem disks as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    */

    'disks' => [

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
        ],

    ],

];
```

## Get All

```php
$router->get('/s3', function () {
    $files = Storage::disk('s3')->files('uploads/');

    return response()->json(['files' => $files]);
});
```

## Get By Key

```php
$router->get('/s3/download', function (Request $request) {

    $url = Storage::disk('s3')->url($request->key);

    return response()->json(['url' => $url]);
});
```

## Upload File

```php
$router->post('/s3/upload', function (Request $request) {
    $file = $request->file('file');
    $path = Storage::disk('s3')->put('uploads', $file);

    return response()->json(['message' => 'File uploaded', 'path' => $path]);
});
```

## Upload File From Base64

```php
$router->post('/s3/upload-base64', function (Request $request) {
    
    list($baseType, $image) = explode(';', $request->file);
    list(, $image) = explode(',', $image);
    $image = base64_decode($image);

    $imageName = "uploads/".time().'.'.'png';

    $path = Storage::disk('s3')->put($imageName, $image);

    return response()->json(['message' => 'File uploaded', 'path' => $path]);
});
```

## Update File
```php
$router->post('/s3/update', function (Request $request) {
    $file = $request->file('file');
    $key = $request->input('key');

    Storage::disk('s3')->delete($key);
    $path = Storage::disk('s3')->put('uploads', $file);

    return response()->json(['message' => 'File updated', 'path' => $path]);
});
```

## Delete File
```php
$router->post('/s3/delete', function (Request $request) {
    $key = $request->input('key');

    Storage::disk('s3')->delete($key);

    return response()->json(['message' => 'File deleted']);
});
```

## Recap
หวังว่าจะเป็นประโยชน์สำหรับคนที่ไม่อยากให้ตัว backend บวมเพียงเพราะเก็บรูปเยอะแล้วต้องขยายขนาด server ตาม ตัวนี้ก็ยังเป็นอีกทางเลือกคือเอาพวก file ขนาดใหญ่ไปเก็บไว้อีก server และการเลือกบริการ amazon s3 ก็ยังเป็นอีก 1 ทางเลือก

สำหรับ code full project นะครับ ผมเอาแปะไว้ใน [github](https://github.com/earth774/lumen-upload-file-s3/tree/main) ให้