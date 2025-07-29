import { useMutation } from '@tanstack/react-query';
import { postPhoneVerifyCheck } from '@/api/admin/common';
import { ErrorResponse } from '@/api/types';
import {
  PostPhoneVerifyCheckRequest,
  PostPhoneVerifyCheckResponse,
} from '@/api/admin/common/types';

const usePhoneVerifyCheck = () => {
  return useMutation<PostPhoneVerifyCheckResponse, ErrorResponse, PostPhoneVerifyCheckRequest>({
    mutationFn: postPhoneVerifyCheck,
  });
};

export default usePhoneVerifyCheck;
