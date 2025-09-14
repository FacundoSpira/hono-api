import posts from "@/routers/posts";
import { createApp } from "./lib/create-app";

const app = createApp();

// Health check
app.get("/", (c) => {
	c.var.logger.info("This is a test log");

	return c.json({ status: 200 });
});

// Mount all routers
app.route("/posts", posts);

export default app;
