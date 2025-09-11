import { useState } from 'react';
import { useActivities } from '../../hooks';
import RehabilitationProgress from './RehabilitationProgress';
import { getCurrentDateYYYYMM, calculateDateProgress, getCurrentDateYYYYMMDD } from '@/lib/utils';

interface RehabilitationStatusProps {
  patientId: number;
}

const initialDateYYYYMMDD = getCurrentDateYYYYMMDD();
const initialDateYYYYMM = getCurrentDateYYYYMM();

export default function RehabilitationStatus({ patientId }: RehabilitationStatusProps) {
  const [dateYYYYMM, setDateYYYYMM] = useState(initialDateYYYYMM);
  const { data: activities } = useActivities({ patientId, date: dateYYYYMM });

  if (!activities) return null;

  const { prescriptionStartDate, prescriptionEndDate } = activities;
  const { totalDays, elapsedDays, progressPercentage } = calculateDateProgress({
    startDate: prescriptionStartDate,
    endDate: prescriptionEndDate,
    currentDate: initialDateYYYYMMDD,
  });

  console.log(activities);
  console.log(totalDays, elapsedDays, progressPercentage);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-5">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            재활 치료 현황
          </span>
          <span className="text-[var(--aiortho-gray-600)] text-base font-normal leading-none mt-3">
            환자의 재활 치료 상세 현황을 확인할 수 있습니다.
          </span>
        </div>
      </div>

      {Boolean(patientId) ? (
        <div className="flex flex-col gap-3">
          <RehabilitationProgress
            totalDays={totalDays}
            completedDays={elapsedDays}
            progressPercentage={progressPercentage}
          />
          {/* <RehabilitationReport /> */}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-25">
          <span className="text-[var(--aiortho-gray-500)] ">
            라이센스 번호로 앱 연동이 필요해요.
          </span>
        </div>
      )}
    </div>
  );
}
