import { Button } from '@/components/ui/button';
import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import { Prescription, UserRole } from '@/models';
import { formatDate } from '@/lib/utils';

interface ActivePrescriptionProps {
  role: UserRole;
  prescription?: Prescription;
  onClick?: () => void;
}

export default function ActivePrescription({
  role,
  prescription,
  onClick,
}: ActivePrescriptionProps) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-9">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            진행중 처방 내역
          </span>
          <span className="text-[var(--aiortho-gray-600)] text-base font-normal leading-none mt-3">
            현재 치료 진행중인 재활 프로그램 처방 내역입니다.
          </span>
        </div>

        {prescription ? (
          role !== 'Nurse' && (
            <Button
              type="button"
              className="w-[64px] h-10 px-4 py-[11.5px] cursor-pointer rounded-[12px] text-sm font-semibold text-[var(--aiortho-primary)] bg-[var(--aiortho-disabled)]/50 hover:bg-[var(--aiortho-disabled)]/80"
              onClick={onClick}
            >
              수정
            </Button>
          )
        ) : (
          <Button
            type="button"
            className="w-[84px] h-10 px-4 py-[11.5px] cursor-pointer rounded-[12px] text-sm font-semibold"
            onClick={onClick}
          >
            {role === 'Nurse' ? '처방 요청' : '처방하기'}
          </Button>
        )}
      </div>

      {prescription ? (
        <div className="flex flex-col gap-3">
          <span className="text-[var(--aiortho-gray-600)]">
            {formatDate(prescription.startDate ?? '', true)}
          </span>

          <PrescriptionProgramCard prescription={prescription} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-25">
          <span className="text-[var(--aiortho-gray-500)] ">처방된 내역이 없어요.</span>
        </div>
      )}
    </div>
  );
}
