'use client';

import React, { useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useLogin } from './hooks/useLogin';
import Spinner from '@/components/Spinner';
import { AutoLoginCheckIcon } from '@/components/Icon';

// Define schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: '올바르지 않은 아이디 (이메일) 형식이에요.' }),
  password: z
    .string()
    .min(8, { message: '영문/숫자/특수문자 2가지 이상 조합 (8~16자)만 입력할 수 있어요' })
    .max(16, {
      message: '영문/숫자/특수문자 2가지 이상 조합 (8~16자)만 입력할 수 있어요',
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+={\[}\]:;"'<,>.?/~])/, {
      message: '영문/숫자/특수문자 2가지 이상 조합 (8~16자)만 입력할 수 있어요',
    }),
});

type FormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { role } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const loginMutation = useLogin(isChecked);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push('/home');
      },
      onError: err => {
        setError('email', {
          type: 'manual',
          message: ' ', // empty string, error ui
        });

        if (err.statusSubCode === 4000) {
          setError('password', {
            type: 'manual',
            message: '아이디(이메일) 혹은 비밀번호가 올바르지 않아요',
          });
        } else {
          setError('password', {
            type: 'manual',
            message: '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          });
        }
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    router.push(`/${role}/auth/signup`);
  };

  return (
    <div className=" flex flex-col items-center pt-10 bg-white w-full h-full justify-center px-4 md:px-7">
      <div className="w-full max-w-[540px] mx-auto">
        <div className="space-y-4">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">
            {role === 'doctor' ? '의사' : '간호사'} 로그인
          </h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            서비스 사용을 위해 로그인 해주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-8">
          <OrthoInput
            label="아이디(이메일)"
            placeholder="아이디를 입력해주세요"
            registration={register('email')}
            error={errors.email?.message}
          />

          <OrthoInput
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            registration={register('password')}
            error={errors.password?.message}
            rightIcon={
              !showPassword ? (
                <EyeOff size={20} color="#97A8C4" />
              ) : (
                <Eye size={20} color="#97A8C4" />
              )
            }
            onRightIconClick={togglePasswordVisibility}
          />

          <div className="flex justify-between items-center w-full ">
            <div className="flex items-center gap-2">
              <AutoLoginCheckIcon isChecked={isChecked} onClick={() => setIsChecked(!isChecked)} />
              <p
                className="font-medium text-sm text-[color:var(--aiortho-gray-700))] cursor-pointer"
                onClick={() => setIsChecked(!isChecked)}
              >
                자동 로그인
              </p>
            </div>
            <p
              onClick={() => router.push(`${pathname}/find`)}
              className="cursor-pointer text-[color:var(--aiortho-primary)] font-nomral text-[13px]"
            >
              아이디 · 비밀번호 찾기 &nbsp;{'>'}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full text-white py-5 rounded-full h-12 cursor-pointer"
            disabled={!isValid || loginMutation.isPending}
          >
            {loginMutation.isPending ? <Spinner /> : '로그인'}
          </Button>
        </form>
        <p
          onClick={handleSignUpClick}
          className="font-medium text-center text-sm text-[color:var(--aiortho-gray-800)] my-4 underline cursor-pointer"
        >
          회원가입
        </p>
      </div>
    </div>
  );
}
