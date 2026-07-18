import Image from 'next/image';
import Level1 from '@/assets/images/Level1.png';
import Level2 from '@/assets/images/Level2.png';
import Level3 from '@/assets/images/Level3.png';
import Level4 from '@/assets/images/Level4.png';
import type { ScoreData } from '@/constants/scoring';

const WEATHER_LEVELS: Record<number, typeof Level1> = {
  1: Level1,
  2: Level2,
  3: Level3,
  4: Level4,
};

type Props = {
  scoreData: ScoreData;
  levelData: number;
};

export default function ScoreCard({ scoreData, levelData }: Props) {
  return (
    <div className="rounded-2xl border overflow-hidden h-full">
      {/* Total Score */}
      <div className="relative flex flex-col items-center gap-8 bg-white">
        <Image
          loading="eager"
          className="w-full"
          alt="Campaign score level"
          src={WEATHER_LEVELS[levelData]}
        />
        <div className="absolute top-10 text-center text-white">
          <div className="text-7xl font-bold">{scoreData.totalScore}</div>
          <p className="mb-2">Campaign Score</p>
        </div>
      </div>
      {/* Penalty Section */}

      <div>
        <PenaltyItem
          title="Calling days penalty"
          points={scoreData.daysPenalty}
        />

        <PenaltyItem
          title="Calling window penalty"
          points={scoreData.windowPenalty}
        />

        <PenaltyItem
          title="Redial count penalty"
          points={scoreData.redialsPenalty}
        />

        <PenaltyItem
          title="Redial interval penalty"
          points={scoreData.intervalPenalty}
        />
      </div>
    </div>
  );
}

function PenaltyItem({ title, points }: { title: string; points: number }) {
  return (
    <div className="flex items-center justify-between px-10 py-3 border">
      <span>{title}</span>

      <span
        className={`font-semibold ${
          points === 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {points}
      </span>
    </div>
  );
}
