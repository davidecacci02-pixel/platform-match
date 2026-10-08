import { describe, it, expect } from "vitest";
import { STABLE_PLATFORM_PRIORITY } from "@/lib/scoring-matrix";
import { PlatformId } from "@/lib/quiz-schema";

describe("Deterministic Tie-Breaking Logic", () => {
  it("prioritizes goal-fit, then audience-fit, then predefined stable order", () => {
    interface MockCandidate {
      platformId: PlatformId;
      rawScore: number;
      goalFit: number;
      audienceFit: number;
    }

    const sortTieBreaker = (a: MockCandidate, b: MockCandidate) => {
      const scoreDiff = b.rawScore - a.rawScore;
      if (Math.abs(scoreDiff) > 0.0001) return scoreDiff;

      const goalDiff = b.goalFit - a.goalFit;
      if (goalDiff !== 0) return goalDiff;

      const audienceDiff = b.audienceFit - a.audienceFit;
      if (audienceDiff !== 0) return audienceDiff;

      const aOrder = STABLE_PLATFORM_PRIORITY.indexOf(a.platformId);
      const bOrder = STABLE_PLATFORM_PRIORITY.indexOf(b.platformId);
      return aOrder - bOrder;
    };

    // Case 1: Identical raw score, but different goal-fit
    const candidateA: MockCandidate = {
      platformId: "tiktok",
      rawScore: 75.0,
      goalFit: 90,
      audienceFit: 70,
    };
    const candidateB: MockCandidate = {
      platformId: "instagram",
      rawScore: 75.0,
      goalFit: 80,
      audienceFit: 95,
    };
    const list1 = [candidateB, candidateA].sort(sortTieBreaker);
    expect(list1[0].platformId).toBe("tiktok"); // TikTok wins because higher goalFit (90 vs 80)

    // Case 2: Identical raw score and identical goal fit, but different audience fit
    const candidateC: MockCandidate = {
      platformId: "youtube",
      rawScore: 75.0,
      goalFit: 85,
      audienceFit: 90,
    };
    const candidateD: MockCandidate = {
      platformId: "linkedin",
      rawScore: 75.0,
      goalFit: 85,
      audienceFit: 80,
    };
    const list2 = [candidateD, candidateC].sort(sortTieBreaker);
    expect(list2[0].platformId).toBe("youtube"); // YouTube wins on audience fit (90 vs 80)

    // Case 3: Completely identical scores across raw, goal, and audience -> stable predefined order
    const candidateE: MockCandidate = {
      platformId: "pinterest",
      rawScore: 75.0,
      goalFit: 80,
      audienceFit: 80,
    };
    const candidateF: MockCandidate = {
      platformId: "linkedin",
      rawScore: 75.0,
      goalFit: 80,
      audienceFit: 80,
    };
    const list3 = [candidateE, candidateF].sort(sortTieBreaker);
    expect(list3[0].platformId).toBe("linkedin"); // LinkedIn is earlier in STABLE_PLATFORM_PRIORITY than Pinterest
  });
});
