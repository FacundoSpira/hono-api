import { config } from "dotenv";
import { z } from "zod";

config();

const logLevelSchema = z.enum([
	"fatal",
	"error",
	"warn",
	"info",
	"debug",
	"trace",
	"silent",
]);

const envSchema = z.object({
	NODE_ENV: z.string().default("development"),
	PORT: z.coerce.number().default(3000),
	LOG_LEVEL: logLevelSchema,
	DATABASE_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;

// biome-ignore lint/style/noProcessEnv: only valid usage of process.env
const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.error) {
	console.error(
		"❌ Invalid env:",
		JSON.stringify(z.flattenError(parsedEnv.error).fieldErrors, null, 2),
	);
	process.exit(1);
}

export default parsedEnv.data;
