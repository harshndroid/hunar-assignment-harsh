'use client';
import { useState } from 'react';

import GuardrailsCard from '@/components/cards/GuardrailsCard';
import RedialCard from '@/components/cards/RedialCard';
import ScoreCard from '@/components/cards/ScoreCard';
import { DEFAULT_CONFIG } from '@/constants/defaultScoreConfig';
import { calculateLevel, calculateScore } from '@/constants/scoring';

export default function Home() {
  const [selectedCallingDays, setSelectedCallingDays] = useState(
    DEFAULT_CONFIG.callingDays
  );
  const [selectedCallingWindow, setSelectedCallingWindow] = useState(
    DEFAULT_CONFIG.callingWindow
  );
  const [selectedRedialCount, setSelectedRedialCount] = useState(
    DEFAULT_CONFIG.redialCount
  );
  const [selectedRedialInterval, setSelectedRedialInterval] = useState(
    DEFAULT_CONFIG.redialInterval
  );

  function handleDayToggle(day: string) {
    setSelectedCallingDays((prev) => {
      if (prev.includes(day)) {
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((ele) => ele !== day);
      } else {
        const updated = [...prev];
        updated.push(day);
        return updated;
      }
    });
  }

  function handleCallingWindowChange(times: { start: number; end: number }) {
    setSelectedCallingWindow(times);
  }

  function handleRedialCountChange(value: number) {
    setSelectedRedialCount(value);
  }

  function handleRedialIntervalChange(interval: number) {
    setSelectedRedialInterval(interval);
  }

  const scoreData = calculateScore({
    callingDays: selectedCallingDays,
    callingWindow: selectedCallingWindow,
    redialCount: selectedRedialCount,
    redialInterval: selectedRedialInterval,
  });
  const levelData = calculateLevel(scoreData.totalScore);

  return (
    <main className="min-h-screen flex flex-col lg:h-screen lg:overflow-auto">
      <header className="min-h-24 bg-blue-600 flex items-center px-6 py-4 sm:px-12 lg:min-h-0 lg:shrink-0 lg:py-3">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-4xl">
          Level {levelData}
        </h1>
      </header>

      <section className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:px-8 lg:py-4 lg:min-h-0 lg:flex lg:flex-col">
        <h2 className="text-2xl font-bold mb-6 sm:text-3xl lg:text-3xl lg:mb-4 lg:shrink-0">
          Redial & Guardrails
        </h2>

        {/* items-start on lg keeps the control cards at their natural
            height — only the ScoreCard column flexes to fill the viewport. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 lg:flex-1 lg:min-h-0 lg:items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:gap-4">
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

      <footer className="min-h-20 border-t flex justify-end items-center px-4 py-4 sm:px-10 lg:min-h-0 lg:shrink-0 lg:py-3">
        <button className="bg-zinc-800 text-white px-8 py-3 rounded-xl w-full sm:w-auto lg:py-2">
          Submit
        </button>
      </footer>
    </main>
  );
}
