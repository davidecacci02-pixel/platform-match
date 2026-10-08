import { describe, it } from "vitest";
import { runSimulation, TWENTY_PROFILES } from "./simulate-20-profiles";

describe("Simulation of 20 Realistic Business Profiles", () => {
  it("evaluates all 20 business profiles and logs the top 3 rankings", () => {
    const results = runSimulation();
    console.log("=== SIMULATION RESULTS ACROSS 20 REALISTIC PROFILES ===");
    for (const r of results) {
      const top3Str = r.top3
        .map((t) => `#${t.rank} ${t.platform.toUpperCase()} (${t.score}%)`)
        .join(" | ");
      console.log(`[${r.id}] ${r.profile}:`);
      console.log(`   Top 3: ${top3Str}`);
      console.log(`   Expected Top: ${r.expectedTop.toUpperCase()} => Actual Top: ${r.actualTop.toUpperCase()}`);
      console.log(`   Secondary Synergy: ${r.secondary.toUpperCase()}`);
      console.log(`   Frequency: ${r.sustainableFrequency}`);
    }
  });
});
