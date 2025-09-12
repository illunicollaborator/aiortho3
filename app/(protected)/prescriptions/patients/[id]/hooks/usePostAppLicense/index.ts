import { PostAppLicenseRequest, PostAppLicenseResponse } from '@/apis/appLicense/types';
import { postAppLicense } from '@/apis/appLicense';
import { ErrorResponse } from '@/apis/types';
import { useMutation } from '@tanstack/react-query';

export const usePostAppLicense = () => {
  return useMutation<PostAppLicenseResponse, ErrorResponse, PostAppLicenseRequest>({
    mutationFn: postAppLicense,
  });
};
