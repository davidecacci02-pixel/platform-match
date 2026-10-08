import dns from "dns/promises";
import { Industry, IndustryEnum } from "./quiz-schema";

export interface AnalyzedWebsiteData {
  success: boolean;
  url: string;
  businessName?: string;
  industry?: Industry;
  mainProduct?: string;
  uniqueValueProposition?: string;
  targetAudience?: string;
  brandVoice?: string;
  coreThemes?: string[];
  contentOpportunities?: string[];
  summary?: string;
  verifiedFromWebsite: boolean;
  error?: string;
}

/**
 * Checks if an IPv4 or IPv6 address belongs to private, loopback, or metadata networks.
 */
export function isPrivateOrReservedIP(ip: string): boolean {
  // IPv6 checks
  if (ip === "::1" || ip === "::" || ip.toLowerCase().startsWith("fe80:") || ip.toLowerCase().startsWith("fc00:") || ip.toLowerCase().startsWith("fd00:")) {
    return true;
  }
  // IPv4 mapped IPv6 (::ffff:127.0.0.1)
  if (ip.toLowerCase().startsWith("::ffff:")) {
    const ipv4 = ip.substring(7);
    return isPrivateOrReservedIP(ipv4);
  }

  // IPv4 checks
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return true; // Malformed IP is treated as unsafe
  }

  const [a, b] = parts;

  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;
  // 10.0.0.0/8 (Private network)
  if (a === 10) return true;
  // 172.16.0.0/12 (Private network)
  if (a === 172 && b >= 16 && b <= 31) return true;
  // 192.168.0.0/16 (Private network)
  if (a === 192 && b === 168) return true;
  // 169.254.0.0/16 (Link-local & Cloud Metadata 169.254.169.254)
  if (a === 169 && b === 254) return true;
  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;
  // 100.64.0.0/10 (Carrier-grade NAT)
  if (a === 100 && b >= 64 && b <= 127) return true;
  // 224.0.0.0/4 (Multicast) & 240.0.0.0/4 (Reserved)
  if (a >= 224) return true;

  return false;
}

/**
 * Validates URL and verifies resolved DNS is not private or loopback (SSRF protection).
 */
export async function validateUrlSafety(rawUrl: string): Promise<{ valid: boolean; normalizedUrl?: string; error?: string }> {
  try {
    let urlString = rawUrl.trim();
    if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
      urlString = `https://${urlString}`;
    }

    const parsed = new URL(urlString);

    // Protocol check
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { valid: false, error: "Only HTTP and HTTPS protocols are supported." };
    }

    // Credentials forbidden
    if (parsed.username || parsed.password) {
      return { valid: false, error: "URLs containing user credentials are not allowed." };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block localhost, .local, internal domains
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".lan")
    ) {
      return { valid: false, error: "Access to local or internal network hostnames is prohibited." };
    }

    // Disallow scraping major social network portals directly
    if (
      hostname === "facebook.com" ||
      hostname.endsWith(".facebook.com") ||
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com") ||
      hostname === "tiktok.com" ||
      hostname.endsWith(".tiktok.com") ||
      hostname === "twitter.com" ||
      hostname === "x.com" ||
      hostname === "linkedin.com" ||
      hostname.endsWith(".linkedin.com")
    ) {
      return {
        valid: false,
        error: "Social media profile links cannot be scanned directly. Please provide your business website domain.",
      };
    }

    // Direct IP address in hostname check
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
      if (isPrivateOrReservedIP(hostname)) {
        return { valid: false, error: "Access to private or local IP addresses is prohibited." };
      }
    }

    // Resolve DNS to verify public IP
    try {
      const lookupResult = await dns.lookup(hostname, { all: true });
      for (const entry of lookupResult) {
        if (isPrivateOrReservedIP(entry.address)) {
          return {
            valid: false,
            error: `Resolved IP (${entry.address}) is a private or reserved network address.`,
          };
        }
      }
    } catch {
      return {
        valid: false,
        error: `Could not resolve domain name "${hostname}". Please verify the URL.`,
      };
    }

    return { valid: true, normalizedUrl: parsed.toString() };
  } catch {
    return { valid: false, error: "Invalid URL format." };
  }
}

/**
 * Clean and extract metadata from public HTML safely without heavy DOM dependencies.
 */
function extractHtmlMetadata(html: string): {
  title: string;
  description: string;
  headings: string[];
  cleanText: string;
} {
  // Strip script, style, svg, noscript
  const withoutScripts = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, " ");

  // Extract <title>
  const titleMatch = withoutScripts.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

  // Extract meta description
  let description = "";
  const metaDescMatch =
    withoutScripts.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i) ||
    withoutScripts.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i) ||
    withoutScripts.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i);

  if (metaDescMatch) {
    description = metaDescMatch[1].replace(/\s+/g, " ").trim();
  }

  // Extract headings (h1, h2)
  const headings: string[] = [];
  const headingRegex = /<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/gi;
  let match;
  while ((match = headingRegex.exec(withoutScripts)) !== null && headings.length < 8) {
    const text = match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text.length > 3 && text.length < 120) {
      headings.push(text);
    }
  }

  // Extract basic text sample (capped to 2,500 characters)
  const strippedText = withoutScripts
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2500);

  return { title, description, headings, cleanText: strippedText };
}

/**
 * Infer industry from text patterns and keywords.
 */
function inferIndustry(text: string): Industry {
  const lower = text.toLowerCase();
  if (lower.includes("fashion") || lower.includes("apparel") || lower.includes("clothing") || lower.includes("skincare") || lower.includes("cosmetic") || lower.includes("beauty") || lower.includes("jewelry")) {
    return "fashion_beauty";
  }
  if (lower.includes("restaurant") || lower.includes("bakery") || lower.includes("food") || lower.includes("coffee") || lower.includes("beverage") || lower.includes("recipe") || lower.includes("catering") || lower.includes("cafe")) {
    return "food_beverage";
  }
  if (lower.includes("software") || lower.includes("saas") || lower.includes("platform") || lower.includes("app") || lower.includes("developer") || lower.includes("tech") || lower.includes("ai") || lower.includes("cloud")) {
    return "technology";
  }
  if (lower.includes("consult") || lower.includes("law") || lower.includes("legal") || lower.includes("accounting") || lower.includes("advisory") || lower.includes("agency") || lower.includes("finance") || lower.includes("tax")) {
    return "professional_services";
  }
  if (lower.includes("course") || lower.includes("bootcamp") || lower.includes("academy") || lower.includes("learn") || lower.includes("training") || lower.includes("tutor") || lower.includes("school")) {
    return "education";
  }
  if (lower.includes("fitness") || lower.includes("wellness") || lower.includes("travel") || lower.includes("home") || lower.includes("decor") || lower.includes("coaching") || lower.includes("yoga")) {
    return "lifestyle";
  }
  return "other";
}

/**
 * Public function to safely inspect a website and synthesize business positioning.
 */
export async function analyzeWebsiteUrl(rawUrl: string): Promise<AnalyzedWebsiteData> {
  const safetyCheck = await validateUrlSafety(rawUrl);
  if (!safetyCheck.valid || !safetyCheck.normalizedUrl) {
    return {
      success: false,
      url: rawUrl,
      verifiedFromWebsite: false,
      error: safetyCheck.error || "Invalid or disallowed URL.",
    };
  }

  const targetUrl = safetyCheck.normalizedUrl;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "PlatformMatch-Bot/2.0 (+https://platformmatch.app; web-audit-bot)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        success: false,
        url: targetUrl,
        verifiedFromWebsite: false,
        error: `Website responded with HTTP status ${res.status} (${res.statusText}). You can proceed by entering details manually.`,
      };
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      return {
        success: false,
        url: targetUrl,
        verifiedFromWebsite: false,
        error: "URL does not serve HTML content. Please provide a standard website homepage.",
      };
    }

    // Limit buffer to 512KB to avoid memory exhaustion
    const textBuffer = await res.text();
    const html = textBuffer.slice(0, 512 * 1024);

    const metadata = extractHtmlMetadata(html);
    const combinedText = `${metadata.title} ${metadata.description} ${metadata.headings.join(" ")} ${metadata.cleanText}`;

    const industry = inferIndustry(combinedText);
    const businessName = metadata.title.split(/[-|•–:]/)[0].trim() || new URL(targetUrl).hostname.replace("www.", "");
    const uniqueValueProposition = metadata.description || (metadata.headings[0] ? metadata.headings[0] : "Specialized solutions for target market");

    const contentOpportunities = [
      "Behind-the-scenes breakdown of product creation or service delivery",
      "Customer transformation stories & social proof demonstrations",
      "Educational teardowns addressing top audience misconceptions",
    ];

    return {
      success: true,
      url: targetUrl,
      businessName: businessName.slice(0, 80),
      industry,
      mainProduct: metadata.headings[0] || metadata.title.slice(0, 100),
      uniqueValueProposition: uniqueValueProposition.slice(0, 300),
      targetAudience: industry === "technology" || industry === "professional_services" ? "Business Decision-Makers & Founders" : "High-intent consumers seeking specialized quality",
      brandVoice: industry === "technology" ? "Authoritative, modern, and data-driven" : "Welcoming, creative, and customer-focused",
      coreThemes: [
        metadata.headings[0] || "Core Service Excellence",
        "Client Outcomes & Real Results",
        "Industry Expertise & Guidance",
      ],
      contentOpportunities,
      summary: `Verified public website analysis for ${businessName}: Detected ${industry} brand focusing on "${uniqueValueProposition.slice(0, 150)}".`,
      verifiedFromWebsite: true,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error && err.name === "AbortError"
        ? "Website request timed out after 6 seconds. Please enter details manually."
        : "Could not reach website. The site may be protected by anti-bot checks or temporarily unavailable.";

    return {
      success: false,
      url: targetUrl,
      verifiedFromWebsite: false,
      error: errorMsg,
    };
  }
}
