/**
 * Google Gemini API Model Configuration for Free Tier
 *
 * Current supported Free Tier models in Google AI Studio:
 * - gemini-3.8-flash: Official recommended Flash model for Free Tier (active 2026)
 * - gemini-3.5-flash-lite: Ultra-fast lightweight model for low token consumption
 *
 * Configurable via GEMINI_MODEL environment variable without hardcoding.
 */
export const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";
export const FALLBACK_GEMINI_MODEL = "gemini-3.5-flash-lite";

export function getGeminiModel(): string {
  const configured = process.env.GEMINI_MODEL?.trim();
  if (configured && configured.length > 0) {
    return configured;
  }
  return DEFAULT_GEMINI_MODEL;
}

export function getGeminiGenerateEndpoint(modelName?: string): string {
  const model = modelName || getGeminiModel();
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

export function getGeminiModelInfoEndpoint(modelName?: string): string {
  const model = modelName || getGeminiModel();
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}`;
}
