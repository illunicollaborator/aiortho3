import { useMutation } from '@tanstack/react-query';
import { postPhoneVerifySend } from '@/apis/admin/common';
import { ErrorResponse } from '@/apis/types';
import { PostPhoneVerifySendRequest, PostPhoneVerifySendResponse } from '@/apis/admin/common/types';

export const usePhoneVerifySend = () => {
  return useMutation<PostPhoneVerifySendResponse, ErrorResponse, PostPhoneVerifySendRequest>({
    mutationFn: postPhoneVerifySend,
  });
};
