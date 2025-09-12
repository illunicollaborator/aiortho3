import { PutPrescriptionRequest, PutPrescriptionResponse } from '@/apis/prescription/types';
import { ErrorResponse } from '@/apis/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putPrescription } from '@/apis/prescription';

interface UseUpdatePrescriptionProps {
  prescriptionId: string;
  params: PutPrescriptionRequest;
}

export const useUpdatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation<PutPrescriptionResponse, ErrorResponse, UseUpdatePrescriptionProps>({
    mutationFn: ({ prescriptionId, params }) => putPrescription(prescriptionId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({
        queryKey: ['activePrescription'],
      });
    },
  });
};
