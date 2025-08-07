import { useMutation } from '@tanstack/react-query';
import { findIdVerify } from '@/apis/admin/common';
import { FindIdVerifyRequest, FindIdVerifyResponse } from '@/apis/admin/common/types';
import { ErrorResponse } from '@/apis/types';

export const useFindIdOtp = () => {
  return useMutation<FindIdVerifyResponse, ErrorResponse, FindIdVerifyRequest>({
    mutationFn: findIdVerify,
  });
};
