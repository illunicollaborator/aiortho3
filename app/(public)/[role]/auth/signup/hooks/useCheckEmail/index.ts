import { useMutation } from '@tanstack/react-query';
import { checkEmail } from '@/apis/admin/common';
import { CheckEmailRequest, CheckEmailResponse } from '@/apis/admin/common/types';
import { ErrorResponse } from '@/apis/types';

export const useCheckEmail = () => {
  return useMutation<CheckEmailResponse, ErrorResponse, CheckEmailRequest>({
    mutationFn: checkEmail,
  });
};
