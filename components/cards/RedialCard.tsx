import { Slider } from '@/components/ui/slider';

const INTERVALS = [3, 6, 9, 12, 24]; // hours
const REDIAL_COUNT_TICKS = [0, 2, 4, 6, 8, 10]; // redial counts

type Props = {
  selectedRedialCount: number;
  handleRedialCountChange: (value: number) => void;
  selectedRedialInterval: number;
  handleRedialIntervalChange: (time: number) => void;
};

export default function RedialCard({
  selectedRedialCount,
  handleRedialCountChange,
  selectedRedialInterval,
  handleRedialIntervalChange,
}: Props) {
  return (
    <div className="rounded-2xl border overflow-hidden">
      {/* Header */}
      <div className="bg-[#F4F4F6] border-b px-4 py-3 sm:px-6 sm:py-4">
        <h3 className="text-lg font-semibold">Redial</h3>
      </div>

      <div className="bg-white p-4 sm:p-6 lg:py-4 lg:short:py-3">
        {/* Redial count */}
        <div>
          <h4 className="font-semibold mb-5">Redial count</h4>

          <Slider
            value={[selectedRedialCount]}
            min={0}
            max={10}
            step={1}
            className="cursor-pointer"
            onValueChange={(value) => {
              if (typeof value === 'number') handleRedialCountChange(value);
            }}
          />

          <div className="text-zinc-500 flex justify-between mt-4 text-xs sm:text-sm">
            {REDIAL_COUNT_TICKS.map((count) => (
              <span key={count}>{count}</span>
            ))}
          </div>
        </div>

        {/* Redial interval */}
        <div className="mt-8 sm:mt-10 lg:mt-5 lg:short:mt-8">
          <h4 className="font-semibold mb-5 lg:mb-3 lg:short:mb-2">
            Redial interval
          </h4>

          <div className="text-black-800 grid grid-cols-3 gap-1.5 bg-[#F8F8FA] p-1 border rounded-lg sm:grid-cols-5 sm:gap-3">
            {INTERVALS.map((time) => (
              <button
                key={time}
                className={`cursor-pointer px-2 py-2 text-xs whitespace-nowrap sm:px-5 sm:text-sm ${
                  time === selectedRedialInterval &&
                  'border rounded-lg bg-white'
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
