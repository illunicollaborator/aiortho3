import { Doctor, Nurse } from '@/models';

export interface PostDoctorSignUpActivateCodeRequest {
  code: string;
}

export interface PostDoctorSignUpActivateCodeResponse {
  signupToken: string;
}

export interface GetDoctorProfileRequest {}

export interface GetDoctorProfileResponse extends Doctor {}

export interface PostDoctorMedicalLicenseCheckRequest {
  licenseNumber: string;
}

export interface PostDoctorMedicalLicenseCheckResponse {}

export interface GetSearchNursesRequest {
  page: number;
  limit: number;
  keyword: string;
}

export interface GetSearchNursesResponse {
  counts: number;
  nurses: Nurse[];
}
