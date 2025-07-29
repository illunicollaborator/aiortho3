import { useQuery } from '@tanstack/react-query';
import { getSearchNurses } from '@/api/admin/doctor';
import { GetSearchNursesRequest } from '@/api/admin/doctor/types';

export const useSearchNurses = (params: GetSearchNursesRequest) => {
  return useQuery({
    queryKey: ['searchNurses', params],
    queryFn: () => getSearchNurses(params),
  });
};
