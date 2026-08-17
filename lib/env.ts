import { z } from "zod";

const Env = z.object({
  // z.ai (GLM) key. Server-funded scoring runs on the free GLM model below,
  // so this is the only secret the app needs to run.
  GLM_API_KEY: z.string().min(10, "GLM_API_KEY required"),

  // Funnel target (public). Optional — the /go route has a sane default.
  NEXT_PUBLIC_DIGISTORIES_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof Env>;

// z.ai OpenAI-compatible endpoint. https://docs.z.ai/guides/overview/quick-start
export const GLM_BASE_URL = "https://api.z.ai/api/paas/v4";

// Free tier ($0 in/out). Bump to "glm-4.6" for stronger judgments
// (~$0.004/score) — single-line change, no env var needed.
export const GLM_MODEL = "glm-4.5-flash";

let cached: Env | undefined;

export function env(): Env {
  if (cached) return cached;
  const parsed = Env.safeParse(process.env);
  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n  ");
    throw new Error(`Invalid environment configuration:\n  ${formatted}`);
  }
  cached = parsed.data;
  return cached;
}
