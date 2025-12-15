import { calculateDateProgress, getCurrentDateYYYYMM, getCurrentDateYYYYMMDD } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useActivities } from '../../hooks';
import RehabilitationProgress from './RehabilitationProgress';
import RehabilitationReport from './RehabilitationReport';

interface RehabilitationStatusProps {
  patientId: number;
  license?: string;
}

const initialDate = new Date();

export default function RehabilitationStatus({ patientId, license }: RehabilitationStatusProps) {
  const [date, setDate] = useState(initialDate);
  const [month, setMonth] = useState(initialDate);
  const isInitialized = useRef(false);

  const {
    data: activities = {
      reports: [],
      totalDays: 0,
      totalTherapyTime: 0,
      prescriptionStartDate: '',
      prescriptionEndDate: '',
      prescriptions: [],
    },
  } = useActivities({
    patientId,
    date: getCurrentDateYYYYMM(month),
  });

  const {
    prescriptionStartDate,
    prescriptionEndDate,
    reports,
    totalDays: totalDaysFromActivities,
    totalTherapyTime,
    prescriptions = [],
  } = activities;

  const {
    totalDays: totalDaysFromProgress,
    elapsedDays,
    progressPercentage,
  } = calculateDateProgress({
    startDate: prescriptionStartDate,
    endDate: prescriptionEndDate,
    currentDate: getCurrentDateYYYYMMDD(initialDate),
  });

  const handleDateChange = useCallback((date: Date) => {
    setDate(date);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setMonth(month);
  }, []);

  useEffect(() => {
    if (isInitialized.current || prescriptions.length === 0) return;

    // 모든 처방의 endDate 중 가장 최신인 날짜 찾기
    const validEndDates = prescriptions
      .map(p => p.endDate)
      .filter((endDate): endDate is string => !!endDate)
      .sort((a, b) => b.localeCompare(a));

    if (validEndDates.length > 0) {
      const dateStr = validEndDates[0];
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      const latestDate = new Date(year, month, day);
      setDate(latestDate);
      setMonth(latestDate);
      isInitialized.current = true;
    }
  }, [prescriptions]);

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

      {Boolean(license) ? (
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
            prescriptions={prescriptions}
            totalDays={totalDaysFromActivities}
            totalTherapyTime={totalTherapyTime}
            onDateChange={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-25 mt-[56px]">
          <span className="text-[var(--aiortho-gray-500)] ">가입 코드로 앱 연동이 필요해요.</span>
        </div>
      )}
    </div>
  );
}
