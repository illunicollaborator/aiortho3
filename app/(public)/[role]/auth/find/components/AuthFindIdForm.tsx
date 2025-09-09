import OrthoInput from '@/components/OrthoInput';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFindId } from '../hooks/useFindId';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumberSchema } from '@/lib/utils';
import { toast } from 'sonner';
import { AuthFindIdFormValues } from '../types';

const findIdSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: phoneNumberSchema,
});

type FormIdValues = z.infer<typeof findIdSchema>;

interface AuthFindIdFormProps {
  onSubmit?: (data: AuthFindIdFormValues) => void;
}

export default function AuthFindIdForm({ onSubmit }: AuthFindIdFormProps) {
  const postFindIdMutation = useFindId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormIdValues>({
    resolver: zodResolver(findIdSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  const onSubmitId: SubmitHandler<FormIdValues> = data => {
    postFindIdMutation.mutate(data, {
      onSuccess: () => {
        onSubmit && onSubmit(data);
      },
      onError: err => {
        if (err.statusSubCode === 4002 || err.statusSubCode === 4028) {
          setError('phoneNumber', {
            message: '입력한 정보가 맞는지 다시 한 번 확인해주세요',
          });

          return;
        }

        toast.error('서버 에러가 발생했습니다', {
          description: '잠시 후 다시 시도해주세요',
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitId)} className="space-y-10 mt-9">
      <OrthoInput
        label="이름"
        placeholder="이름을 입력해주세요"
        registration={register('name')}
        error={errors.name?.message}
        hideErrorBorder
      />

      <OrthoInput
        label="휴대폰 번호"
        maxLength={11}
        placeholder="휴대폰 번호를 입력해주세요"
        registration={register('phoneNumber')}
        error={errors.phoneNumber?.message}
        numericOnly
        hideErrorBorder
      />

      <Button
        type="submit"
        className="w-full py-5 mt-4 rounded-full cursor-pointer h-12 text-white"
        disabled={postFindIdMutation.isPending}
      >
        {postFindIdMutation.isPending ? <Spinner /> : '다음'}
      </Button>
    </form>
  );
}
