import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/database/db";
import { postsTable } from "@/database/schema";
import { createRouter } from "@/lib/create-app";

const posts = createRouter();

const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

posts.get("/", async (c) => {
	const posts = await db.select().from(postsTable).limit(10);

	return c.json({ posts });
});

posts.post("/", zValidator("json", createPostSchema), async (c) => {
	const { title, content } = c.req.valid("json");

	const post = await db
		.insert(postsTable)
		.values({ title, content })
		.returning();

	return c.json({ post });
});

export default posts;
