import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import OrthoInput from '@/components/OrthoInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Doctor, MedicalDepartmentInfo, HospitalInfo } from '@/models';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useMedicalDepartments,
  useMedicalLicenseCheck,
  usePhoneVerifyCheck,
  usePhoneVerifySend,
  useUpdateDoctorProfile,
} from '@/hooks';
import MedicalInstitutionSelector from '@/components/MedicalInstitutionSelector';
import MedicalDepartmentSelector from '@/components/MedicalDepartmentSelector';
import NurseManagerSelector from '@/components/NurseManagerSelector';
import { useTimer } from '@/hooks/useTimer';
import { formatTime, createProfilePhoneNumberSchema } from '@/lib/utils';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { useRouter } from 'next/navigation';

interface DoctorProfileEditFormProps {
  profile: Doctor;
}

export default function DoctorProfileEditForm({ profile }: DoctorProfileEditFormProps) {
  const router = useRouter();

  const schema = z
    .object({
      signupCode: z.string(),
      email: z.string(),
      password: z
        .string()
        .optional()
        .refine(
          value => {
            if (!value) return true; // required 체크
            if (value.length < 8 || value.length > 16) return false;
            return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/.test(value);
          },
          {
            message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
          }
        ),
      nextPassword: z
        .string()
        .optional()
        .refine(
          value => {
            if (!value) return true; // required 체크
            if (value.length < 8 || value.length > 16) return false;
            return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/.test(value);
          },
          {
            message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
          }
        ),
      nextPasswordConfirm: z
        .string()
        .optional()
        .refine(
          value => {
            if (!value) return true; // required 체크
            if (value.length < 8 || value.length > 16) return false;
            return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/.test(value);
          },
          {
            message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
          }
        ),
      name: z
        .string()
        .min(2, { message: '이름은 2자 이상 입력해주세요' })
        .max(10, { message: '이름은 10자 이하로 입력해주세요' })
        .regex(/^[가-힣]+$/, { message: '한글만 입력 가능합니다' })
        .refine(
          val => {
            const singleConsonantVowel = /[ㄱ-ㅎㅏ-ㅣ]/;
            return !singleConsonantVowel.test(val);
          },
          { message: '자음이나 모음만 사용할 수 없습니다' }
        ),
      medicalLicense: z
        .string()
        .min(1, { message: '의사 면허 번호를 입력해주세요' })
        .min(5, { message: '의사 면허 번호를 다시 확인해주세요' })
        .max(20, { message: '의사 면허 번호를 다시 확인해주세요' }),
      medicalLicenseCheckStatus: z.boolean().refine(val => val === true, {
        message: '의료 면허 번호를 검증해주세요',
      }),
      medicalInstitution: z.object({
        hospitalCode: z.string().min(1, { message: '의료 기관을 선택해주세요' }),
        name: z.string().min(1, { message: '의료 기관을 선택해주세요' }),
        address: z.string().min(1, { message: '의료 기관을 선택해주세요' }),
      }),
      medicalDepartment: z.object({
        code: z.string().min(1, { message: '진료과를 선택해주세요' }),
        name: z.string().min(1, { message: '진료과를 선택해주세요' }),
      }),
      specialties: z
        .object({
          code: z.string(),
          name: z.string(),
        })
        .optional(),
      specialistLicense: z.string().optional(),
      nurseIds: z
        .array(z.string())
        .refine(val => !val || val.length <= 10, {
          message: '담당 간호사는 최대 10명까지 선택할 수 있습니다',
        })
        .optional(),
      phoneNumber: createProfilePhoneNumberSchema(profile.phoneNumber),
      certificationNumber: z.string(),
      certificationNumberCheckStatus: z
        .boolean()
        .refine(val => val === true, { message: '인증번호 확인이 필요합니다' }),
    })
    .refine(
      data => {
        if (data.certificationNumberCheckStatus === false) {
          if (!data.certificationNumber || data.certificationNumber.length < 6) {
            return false;
          }
          if (data.certificationNumber.length > 6) {
            return false;
          }
        }
        return true;
      },
      {
        message: '6자리로 입력해주세요',
        path: ['certificationNumber'],
      }
    )
    .refine(
      data => {
        // 비밀번호 변경 시 일치 확인
        if (data.nextPassword || data.nextPasswordConfirm) {
          return data.nextPassword === data.nextPasswordConfirm;
        }
        return true;
      },
      {
        message: '변경할 비밀번호가 일치하지 않습니다',
        path: ['nextPasswordConfirm'],
      }
    );

  type FormValues = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    setFocus,
    trigger,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      signupCode: profile.signupCode,
      email: profile.email,
      password: '',
      nextPassword: '',
      nextPasswordConfirm: '',
      name: profile.name,
      medicalLicense: profile.licenseNumber,
      medicalLicenseCheckStatus: true,
      medicalInstitution: profile.hospitalInfo,
      medicalDepartment: profile.departmentInfo,
      specialties: profile.specialityFieldInfo ?? { code: '', name: '' },
      specialistLicense: profile.specialistLicenseNumber,
      nurseIds: profile.nurseIds,
      phoneNumber: profile.phoneNumber,
      certificationNumber: '',
      certificationNumberCheckStatus: true,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNextPassword, setShowNextPassword] = useState(false);
  const [showNextPasswordConfirm, setShowNextPasswordConfirm] = useState(false);

  const nextPassword = watch('nextPassword');
  const nextPasswordConfirm = watch('nextPasswordConfirm');

  const medicalInstitution = watch('medicalInstitution');
  const medicalDepartment = watch('medicalDepartment');
  const specialties = watch('specialties');

  const medicalLicense = watch('medicalLicense');
  const medicalLicenseCheckStatus = watch('medicalLicenseCheckStatus');
  const medicalLicenseCheckMutation = useMedicalLicenseCheck();
  const medicalDepartmentsQuery = useMedicalDepartments();

  const phoneNumber = watch('phoneNumber');
  const [isPhoneReset, setIsPhoneReset] = useState(false);

  const [certSent, setCertSent] = useState(false);
  const certificationNumber = watch('certificationNumber');
  const certificationNumberCheckStatus = watch('certificationNumberCheckStatus');

  const phoneVerifySendMutation = usePhoneVerifySend();
  const phoneVerifyCheckMutation = usePhoneVerifyCheck();

  const { mutate: phoneVerifySend, isPending: isPhoneVerifySendPending } = phoneVerifySendMutation;
  const { mutate: phoneVerifyCheck, isPending: isPhoneVerifyCheckPending } =
    phoneVerifyCheckMutation;

  const DEFAULT_TIMER = 300;
  const { timer, isActive, setTimer, setIsActive } = useTimer();

  const { mutate: updateDoctorProfile, isPending: isUpdateDoctorProfilePending } =
    useUpdateDoctorProfile();

  const onSubmit = (data: FormValues) => {
    const payload = {
      password: data.nextPassword,
      name: data.name,
      licenseNumber: data.medicalLicense,
      phoneNumber: data.phoneNumber,
      hospitalCode: data.medicalInstitution.hospitalCode,
      departmentCode: data.medicalDepartment.code,
      specialtyField: data.specialties?.code,
      specialistLicenseNumber: data.specialistLicense,
      nurseIds: data.nurseIds,
    };

    updateDoctorProfile(payload, {
      onSuccess: () => {
        router.replace('/profile');

        setTimeout(() => {
          showSuccessToast('개인정보 수정완료', '개인정보가 수정되었어요');
        }, 500);
      },
    });
  };

  const togglePasswordVisibility = (value: 'current' | 'next' | 'nextConfirm') => {
    if (value === 'current') setShowPassword(!showPassword);
    if (value === 'next') setShowNextPassword(!showNextPassword);
    if (value === 'nextConfirm') setShowNextPasswordConfirm(!showNextPasswordConfirm);
  };

  const handleMedicalLicenseCheck = async () => {
    const isValid = await trigger('medicalLicense');

    if (!isValid) {
      return;
    }

    medicalLicenseCheckMutation.mutate(
      { licenseNumber: medicalLicense, token: profile.signupCode },
      {
        onSuccess: () => {
          setValue('medicalLicenseCheckStatus', true, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        },
        onError: error => {
          if (error.statusSubCode === 4011) {
            setError('medicalLicense', { message: '이미 사용된 의사 면허 번호에요' });
          } else {
            setError('medicalLicense', { message: '의사 면허 번호를 다시 확인해주세요' });
          }
        },
      }
    );
  };

  const handleMedicalInstitutionChange = (institution?: HospitalInfo) => {
    if (!institution) {
      setValue(
        'medicalInstitution',
        {
          hospitalCode: '',
          name: '',
          address: '',
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
    } else {
      setValue('medicalInstitution', institution, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const handleMedicalDepartmentChange = (department?: MedicalDepartmentInfo) => {
    if (!department) {
      setValue(
        'medicalDepartment',
        {
          code: '',
          name: '',
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
    } else {
      setValue('medicalDepartment', department, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const handleSpecialtiesChange = (department?: MedicalDepartmentInfo) => {
    if (department?.name === '선택 안함') {
      setValue(
        'specialties',
        {
          code: '',
          name: '선택 안함',
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
    } else {
      setValue('specialties', department, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const handleNurseIdsChange = (nurseIds: string[]) => {
    setValue('nurseIds', nurseIds, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handlePhoneNumberReset = () => {
    setValue('phoneNumber', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('certificationNumber', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('certificationNumberCheckStatus', false, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setIsPhoneReset(true);
  };

  const handlePhoneNumberCheck = async () => {
    const isValid = await trigger('phoneNumber');

    if (!isValid) {
      return;
    }

    phoneVerifySend(
      { phoneNumber },
      {
        onSuccess: () => {
          setCertSent(true);
          setTimer(DEFAULT_TIMER);
          setIsActive(true);
        },
        onError: error => {
          if (error.statusCode === 4002) {
            setError('phoneNumber', { message: '유효하지 않은 전화번호입니다' });
          } else if (error.statusSubCode === 4017) {
            setError('phoneNumber', { message: '인증 시도 횟수를 초과했습니다' });
          } else {
            setError('phoneNumber', { message: '잠시 후 시도해주세요' });
          }
        },
      }
    );
  };

  const handleCertificationNumberCheck = () => {
    phoneVerifyCheck(
      { phoneNumber, code: certificationNumber },
      {
        onSuccess: () => {
          setValue('certificationNumberCheckStatus', true, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
          setIsActive(false);
          setTimer(DEFAULT_TIMER);
          setIsPhoneReset(false);
        },
        onError: error => {
          if (error.statusCode === 4002) {
            setError('certificationNumber', { message: '유효하지 않은 전화번호입니다' });
          } else {
            setError('certificationNumber', { message: '인증 번호가 일치하지 않아요' });
          }

          setValue('certificationNumberCheckStatus', false, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        },
      }
    );
  };

  useEffect(() => {
    if (isPhoneReset) {
      setFocus('phoneNumber');
    }
  }, [isPhoneReset, setFocus]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className="flex flex-col gap-12"
    >
      <OrthoInput
        label="의사 가입 코드"
        registration={register('signupCode')}
        error={errors.signupCode?.message}
        isDirty={dirtyFields.signupCode}
        disabled
      />

      <OrthoInput
        label="아이디 (이메일)"
        registration={register('email')}
        error={errors.email?.message}
        isDirty={dirtyFields.email}
        disabled
      />

      <OrthoInput
        label="현재 비밀번호"
        placeholder="현재 비밀번호를 입력하세요"
        type={showPassword ? 'text' : 'password'}
        registration={register('password')}
        error={errors.password?.message}
        isDirty={dirtyFields.password}
        rightIcon={
          !showPassword ? (
            <EyeOff size={24} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          ) : (
            <Eye size={24} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          )
        }
        onRightIconClick={() => togglePasswordVisibility('current')}
      />

      <OrthoInput
        label="변경할 비밀번호"
        placeholder="변경할 비밀번호를 입력하세요"
        type={showNextPassword ? 'text' : 'password'}
        registration={register('nextPassword')}
        error={errors.nextPassword?.message}
        isDirty={dirtyFields.nextPassword}
        rightIcon={
          !showNextPassword ? (
            <EyeOff size={24} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          ) : (
            <Eye size={24} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          )
        }
        onRightIconClick={() => togglePasswordVisibility('next')}
      />

      <OrthoInput
        label="변경할 비밀번호 재입력"
        placeholder="변경할 비밀번호를 한 번 더 입력해주세요"
        type={showNextPasswordConfirm ? 'text' : 'password'}
        registration={register('nextPasswordConfirm')}
        error={errors.nextPasswordConfirm?.message}
        apiResponseMessage={
          dirtyFields.nextPasswordConfirm &&
          !errors.password &&
          !errors.nextPassword &&
          !errors.nextPasswordConfirm &&
          nextPassword === nextPasswordConfirm
            ? '변경할 비밀번호와 일치해요'
            : undefined
        }
        isDirty={dirtyFields.nextPasswordConfirm}
        rightIcon={
          !showNextPasswordConfirm ? (
            <EyeOff size={24} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          ) : (
            <Eye size={24} className="text-[var(--aiortho-gray-400)] cursor-pointer" />
          )
        }
        onRightIconClick={() => togglePasswordVisibility('nextConfirm')}
      />

      <OrthoInput
        label="이름"
        placeholder="이름을 입력하세요"
        registration={register('name')}
        error={errors.name?.message}
        isDirty={dirtyFields.name}
        required
      />

      <OrthoInput
        label="의사 면허 번호"
        placeholder="의사 면허 번호을 입력해주세요"
        registration={register('medicalLicense')}
        error={
          errors.medicalLicense?.message ||
          (dirtyFields.medicalLicense && medicalLicenseCheckStatus === false
            ? '의사 면허 번호를 검증해주세요'
            : '')
        }
        apiResponse={dirtyFields.medicalLicense && !medicalLicenseCheckStatus}
        apiResponseMessage={
          !errors.medicalLicense && dirtyFields.medicalLicense && medicalLicenseCheckStatus === true
            ? '사용가능한 의사 면허 번호에요'
            : ''
        }
        isDirty={dirtyFields.medicalLicense}
        rightIcon={
          <Button
            type="button"
            variant="input"
            size="inputConfirm"
            disabled={
              medicalLicenseCheckStatus === true ||
              Boolean(errors.medicalLicense) ||
              !dirtyFields.medicalLicense ||
              !medicalLicense
            }
            onClick={() => handleMedicalLicenseCheck()}
          >
            중복확인
          </Button>
        }
        onChange={() =>
          setValue('medicalLicenseCheckStatus', false, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        required
      />

      <MedicalInstitutionSelector
        label="의료 기관명"
        registration={register('medicalInstitution')}
        error={errors.medicalInstitution?.message}
        institutionInfo={medicalInstitution}
        onChange={handleMedicalInstitutionChange}
        required
      />

      <MedicalDepartmentSelector
        label="진료과"
        placeholder="진료과를 선택해주세요"
        items={medicalDepartmentsQuery.data ?? []}
        registration={register('medicalDepartment')}
        error={errors.medicalDepartment?.message}
        medicalDepartmentInfo={medicalDepartment}
        isDirty={Boolean(dirtyFields.medicalDepartment)}
        onChange={handleMedicalDepartmentChange}
        required
      />

      <MedicalDepartmentSelector
        label="전문의 과목"
        placeholder="전문의 과목을 선택해주세요"
        items={[{ code: 'none', name: '선택 안함' }, ...(medicalDepartmentsQuery.data ?? [])]}
        registration={register('specialties')}
        error={errors.specialties?.message}
        medicalDepartmentInfo={specialties}
        onChange={handleSpecialtiesChange}
      />

      <OrthoInput
        label="전문의 면허 번호"
        placeholder="전문의 면허 번호을 입력해주세요"
        registration={register('specialistLicense')}
        error={errors.specialistLicense?.message}
      />

      <NurseManagerSelector
        label="담당 간호사"
        nurses={profile.nurseInfos}
        error={errors.nurseIds?.message}
        onChange={handleNurseIdsChange}
      />

      <OrthoInput
        label="휴대폰 번호"
        maxLength={11}
        placeholder="휴대폰 번호를 입력해주세요"
        registration={register('phoneNumber')}
        error={errors.phoneNumber?.message}
        isDirty={dirtyFields.phoneNumber}
        rightIcon={
          isPhoneReset ? (
            <Button
              type="button"
              variant="input"
              size="inputCertify"
              disabled={isPhoneVerifySendPending || isActive}
              onClick={handlePhoneNumberCheck}
            >
              인증번호 전송
            </Button>
          ) : (
            <Button
              type="button"
              variant="input"
              size="inputCertify"
              onClick={handlePhoneNumberReset}
            >
              다른번호 변경
            </Button>
          )
        }
        readOnly={!isPhoneReset || isActive}
        numericOnly
        required
      />

      {isPhoneReset && (
        <OrthoInput
          label="인증 번호"
          placeholder="인증번호 6자리"
          registration={register('certificationNumber')}
          apiResponse={
            certificationNumberCheckStatus !== null && certificationNumberCheckStatus
              ? !certificationNumberCheckStatus
              : undefined
          }
          apiResponseMessage={
            certificationNumberCheckStatus === true ? '인증 번호가 확인되었어요' : ''
          }
          error={errors.certificationNumber?.message}
          rightIcon={
            <div className="flex items-center gap-2 md:gap-5 py-2">
              {certSent && (
                <p className="text-sm font-normal text-[color:var(--aiortho-gray-400)]">
                  {formatTime(timer)}
                </p>
              )}
              <Button
                type="button"
                variant="input"
                size="inputConfirm"
                onClick={handleCertificationNumberCheck}
                disabled={
                  Boolean(errors.certificationNumber) ||
                  !certSent ||
                  !isActive ||
                  isPhoneVerifyCheckPending
                }
              >
                확인
              </Button>
            </div>
          }
          readOnly={!isActive}
          required
        />
      )}

      <div className="flex gap-5">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 h-12 rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="submit"
          className="flex-1 h-12 rounded-full cursor-pointer"
          disabled={isUpdateDoctorProfilePending || !isValid}
        >
          수정 완료
        </Button>
      </div>
    </form>
  );
}
