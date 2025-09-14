import type { Context, Next } from "hono";
import { pinoHttp } from "pino-http";
import { logger } from "@/lib/pino";

export const pinoLogger = () => async (c: Context, next: Next) => {
	c.env.incoming.id = c.var.requestId;

	await new Promise((resolve) =>
		pinoHttp({
			logger,
		})(c.env.incoming, c.env.outgoing, () => resolve(void 0)),
	);

	c.set("logger", c.env.incoming.log);

	await next();
};
