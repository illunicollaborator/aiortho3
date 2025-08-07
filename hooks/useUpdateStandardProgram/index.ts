import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStandardProgram } from '@/apis/standardProgram';
import {
  UpdateStandardProgramRequest,
  UpdateStandardProgramResponse,
} from '@/apis/standardProgram/types';
import { ErrorResponse } from '@/apis/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useUpdateStandardProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateStandardProgramResponse, ErrorResponse, UpdateStandardProgramRequest>({
    mutationFn: updateStandardProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STANDARD_PROGRAM_QUERY_KEY] });
    },
  });
};
