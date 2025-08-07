import { useMutation } from '@tanstack/react-query';
import { deletePatient } from '@/apis/patients';
import { DeletePatientRequest, DeletePatientResponse } from '@/apis/patients/types';
import { ErrorResponse } from '@/apis/types';

export const useDeletePatient = () => {
  return useMutation<DeletePatientResponse, ErrorResponse, DeletePatientRequest>({
    mutationFn: deletePatient,
  });
};
