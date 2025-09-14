import { Hono } from "hono";
import { z } from "zod";
import { db } from "../database/db";
import { postsTable } from "../database/schema";

const posts = new Hono();

const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

posts.get("/", async (context) => {
	const posts = await db.select().from(postsTable).limit(10);

	return context.json({ posts });
});

posts.post("/", async (context) => {
	const body = await context.req.json();
	const parsedBody = createPostSchema.parse(body);

	const post = await db
		.insert(postsTable)
		.values({ title: parsedBody.title, content: parsedBody.content })
		.returning();

	return context.json({ post });
});

export default posts;
