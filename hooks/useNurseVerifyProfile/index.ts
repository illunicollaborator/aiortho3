import { useMutation } from '@tanstack/react-query';
import { postNurseProfileVerify } from '@/apis/admin/nurse';
import {
  PostNurseProfileVerifyRequest,
  PostNurseProfileVerifyResponse,
} from '@/apis/admin/nurse/types';
import { ErrorResponse } from '@/apis/types';

export const useNurseVerifyProfile = () => {
  return useMutation<PostNurseProfileVerifyResponse, ErrorResponse, PostNurseProfileVerifyRequest>({
    mutationFn: postNurseProfileVerify,
  });
};
