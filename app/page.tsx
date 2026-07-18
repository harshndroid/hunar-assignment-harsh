'use client';
import { useState } from 'react';

import GuardrailsCard from '@/components/cards/GuardrailsCard';
import RedialCard from '@/components/cards/RedialCard';
import ScoreCard from '@/components/cards/ScoreCard';
import { DEFAULT_CONFIG } from '../constants/defaultScoreConfig';

const defaultSelectedCallingDays = DEFAULT_CONFIG.callingDays;
const defaultSelectedCallingWindow = DEFAULT_CONFIG.callingWindow;
const defaultSelectedRedialCount = DEFAULT_CONFIG.redialCount;
const defaultSelectedInterval = DEFAULT_CONFIG.redialInterval;

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

export default function Home() {
  const [selectedCallingDays, setSelectedCallingDays] = useState(
    defaultSelectedCallingDays
  );
  const [selectedCallingWindow, setSelectedCallingWindow] = useState(
    defaultSelectedCallingWindow
  );
  const [selectedRedialCount, setSelectedRedialCount] = useState(
    defaultSelectedRedialCount
  );
  const [selectedRedialInterval, setSelectedRedialInterval] = useState(
    defaultSelectedInterval
  );

  function handleDayToggle(day: string) {
    setSelectedCallingDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((ele) => ele !== day);
      } else {
        const updated = [...prev];
        updated.push(day);
        return updated;
      }
    });
  }

  function handleCallingWindowChange(times: { start: number; end: number }) {
    setSelectedCallingWindow({ start: times.start, end: times.end });
  }

  function handleRedialCountChange(value: number) {
    setSelectedRedialCount(value);
  }

  function handleRedialIntervalChange(interval: number) {
    setSelectedRedialInterval(interval);
  }

  function calculateScore() {
    const daysPenalty: number = daysPenaltyConfig[selectedCallingDays.length];
    const selectedCallingWindowHr =
      selectedCallingWindow.end - selectedCallingWindow.start;
    const windowPenalty: number =
      windowPenaltyConfig[selectedCallingWindowHr] || 0;
    const redialsPenalty: number = redialsPenaltyConfig[selectedRedialCount];
    const intervalPenalty: number =
      intervalPenaltyConfig[selectedRedialInterval];

    const scoreData = {
      totalScore: Math.max(
        100 + daysPenalty + windowPenalty + redialsPenalty + intervalPenalty,
        0
      ),
      daysPenalty,
      windowPenalty,
      redialsPenalty,
      intervalPenalty,
    };
    return scoreData;
  }
  const scoreData = calculateScore();

  function calculateLevel(){
    let levelData = 1;
    const totalScore = scoreData?.totalScore;
    if(totalScore){
      if (totalScore >= 82 && totalScore<=100) {
        levelData = 1
      }
      else if (totalScore >= 62 && totalScore <= 81) {
        levelData = 2;
      }
      else if (totalScore >= 42 && totalScore <= 61) {
        levelData = 3;
      }
      else if (totalScore >= 0 && totalScore <= 41) {
        levelData = 4;
      }
    }
    
    return levelData;
  }
  const levelData = calculateLevel();

  return (
    <main className="min-h-screen flex flex-col">
      <header className="h-24 bg-blue-600 flex items-center px-12">
        <h1 className="text-5xl font-semibold text-white">Level {levelData}</h1>
      </header>

      <section className="flex-1 max-w-7xl mx-auto w-full p-8 overflow-hidden">
        <h2 className="text-4xl font-bold mb-10">Redial & Guardrails</h2>

        <div className="grid grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <GuardrailsCard
              selectedCallingDays={selectedCallingDays}
              handleDayToggle={handleDayToggle}
              selectedCallingWindow={selectedCallingWindow}
              handleCallingWindowChange={handleCallingWindowChange}
            />
            <RedialCard
              selectedRedialCount={selectedRedialCount}
              handleRedialCountChange={handleRedialCountChange}
              selectedRedialInterval={selectedRedialInterval}
              handleRedialIntervalChange={handleRedialIntervalChange}
            />
          </div>

          <ScoreCard scoreData={scoreData} levelData={levelData} />
        </div>
      </section>

      <footer className="h-20 border-t flex justify-end items-center px-10">
        <button className="bg-zinc-800 text-white px-8 py-3 rounded-xl">
          Submit
        </button>
      </footer>
    </main>
  );
}
