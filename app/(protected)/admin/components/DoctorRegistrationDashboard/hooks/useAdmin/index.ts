import { getAdmin } from '@/apis/admin/root';
import { useQuery } from '@tanstack/react-query';

export const useAdmin = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: getAdmin,
  });
};
