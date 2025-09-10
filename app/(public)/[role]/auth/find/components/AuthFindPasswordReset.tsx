'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import { useParams, useRouter } from 'next/navigation';
import { useResetPassword } from '../hooks/useResetPassword';
import { showSuccessToast } from '@/components/ui/toast-notification';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요' })
      .min(8, { message: '영문/숫자/특수문자 2가지 이상 조합 (8~16자)만 입력할 수 있어요' })
      .max(16, {
        message: '영문/숫자/특수문자 2가지 이상 조합 (8~16자)만 입력할 수 있어요',
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/, {
        message: '영문/숫자/특수문자 2가지 이상 조합 (8~16자)만 입력할 수 있어요',
      }),
    confirmPassword: z.string().min(1, { message: '비밀번호를 다시 입력해주세요' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '변경할 비밀번호와 일치하지 않아요',
    path: ['confirmPassword'],
  });

type FormResetPasswordValues = z.infer<typeof resetPasswordSchema>;

interface AuthFindPasswordResetProps {
  token?: string;
  onCancel?: () => void;
}

const AuthFindPasswordReset = ({ token, onCancel }: AuthFindPasswordResetProps) => {
  const router = useRouter();
  const { role } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormResetPasswordValues>({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit: SubmitHandler<FormResetPasswordValues> = (data: FormResetPasswordValues) => {
    if (!token) return null;

    resetPasswordMutation.mutate(
      {
        data: {
          newPassword: data.password,
        },
        token,
      },
      {
        onSuccess: () => {
          showSuccessToast('비밀번호 변경 완료', '다시 로그인 해주세요.');
          router.push(`/${role}/auth`);
        },
        onError: err => {
          toast.error('서버 에러가 발생했습니다.', {
            description: '잠시 후 다시 시도해주세요.',
          });
        },
      }
    );
  };

  if (!token) return null;

  return (
    <div className="w-[95%] md:w-[40%] mx-auto">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">비밀번호 변경</h1>
        <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
          이전에 사용한 적이 없는 새 비밀번호로 변경해 주세요.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-8">
        <OrthoInput
          label="새 비밀번호"
          placeholder="8~16자리 영문/숫자/특수문자 조합"
          type={showPassword ? 'text' : 'password'}
          registration={register('password')}
          error={errors.password?.message}
          value={passwordValue}
          rightIcon={
            !showPassword ? <EyeOff size={24} color="#97A8C4" /> : <Eye size={24} color="#97A8C4" />
          }
          onRightIconClick={togglePasswordVisibility}
        />

        <OrthoInput
          label="새 비밀번호 재입력 "
          placeholder="변경할 새 비밀번호를 재입력해주세요"
          type={showConfirmPassword ? 'text' : 'password'}
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          value={confirmPasswordValue}
          rightIcon={
            !showConfirmPassword ? (
              <EyeOff size={24} color="#97A8C4" />
            ) : (
              <Eye size={24} color="#97A8C4" />
            )
          }
          onRightIconClick={toggleConfirmPasswordVisibility}
          apiResponse={isValid && passwordValue !== confirmPasswordValue}
          apiResponseMessage={
            isValid && passwordValue === confirmPasswordValue ? '변경할 비밀번호와 일치해요' : ''
          }
        />

        <div className="grid grid-cols-2 gap-5">
          <Button
            type="button"
            variant="secondary"
            size="cancle"
            className="cursor-pointer rounded-full"
            onClick={onCancel}
          >
            취소
          </Button>

          <Button
            type="submit"
            size="confirm"
            disabled={!isValid || resetPasswordMutation.isPending}
            className="cursor-pointer rounded-full"
          >
            {resetPasswordMutation.isPending ? <Spinner /> : '변경 완료'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthFindPasswordReset;
