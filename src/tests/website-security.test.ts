import { describe, it, expect } from "vitest";
import { isPrivateOrReservedIP, validateUrlSafety, analyzeWebsiteUrl } from "@/lib/website-analyzer";

describe("Website Analyzer & SSRF Security Protection", () => {
  it("detects and blocks private IPv4 loopback (127.0.0.1, 127.x.x.x)", () => {
    expect(isPrivateOrReservedIP("127.0.0.1")).toBe(true);
    expect(isPrivateOrReservedIP("127.10.20.30")).toBe(true);
  });

  it("detects and blocks RFC1918 private IPv4 networks (10.x, 192.168.x, 172.16-31.x)", () => {
    expect(isPrivateOrReservedIP("10.0.0.1")).toBe(true);
    expect(isPrivateOrReservedIP("10.254.1.1")).toBe(true);
    expect(isPrivateOrReservedIP("192.168.1.1")).toBe(true);
    expect(isPrivateOrReservedIP("192.168.0.254")).toBe(true);
    expect(isPrivateOrReservedIP("172.16.0.1")).toBe(true);
    expect(isPrivateOrReservedIP("172.31.255.255")).toBe(true);
  });

  it("permits legitimate public IP addresses", () => {
    expect(isPrivateOrReservedIP("8.8.8.8")).toBe(false);
    expect(isPrivateOrReservedIP("1.1.1.1")).toBe(false);
    expect(isPrivateOrReservedIP("140.82.112.4")).toBe(false); // GitHub
  });

  it("detects and blocks AWS metadata and link-local address (169.254.169.254)", () => {
    expect(isPrivateOrReservedIP("169.254.169.254")).toBe(true);
    expect(isPrivateOrReservedIP("169.254.1.1")).toBe(true);
  });

  it("detects and blocks IPv6 loopback (::1) and unique local addresses", () => {
    expect(isPrivateOrReservedIP("::1")).toBe(true);
    expect(isPrivateOrReservedIP("fe80::1")).toBe(true);
    expect(isPrivateOrReservedIP("fc00::1")).toBe(true);
    expect(isPrivateOrReservedIP("::ffff:127.0.0.1")).toBe(true);
  });

  it("blocks requests to localhost and local domain names in validateUrlSafety", async () => {
    const localhostResult = await validateUrlSafety("http://localhost:3000");
    expect(localhostResult.valid).toBe(false);
    expect(localhostResult.error).toContain("Access to local or internal network hostnames is prohibited");

    const internalResult = await validateUrlSafety("http://internal-service.local");
    expect(internalResult.valid).toBe(false);
  });

  it("blocks direct requests to social media platform domains", async () => {
    const igResult = await validateUrlSafety("https://instagram.com/mybusiness");
    expect(igResult.valid).toBe(false);
    expect(igResult.error).toContain("Social media profile links cannot be scanned directly");

    const tiktokResult = await validateUrlSafety("https://tiktok.com/@mybrand");
    expect(tiktokResult.valid).toBe(false);
  });

  it("blocks non-HTTP protocols (file://, ftp://, gopher://)", async () => {
    const fileResult = await validateUrlSafety("file:///etc/passwd");
    expect(fileResult.valid).toBe(false);

    const ftpResult = await validateUrlSafety("ftp://example.com/file");
    expect(ftpResult.valid).toBe(false);
  });

  it("handles non-existent or failing domains gracefully without throwing unhandled exceptions", async () => {
    const result = await analyzeWebsiteUrl("https://this-domain-definitely-does-not-exist-998822.com");
    expect(result.success).toBe(false);
    expect(result.verifiedFromWebsite).toBe(false);
    expect(result.error).toBeDefined();
  });
});
