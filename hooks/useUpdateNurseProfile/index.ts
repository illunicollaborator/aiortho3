import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUpdateNurseProfile } from '@/apis/admin/nurse';
import { ErrorResponse } from '@/apis/types';
import {
  PostUpdateNurseProfileRequest,
  PostUpdateNurseProfileResponse,
} from '@/apis/admin/nurse/types';
import { NURSE_PROFILE_QUERY_KEY } from '@/constants/queryKey';

export const useUpdateNurseProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<PostUpdateNurseProfileResponse, ErrorResponse, PostUpdateNurseProfileRequest>({
    mutationFn: putUpdateNurseProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NURSE_PROFILE_QUERY_KEY });
    },
  });
};
