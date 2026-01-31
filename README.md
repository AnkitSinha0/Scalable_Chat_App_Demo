# 📡 Scalable Chat App (Turborepo)

A simple **scalable chat application** built using a **monorepo architecture with Turborepo**

This project demonstrates how to structure a real-time chat app in a way that can scale by separating frontend and backend while sharing common logic.

This project demonstrates how to scale a WebSocket-based chat app using **Redis Pub/Sub (Aiven Redis)** so that multiple backend servers can communicate with each other.

---
## Architecture

![Architecture Diagram](docs/architecture.png)

--- 


## 🧩 Project Structure

my-turborepo/
├── apps/
│ ├── web/ # 🚀 Frontend (React / Next.js)
│ └── server/ # 🛠 Backend (Node.js + Socket.IO)
├── packages/ # 📦 Shared packages (optional)
├── turbo.json
├── package.json
├── pnpm-lock.yaml
└── README.md


---

## 🛠 Tech Stack

- **Frontend:** React (Next.js App Router)
- **Backend:** Node.js + Socket.IO
- **Realtime Communication:** WebSockets
- **State Sharing:** React Context
- **Monorepo Tooling:** Turborepo
- **Package Manager:** pnpm

---

## 🚀 Getting Started (Local Setup)

### Install dependencies (from repo root)

```bash
pnpm install



