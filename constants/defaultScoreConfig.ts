// Scoring starts at 100 and penalties are subtracted from it.

export type CallingWindow = {
  start: number;
  end: number;
};

export type ScoreConfig = {
  callingDays: string[];
  callingWindow: CallingWindow;
  redialCount: number;
  redialInterval: number;
};

export const DEFAULT_CONFIG: ScoreConfig = {
  callingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  callingWindow: {
    start: 8,
    end: 21,
  },
  redialCount: 5,
  redialInterval: 3,
};
