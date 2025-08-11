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

interface PatientInfoFormProps {
  mode: 'create' | 'edit';
}

export default function PatientInfoForm({ mode }: PatientInfoFormProps) {
  const { id } = useParams();
  const router = useRouter();

  const { data: patient, isLoading } = usePatient(id as string);
  const createPatientMutation = useCreatePatient();
  const editPatientMutation = useEditPatient(id as string);

  const isEditMode = mode === 'edit';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields, isDirty },
    setValue,
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    mode: 'onBlur',
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
    setValue('guardianPhone', formatted, { shouldValidate: true, shouldDirty: true });
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setValue('birthDate', value, { shouldValidate: true, shouldDirty: true });
  };

  const handleGenderDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    setValue('genderDigit', value, { shouldValidate: true, shouldDirty: true });
  };

  const handleHospitalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setValue('hospitalNumber', value, { shouldValidate: true, shouldDirty: true });
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
          showSuccessToast('환자 정보 수정 완료', '환자 정보가 수정되었습니다.');
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
          showSuccessToast('환자 등록 완료', '환자 정보가 등록되었습니다.');
          router.push(`/prescriptions/patients/${patientId}`);
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
      className="mt-4 md:mt-[57px] w-full max-w-[800px] space-y-6 min-w-[320px] shrink-0"
    >
      <OrthoInput
        label="환자명"
        placeholder="환자명을 입력하세요"
        error={errors.patientName?.message}
        registration={register('patientName')}
        isDirty={dirtyFields.patientName}
        required
      />

      <div
        className={cn(
          'flex flex-col w-full',
          (errors.birthDate?.message || errors.genderDigit?.message) && 'mb-10'
        )}
      >
        <Label
          htmlFor="birthDate"
          className="text-sm font-medium text-[color:var(--aiortho-gray-500)] relative mb-2"
        >
          <span className="-mr-2 -mb-1">주민등록번호</span>
          <span
            className={cn(
              `inline-block`,
              errors.birthDate?.message
                ? 'text-[color:var(--aiortho-danger)]'
                : 'text-[color:var(--aiortho-primary)]'
            )}
          >
            *
          </span>
        </Label>

        <div className="flex items-center w-full">
          <div className="relative w-[50%]">
            <Input
              id="birthDate"
              type="text"
              placeholder="생년월일 6자리"
              className={cn(
                'w-full placeholder:text-[var(--aiortho-gray-400)] h-12',
                errors.birthDate?.message &&
                  'border-2 border-[color:var(--aiortho-danger)] focus:border-[color:var(--aiortho-danger)] focus:ring-0 focus:ring-offset-0',
                dirtyFields.birthDate &&
                  !errors.birthDate?.message &&
                  'border-[color:var(--aiortho-primary)] ring-1 ring-[color:var(--aiortho-primary)]'
              )}
              maxLength={6}
              {...register('birthDate', {
                onChange: handleBirthDateChange,
              })}
            />
            {errors.birthDate?.message && (
              <p className="absolute font-normal text-xs text-[color:var(--aiortho-danger)] mt-1">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          <span className="text-[var(--aiortho-gray-400)] text-lg m-4">-</span>

          <div className="relative">
            <Input
              id="genderDigit"
              type="text"
              className={cn(
                'w-[45px] placeholder:text-[var(--aiortho-gray-400)] h-12',
                errors.genderDigit?.message &&
                  'border-2 border-[color:var(--aiortho-danger)] focus:border-[color:var(--aiortho-danger)] focus:ring-0 focus:ring-offset-0',
                dirtyFields.genderDigit &&
                  !errors.genderDigit?.message &&
                  'border-[color:var(--aiortho-primary)] ring-1 ring-[color:var(--aiortho-primary)]'
              )}
              maxLength={1}
              {...register('genderDigit', {
                onChange: handleGenderDigitChange,
              })}
            />
            {errors.genderDigit?.message && (
              <p className="absolute font-normal text-xs text-[color:var(--aiortho-danger)] mt-1 whitespace-nowrap">
                {errors.genderDigit.message}
              </p>
            )}
          </div>

          <span className="ml-2 text-[var(--aiortho-gray-700)] text-sm font-mono tracking-widest">
            ●●●●●●
          </span>
        </div>
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
        required
      />

      <OrthoInput
        label="보호자 휴대폰 번호"
        placeholder="010-1234-5678"
        error={errors.guardianPhone?.message}
        registration={register('guardianPhone', {
          onChange: handlePhoneChange,
        })}
        maxLength={13}
        isDirty={dirtyFields.guardianPhone}
        required
      />

      <div className="flex mt-12 justify-end gap-5">
        <button
          type="button"
          className="bg-[var(--aiortho-secondary)] font-bold rounded-full min-w-[240px] min-h-[48px] w-full px-5 py-3 hover:bg-[var(--aiortho-secondary)]/70 transition-colors cursor-pointer"
          onClick={() => router.back()}
        >
          취소
        </button>

        <button
          type="submit"
          className="bg-[var(--aiortho-primary)] text-white font-bold rounded-full min-w-[240px] min-h-[48px] w-full px-5 py-3 hover:bg-[var(--aiortho-primary)]/90 transition-colors disabled:bg-[var(--aiortho-disabled)] disabled:cursor-not-allowed cursor-pointer"
          disabled={isSubmitting || !isValid || (isEditMode && !isDirty)}
        >
          {isEditMode ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
}
