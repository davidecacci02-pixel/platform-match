import { describe, it, expect } from "vitest";
import { ContactMessageSchema } from "@/lib/contact-schema";
import { saveContactMessage } from "@/lib/supabase";

describe("Contact Form & Submission Validation", () => {
  it("validates a complete, well-formed contact payload", () => {
    const validData = {
      name: "Maria Rossi",
      email: "maria.rossi@example.com",
      company: "Lower Manhattan Artisan Goods",
      message: "We need assistance restructuring our Instagram and Google Ad campaigns.",
    };

    const result = ContactMessageSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Maria Rossi");
      expect(result.data.company).toBe("Lower Manhattan Artisan Goods");
    }
  });

  it("permits empty or omitted company names", () => {
    const validNoCompany = {
      name: "Alex Chen",
      email: "alex@chenlaw.com",
      company: "",
      message: "Looking for SEO strategy for our solo practice.",
    };

    const result = ContactMessageSchema.safeParse(validNoCompany);
    expect(result.success).toBe(true);
  });

  it("rejects invalid emails and messages that are too short", () => {
    const invalidData = {
      name: "J",
      email: "not-an-email",
      company: "Test Co",
      message: "Hi",
    };

    const result = ContactMessageSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const formatted = result.error.format();
      expect(formatted.name?._errors.length).toBeGreaterThan(0);
      expect(formatted.email?._errors.length).toBeGreaterThan(0);
      expect(formatted.message?._errors.length).toBeGreaterThan(0);
    }
  });

  it("gracefully runs saveContactMessage in demo mode when Supabase is not configured", async () => {
    const response = await saveContactMessage({
      name: "Professor Smith",
      email: "prof.smith@pace.edu",
      company: "Pace University",
      message: "Great project by our student marketing lab team!",
    });

    expect(response.success).toBe(true);
    expect(response.message).toContain("Pace University Lab");
  });
});
