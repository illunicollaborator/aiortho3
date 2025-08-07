import { useMutation } from '@tanstack/react-query';
import { postDoctorSignUp } from '@/apis/admin/doctor';
import { PostDoctorSignUpRequest, PostDoctorSignUpResponse } from '@/apis/admin/doctor/types';
import { ErrorResponse } from '@/apis/types';

export const useDoctorSignUp = (token: string) => {
  return useMutation<PostDoctorSignUpResponse, ErrorResponse, PostDoctorSignUpRequest>({
    mutationFn: (data: PostDoctorSignUpRequest) => postDoctorSignUp(token, data),
  });
};
