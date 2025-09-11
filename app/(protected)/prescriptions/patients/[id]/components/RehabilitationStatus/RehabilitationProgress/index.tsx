interface RehabilitationProgressProps {
  totalDays: number;
  completedDays: number;
  progressPercentage: number;
}

export default function RehabilitationProgress({
  totalDays,
  completedDays,
  progressPercentage,
}: RehabilitationProgressProps) {
  return (
    <div className="w-full h-[92px] rounded-xl px-6 py-5 bg-[rgba(189,213,255,0.14)]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-0.5">
          <span className="text-[#0054A6] text-lg font-bold leading-6">{totalDays}</span>
          <span className="text-[#465463] text-lg font-medium leading-6">일 중</span>
          <span className="text-[#0054A6] text-lg font-bold leading-6">{completedDays}</span>
          <span className="text-[#465463] text-lg font-medium leading-6">일 시행</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full h-2">
            <div className="w-full h-2 rounded-xs bg-[#DFF5FF]"></div>
            <div
              className="absolute top-0 left-0 h-2 rounded-xs bg-gradient-to-r from-[#00D1D1] to-[#3BA3FF]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex items-center w-[52px]">
            <span className="text-[#0054A6] text-xl font-bold leading-5">{progressPercentage}</span>
            <span className="text-[#0054A6] text-lg font-bold leading-5">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
