import type { ErrorHandler } from "hono";
import z from "zod";
import type { AppBindings } from "@/types/app-bindings";

export const onError: ErrorHandler<AppBindings> = (error, c) => {
	c.var.logger.error(error);

	if (error instanceof z.ZodError) {
		return c.json({ error: z.prettifyError(error) }, 400);
	}

	return c.json({ error: "Internal server error" }, 500);
};
