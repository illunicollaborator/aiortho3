import { formatDuration, getCurrentDateYYYYMMDD } from '@/lib/utils';
import { PatientActivityCompletionRate, PatientActivityReport, Prescription } from '@/models';
import { useMemo } from 'react';
import RehabilitationCalendar from '../RehabilitationCalendar';
import RehabilitationExercises from '../RehabilitationExercises';

interface RehabilitationReportProps {
    date: Date;
    month: Date;
    reports: PatientActivityReport[];
    prescriptions: Prescription[];
    totalDays: number;
    totalTherapyTime: number;
    onDateChange: (date: Date) => void;
    onMonthChange: (month: Date) => void;
}

export default function RehabilitationReport({
    date,
    month,
    reports,
    prescriptions,
    totalDays,
    totalTherapyTime,
    onDateChange,
    onMonthChange,
}: RehabilitationReportProps) {
    const currentReport = useMemo(() => {
        return (
            reports.find(report => report.date === getCurrentDateYYYYMMDD(date)) ?? {
                date: getCurrentDateYYYYMMDD(date),
                completionRate: PatientActivityCompletionRate.NONE,
                subTotalTherapyTime: 0,
                subTotalGoodTherapyTime: 0,
                exercises: [],
            }
        );
    }, [date]);

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
                    prescriptions={prescriptions}
                    onDateChange={onDateChange}
                    onMonthChange={onMonthChange}
                />
            </div>

            {/* Exercise Section */}
            <div className="mt-3">
                <RehabilitationExercises report={currentReport} />
            </div>
        </div>
    );
}
