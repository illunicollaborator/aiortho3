import { useQuery } from '@tanstack/react-query';
import { getActivePrescription } from '@/apis/prescription';
import { ACTIVE_PRESCRIPTION_QUERY_KEY } from '@/constants/queryKey';
import { ErrorResponse } from '@/apis/types';
import { GetActivePrescriptionResponse } from '@/apis/prescription/types';

export const useActivePrescription = (patientId: number) => {
  return useQuery<GetActivePrescriptionResponse, ErrorResponse>({
    queryKey: ACTIVE_PRESCRIPTION_QUERY_KEY(patientId),
    queryFn: () => getActivePrescription({ patientId }),
  });
};
