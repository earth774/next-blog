---
title: "Hono ใช้กับ D1 Database ของ Cloudflare"
date: "2025-05-02"
---

สร้าง project ด้วย bun ก่อนโดยใช้ bun create hono cfw-bun-hono-drizzle

```
    npm install -g wrangler
    bun create hono cfw-bun-hono-drizzle
    bun run dev
    bun run deploy
```

ติดตั้ง drizzle-orm และ drizzle-kit

```
    bun i drizzle-orm @libsql/client
    bun i drizzle-kit
```

```
    bunx wrangler d1 create cfw-bun-druzzle-d1
```

เอา config ที่ได้จาก command ใส่ใน workspace.toml หรือ wrangler.jsonc

เพิ่ม env จาก wrangler.jsonc

```hono

import { Hono } from 'hono'


export type Env = {
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.text(`Hello Hono! ${c.env.MY_VAR}`)
})

export default app

```

สร้าง file .dev.vars เพิ่ม env ตามที่ต้องการ

```
    PRIVATE=test
```

```hono
import { Hono } from 'hono'


export type Env = {
  MY_VAR: string;
  PRIVATE: string;
};

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.text(`Hello Hono! ${c.env.MY_VAR} ${c.env.PRIVATE}`)
})

export default app
```

สร้าง file config drizzle drizzle.config.ts

```ts
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "d1-http",
} satisfies Config);
```

update script ใน package.json

```json
"scripts": {
    "dev": "wrangler dev src/index.ts",
    "deploy": "wrangler deploy --minify src/index.ts",
    "db:generate": "bunx drizzle-kit generate",
    "db:up": "bunx drizzle-kit up"
},
```

สร้าง file db/schema.ts ใน src

```ts
import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  // id is set on insert, incrementing
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  // title of the blog post
  title: text("title", { length: 256 }).notNull(),

  // content of the blog post
  content: text("content", { length: 256 }).notNull(),

  // timestamp is set on insert
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
```

run command

```
    bun run db:generate
    bun add -d @cloudflare/workers-types
```

```hono
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';

import { posts } from './db/schema';

export type Env = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Env }>();
api
  .get('/posts', async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(posts).all();
    return c.json(result);
  })
  .get('/posts/:id', async (c) => {
    const db = drizzle(c.env.DB);
    const id = Number(c.req.param('id'));
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return c.json(result);
  })
  .post('/posts', async (c) => {
    const db = drizzle(c.env.DB);
    const { title, content } = await c.req.json();
    const result = await db
      .insert(posts)
      .values({ title, content })
      .returning();
    return c.json(result);
  });

const app = new Hono();
app.route('/api', api);

export default app;
```

```
    bunx wrangler di execute cfw-bun-druzzle-d1 --local --file=./drizzle/migrations/0000_mixed_madame_web.sql
    bunx wrangler d1 execute cfw-bun-druzzle-d1 --remote --file=./drizzle/migrations/0000_mixed_madame_web.sql
```

deploy on cloudflare workers

```
    bun run deploy
```
