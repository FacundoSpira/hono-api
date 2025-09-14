import {
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar().notNull(),
	content: text().notNull(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});
