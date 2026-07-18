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
    <div className="rounded-2xl border overflow-hidden h-full lg:flex lg:flex-col lg:min-h-0 lg:self-stretch">
      {/* Total Score — on lg the image area flexes to absorb leftover
          height so the page fits the viewport without scrolling. */}
      {/* Fixed-height image area: all four levels stack and cross-fade
          inside it, so no spacer image is needed to reserve space. */}
      {/* Mobile keeps the natural aspect ratio; on lg the image shrinks
          to whatever height is left after the penalty rows take theirs. */}
      <div className="relative aspect-[500/364] w-full bg-white lg:aspect-auto lg:h-0 lg:min-h-0 lg:flex-1">
        {LEVELS.map(({ level, src }) => (
          <Image
            key={level}
            priority
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out lg:object-contain ${
              level === levelData ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`Campaign score level ${level}`}
            src={src}
          />
        ))}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white">
          <div className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            {scoreData.totalScore}
          </div>
          <p className="text-sm sm:text-base">Campaign Score</p>
        </div>
      </div>
      {/* Penalty Section — fixed size on lg so all four rows always
          render; the image above absorbs the height changes instead. */}
      <div className="lg:shrink-0">
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
