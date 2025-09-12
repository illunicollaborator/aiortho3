import { useQuery } from '@tanstack/react-query';
import { getActivePrescription } from '@/apis/prescription';
import { ACTIVE_PRESCRIPTION_QUERY_KEY } from '@/constants/queryKey';

export const useActivePrescription = (patientId: number) => {
  return useQuery({
    queryKey: ACTIVE_PRESCRIPTION_QUERY_KEY(patientId),
    queryFn: () => getActivePrescription({ patientId }),
  });
};
