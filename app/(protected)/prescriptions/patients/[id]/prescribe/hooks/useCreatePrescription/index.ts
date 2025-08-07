import { useMutation } from '@tanstack/react-query';
import { postCreatePrescription } from '@/apis/prescription';
import {
  PostCreatePrescriptionRequest,
  PostCreatePrescriptionResponse,
} from '@/apis/prescription/types';
import { ErrorResponse } from '@/apis/types';

export const useCreatePrescription = () => {
  return useMutation<PostCreatePrescriptionResponse, ErrorResponse, PostCreatePrescriptionRequest>({
    mutationFn: postCreatePrescription,
  });
};
