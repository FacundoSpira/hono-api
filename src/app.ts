import { Hono } from "hono";
import { requestId } from "hono/request-id";

import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import { serveEmojiFavicon } from "@/middlewares/serve-emoji-favicon";
import posts from "@/routers/posts";
import type { AppBindings } from "@/types/app-bindings";

const app = new Hono<AppBindings>();

app.use(requestId()).use(pinoLogger()).use(serveEmojiFavicon("🚀"));

// Health check
app.get("/", (c) => {
	c.var.logger.info("This is a test log");

	return c.json({ status: 200 });
});

// Mount all routers
app.route("/posts", posts);

app.onError(onError);
app.notFound(notFound);

export default app;
