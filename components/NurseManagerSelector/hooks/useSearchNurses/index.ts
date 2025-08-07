import { useQuery } from '@tanstack/react-query';
import { getSearchNurses } from '@/apis/admin/doctor';
import { GetSearchNursesRequest } from '@/apis/admin/doctor/types';

export const useSearchNurses = (params: GetSearchNursesRequest) => {
  return useQuery({
    queryKey: ['searchNurses', params],
    queryFn: () => getSearchNurses(params),
  });
};
