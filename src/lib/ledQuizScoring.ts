import type { LEDQuizAnswers } from "@/types/ledQuiz";

export const scoreLEDQuiz = (answers: LEDQuizAnswers) => {
  let score = 0;

  // Electric bill range scoring (higher bills = more savings potential)
  const billScores: Record<string, number> = {
    "Under $150": 1,
    "$150–$250": 2,
    "$250–$400": 3,
    "$400–$600": 4,
    "$600+": 5,
  };
  score += billScores[answers.billRange || ""] || 0;

  // Current lighting scoring (older tech = more savings potential)
  const lightingScores: Record<string, number> = {
    "All LED": 1,
    "Mostly LED": 2,
    "Some LED": 3,
    "CFL bulbs": 4,
    "Traditional incandescent": 5,
  };
  score += lightingScores[answers.currentLighting || ""] || 0;

  // Number of upgrade areas (more areas = more comprehensive savings)
  score += Math.min(answers.upgradeAreas.length, 5);

  // Home size scoring
  const sizeScores: Record<string, number> = {
    "<1500": 1,
    "1500-2500": 2,
    "2500-4000": 3,
    "4000+": 4,
  };
  score += sizeScores[answers.homeSize || ""] || 0;

  // Timeline scoring (ASAP gets higher priority)
  const timelineScores: Record<string, number> = {
    "ASAP": 3,
    "1-2 months": 2,
    "Exploring options": 1,
  };
  score += timelineScores[answers.timeline || ""] || 0;

  return { score, maxScore: 20 };
};