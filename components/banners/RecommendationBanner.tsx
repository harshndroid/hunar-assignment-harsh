import { Sparkles } from 'lucide-react';

export default function RecommendationBanner() {
  return (
    <div className="border-x border-b bg-[#F2F7FF] px-6 py-3">
      <div className="flex items-start gap-2">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#2449D8]" />

        <div>
          <h4 className="font-semibold text-[#1E3A8A]">
            Your settings are not optimized!
          </h4>

          <p className="mt-2 text-sm leading-6 text-[#374151]">
            Your settings may slow down your calling operations and campaign
            completion. We recommend fixing your settings.
          </p>
        </div>
      </div>
    </div>
  );
}
