import { Hono } from "hono";
import { requestId } from "hono/request-id";
import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import { serveEmojiFavicon } from "@/middlewares/serve-emoji-favicon";
import type { AppBindings } from "@/types/app-bindings";

export const createRouter = () => {
	const router = new Hono<AppBindings>();
	return router;
};

export const createApp = () => {
	const app = createRouter();

	// Middlewares
	app.use(requestId());
	app.use(pinoLogger());
	app.use(serveEmojiFavicon("🚀"));

	// Error and not found handlers
	app.onError(onError);
	app.notFound(notFound);

	return app;
};
