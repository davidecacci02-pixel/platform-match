import {
  QuizAnswers,
  PlatformId,
} from "./quiz-schema";
import { ALL_PLATFORM_IDS } from "./platforms";
import {
  SCORING_WEIGHTS,
  INDUSTRY_FIT_MATRIX,
  AUDIENCE_FIT_MATRIX,
  GOAL_FIT_MATRIX,
  CONTENT_FIT_MATRIX,
  PERSONALITY_FIT_MATRIX,
  TIME_FIT_MATRIX,
  STABLE_PLATFORM_PRIORITY,
} from "./scoring-matrix";
import {
  generatePlatformExplanation,
  PlatformExplanation,
  getAnswerLabel,
} from "./recommendation-explanations";
import {
  determineSecondaryPlatform,
  generate30DayStrategy,
  Strategy30Day,
} from "./content-ideas";

export interface PlatformScoreResult {
  platformId: PlatformId;
  rank: number;
  score: number; // Rounded 0-100 for display
  rawScore: number;
  dimensionScores: {
    industry: number;
    audience: number;
    goal: number;
    content: number;
    personality: number;
    time: number;
  };
  explanation: PlatformExplanation;
  isPrimary: boolean;
  isSecondary: boolean;
}

export interface RecommendationEngineResult {
  rankedPlatforms: PlatformScoreResult[];
  primaryPlatform: PlatformId;
  secondaryPlatform: PlatformId;
  strategy30Day: Strategy30Day;
  answers: QuizAnswers;
  answerLabels: Record<keyof QuizAnswers, string>;
  calculatedAt: string;
  disclaimer: string;
}

export function calculatePlatformScores(answers: QuizAnswers): RecommendationEngineResult {
  // 1. Calculate weighted scores for each platform
  const calculatedList = ALL_PLATFORM_IDS.map((id) => {
    const industryFit = INDUSTRY_FIT_MATRIX[answers.industry][id];
    const audienceFit = AUDIENCE_FIT_MATRIX[answers.audience][id];
    const goalFit = GOAL_FIT_MATRIX[answers.goal][id];
    const contentFit = CONTENT_FIT_MATRIX[answers.content][id];
    const personalityFit = PERSONALITY_FIT_MATRIX[answers.personality][id];
    const timeFit = TIME_FIT_MATRIX[answers.time][id];

    const rawScore =
      SCORING_WEIGHTS.audience * audienceFit +
      SCORING_WEIGHTS.goal * goalFit +
      SCORING_WEIGHTS.industry * industryFit +
      SCORING_WEIGHTS.content * contentFit +
      SCORING_WEIGHTS.personality * personalityFit +
      SCORING_WEIGHTS.time * timeFit;

    // Clamp to 0..100
    const clampedRaw = Math.min(100, Math.max(0, rawScore));
    const score = Math.round(clampedRaw);

    const dimensionScores = {
      industry: industryFit,
      audience: audienceFit,
      goal: goalFit,
      content: contentFit,
      personality: personalityFit,
      time: timeFit,
    };

    return {
      platformId: id,
      rawScore: clampedRaw,
      score,
      dimensionScores,
    };
  });

  // 2. Deterministic tie-breaking:
  // First by weighted rawScore (descending)
  // If tied, by goalFit (descending)
  // If tied, by audienceFit (descending)
  // If still tied, by stable predefined order in STABLE_PLATFORM_PRIORITY
  calculatedList.sort((a, b) => {
    // If difference in score is non-zero (within epsilon of floating point precision)
    const scoreDiff = b.rawScore - a.rawScore;
    if (Math.abs(scoreDiff) > 0.0001) {
      return scoreDiff;
    }

    // Tie-break 1: goal fit
    const goalDiff = b.dimensionScores.goal - a.dimensionScores.goal;
    if (goalDiff !== 0) {
      return goalDiff;
    }

    // Tie-break 2: audience fit
    const audienceDiff = b.dimensionScores.audience - a.dimensionScores.audience;
    if (audienceDiff !== 0) {
      return audienceDiff;
    }

    // Tie-break 3: stable predefined order
    const aOrder = STABLE_PLATFORM_PRIORITY.indexOf(a.platformId);
    const bOrder = STABLE_PLATFORM_PRIORITY.indexOf(b.platformId);
    return aOrder - bOrder;
  });

  const orderedPlatformIds = calculatedList.map((item) => item.platformId);
  const primaryPlatform = orderedPlatformIds[0];
  const secondaryPlatform = determineSecondaryPlatform(
    primaryPlatform,
    orderedPlatformIds,
    answers.time
  );

  // 3. Assemble complete ranked output with rich personalized explanations
  const rankedPlatforms: PlatformScoreResult[] = calculatedList.map((item, index) => {
    const rank = index + 1;
    const explanation = generatePlatformExplanation(
      item.platformId,
      answers,
      item.score,
      item.dimensionScores
    );

    return {
      platformId: item.platformId,
      rank,
      score: item.score,
      rawScore: item.rawScore,
      dimensionScores: item.dimensionScores,
      explanation,
      isPrimary: item.platformId === primaryPlatform,
      isSecondary: item.platformId === secondaryPlatform,
    };
  });

  const strategy30Day = generate30DayStrategy(
    answers,
    primaryPlatform,
    secondaryPlatform
  );

  const answerLabels: Record<keyof QuizAnswers, string> = {
    industry: getAnswerLabel("industry", answers.industry),
    audience: getAnswerLabel("audience", answers.audience),
    goal: getAnswerLabel("goal", answers.goal),
    content: getAnswerLabel("content", answers.content),
    personality: getAnswerLabel("personality", answers.personality),
    time: getAnswerLabel("time", answers.time),
  };

  return {
    rankedPlatforms,
    primaryPlatform,
    secondaryPlatform,
    strategy30Day,
    answers,
    answerLabels,
    calculatedAt: new Date().toISOString(),
    disclaimer:
      "Compatibility scores represent indicative strategic estimates based on platform demographics, algorithmic preferences, and user capacity. They do not constitute guaranteed marketing performance.",
  };
}
