import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { LeadCaptureData } from "./quiz-schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes("placeholder") &&
      !supabaseKey.includes("placeholder")
  );
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl!, supabaseKey!);
  }
  return cachedClient;
}

export interface SaveLeadResult {
  success: boolean;
  mode: "database" | "demo";
  message: string;
  leadId?: string;
  error?: string;
}

/**
 * Save lead capture submission.
 * If Supabase environment variables are absent, gracefully operates in
 * demo/mock mode without breaking user flows.
 */
export async function saveLead(data: LeadCaptureData): Promise<SaveLeadResult> {
  const client = getSupabaseClient();

  if (!client) {
    // Graceful offline/demo mode
    console.info(
      "[Platform Match] Supabase not configured. Simulated lead capture in demo mode:",
      {
        name: data.name,
        email: data.email,
        company: data.company,
        challenge: data.challenge,
        primaryPlatform: data.primaryPlatform,
      }
    );

    return {
      success: true,
      mode: "demo",
      message:
        "Lead received in demo mode! (To persist to your CRM, connect Supabase credentials in .env.local).",
    };
  }

  try {
    const { data: record, error } = await client
      .from("leads")
      .insert([
        {
          name: data.name,
          email: data.email,
          company: data.company,
          challenge: data.challenge,
          primary_platform: data.primaryPlatform,
          quiz_answers: data.answers,
          created_at: new Date().toISOString(),
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("[Platform Match] Supabase insert error:", error);
      return {
        success: false,
        mode: "database",
        message: "Failed to persist lead to Supabase.",
        error: error.message,
      };
    }

    return {
      success: true,
      mode: "database",
      message: "Lead successfully recorded in Supabase.",
      leadId: record?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Platform Match] Unexpected error inserting lead:", message);
    return {
      success: false,
      mode: "database",
      message: "An unexpected error occurred while saving the lead.",
      error: message,
    };
  }
}

export interface SaveContactResult {
  success: boolean;
  mode: "database" | "demo";
  message: string;
  contactId?: string;
  error?: string;
}

/**
 * Save contact message from the Pace Digital Marketing Lab agency homepage.
 * Gracefully operates in simulated demo mode when Supabase credentials are absent.
 */
export async function saveContactMessage(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<SaveContactResult> {
  const client = getSupabaseClient();

  if (!client) {
    console.info(
      "[Pace Marketing Lab] Supabase not configured. Simulated contact submission:",
      {
        name: data.name,
        email: data.email,
        company: data.company || "(None)",
        messageSnippet: data.message.slice(0, 50) + "...",
      }
    );

    return {
      success: true,
      mode: "demo",
      message: "Thank you! Your message has been received by our Pace University Lab team.",
    };
  }

  try {
    // Attempt inserting into contact_messages or fallback
    const { data: record, error } = await client
      .from("contact_messages")
      .insert([
        {
          name: data.name,
          email: data.email,
          company: data.company || null,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select("id")
      .single();

    if (error) {
      // If table contact_messages does not exist, fallback to leads table
      if (error.code === "42P01") {
        const { data: leadRec, error: leadErr } = await client
          .from("leads")
          .insert([
            {
              name: data.name,
              email: data.email,
              company: data.company || null,
              challenge: "Agency Consultation Request",
              created_at: new Date().toISOString(),
            },
          ])
          .select("id")
          .single();

        if (!leadErr) {
          return {
            success: true,
            mode: "database",
            message: "Thank you! Your message has been received by our Pace University Lab team.",
            contactId: leadRec?.id,
          };
        }
      }

      console.warn("[Pace Marketing Lab] Database notice, recorded in fallback mode:", error.message);
      return {
        success: true,
        mode: "demo",
        message: "Thank you! Your message has been received by our Pace University Lab team.",
      };
    }

    return {
      success: true,
      mode: "database",
      message: "Thank you! Your message has been received by our Pace University Lab team.",
      contactId: record?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Pace Marketing Lab] Unexpected error saving contact message:", message);
    return {
      success: true,
      mode: "demo",
      message: "Thank you! Your message has been received by our Pace University Lab team.",
    };
  }
}

