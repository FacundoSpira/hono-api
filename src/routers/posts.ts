import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/database/db";
import { postsTable } from "@/database/schema";
import { createRouter } from "@/lib/create-app";

const postsRouter = createRouter();

const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

const listParamsSchema = z.object({
	limit: z.coerce.number().min(1).max(100).default(10),
	offset: z.coerce.number().min(0).default(0),
});

postsRouter.get("/", zValidator("query", listParamsSchema), async (c) => {
	const { limit, offset } = c.req.valid("query");

	const posts = await db
		.select()
		.from(postsTable)
		.limit(Number(limit))
		.offset(Number(offset));

	return c.json({ posts });
});

postsRouter.get("/:id", async (c) => {
	const id = c.req.param("id");

	const [post] = await db
		.select()
		.from(postsTable)
		.where(eq(postsTable.id, Number(id)));

	if (!post) {
		return c.json({ error: "Post not found" }, 404);
	}

	return c.json({ ...post });
});

postsRouter.post("/", zValidator("json", createPostSchema), async (c) => {
	const { title, content } = c.req.valid("json");

	const post = await db
		.insert(postsTable)
		.values({ title, content })
		.returning();

	return c.json({ post });
});

postsRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");

	await db.delete(postsTable).where(eq(postsTable.id, Number(id)));

	return c.json({ message: "Post deleted" });
});

export default postsRouter;
