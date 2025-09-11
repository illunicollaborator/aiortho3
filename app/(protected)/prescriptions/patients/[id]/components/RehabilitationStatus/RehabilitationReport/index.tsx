import { PatientActivityReport } from '@/models';
import { formatDuration } from '@/lib/utils';
import RehabilitationCalendar from '../RehabilitationCalendar';

interface RehabilitationReportProps {
  date: Date;
  month: Date;
  reports: PatientActivityReport[];
  totalDays: number;
  totalTherapyTime: number;
  onDateChange: (date: Date) => void;
  onMonthChange: (month: Date) => void;
}

export default function RehabilitationReport({
  date,
  month,
  reports,
  totalDays,
  totalTherapyTime,
  onDateChange,
  onMonthChange,
}: RehabilitationReportProps) {
  // TODO: 운동섹션 조건부 UI 추가
  console.log(reports);
  return (
    <div className="flex flex-col">
      <span className="text-aiortho-gray-900 text-xl font-semibold leading-6 tracking-[0.2px]">
        {`총 ${totalDays}일 / ${formatDuration(totalTherapyTime)}`}
      </span>

      {/* Calendar Section */}
      <div className="mt-5 w-full bg-[#FAFBFC] rounded-xl p-6">
        <RehabilitationCalendar
          date={date}
          month={month}
          reports={reports}
          onDateChange={onDateChange}
          onMonthChange={onMonthChange}
        />
      </div>

      {/* Exercise Section */}
      <div className="mt-3 w-full border border-[#DADFE999]/60 rounded-xl p-6">
        {/* <ExerciseGrid /> */}
      </div>
    </div>
  );
}
