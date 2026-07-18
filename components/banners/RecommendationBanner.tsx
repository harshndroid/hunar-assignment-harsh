import { Sparkles } from 'lucide-react';

export default function RecommendationBanner() {
  return (
    <div className="border-x border-b bg-[#F2F7FF] px-6 py-3">
      <div className="gap-2">
        <div className="flex gap-2">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#2449D8]" />
          <h4 className="font-bold text-[#12367E]">
            Your settings are not optimized!
          </h4>
        </div>
        <p className="font-semibold mt-2 text-sm text-zinc-800">
          Your settings may slow down your calling operations and campaign
          completion. We recommend fixing your settings.
        </p>
      </div>
    </div>
  );
}
