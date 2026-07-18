import Image from 'next/image';
import Level1 from '@/assets/images/Level1.png';
import Level2 from '@/assets/images/Level2.png';
import Level3 from '@/assets/images/Level3.png';
import Level4 from '@/assets/images/Level4.png';

const WEATHER_LEVELS: Record<number, typeof Level1> = {
  1: Level1,
  2: Level2,
  3: Level3,
  4: Level4,
};

export default function ScoreCard({ scoreData, levelData }: Props) {
  return (
    <div className="rounded-2xl border overflow-hidden h-full">
      {/* Body */}
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        className="bg-white flex flex-col gap-8"
      >
        {/* Overall Score */}
        <Image
          loading="eager"
          style={{ width: '-webkit-fill-available' }}
          alt="img"
          src={WEATHER_LEVELS[levelData]}
        />
        <div
          style={{
            position: 'absolute',
            color: 'white',
            top: 40,
            textAlign: 'center',
          }}
          className="text-center"
        >
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      className="px-10 py-3 border"
    >
      <span>{title}</span>

      <span
        className={`font-semibold ${
          Number(points) === 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {points}
      </span>
    </div>
  );
}

type Props = {
  scoreData: {
    totalScore: number;
    daysPenalty: number;
    windowPenalty: number;
    redialsPenalty: number;
    intervalPenalty: number;
  };
  levelData: number;
};
