'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Eye, EyeOff, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useNurseProfile, useDoctorProfile } from '@/hooks';
import { isDoctorRole } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { useDeleteAccount } from './hooks/useDeleteAccount';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { removeStorage } from '@/lib/storage';
import { REFRESH_KEY, TOKEN_KEY } from '@/constants/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(1, {
      message: '비밀번호를 입력해주세요',
    })
    .min(8, {
      message: '비밀번호가 일치하지 않아요',
    })
    .max(16, {
      message: '비밀번호가 일치하지 않아요',
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/, {
      message: '비밀번호가 일치하지 않아요',
    }),
  // .min(8, {
  //   message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
  // })
  // .max(16, {
  //   message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
  // })
  // .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s])/, {
  //   message: '8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요',
  // }),
});

type FormValues = z.infer<typeof schema>;

export default function ProfileDeletePage() {
  const { auth } = useAuthStore();
  if (!auth) return null;

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isDoctor = isDoctorRole(auth.role);
  const doctorProfileQuery = useDoctorProfile({ enabled: isDoctor });
  const nurseProfileQuery = useNurseProfile({ enabled: !isDoctor });

  const profileQuery = isDoctor ? doctorProfileQuery : nurseProfileQuery;
  const { data: profile } = profileQuery;
  const { mutate: postDeleteAccount, isPending } = useDeleteAccount();

  const { name, email } = profile ?? {};

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email,
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    postDeleteAccount(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          showSuccessToast('회원탈퇴 완료', '회원탈퇴가 완료되었습니다.');
          removeStorage('local', TOKEN_KEY);
          removeStorage('local', REFRESH_KEY);
          removeStorage('session', TOKEN_KEY);
          removeStorage('session', REFRESH_KEY);
          router.replace('/');
        },
        onError: error => {
          if (error.statusSubCode === 4028) {
            setError('password', { message: '비밀번호가 일치하지 않습니다' });
          } else {
            toast.error('잠시 후 시도해주세요.');
          }
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (profile) {
      setValue('email', profile.email);
    }
  }, [profile]);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">회원정보 확인</h1>
      <h2 className=" text-[var(--aiortho-gray-600)] mb-13">
        {name}님이 서비스를 떠나신다니 아쉬워요!
      </h2>

      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        className="flex flex-col gap-6"
      >
        <OrthoInput
          label="아이디 (이메일)"
          registration={register('email')}
          error={errors.email?.message}
          readOnly
        />

        <OrthoInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type={showPassword ? 'text' : 'password'}
          registration={register('password')}
          error={errors.password?.message}
          rightIcon={
            !showPassword ? (
              <EyeOff size={24} className="text-[var(--aiortho-gray-400)]" />
            ) : (
              <Eye size={24} className="text-[var(--aiortho-gray-400)]" />
            )
          }
          onRightIconClick={togglePasswordVisibility}
          required
        />

        <div className="flex gap-5 mt-4">
          <Button
            type="button"
            className="flex-1 rounded-full h-12 cursor-pointer"
            variant="secondary"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            type="button"
            className="flex-1 rounded-full h-12 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            확인
          </Button>
        </div>

        <Dialog open={isOpen}>
          <DialogContent className="flex flex-col justify-between h-60 pt-12 px-8 pb-7 rounded-3xl">
            <DialogHeader className="flex flex-col gap-5">
              <DialogTitle className="font-bold text-2xl text-aiortho-gray-900 m-0">
                정말 회원 탈퇴하시겠어요?
              </DialogTitle>
              <DialogDescription className="text-[var(--aiortho-gray-600)] m-0">
                회원 탈퇴 시, 계정은 영구 삭제되며 다시 복구할 수 없어요.
              </DialogDescription>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute z-0 rounded-[29px] flex min-h-6 min-w-6 items-center justify-center right-3 top-3 cursor-pointer"
              >
                <X className="w-5 h-5 text-[#66798D]" />
              </button>
            </DialogHeader>
            <DialogFooter className="flex gap-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer flex-1 h-12 font-bold m-0 rounded-full text-aiortho-gray-800 bg-[#ECEFF4]"
                  onClick={() => setIsOpen(false)}
                >
                  취소
                </Button>
              </DialogClose>

              <Button
                type="button"
                className="cursor-pointer flex-1 h-12 font-bold rounded-full"
                disabled={isPending}
                onClick={() => handleSubmit(onSubmit)()}
              >
                네, 탈퇴할게요
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}
