import { Admin, Doctor } from '@/models';

export interface InviteSendCodeRequest {
  phoneNumber: string;
}

export interface InviteSendCodeResponse {}

export interface GetAdminRequest {}

export interface GetAdminResponse extends Doctor {}

export interface GetAdminsRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  ascending?: boolean;
  keyword?: string;
}

export interface GetAdminsResponse {
  adminListItems: Admin[];
  adminCounts: number;
}
