import { useMutation } from '@tanstack/react-query';
import { findPassword } from '@/apis/admin/common';
import { ErrorResponse } from '@/apis/types';
import { FindPasswordRequest, FindPasswordResponse } from '@/apis/admin/common/types';

export const useFindPassword = () => {
  return useMutation<FindPasswordResponse, ErrorResponse, FindPasswordRequest>({
    mutationFn: findPassword,
  });
};
