import { useMutation } from '@tanstack/react-query';
import { postPhoneVerifyCheck } from '@/apis/admin/common';
import { ErrorResponse } from '@/apis/types';
import {
  PostPhoneVerifyCheckRequest,
  PostPhoneVerifyCheckResponse,
} from '@/apis/admin/common/types';

export const usePhoneVerifyCheck = () => {
  return useMutation<PostPhoneVerifyCheckResponse, ErrorResponse, PostPhoneVerifyCheckRequest>({
    mutationFn: postPhoneVerifyCheck,
  });
};
