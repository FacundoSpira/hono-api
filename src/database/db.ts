import { drizzle } from "drizzle-orm/node-postgres";
import { EnhancedQueryLogger } from "drizzle-query-logger";
import { Pool } from "pg";
import env from "@/env";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

const db = drizzle(pool, {
	schema,
	logger: new EnhancedQueryLogger({
		log: (message) => {
			if (env.NODE_ENV === "development") {
				console.log(message);
			}
		},
	}),
});

export { db };
