import Image from 'next/image';
import Level1 from '@/assets/images/Level1.png';
import Level2 from '@/assets/images/Level2.png';
import Level3 from '@/assets/images/Level3.png';
import Level4 from '@/assets/images/Level4.png';
import type { ScoreData } from '@/constants/scoring';

const LEVELS = [
  { level: 1, src: Level1 },
  { level: 2, src: Level2 },
  { level: 3, src: Level3 },
  { level: 4, src: Level4 },
];

type Props = {
  scoreData: ScoreData;
  levelData: number;
};

export default function ScoreCard({ scoreData, levelData }: Props) {
  return (
    <div className="rounded-2xl border overflow-hidden h-full">
      {/* Total Score */}
      <div className="relative flex flex-col items-center gap-8 bg-white">
        {/* All levels render up front so switching is an opacity swap,
            not a fetch + decode that would flash between images. */}
        {LEVELS.map(({ level, src }) => (
          <Image
            key={level}
            priority
            className={`w-full ${level === levelData ? '' : 'invisible absolute inset-0'}`}
            alt={`Campaign score level ${level}`}
            src={src}
          />
        ))}
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
