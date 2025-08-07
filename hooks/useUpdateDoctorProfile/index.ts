import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putDoctorProfile } from '@/apis/admin/doctor';
import { PutDoctorProfileRequest, PutDoctorProfileResponse } from '@/apis/admin/doctor/types';
import { DOCTOR_PROFILE_QUERY_KEY } from '@/constants/queryKey';
import { ErrorResponse } from '@/apis/types';

export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<PutDoctorProfileResponse, ErrorResponse, PutDoctorProfileRequest>({
    mutationFn: putDoctorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCTOR_PROFILE_QUERY_KEY] });
    },
  });
};
