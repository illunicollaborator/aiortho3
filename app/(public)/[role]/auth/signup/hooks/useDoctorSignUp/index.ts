import { useMutation } from '@tanstack/react-query';
import { postDoctorSignUp } from '@/api/admin/doctor';
import { PostDoctorSignUpRequest, PostDoctorSignUpResponse } from '@/api/admin/doctor/types';
import { ErrorResponse } from '@/api/types';

export const useDoctorSignUp = (token: string) => {
  return useMutation<PostDoctorSignUpResponse, ErrorResponse, PostDoctorSignUpRequest>({
    mutationFn: (data: PostDoctorSignUpRequest) => postDoctorSignUp(token, data),
  });
};
