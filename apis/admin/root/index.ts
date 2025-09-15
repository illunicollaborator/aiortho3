import apiClient from '@/lib/axios';
import {
  GetAdminRequest,
  GetAdminResponse,
  GetAdminsRequest,
  GetAdminsResponse,
  InviteSendCodeRequest,
  InviteSendCodeResponse,
} from './type';

const RESOURCE = '/ums/root';

export const inviteSendCode = async (
  data: InviteSendCodeRequest
): Promise<InviteSendCodeResponse> => await apiClient.post(`${RESOURCE}/invite/send`, data);

export const getAdmin = async (): Promise<GetAdminResponse> => await apiClient.get(`${RESOURCE}`);

export const getAdmins = async (params: GetAdminsRequest): Promise<GetAdminsResponse> =>
  await apiClient.get(`${RESOURCE}/admins`, { params });
