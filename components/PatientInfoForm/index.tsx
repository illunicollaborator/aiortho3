'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OrthoInput from '@/components/OrthoInput';
import { patientFormSchema, PatientFormData } from './schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn, formatPhoneNumber } from '@/lib/utils';
import { useCreatePatient, useEditPatient } from './hooks';
import { toast } from 'sonner';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { useParams, useRouter } from 'next/navigation';
import { usePatient } from '@/hooks';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface PatientInfoFormProps {
  mode: 'create' | 'edit';
}

export default function PatientInfoForm({ mode }: PatientInfoFormProps) {
  const { id } = useParams();
  const router = useRouter();

  const { data: patient, isLoading } = usePatient(Number(id));
  const createPatientMutation = useCreatePatient();
  const editPatientMutation = useEditPatient(Number(id));

  const isEditMode = mode === 'edit';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields, isDirty },
    setValue,
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      patientName: '',
      birthDate: '',
      genderDigit: '',
      hospitalNumber: '',
      guardianName: '',
      guardianPhone: '',
    },
  });

  useEffect(() => {
    if (isEditMode && patient) {
      reset({
        patientName: patient.name || '',
        birthDate: patient.residentRegistrationNumber.split('-')[0] || '',
        genderDigit: patient.residentRegistrationNumber.split('-')[1] || '',
        hospitalNumber: patient.hospitalPatientNum || '',
        guardianName: patient.guardianName || '',
        guardianPhone: formatPhoneNumber(patient.guardianPhoneNum) || '',
      });
    }
  }, [patient, isEditMode, reset]);

  if (isLoading) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setValue('guardianPhone', formatted, { shouldValidate: false, shouldDirty: true });
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setValue('birthDate', value, { shouldValidate: false, shouldDirty: true });
  };

  const handleGenderDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    setValue('genderDigit', value, { shouldValidate: false, shouldDirty: true });
  };

  const handleHospitalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setValue('hospitalNumber', value, { shouldValidate: false, shouldDirty: true });
  };

  const onSubmit = async (data: PatientFormData) => {
    const payload = {
      name: data.patientName,
      residentRegistrationNumber: `${data.birthDate}-${data.genderDigit}`,
      hospitalPatientNum: data.hospitalNumber,
      guardianName: data.guardianName,
      guardianPhoneNum: data.guardianPhone,
      prescriptionStatus: 'not_created',
    };

    if (isEditMode) {
      if (!patient) return;

      await editPatientMutation.mutateAsync(payload, {
        onSuccess: () => {
          router.back();

          setTimeout(() => {
            showSuccessToast('환자 정보 수정 완료', '환자 정보가 수정되었습니다.');
          }, 100);
        },
        onError: () => {
          toast.error('환자 정보 수정에 실패했습니다.', {
            description: '잠시 후 다시 시도해주세요.',
          });
        },
      });
    } else {
      await createPatientMutation.mutateAsync(payload, {
        onSuccess: ({ patientId }) => {
          router.push(`/prescriptions/patients/${patientId}`);

          setTimeout(() => {
            showSuccessToast('환자 등록 완료', '환자 정보가 등록되었습니다.');
          }, 100);
        },
        onError: () => {
          toast.error('환자 정보 등록에 실패했습니다.', {
            description: '잠시 후 다시 시도해주세요.',
          });
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 md:mt-[57px] w-full max-w-[800px] space-y-12 min-w-[320px] shrink-0"
    >
      <OrthoInput
        label="환자명"
        placeholder="환자명을 입력하세요"
        error={errors.patientName?.message}
        registration={register('patientName')}
        isDirty={dirtyFields.patientName}
        maxLength={10}
        required
      />

      <div className="flex flex-col w-full">
        <Label
          htmlFor="birthDate"
          className="text-sm font-medium text-[color:var(--aiortho-gray-500)] relative mb-3"
        >
          <span className="-mr-2 -mb-1">주민등록번호</span>
          <span
            className={cn(
              `inline-block`,
              errors.birthDate?.message || errors.genderDigit?.message
                ? 'text-[color:var(--aiortho-danger)]'
                : 'text-[color:var(--aiortho-primary)]'
            )}
          >
            *
          </span>
        </Label>

        <div className="flex items-center w-full h-12">
          <div className="relative w-[50%]">
            <Input
              id="birthDate"
              type="text"
              placeholder="생년월일 6자리"
              className={cn(
                'w-full placeholder:text-[var(--aiortho-gray-400)] h-12',
                errors.birthDate?.message &&
                  'border-2 border-[color:var(--aiortho-danger)] focus:border-[color:var(--aiortho-danger)] focus:ring-0 focus:ring-offset-0'
              )}
              maxLength={6}
              {...register('birthDate', {
                onChange: handleBirthDateChange,
              })}
            />
          </div>

          <span className="text-[var(--aiortho-gray-400)] text-lg m-1.5">-</span>

          <div className="relative">
            <Input
              id="genderDigit"
              type="text"
              className={cn(
                'w-[45px] placeholder:text-[var(--aiortho-gray-400)] h-12',
                errors.genderDigit?.message &&
                  'border-2 border-[color:var(--aiortho-danger)] focus:border-[color:var(--aiortho-danger)] focus:ring-0 focus:ring-offset-0'
              )}
              maxLength={1}
              {...register('genderDigit', {
                onChange: handleGenderDigitChange,
              })}
            />
          </div>

          <span className="ml-2 text-[var(--aiortho-gray-700)] text-sm font-mono tracking-widest">
            ●●●●●●
          </span>
        </div>

        {/* 에러 메시지를 OrthoInput과 동일하게 레이아웃 플로우에 포함 */}
        {(errors.birthDate?.message || errors.genderDigit?.message) && (
          <p className="font-normal text-[color:var(--aiortho-danger)] text-xs mt-2">
            {errors.birthDate?.message || errors.genderDigit?.message}
          </p>
        )}
      </div>

      <OrthoInput
        label="병원 환자 번호"
        placeholder="병원 환자 번호를 입력하세요"
        error={errors.hospitalNumber?.message}
        registration={register('hospitalNumber', {
          onChange: handleHospitalNumberChange,
        })}
        isDirty={dirtyFields.hospitalNumber}
        required
      />

      <OrthoInput
        label="보호자명"
        placeholder="보호자명을 입력하세요"
        error={errors.guardianName?.message}
        registration={register('guardianName')}
        isDirty={dirtyFields.guardianName}
        maxLength={10}
        required
      />

      <OrthoInput
        label="보호자 휴대폰 번호"
        placeholder="휴대폰 번호를 입력해주세요"
        error={errors.guardianPhone?.message}
        registration={register('guardianPhone', {
          onChange: handlePhoneChange,
        })}
        maxLength={13}
        isDirty={dirtyFields.guardianPhone}
        required
      />

      {isEditMode ? (
        <div className="flex mt-12 gap-5">
          <Button
            type="button"
            size="confirm"
            className="flex-1 text-aiortho-gray-700 bg-[var(--aiortho-secondary)]/60 font-bold rounded-full h-12 hover:bg-[var(--aiortho-secondary)]/70 transition-colors cursor-pointer"
            onClick={() => router.back()}
          >
            취소
          </Button>

          <Button
            type="submit"
            size="confirm"
            className="flex-1 text-[#ffffff] bg-[#66798D] font-bold rounded-full h-12 hover:bg-[#66798D]/90 transition-colors disabled:bg-[#ADBED0] disabled:cursor-not-allowed cursor-pointer"
            disabled={isSubmitting || !isValid}
          >
            수정 완료
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          size="confirm"
          className="bg-[var(--aiortho-primary)] text-white font-bold rounded-full min-w-[240px] h-12 w-full px-5 py-3 hover:bg-[var(--aiortho-primary)]/90 transition-colors disabled:bg-[var(--aiortho-disabled)] disabled:cursor-not-allowed cursor-pointer"
          disabled={isSubmitting || !isValid}
        >
          등록하기
        </Button>
      )}
    </form>
  );
}
