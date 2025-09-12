import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/apis/patientActivities';
import { GetPatientActivitiesResponse } from '@/apis/patientActivities/types';

interface UseActivitiesProps {
  patientId: number;
  date: string;
}

export const useActivities = ({ patientId, date }: UseActivitiesProps) => {
  return useQuery<GetPatientActivitiesResponse>({
    queryKey: ['activities', patientId, date],
    queryFn: () => getActivities({ patientId, date }),
    enabled: Boolean(patientId) && Boolean(date),
  });
};
