import { useState, useCallback } from 'react';
import { useActivities } from '../../hooks';
import RehabilitationProgress from './RehabilitationProgress';
import RehabilitationReport from './RehabilitationReport';
import { getCurrentDateYYYYMM, calculateDateProgress, getCurrentDateYYYYMMDD } from '@/lib/utils';

interface RehabilitationStatusProps {
  patientId: number;
}

const initialDate = new Date();

export default function RehabilitationStatus({ patientId }: RehabilitationStatusProps) {
  const [date, setDate] = useState(initialDate);
  const [month, setMonth] = useState(initialDate);

  const { data: activities } = useActivities({
    patientId,
    date: getCurrentDateYYYYMM(month),
  });

  const {
    prescriptionStartDate,
    prescriptionEndDate,
    reports,
    totalDays: totalDaysFromActivities,
    totalTherapyTime,
  } = activities || {
    reports: [],
    totalDays: 0,
    totalTherapyTime: 0,
    prescriptionStartDate: '',
    prescriptionEndDate: '',
  };

  const {
    totalDays: totalDaysFromProgress,
    elapsedDays,
    progressPercentage,
  } = calculateDateProgress({
    startDate: prescriptionStartDate,
    endDate: prescriptionEndDate,
    currentDate: getCurrentDateYYYYMMDD(date),
  });

  const handleDateChange = useCallback((date: Date) => {
    setDate(date);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setMonth(month);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col mb-5">
        <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
          재활 치료 현황
        </span>
        <span className="text-[var(--aiortho-gray-600)] text-base font-normal leading-none mt-3">
          환자의 재활 치료 상세 현황을 확인할 수 있습니다.
        </span>
      </div>

      {Boolean(patientId) ? (
        <div className="flex flex-col gap-9">
          <RehabilitationProgress
            totalDays={totalDaysFromProgress}
            completedDays={elapsedDays}
            progressPercentage={progressPercentage}
          />
          <RehabilitationReport
            date={date}
            month={month}
            reports={reports}
            totalDays={totalDaysFromActivities}
            totalTherapyTime={totalTherapyTime}
            onDateChange={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-25 mt-[56px]">
          <span className="text-[var(--aiortho-gray-500)] ">
            라이센스 번호로 앱 연동이 필요해요.
          </span>
        </div>
      )}
    </div>
  );
}
