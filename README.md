# Real-Time Collaboration App

## 🚀 Motivation

Building a real-time collaboration app using WebSockets and Canvas, inspired by Excalidraw.

## 🛠 Tech Stack

- **Language:** TypeScript
- **Backend:** Express, WebSocket
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Frontend:** Next.js

## 📥 Local Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Backbiter99/canvas-app.git
cd canvas-app
```

### 2️⃣ Install Dependencies

The package manager used is **pnpm**.

```sh
pnpm i
```

### 3️⃣ Set Up the Database

Navigate to the database package:

```sh
cd packages/db
```

Create a `.env` file

```sh
touch .env
```

Add the following to the `.env` file:

```sh
DATABASE_URL= # Your PostgreSQL database URL
```

You can use Docker or get a free PostgreSQL database from [Neon.tech](https://neon.tech).

### 4️⃣ Generate Prisma Client

```sh
pnpm prisma generate
```

### 5️⃣ Run the Application

Go back to the root folder and start the application locally:

```sh
cd ../..
pnpm run dev
```

## 🔧 Features Left to Add

- ✏️ Complete Pencil functionality
- 🔍 Add panning and zooming
