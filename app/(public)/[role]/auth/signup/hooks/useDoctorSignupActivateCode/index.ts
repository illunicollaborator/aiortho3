import { useMutation } from '@tanstack/react-query';
import { postDoctorSignUpActivateCode } from '@/api/admin/doctor';
import {
  PostDoctorSignUpActivateCodeRequest,
  PostDoctorSignUpActivateCodeResponse,
} from '@/api/admin/doctor/types';
import { ErrorResponse } from '@/api/types';

export const useDoctorSignupActivateCode = () => {
  return useMutation<
    PostDoctorSignUpActivateCodeResponse,
    ErrorResponse,
    PostDoctorSignUpActivateCodeRequest
  >({
    mutationFn: postDoctorSignUpActivateCode,
  });
};
