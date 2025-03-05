# Real-Time Collaboration App

## Motivation

Building a real-time collaboration app using WebSockets and Canvas, something like a collaborative Excalidraw.

## Tech Stack

- **Language:** TypeScript
- **Backend:** Express, WebSocket
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Frontend:** Next.js

## Local Installation Instructions

The package manager used is **pnpm**.

```sh
pnpm i
```

Navigate to the database package:

```sh
cd packages/db
```

Create a `.env` file and set the following variable:

```sh
DATABASE_URL="your-postgres-url"
```

You can use Docker or get a free PostgreSQL database from [Neon.tech](https://neon.tech).

## Features Left to Add

- Complete Pencil functionality
- Add panning and zooming
