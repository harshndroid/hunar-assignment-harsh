import type { CallingWindow } from './defaultScoreConfig';

const daysPenaltyConfig: Record<number, number> = {
  1: -40,
  2: -30,
  3: -20,
  4: -10,
  5: 0,
  6: 0,
  7: 0,
};

const windowPenaltyConfig: Record<number, number> = {
  0: -33,
  1: -33,
  2: -33,
  3: -33,
  4: -26,
  5: -20,
  6: -13,
  7: -7,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
};

const redialsPenaltyConfig: Record<number, number> = {
  0: -100,
  1: -90,
  2: -55,
  3: -31,
  4: -13,
  5: 0,
  6: 0,
  7: 0,
  8: -19,
  9: -43,
  10: -76,
};

const intervalPenaltyConfig: Record<number, number> = {
  3: 0,
  6: 0,
  9: -12,
  12: -22,
  24: -34,
};

export type ScoreData = {
  totalScore: number;
  daysPenalty: number;
  windowPenalty: number;
  redialsPenalty: number;
  intervalPenalty: number;
};

type ScoreInput = {
  callingDays: string[];
  callingWindow: CallingWindow;
  redialCount: number;
  redialInterval: number;
};

export function calculateScore({
  callingDays,
  callingWindow,
  redialCount,
  redialInterval,
}: ScoreInput): ScoreData {
  const daysPenalty = daysPenaltyConfig[callingDays.length];
  const windowHours = callingWindow.end - callingWindow.start;
  const windowPenalty = windowPenaltyConfig[windowHours] || 0;
  const redialsPenalty = redialsPenaltyConfig[redialCount];
  const intervalPenalty = intervalPenaltyConfig[redialInterval];

  const totalScore = Math.max(
    100 + daysPenalty + windowPenalty + redialsPenalty + intervalPenalty,
    0
  );

  // return final score and each penalty points
  return {
    totalScore,
    daysPenalty,
    windowPenalty,
    redialsPenalty,
    intervalPenalty,
  };
}

export function calculateLevel(totalScore: number): number {
  if (totalScore >= 82) return 1;
  if (totalScore >= 62) return 2;
  if (totalScore >= 42) return 3;
  return 4;
}
