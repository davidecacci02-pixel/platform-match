import { z } from "zod";

export const ContactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),
  company: z
    .string()
    .trim()
    .max(120, "Company name cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export type ContactMessageData = z.infer<typeof ContactMessageSchema>;
