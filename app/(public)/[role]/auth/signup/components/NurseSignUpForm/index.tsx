import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useCheckEmail, useNurseSignUp } from '../../hooks';
import MedicalInstitutionSelector from '@/components/MedicalInstitutionSelector';
import SignupCheckList from '../SignupCheckList';
import { formatTime, phoneNumberSchema } from '@/lib/utils';
import { useTimer } from '@/hooks/useTimer';
import { HospitalInfo } from '@/models';
import { useRouter } from 'next/navigation';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { toast } from 'sonner';
import { usePhoneVerifyCheck, usePhoneVerifySend } from '@/hooks';

const schema = z
  .object({
    email: z.string().email({ message: '올바르지 않은 아이디 (이메일) 형식이에요' }),
    password: z
      .string()
      .min(8, {
        message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
      })
      .max(16, {
        message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/, {
        message: '영문, 숫자, 특수문자를 모두 포함해야 합니다',
      }),
    confirmPassword: z.string(),
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
    medicalInstitution: z.object({
      hospitalCode: z.string().min(1, { message: '의료 기관을 선택해주세요' }),
      name: z.string().min(1, { message: '의료 기관을 선택해주세요' }),
      address: z.string().min(1, { message: '의료 기관을 선택해주세요' }),
    }),
    phoneNumber: phoneNumberSchema,
    certificationNumber: z
      .string()
      .min(6, '6자리 이상 입력해주세요')
      .max(6, '6자리 이하 입력해주세요'),
    certificationNumberCheckStatus: z
      .boolean()
      .refine(val => val === true, { message: '인증번호 확인이 필요합니다' }),
    requiredTermsAgreed: z
      .boolean()
      .refine(val => val === true, { message: '필수 약관에 동의해주세요' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  });

type FormValues = z.infer<typeof schema>;

export default function NurseSignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      medicalInstitution: {
        hospitalCode: '',
        name: '',
        address: '',
      },
      phoneNumber: '',
      certificationNumber: '',
      certificationNumberCheckStatus: false,
      requiredTermsAgreed: false,
    },
  });

  const email = watch('email');
  const [prevEmail, setPrevEmail] = useState<string>('');
  const [emailCheckStatus, setEmailCheckStatus] = useState<null | boolean>(null);
  const emailCheckMutation = useCheckEmail();

  const confirmPassword = watch('confirmPassword');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const medicalInstitution = watch('medicalInstitution');

  const phoneNumber = watch('phoneNumber');
  const [prevPhoneNumber, setPrevPhoneNumber] = useState<string>('');
  const [phoneNumberCheckStatus, setPhoneNumberCheckStatus] = useState<null | boolean>(null);
  const phoneVerifySendMutation = usePhoneVerifySend();

  const phoneVerifyCheckMutation = usePhoneVerifyCheck();
  const [certSent, setCertSent] = useState(false);
  const certificationNumber = watch('certificationNumber');
  const [prevCertificationNumber, setPrevCertificationNumber] = useState<string>('');
  const certificationNumberCheckStatus = watch('certificationNumberCheckStatus');

  const DEFAULT_TIMER = 300;
  const { timer, isActive, setTimer, setIsActive } = useTimer();

  const nurseSignUpMutation = useNurseSignUp();

  // 이메일 입력값 변경 감지
  useEffect(() => {
    if (email !== prevEmail && emailCheckStatus !== null) {
      setEmailCheckStatus(null);
      clearErrors('email');
    }
  }, [email, prevEmail, clearErrors]);

  // 휴대폰 번호 입력값 변경 감지
  useEffect(() => {
    if (phoneNumber !== prevPhoneNumber && phoneNumberCheckStatus !== null) {
      setPhoneNumberCheckStatus(null);
      setCertSent(false);
      setIsActive(false);
      setTimer(DEFAULT_TIMER);
      clearErrors('phoneNumber');
    }
  }, [phoneNumber, prevPhoneNumber, phoneNumberCheckStatus, setIsActive, setTimer, clearErrors]);

  // 인증번호 입력값 변경 감지
  useEffect(() => {
    if (certificationNumber !== prevCertificationNumber && certificationNumberCheckStatus) {
      setValue('certificationNumberCheckStatus', false, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setPrevCertificationNumber('');
      clearErrors('certificationNumber');
    }
  }, [
    certificationNumber,
    prevCertificationNumber,
    certificationNumberCheckStatus,
    setValue,
    clearErrors,
  ]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailCheck = async (email: string) => {
    const isValid = await trigger('email');

    if (!isValid) return;

    emailCheckMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setPrevEmail(email);
          setEmailCheckStatus(true);
        },
        onError: error => {
          if (error.statusCode === 409) {
            setError('email', { message: '이미 가입된 아이디(이메일)에요' });
          }

          setEmailCheckStatus(false);
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

  const handlePhoneNumberCheck = async () => {
    const isValid = await trigger('phoneNumber');

    if (!isValid) return;

    phoneVerifySendMutation.mutate(
      { phoneNumber },
      {
        onSuccess: () => {
          setPhoneNumberCheckStatus(true);
          setCertSent(true);
          setTimer(DEFAULT_TIMER);
          setIsActive(true);
          setPrevPhoneNumber(phoneNumber);
        },
        onError: error => {
          if (error.statusCode === 4002) {
            setError('phoneNumber', { message: '유효하지 않은 전화번호입니다' });
          } else if (error.statusSubCode === 4017) {
            setError('phoneNumber', { message: '인증 시도 횟수를 초과했습니다' });
          } else {
            setError('phoneNumber', { message: '잠시 후 시도해주세요' });
          }

          setPhoneNumberCheckStatus(false);
        },
      }
    );
  };

  const handleCertificationNumberCheck = () => {
    phoneVerifyCheckMutation.mutate(
      { phoneNumber, code: certificationNumber },
      {
        onSuccess: () => {
          setPrevCertificationNumber(certificationNumber);
          setValue('certificationNumberCheckStatus', true, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
          setIsActive(false);
          setTimer(DEFAULT_TIMER);
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

  const handleRequiredTermsChange = (isValid: boolean) => {
    setValue('requiredTermsAgreed', isValid, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
      name: data.name,
      phoneNumber: data.phoneNumber,
      hospitalCode: data.medicalInstitution.hospitalCode,
    };

    nurseSignUpMutation.mutateAsync(payload, {
      onSuccess: () => {
        router.replace('/nurse/auth');
        showSuccessToast('회원가입이 완료되었어요', '로그인 해주세요.');
      },
      onError: () => {
        toast.error('회원가입에 실패했어요.', {
          description: '잠시 후 시도해주세요.',
        });
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center bg-white py-20">
      <div className="w-full max-w-[540px] mx-auto">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">회원가입</h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            회원가입을 위해 아래 항목들을 입력해주세요.
          </p>
        </div>
        <form className="space-y-12 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <OrthoInput
            label="아이디(이메일)"
            placeholder="아이디(이메일)를 입력해주세요"
            registration={register('email')}
            apiResponse={emailCheckStatus !== null ? !emailCheckStatus : undefined}
            apiResponseMessage={
              emailCheckStatus && !Boolean(errors.email)
                ? '사용가능한 아이디 (이메일)에요'
                : undefined
            }
            error={errors.email?.message}
            rightIcon={
              <Button
                type="button"
                variant="input"
                size="inputConfirm"
                onClick={() => handleEmailCheck(email)}
                disabled={Boolean(emailCheckStatus)}
              >
                중복확인
              </Button>
            }
            required
          />

          <OrthoInput
            label="비밀번호"
            placeholder="8~16자리 영문/숫자/특수문자 조합"
            type={showPassword ? 'text' : 'password'}
            registration={register('password')}
            error={errors.password?.message}
            rightIcon={
              !showPassword ? (
                <EyeOff size={24} color="#97A8C4" />
              ) : (
                <Eye size={24} color="#97A8C4" />
              )
            }
            onRightIconClick={togglePasswordVisibility}
            required
          />

          <OrthoInput
            label="비밀번호 재입력"
            placeholder="비밀번호를 재입력해주세요"
            type={showConfirmPassword ? 'text' : 'password'}
            registration={register('confirmPassword')}
            apiResponseMessage={
              confirmPassword && !errors.confirmPassword ? '비밀번호가 일치해요' : undefined
            }
            error={errors.confirmPassword?.message}
            rightIcon={
              !showConfirmPassword ? (
                <EyeOff size={24} color="#97A8C4" />
              ) : (
                <Eye size={24} color="#97A8C4" />
              )
            }
            onRightIconClick={toggleConfirmPasswordVisibility}
            required
          />

          <OrthoInput
            label="이름"
            placeholder="이름을 입력해주세요"
            registration={register('name')}
            error={errors.name?.message}
            required
          />

          <MedicalInstitutionSelector
            label="의료 기관명"
            registration={register('medicalInstitution')}
            error={errors.medicalInstitution?.message}
            onChange={handleMedicalInstitutionChange}
            institutionInfo={medicalInstitution}
            required
          />

          <OrthoInput
            label="휴대폰 번호"
            maxLength={11}
            placeholder="휴대폰 번호를 입력해주세요"
            registration={register('phoneNumber')}
            apiResponse={phoneNumberCheckStatus !== null ? !phoneNumberCheckStatus : undefined}
            apiResponseMessage={phoneNumberCheckStatus === true ? '사용 가능한 전화번호입니다' : ''}
            error={errors.phoneNumber?.message}
            rightIcon={
              <div className="flex items-center gap-2 md:gap-5 py-2">
                <Button
                  type="button"
                  onClick={handlePhoneNumberCheck}
                  variant="input"
                  size="inputCertify"
                  disabled={phoneVerifySendMutation.isPending || isActive}
                >
                  인증번호 전송
                </Button>
              </div>
            }
            readOnly={isActive}
            numericOnly
            required
          />

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
                  onClick={handleCertificationNumberCheck}
                  disabled={!certSent || !isActive}
                  variant="input"
                  size="inputConfirm"
                >
                  확인
                </Button>
              </div>
            }
            readOnly={!isActive}
            required
          />

          <SignupCheckList onRequiredTermsChange={handleRequiredTermsChange} />

          <Button
            type="submit"
            className="w-full bg-[color:var(--aiortho-primary)] hover:bg-[color:var(--aiortho-primary)] text-white py-5 mt-4 md:mb-16 rounded-full cursor-pointer"
            disabled={!isValid || isSubmitting}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
