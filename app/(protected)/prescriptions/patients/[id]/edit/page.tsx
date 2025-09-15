import PatientInfoForm from '@/components/PatientInfoForm';

export default function PatientProfileEditPage() {
  return (
    <section className="flex flex-col w-full">
      <h1 className="text-[32px] font-bold">환자 정보 수정</h1>
      <p className="text-[var(--aiortho-gray-600)] text-[17px] font-normal mt-5">
        환자 정보을 위해 아래 항목들을 입력해주세요.
      </p>

      <PatientInfoForm mode="edit" />
    </section>
  );
}
