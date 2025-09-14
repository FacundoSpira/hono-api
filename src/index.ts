import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import z from "zod";
import posts from "./routers/posts";

const app = new Hono();

// Health check
app.get("/", (context) => context.json({ status: 200 }));

// Mount all routers
app.route("/posts", posts);

app.onError((error, context) => {
	if (error instanceof z.ZodError) {
		return context.json({ error: z.prettifyError(error) }, 400);
	}

	return context.json({ error: "Internal server error" }, 500);
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
