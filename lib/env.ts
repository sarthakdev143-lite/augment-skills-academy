import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_COURSE_PRICE_ID: z.string().min(1).optional(),
  STRIPE_MONTHLY_PRICE_ID: z.string().min(1).optional(),
  STRIPE_ANNUAL_PRICE_ID: z.string().min(1).optional(),
  MUX_TOKEN_ID: z.string().min(1),
  MUX_TOKEN_SECRET: z.string().min(1),
  MUX_SIGNING_KEY_ID: z.string().min(1).optional(),
  MUX_SIGNING_PRIVATE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  SUPPORT_EMAIL: z.string().email().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;
type EnvKey = keyof Env;
const schemaShape = envSchema.shape as Record<EnvKey, z.ZodTypeAny>;

function getEnvValue(key: EnvKey) {
  const result = schemaShape[key].safeParse(process.env[key]);
  if (!result.success) {
    throw new Error(`Invalid environment variable "${key}": ${result.error.issues[0]?.message ?? "unknown error"}`);
  }

  return result.data;
}

export const env = new Proxy({} as Env, {
  get(_target, prop: string | symbol) {
    if (typeof prop !== "string") {
      return undefined;
    }

    if (!(prop in schemaShape)) {
      return undefined;
    }

    return getEnvValue(prop as EnvKey);
  },
});

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function isStripeConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_WEBHOOK_SECRET &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
}

export function isMuxConfigured() {
  return Boolean(process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_SECRET);
}
