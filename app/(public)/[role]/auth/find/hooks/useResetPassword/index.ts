import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/apis/admin/common';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/apis/admin/common/types';
import { ErrorResponse } from '@/apis/types';

type ResetPasswordVariables = {
  data: ResetPasswordRequest;
  token: string;
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, ErrorResponse, ResetPasswordVariables>({
    mutationFn: ({ data, token }: ResetPasswordVariables) => resetPassword(data, token),
  });
};
