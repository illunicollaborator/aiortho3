import { useMutation } from '@tanstack/react-query';
import { postDeleteAccount } from '@/apis/admin/common';
import { PostDeleteAccountRequest, PostDeleteAccountResponse } from '@/apis/admin/common/types';
import { ErrorResponse } from '@/apis/types';

export const useDeleteAccount = () => {
  return useMutation<PostDeleteAccountResponse, ErrorResponse, PostDeleteAccountRequest>({
    mutationFn: postDeleteAccount,
  });
};
