import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useInviteCodeSend } from '../../hooks';
import { showSuccessToast } from '@/components/ui/toast-notification';

const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, '올바른 휴대폰 번호 형식이 아니에요')
    .max(11, '올바른 휴대폰 번호 형식이 아니에요')
    .regex(/^01[0-9]{8,9}$/, '올바른 휴대폰 번호 형식이 아니에요'),
});

type FormValues = z.infer<typeof phoneNumberSchema>;

interface IssueCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IssueCodeModal({ isOpen, onClose }: IssueCodeModalProps) {
  const { mutate: inviteSendCode, isPending } = useInviteCodeSend();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(phoneNumberSchema),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    inviteSendCode(
      { phoneNumber: data.phoneNumber },
      {
        onSuccess: () => {
          handleClose();
          showSuccessToast(
            '가입 코드가 전송 완료',
            `${data.phoneNumber}로 가입 코드가 전송되었습니다.`
          );
        },
        onError: error => {
          if (error.statusSubCode === 4003) {
            setError('phoneNumber', {
              message: '이미 가입된 휴대폰 번호예요',
            });

            return;
          }

          if (error.statusSubCode === 4017) {
            setError('phoneNumber', {
              message: '인증 시도 횟수를 초과했습니다',
            });

            return;
          }

          setError('phoneNumber', {
            message: '잠시 후 다시 시도해주세요',
          });
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/40" />
      <DialogContent className="p-0 border-none rounded-[24px] max-w-[604px] overflow-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200">
        <div className="rounded-t-[24px] bg-white relative min-h-[116px] w-full px-8 pt-12 pb-0">
          <div className="w-full font-pretandard">
            <h2 className="text-[#161621] text-2xl font-bold leading-[1.4]">
              휴대폰 번호를 입력해주세요
            </h2>
            <p className="text-[#66798D] text-base font-normal mt-5">
              입력된 휴대폰 번호로 가입 코드가 전송됩니다.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute z-0 rounded-[29px] flex min-h-6 min-w-6 p-1 items-center justify-center right-3 top-3"
          >
            <X className="w-5 h-5 text-[#66798D]" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full px-8 font-pretandard font-normal md:mt-10">
            <div className="w-full">
              <label className="text-[#8395AC] text-sm">휴대폰 번호</label>
              <div className="mt-3 w-full">
                <input
                  type="text"
                  placeholder="휴대폰 번호를 입력해주세요"
                  {...register('phoneNumber')}
                  className="w-full rounded-[12px] border border-[#DADFE9] min-h-[48px] px-4 py-[15px] text-base focus:border-[#0054A6] focus:outline-none placeholder:text-[#97A8C4]"
                />
                {errors.phoneNumber && (
                  <div className="text-[#FF0D4E] text-sm mt-2">{errors.phoneNumber.message}</div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-b-[24px] bg-white flex mt-[60px] w-full px-8 pt-14 pb-7 gap-3">
            <Button
              type="button"
              onClick={handleClose}
              className="cursor-pointer flex-1 rounded-full min-h-[48px] px-6 py-3 text-sm font-bold text-[#465463] bg-[#DADFE9] hover:bg-[#DADFE9]/80"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isPending}
              className={`cursor-pointer flex-1 rounded-full min-h-[48px] px-6 py-3 text-sm font-bold text-white ${
                isValid ? 'bg-[#0054A6] hover:bg-[#0054A6]/90' : 'bg-[#BDD5FF] hover:bg-[#BDD5FF]'
              }`}
            >
              {isPending ? '전송 중...' : '전송하기'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
