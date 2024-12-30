---
title: "Laravel Relationship"
date: "2023-10-16"
---

ในการพัฒนาแอปพลิเคชันด้วย Laravel การจัดการข้อมูลระหว่างตารางเป็นสิ่งที่สำคัญอย่างยิ่ง และ Laravel มีเครื่องมือที่ช่วยให้การจัดการข้อมูลเหล่านี้เป็นเรื่องง่าย อย่างที่ Laravel Relationship นั้นมีบทบาทสำคัญในการช่วยเชื่อมโยงข้อมูลระหว่างตารางต่าง ๆ ในฐานข้อมูลของเรา

##One to One Relationship
ในกรณีที่ต้องการเชื่อมโยงข้อมูลระหว่างตารางแบบ One-to-One จะเป็นเมื่อแต่ละแถวในตารางหนึ่งสามารถมีแถวเพียงแถวเดียวในตารางอีกตารางหนึ่ง ตัวอย่างเช่น ตารางข้อมูลผู้ใช้และตารางข้อมูลโพรไฟล์:

```php
// User Model
class User extends Model {
    public function profile() {
        return $this->hasOne(Profile::class);
    }
}

// Profile Model
class Profile extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }
}
```

##One to Many Relationship
ในกรณีที่ต้องการเชื่อมโยงข้อมูลแบบ One-to-Many คือเมื่อแต่ละแถวในตารางหนึ่งสามารถมีหลายแถวในตารางอีกตารางหนึ่ง ตัวอย่างเช่น ตารางข้อมูลโพสต์และตารางข้อมูลความคิดเห็น:

```php
// Post Model
class Post extends Model {
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}

// Comment Model
class Comment extends Model {
    public function post() {
        return $this->belongsTo(Post::class);
    }
}
```

##Many to Many Relationship
การเชื่อมโยงข้อมูลแบบ Many-to-Many เป็นการเชื่อมโยงแถวในตารางหนึ่งกับแถวในตารางอีกตารางหนึ่ง และความนิยมในการจัดการความสัมพันธ์แบบนี้คือผ่านตารางกลาง (pivot table) เช่น การเชื่อมโยงข้อมูลผู้ใช้กับบทความ:

```php
// User Model
class User extends Model {
    public function articles() {
        return $this->belongsToMany(Article::class);
    }
}

// Article Model
class Article extends Model {
    public function users() {
        return $this->belongsToMany(User::class);
    }
}
```

##Has Many Through Relationship
Has Many Through Relations ช่วยให้เราสามารถเชื่อมโยงข้อมูลระหว่างตารางให้สามารถผ่านตารางกลางได้ ตัวอย่างเช่น การเชื่อมโยงข้อมูลผู้สอนกับคอร์สเรียนผ่านตาราง enrollments:

```php
// Teacher Model
class Teacher extends Model {
    public function courses() {
        return $this->hasManyThrough(Course::class, Enrollment::class);
    }
}

// Enrollment Model
class Enrollment extends Model {
    public function course() {
        return $this->belongsTo(Course::class);
    }
}

// Course Model
class Course extends Model {
    // ...
}
```

##Polymorphic Relationship
Polymorphic Relations ใช้เมื่อต้องการเชื่อมโยงข้อมูลไปยังหลายๆ ตารางโดยใช้ตารางเป็นตัวกลาง โดยสามารถเชื่อมโยงไปยังหลายๆ ตารางได้ ตัวอย่างเช่น การเชื่อมโยงไปยังรูปภาพที่ใช้ในโพสต์ ความคิดเห็น และโปรไฟล์:

```php
// Comment Model
class Comment extends Model {
    public function commentable() {
        return $this->morphTo();
    }
}

// Post Model
class Post extends Model {
    public function comments() {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

// Profile Model
class Profile extends Model {
    public function comments() {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
```

##Polymorphic Many-to-Many Relationship
Polymorphic Many-to-Many Relations ใช้เชื่อมโยงข้อมูลระหว่างตารางโดยใช้ตารางเป็นตัวกลาง และสามารถเชื่อมโยงไปยังหลายๆ ตารางได้ ตัวอย่างเช่น การเชื่อมโยงข้อมูลผู้ใช้กับภาพโปรไฟล์ และคอร์สเรียน:

```php
// User Model
class User extends Model {
    public function images() {
        return $this->morphToMany(Image::class, 'imageable');
    }

    public function courses() {
        return $this->morphToMany(Course::class, 'enrollable');
    }
}

// Image Model
class Image extends Model {
    public function imageable() {
        return $this->morphTo();
    }
}

// Course Model
class Course extends Model {
    public function students() {
        return $this->morphToMany(User::class, 'enrollable');
    }
}
```
ด้วยความสามารถของ Laravel Relationship เราสามารถจัดการและเชื่อมโยงข้อมูลระหว่างตารางในรูปแบบต่างๆ ได้อย่างสะดวก ทำให้การพัฒนาแอปพลิเคชันด้วย Laravel กลายเป็นเรื่องง่ายและมีประสิทธิภาพมากยิ่งขึ้น