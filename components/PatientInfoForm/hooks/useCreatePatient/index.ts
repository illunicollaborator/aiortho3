import { useMutation } from '@tanstack/react-query';
import { postPatientCreate } from '@/apis/patients';
import { PostCreatePatientRequest, PostCreatePatientResponse } from '@/apis/patients/types';
import { ErrorResponse } from '@/apis/types';

export const useCreatePatient = () => {
  return useMutation<PostCreatePatientResponse, ErrorResponse, PostCreatePatientRequest>({
    mutationKey: ['createPatient'],
    mutationFn: params => postPatientCreate(params),
  });
};
