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
      <div className="px-6 py-4 border-b bg-[#F4F4F6]">
        <h3 className="font-semibold text-lg">Guardrails</h3>
      </div>

      {/* Card Body */}
      <div className="bg-white p-6">
        {/* Calling Days */}
        <div>
          <h4 className="font-semibold mb-4">Calling days</h4>

          <div className="flex gap-3">
            {ALL_DAYS.map((day) => (
              <button
                key={day}
                className={`w-16 h-10 cursor-pointer rounded-lg border transition ${
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
        <div className="mt-10">
          <h4 className="font-semibold mb-6">Calling window</h4>

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

          <div className="flex justify-between mt-4 text-gray-500">
            {WINDOW_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
