import { Slider } from '@/components/ui/slider';

const INTERVALS = [3, 6, 9, 12, 24];

export default function RedialCard({
  selectedRedialCount,
  handleRedialCountChange,
  selectedRedialInterval,
  handleRedialIntervalChange,
}: Props) {
  return (
    <div className="rounded-2xl border overflow-hidden">
      {/* Header */}
      <div className="bg-[#F4F4F6] border-b px-6 py-4">
        <h3 className="text-lg font-semibold">Redial</h3>
      </div>

      {/* Body */}
      <div className="bg-white p-6">
        {/* Number of retries */}
        <div>
          <h4 className="font-semibold mb-5">Redial count</h4>

          <Slider
            value={[selectedRedialCount]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => {
              if (typeof value === 'number') handleRedialCountChange(value);
            }}
          />

          <div className="flex justify-between mt-4">
            {[0, 2, 4, 6, 8, 10].map((count) => (
              <span key={count}>{count}</span>
            ))}
          </div>
        </div>

        {/* Retry interval */}
        <div className="mt-10">
          <h4 className="font-semibold mb-5">Redial interval</h4>

          <div className="flex gap-3 flex-wrap bg-[#F8F8FA] p-1 border rounded-lg">
            {INTERVALS.map((time) => (
              <button
                key={time}
                className={`px-5 py-2 ${
                  time === selectedRedialInterval && 'border rounded-lg bg-white'
                } `}
                onClick={() => handleRedialIntervalChange(time)}
              >
                {time} hours
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  selectedRedialCount: number;
  handleRedialCountChange: (value: number) => void;
  selectedRedialInterval: number;
  handleRedialIntervalChange: (time: number) => void;
};
