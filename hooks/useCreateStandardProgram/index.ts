import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateStandardProgram } from '@/apis/standardProgram';
import {
  PostCreateStandardProgramRequest,
  PostCreateStandardProgramResponse,
} from '@/apis/standardProgram/types';
import { ErrorResponse } from '@/apis/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useCreateStandardProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PostCreateStandardProgramResponse,
    ErrorResponse,
    PostCreateStandardProgramRequest
  >({
    mutationFn: postCreateStandardProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STANDARD_PROGRAM_QUERY_KEY] });
    },
  });
};
