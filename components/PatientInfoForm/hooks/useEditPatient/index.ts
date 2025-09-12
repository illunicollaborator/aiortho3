import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePatient } from '@/apis/patients';
import { UpdatePatientRequest, UpdatePatientResponse } from '@/apis/patients/types';
import { ErrorResponse } from '@/apis/types';
import { PATIENT_QUERY_KEY } from '@/constants/queryKey';

export const useEditPatient = (patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation<UpdatePatientResponse, ErrorResponse, UpdatePatientRequest['params']>({
    mutationKey: ['editPatient', patientId],
    mutationFn: params => updatePatient({ patientId, params }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEY(patientId) });
    },
  });
};
