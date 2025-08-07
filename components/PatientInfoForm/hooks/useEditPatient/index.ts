import { useMutation } from '@tanstack/react-query';
import { updatePatient } from '@/apis/patients';
import { UpdatePatientRequest, UpdatePatientResponse } from '@/apis/patients/types';
import { ErrorResponse } from '@/apis/types';

export const useEditPatient = (patientId: string) => {
  return useMutation<UpdatePatientResponse, ErrorResponse, UpdatePatientRequest['params']>({
    mutationKey: ['editPatient', patientId],
    mutationFn: params => updatePatient({ patientId, params }),
  });
};
