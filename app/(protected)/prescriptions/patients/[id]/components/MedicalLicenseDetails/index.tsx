import { Button } from '@/components/ui/button';
import { usePostAppLicense } from '../../hooks';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { showWarningToast } from '@/components/ui/toast-warning';

interface MedicalLicenseDetailsProps {
  patientId: number;
  license?: string;
}

export default function MedicalLicenseDetails({ patientId, license }: MedicalLicenseDetailsProps) {
  const { mutateAsync: postAppLicense, isPending } = usePostAppLicense();

  const handlePostAppLicense = async () => {
    await postAppLicense(
      { patientId: patientId },
      {
        onSuccess: () => {
          showSuccessToast('라이센스 번호 전송 완료', '라이센스 번호가 전송되었습니다.');
        },
        onError: () => {
          showWarningToast('라이센스 번호 전송 실패', '잠시 후 시도해주세요.');
        },
      }
    );
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-9">
          <span className="text-[var(--aiortho-gray-900)] text-[22px] font-bold leading-[1.4]">
            라이센스 번호
          </span>
          <span className="whitespace-pre-line text-[var(--aiortho-gray-600)] mt-3">
            {`보호자 휴대폰 번호로 전송된 라이센스 번호를 입력해,\nAIOrtho App에서 자가 치료를 할 수 있습니다.`}
          </span>
        </div>

        <Button
          type="button"
          className="w-[64px] h-10 px-4 py-[11.5px] cursor-pointer bg-[var(--aiortho-gray-600)] text-white disabled:bg-[var(--aiortho-gray-200)] disabled:text-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-600)]/80 rounded-xl text-sm font-semibold"
          disabled={isPending || Boolean(license)}
          onClick={handlePostAppLicense}
        >
          전송
        </Button>
      </div>
    </div>
  );
}
