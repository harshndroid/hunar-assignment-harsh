import { Slider } from '@/components/ui/slider';
import type { CallingWindow } from '@/constants/defaultScoreConfig';

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WINDOW_LABELS = ['8 AM', '11 AM', '2 PM', '5 PM', '9 PM'];

type Props = {
  selectedCallingDays: string[];
  handleDayToggle: (day: string) => void;
  selectedCallingWindow: CallingWindow;
  handleCallingWindowChange: (times: CallingWindow) => void;
};

export default function GuardrailsCard({
  selectedCallingDays,
  handleDayToggle,
  selectedCallingWindow,
  handleCallingWindowChange,
}: Props) {
  return (
    <div className="rounded-2xl border bg-[#F8F8FA] overflow-hidden">
      {/* Card Header */}
      <div className="px-4 py-3 border-b bg-[#F4F4F6] sm:px-6 sm:py-4">
        <h3 className="font-semibold text-lg">Guardrails</h3>
      </div>

      {/* Card Body */}
      <div className="bg-white p-4 sm:p-6 lg:py-4">
        {/* Calling Days */}
        <div>
          <h4 className="font-semibold mb-4">Calling days</h4>

          {/* Chips share the row and shrink to fit rather than overflowing;
              min-w-0 lets them go below their intrinsic text width. */}
          <div className="flex gap-1.5 sm:gap-3">
            {ALL_DAYS.map((day) => (
              <button
                key={day}
                className={`flex-1 min-w-0 h-10 cursor-pointer rounded-lg border text-xs transition sm:text-sm ${
                  selectedCallingDays.includes(day)
                    ? 'bg-zinc-800 text-white'
                    : 'bg-white text-black'
                }`}
                onClick={() => handleDayToggle(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Calling Window */}
        <div className="mt-8 sm:mt-10 lg:mt-5">
          <h4 className="font-semibold mb-6 lg:mb-4">Calling window</h4>

          <Slider
            value={[selectedCallingWindow.start, selectedCallingWindow.end]}
            min={8}
            max={21}
            step={1}
            onValueChange={(value) => {
              if (Array.isArray(value)) {
                handleCallingWindowChange({ start: value[0], end: value[1] });
              }
            }}
          />

          <div className="flex justify-between mt-4 text-xs text-gray-500 sm:text-sm">
            {WINDOW_LABELS.map((label) => (
              <span key={label} className="whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
