import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().url().trim(),
  TIMEOUT: z.string().nonempty().trim().transform(Number),
});

const validate = envSchema.safeParse({
  API_URL: process.env.API_URL,
  TIMEOUT: process.env.TIMEOUT,
});

if (!validate.success) {
  console.error(validate.error);
  throw new Error(
    "Environment variables validation failed. Please check the logs above."
  );
}

const envConfig = validate.data;

export { envConfig, envSchema, validate };
