import { useMutation } from '@tanstack/react-query';
import { findPasswordVerify } from '@/apis/admin/common';
import { ErrorResponse } from '@/apis/types';
import { FindPasswordVerifyRequest, FindPasswordVerifyResponse } from '@/apis/admin/common/types';

export const useFindPasswordOtp = () => {
  return useMutation<FindPasswordVerifyResponse, ErrorResponse, FindPasswordVerifyRequest>({
    mutationFn: findPasswordVerify,
  });
};
