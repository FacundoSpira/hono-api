import type { Logger } from "pino";

export type AppBindings = {
	Variables: {
		logger: Logger;
	};
};
