import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreatePrescription } from '@/apis/prescription';
import {
  PostCreatePrescriptionRequest,
  PostCreatePrescriptionResponse,
} from '@/apis/prescription/types';
import { ErrorResponse } from '@/apis/types';

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation<PostCreatePrescriptionResponse, ErrorResponse, PostCreatePrescriptionRequest>({
    mutationFn: postCreatePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({
        queryKey: ['activePrescription'],
      });
    },
  });
};
