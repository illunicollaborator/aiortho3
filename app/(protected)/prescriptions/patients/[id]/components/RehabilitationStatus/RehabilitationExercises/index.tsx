import { Fragment } from 'react';
import { PatientActivityReport } from '@/models';
import { formatKoreanDate, formatDuration } from '@/lib/utils';
import Divider from '@/components/Divider';

interface RehabilitationExercisesProps {
  report: PatientActivityReport;
}

export default function RehabilitationExercises({ report }: RehabilitationExercisesProps) {
  const { date, subTotalTherapyTime, subTotalGoodTherapyTime, exercises } = report;

  return (
    <div className="rounded-xl border border-[rgba(218,223,233,0.6)] w-full p-6 flex flex-col">
      {/* Date Header */}
      <span className="text-aiortho-gray-900 font-medium text-center">
        {formatKoreanDate(date)}
      </span>

      {/* Statistics Section */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex gap-2 text-sm">
          <span className="text-aiortho-gray-900 font-medium">총 재활 치료 시간</span>
          <span className="text-aiortho-primary font-normal">
            {formatDuration(subTotalTherapyTime)}
          </span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-aiortho-gray-900 font-medium">좋은 자세 치료 시간</span>
          <span className="text-aiortho-primary font-normal">
            {formatDuration(subTotalGoodTherapyTime)}
          </span>
        </div>
      </div>

      <Divider className="border-aiortho-gray-100 mt-5 mb-3" />

      {/* Exercise List Section */}
      <div className="flex flex-col gap-3">
        <span className="text-sm text-aiortho-gray-900 font-medium">재활치료 세부내용</span>

        {exercises.length > 0 ? (
          <div className="flex flex-col">
            {exercises.map(({ exerciseId, exerciseName, goodTherapyTime, therapyTime }, index) => (
              <Fragment key={exerciseId}>
                <div className="flex gap-1">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="w-[14px] h-[14px] border border-aiortho-gray-800 rounded-full text-aiortho-gray-800 font-medium text-[10px] leading-5 flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="h-5 text-[13px] text-aiortho-gray-900 font-medium flex items-center">
                      {exerciseName}
                    </span>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2">
                        <span className="text-aiortho-gray-800 text-[13px]">총 재활 치료 시간</span>
                        <span className="text-aiortho-primary text-[13px]">
                          {formatDuration(therapyTime)}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <span className="text-aiortho-gray-800 text-[13px]">
                          좋은 치료 동작 시간
                        </span>
                        <span className="text-aiortho-primary text-[13px]">
                          {formatDuration(goodTherapyTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {index !== exercises.length - 1 && (
                  <Divider className="border-aiortho-gray-100 my-3" />
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="flex justify-center my-5">
            <span className="flex items-center justify-center text-aiortho-gray-500 text-[13px] h-7">
              치료 내역이 없어요.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
