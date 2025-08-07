import { useMutation } from '@tanstack/react-query';
import { inviteSendCode } from '@/apis/admin/root';
import { InviteSendCodeRequest, InviteSendCodeResponse } from '@/apis/admin/root/type';
import { ErrorResponse } from '@/apis/types';

export const useInviteCodeSend = () => {
  return useMutation<InviteSendCodeResponse, ErrorResponse, InviteSendCodeRequest>({
    mutationFn: inviteSendCode,
  });
};
