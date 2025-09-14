import type { Context, Next } from "hono";
import { pinoHttp } from "pino-http";
import pretty from "pino-pretty";
import env from "@/env";

export const pinoLogger = () => async (c: Context, next: Next) => {
	c.env.incoming.id = c.var.requestId;

	await new Promise((resolve) =>
		pinoHttp(
			{
				level: env.LOG_LEVEL,
			},
			env.NODE_ENV === "development" ? pretty() : undefined,
		)(c.env.incoming, c.env.outgoing, () => resolve(void 0)),
	);

	c.set("logger", c.env.incoming.log);

	await next();
};
