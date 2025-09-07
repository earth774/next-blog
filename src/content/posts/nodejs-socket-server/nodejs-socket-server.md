---
title: "ตั้ง Node.js Socket Server บน Docker ด้วย Docker Compose"
date: "2024-01-15"
---

บทความนี้จะแนะนำวิธีการตั้งค่าและรัน Node.js Socket Server โดยใช้ Docker และ Docker Compose อย่างละเอียด ตั้งแต่การสร้าง Socket.IO server พื้นฐาน การเขียน Dockerfile ที่เหมาะสม การตั้งค่า docker-compose.yml และการทดสอบการทำงานของระบบ เหมาะสำหรับผู้ที่ต้องการสร้าง real-time application ด้วย WebSocket บน containerized environment

# สิ่งที่ต้องเตรียม

ก่อนเริ่มต้น เราจำเป็นต้องติดตั้ง Docker และ Docker Compose ก่อน:

```bash
# สำหรับ macOS ด้วย Homebrew
brew install --cask docker

# หรือติดตั้ง Docker Desktop จากเว็บไซต์อย่างเป็นทางการ
# https://www.docker.com/products/docker-desktop
```

ตรวจสอบว่าติดตั้งเรียบร้อยแล้ว:

```bash
docker --version
docker-compose --version
```

# สร้าง Node.js Socket Server

เริ่มต้นด้วยการสร้างโปรเจค Node.js socket server พื้นฐาน:

```bash
mkdir nodejs-socket-server
cd nodejs-socket-server
npm init -y
npm install socket.io express cors
npm install -D nodemon
```

## สร้างโครงสร้างไฟล์

```text
nodejs-socket-server/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── public/
│   ├── index.html
│   └── client.js
└── .dockerignore
```

## เขียน Socket Server (server.js)

```javascript
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ใช้ CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// เก็บข้อมูลผู้ใช้ที่ออนไลน์
let onlineUsers = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // จัดการการเข้าร่วมห้อง
  socket.on("join-room", (data) => {
    const { username, room } = data;
    socket.join(room);
    onlineUsers.set(socket.id, { username, room });

    console.log(`${username} joined room: ${room}`);

    // แจ้งเตือนผู้ใช้คนอื่นในห้อง
    socket.to(room).emit("user-joined", {
      username,
      message: `${username} เข้าร่วมห้องแชท`,
      timestamp: new Date().toISOString(),
    });

    // ส่งรายชื่อผู้ใช้ในห้อง
    const roomUsers = Array.from(onlineUsers.values())
      .filter((user) => user.room === room)
      .map((user) => user.username);

    io.to(room).emit("room-users", roomUsers);
  });

  // จัดการข้อความแชท
  socket.on("chat-message", (data) => {
    const { message, username, room } = data;
    console.log(`Message from ${username} in ${room}: ${message}`);

    // ส่งข้อความไปยังทุกคนในห้อง
    io.to(room).emit("chat-message", {
      username,
      message,
      timestamp: new Date().toISOString(),
      socketId: socket.id,
    });
  });

  // จัดการการพิมพ์
  socket.on("typing", (data) => {
    const { username, room, isTyping } = data;
    socket.to(room).emit("user-typing", {
      username,
      isTyping,
    });
  });

  // จัดการการส่งไฟล์
  socket.on("file-share", (data) => {
    const { fileName, fileData, username, room } = data;
    console.log(`File shared by ${username} in ${room}: ${fileName}`);

    socket.to(room).emit("file-received", {
      fileName,
      fileData,
      username,
      timestamp: new Date().toISOString(),
    });
  });

  // จัดการการตัดการเชื่อมต่อ
  socket.on("disconnect", () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      const { username, room } = user;
      console.log(`${username} disconnected from room: ${room}`);

      // แจ้งเตือนผู้ใช้คนอื่น
      socket.to(room).emit("user-left", {
        username,
        message: `${username} ออกจากห้องแชท`,
        timestamp: new Date().toISOString(),
      });

      onlineUsers.delete(socket.id);

      // อัพเดทรยชื่อผู้ใช้ในห้อง
      const roomUsers = Array.from(onlineUsers.values())
        .filter((u) => u.room === room)
        .map((u) => u.username);

      io.to(room).emit("room-users", roomUsers);
    }
  });
});

// REST API endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    onlineUsers: onlineUsers.size,
    rooms: [...new Set(Array.from(onlineUsers.values()).map((u) => u.room))],
  });
});

app.get("/api/rooms/:room/users", (req, res) => {
  const { room } = req.params;
  const roomUsers = Array.from(onlineUsers.values())
    .filter((user) => user.room === room)
    .map((user) => user.username);

  res.json({
    room,
    users: roomUsers,
    count: roomUsers.length,
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Socket server running on port ${PORT}`);
  console.log(`📱 WebSocket ready for connections`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
```

## สร้าง Client สำหรับทดสอบ (public/index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Socket.IO Chat Demo</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 20px;
        backdrop-filter: blur(10px);
      }
      .login-section,
      .chat-section {
        display: none;
      }
      .login-section.active,
      .chat-section.active {
        display: block;
      }
      input,
      button {
        padding: 10px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
      }
      input {
        background: rgba(255, 255, 255, 0.9);
        color: #333;
      }
      button {
        background: #4caf50;
        color: white;
        cursor: pointer;
        transition: background 0.3s;
      }
      button:hover {
        background: #45a049;
      }
      #messages {
        height: 300px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
      }
      .message {
        margin: 5px 0;
        padding: 8px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.2);
      }
      .message.own {
        background: rgba(76, 175, 80, 0.3);
        text-align: right;
      }
      .users-list {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
      }
      .typing-indicator {
        font-style: italic;
        color: #ccc;
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Login Section -->
      <div class="login-section active" id="loginSection">
        <h2>เข้าร่วมห้องแชท</h2>
        <input
          type="text"
          id="usernameInput"
          placeholder="ใส่ชื่อผู้ใช้"
          required
        />
        <input
          type="text"
          id="roomInput"
          placeholder="ใส่ชื่อห้อง"
          value="general"
          required
        />
        <button onclick="joinRoom()">เข้าร่วม</button>
      </div>

      <!-- Chat Section -->
      <div class="chat-section" id="chatSection">
        <div class="users-list">
          <strong>ผู้ใช้ออนไลน์ในห้อง:</strong>
          <div id="usersList">กำลังโหลด...</div>
        </div>

        <div id="messages"></div>

        <div id="typingIndicator" class="typing-indicator"></div>

        <input
          type="text"
          id="messageInput"
          placeholder="พิมพ์ข้อความ..."
          onkeypress="handleKeyPress(event)"
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*,text/*,.pdf,.doc,.docx"
          style="display: none;"
          onchange="handleFileSelect(event)"
        />
        <button onclick="sendMessage()">ส่ง</button>
        <button onclick="document.getElementById('fileInput').click()">
          📎 ส่งไฟล์
        </button>
        <button onclick="leaveRoom()">ออกจากห้อง</button>
      </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script src="client.js"></script>
  </body>
</html>
```

## สร้าง Client JavaScript (public/client.js)

```javascript
let socket;
let currentUsername = "";
let currentRoom = "";
let typingTimeout;

function joinRoom() {
  const username = document.getElementById("usernameInput").value.trim();
  const room = document.getElementById("roomInput").value.trim();

  if (!username || !room) {
    alert("กรุณาใส่ชื่อผู้ใช้และชื่อห้อง");
    return;
  }

  currentUsername = username;
  currentRoom = room;

  // เชื่อมต่อ Socket.IO
  socket = io();

  // จัดการ events ต่างๆ
  setupSocketListeners();

  // เข้าร่วมห้อง
  socket.emit("join-room", { username, room });

  // เปลี่ยน UI
  document.getElementById("loginSection").classList.remove("active");
  document.getElementById("chatSection").classList.add("active");
}

function setupSocketListeners() {
  // เมื่อได้รับข้อความ
  socket.on("chat-message", (data) => {
    displayMessage(
      data.username,
      data.message,
      data.timestamp,
      data.socketId === socket.id
    );
  });

  // เมื่อมีผู้ใช้เข้าห้อง
  socket.on("user-joined", (data) => {
    displayMessage("ระบบ", data.message, data.timestamp);
  });

  // เมื่อมีผู้ใช้ออกห้อง
  socket.on("user-left", (data) => {
    displayMessage("ระบบ", data.message, data.timestamp);
  });

  // อัพเดทรยชื่อผู้ใช้
  socket.on("room-users", (users) => {
    document.getElementById("usersList").innerHTML =
      users.join(", ") || "ไม่มีผู้ใช้ออนไลน์";
  });

  // จัดการการพิมพ์
  socket.on("user-typing", (data) => {
    const indicator = document.getElementById("typingIndicator");
    if (data.isTyping && data.username !== currentUsername) {
      indicator.textContent = `${data.username} กำลังพิมพ์...`;
    } else {
      indicator.textContent = "";
    }
  });

  // จัดการการรับไฟล์
  socket.on("file-received", (data) => {
    displayFileMessage(data.username, data.fileName, data.timestamp);
  });
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (!message) return;

  socket.emit("chat-message", {
    message,
    username: currentUsername,
    room: currentRoom,
  });

  messageInput.value = "";
  stopTyping();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  } else {
    startTyping();
  }
}

function startTyping() {
  socket.emit("typing", {
    username: currentUsername,
    room: currentRoom,
    isTyping: true,
  });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(stopTyping, 1000);
}

function stopTyping() {
  socket.emit("typing", {
    username: currentUsername,
    room: currentRoom,
    isTyping: false,
  });
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    socket.emit("file-share", {
      fileName: file.name,
      fileData: e.target.result,
      username: currentUsername,
      room: currentRoom,
    });
  };
  reader.readAsDataURL(file);

  // Reset file input
  event.target.value = "";
}

function displayMessage(username, message, timestamp, isOwn = false) {
  const messagesDiv = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isOwn ? "own" : ""}`;

  const time = new Date(timestamp).toLocaleTimeString("th-TH");
  messageDiv.innerHTML = `<strong>${username}</strong> [${time}]: ${message}`;

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function displayFileMessage(username, fileName, timestamp) {
  const messagesDiv = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";

  const time = new Date(timestamp).toLocaleTimeString("th-TH");
  messageDiv.innerHTML = `<strong>${username}</strong> [${time}]: ส่งไฟล์ 📎 <em>${fileName}</em>`;

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function leaveRoom() {
  if (socket) {
    socket.disconnect();
  }

  // Reset UI
  document.getElementById("chatSection").classList.remove("active");
  document.getElementById("loginSection").classList.add("active");
  document.getElementById("messages").innerHTML = "";
  document.getElementById("usersList").innerHTML = "กำลังโหลด...";
  document.getElementById("messageInput").value = "";
  document.getElementById("typingIndicator").textContent = "";
}
```

# สร้าง Dockerfile

```dockerfile
FROM node:18-alpine

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm ci --only=production && npm cache clean --force

# คัดลอก source code
COPY . .

# สร้าง non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# เปลี่ยน owner ของไฟล์
RUN chown -R nodejs:nodejs /app
USER nodejs

# เปิด port
EXPOSE 3000

# คำสั่งรัน
CMD ["node", "server.js"]
```

# สร้าง docker-compose.yml

```yaml
version: "3.8"

services:
  socket-server:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Optional: เพิ่ม Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - socket-server
    restart: unless-stopped
    profiles:
      - nginx

  # Optional: เพิ่ม Redis สำหรับ scaling
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    command: redis-server --appendonly yes
    profiles:
      - redis

volumes:
  redis_data:

networks:
  default:
    driver: bridge
```

# สร้าง .dockerignore

```
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
.env.local
.env.production
.git
.gitignore
README.md
.DS_Store
.vscode
.idea
*.log
logs
coverage
.nyc_output
```

# การรันและทดสอบ

## รันด้วย Docker Compose

```bash
# รันในโหมดพื้นฐาน
docker-compose up -d

# รันพร้อม Nginx reverse proxy
docker-compose --profile nginx up -d

# รันพร้อม Redis (สำหรับ scaling)
docker-compose --profile redis up -d
```

## ตรวจสอบการทำงาน

```bash
# ตรวจสอบ container ที่รันอยู่
docker-compose ps

# ดู logs
docker-compose logs -f socket-server

# ทดสอบ health check
curl http://localhost:3000/api/health

# ทดสอบ API
curl http://localhost:3000/api/rooms/general/users
```

## ทดสอบ Socket Connection

1. เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`
2. เข้าร่วมห้องแชทด้วยชื่อผู้ใช้และชื่อห้อง
3. เปิดแท็บใหม่และเข้าร่วมห้องเดียวกัน
4. ทดสอบการส่งข้อความและการแชร์ไฟล์

# สรุป

การตั้งค่า Node.js Socket Server ด้วย Docker และ Docker Compose มีขั้นตอนดังนี้:

1. **สร้าง Socket Server**: ใช้ Socket.IO และ Express สำหรับสร้าง real-time communication
2. **Dockerization**: เขียน Dockerfile ที่เหมาะสมสำหรับ Node.js application
3. **Orchestration**: ใช้ Docker Compose เพื่อจัดการ services และ networking
4. **Testing**: ทดสอบการทำงานของ socket connections และ API endpoints
5. **Scaling**: เพิ่มความสามารถในการ scale และ load balancing
6. **Monitoring**: เพิ่ม logging และ metrics สำหรับติดตามการทำงาน

ตัวอย่างโค้ดนี้ครอบคลุมฟีเจอร์สำคัญของ real-time application เช่น:

- การส่งข้อความแบบ real-time
- การจัดการห้องแชท
- การแสดงสถานะการพิมพ์
- การแชร์ไฟล์
- การจัดการผู้ใช้ออนไลน์
- REST API สำหรับ monitoring

สามารถนำไปปรับแต่งและพัฒนาต่อเพื่อให้เหมาะกับความต้องการของโปรเจกต์ได้

> **เคล็ดลับ**: ในโปรดักชั่นควรเพิ่ม SSL/TLS, rate limiting, และ database ที่เหมาะสมสำหรับเก็บข้อมูลถาวร

สามารถดูตัวอย่างโค้ดและโปรเจกต์เต็มได้ที่ GitHub:
[https://github.com/earth774/nodejs-socket-docker](https://github.com/earth774/nodejs-socket-docker)


