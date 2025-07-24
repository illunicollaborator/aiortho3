import { Doctor } from '@/models';

export interface PostDoctorSignUpActivateCodeRequest {
  code: string;
}

export interface PostDoctorSignUpActivateCodeResponse {
  signupToken: string;
}

export interface GetDoctorProfileRequest {}

export interface GetDoctorProfileResponse extends Doctor {}
