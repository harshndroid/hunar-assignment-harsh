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
          alert("Atleast one day needs to be selected")
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
