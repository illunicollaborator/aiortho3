import { useQuery } from '@tanstack/react-query';
import { getPatient } from '@/apis/patients';
import { PATIENT_QUERY_KEY } from '@/constants/queryKey';

export const usePatient = (patientId: number) => {
  return useQuery({
    queryKey: PATIENT_QUERY_KEY(patientId),
    queryFn: () => getPatient({ patientId }),
    enabled: !!patientId,
  });
};
