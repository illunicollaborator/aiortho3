import { PatientActivityReport } from '@/models';
import { formatDuration } from '@/lib/utils';
import RehabilitationCalendar from '../RehabilitationCalendar';

interface RehabilitationReportProps {
  reports: PatientActivityReport[];
  totalDays: number;
  totalTherapyTime: number;
  onMonthChange: (month: Date) => void;
}

export default function RehabilitationReport({
  reports,
  totalDays,
  totalTherapyTime,
  onMonthChange,
}: RehabilitationReportProps) {
  return (
    <div className="flex flex-col">
      <span className="text-aiortho-gray-900 text-xl font-semibold leading-6 tracking-[0.2px]">
        {`총 ${totalDays}일 / ${formatDuration(totalTherapyTime)}`}
      </span>

      {/* Calendar Section */}
      <div className="mt-5 w-full bg-[#FAFBFC] rounded-xl p-6">
        {/* <CalendarNavigation
          currentMonth={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <CalendarGrid /> */}

        <RehabilitationCalendar onMonthChange={onMonthChange} />
      </div>

      {/* Exercise Section */}
      <div className="mt-3 w-full border border-[#DADFE999]/60 rounded-xl p-6">
        {/* <ExerciseGrid /> */}
      </div>
    </div>
  );
}
