# Hono API

A modern, fast API built with [Hono](https://hono.dev/) framework, featuring PostgreSQL database integration with Drizzle ORM, structured logging with Pino, and TypeScript for type safety.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hono
- **Database**: PostgreSQL with Drizzle ORM
- **Logging**: Pino with pino-http and pino-pretty for development
- **Validation**: Zod
- **Linting/Formatting**: Biome
- **TypeScript**: Full type safety

## Prerequisites

- [Bun](https://bun.sh/) installed on your system
- PostgreSQL database running

## Installation

1. Install dependencies with Bun:
```bash
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database configuration
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `LOG_LEVEL`: Logging level (fatal/error/warn/info/debug/trace/silent)

4. Run database migrations:
```bash
bun run db:migrate
```

## Development

Start the development server with hot reload:
```bash
bun run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app.ts                # Main application setup and route mounting
├── index.ts              # Application entry point
├── env.ts                # Environment configuration and validation
├── database/
│   ├── db.ts             # Database connection setup
│   └── schema.ts         # Database schema definitions
├── lib/
│   ├── create-app.ts     # Application factory with middleware setup
│   └── pino.ts           # Pino logger configuration
├── middlewares/
│   ├── not-found.ts      # 404 handler
│   ├── on-error.ts       # Error handler
│   ├── pino-logger.ts    # Request logging middleware
│   └── serve-emoji-favicon.ts # Favicon middleware
├── routers/
│   └── posts.ts          # Posts API routes
└── types/
    └── app-bindings.ts   # TypeScript type definitions
```

### Key Components

- **`app.ts`**: Main application file that mounts all routers.
- **`index.ts`**: Application entry point. Allows to easily change the server runtime, without impacting the application code.
- **`lib/create-app.ts`**: Factory function that creates a Hono app with all necessary middleware
- **`database/`**: Database configuration and schema definitions using Drizzle ORM
- **`routers/`**: API route handlers organized by feature
- **`middlewares/`**: Custom hono middlewares
- **`env.ts`**: Environment variable validation using Zod schemas

