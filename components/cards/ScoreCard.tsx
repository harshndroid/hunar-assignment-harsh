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
        {/* All levels render up front so switching is an opacity cross-fade,
            not a fetch + decode that would flash between images. The first
            image sits in normal flow (invisible) purely to give the
            container its height; the rest stack on top of it. */}
        <Image
          priority
          aria-hidden
          alt=""
          className="w-full invisible"
          src={LEVELS[0].src}
        />
        {LEVELS.map(({ level, src }) => (
          <Image
            key={level}
            priority
            className={`absolute inset-0 w-full transition-opacity duration-500 ease-in-out ${
              level === levelData ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`Campaign score level ${level}`}
            src={src}
          />
        ))}
        {/* Percentage offset keeps the score anchored to the artwork
            as the image scales, unlike a fixed top value. */}
        <div className="absolute top-[8%] text-center text-white">
          <div className="text-4xl font-bold sm:text-6xl lg:text-7xl">
            {scoreData.totalScore}
          </div>
          <p className="mb-2 text-sm sm:text-base">Campaign Score</p>
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
    <div className="flex items-center justify-between gap-3 px-4 py-3 border text-sm sm:px-10 sm:text-base">
      <span>{title}</span>

      <span
        className={`font-semibold shrink-0 ${
          points === 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {points}
      </span>
    </div>
  );
}
