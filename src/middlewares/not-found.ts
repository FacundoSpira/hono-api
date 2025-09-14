import type { NotFoundHandler } from "hono";
import type { AppBindings } from "@/types/app-bindings";

export const notFound: NotFoundHandler<AppBindings> = (c) => {
	return c.json({ error: "Not Found" }, 404);
};
