import { Patient, PatientListSortKey, PrescriptionStatus } from '@/models';

export interface GetPatientRequest {
  patientId: number;
}

export interface GetPatientResponse extends Patient {}

export interface GetPatientListRequest {
  count: number;
  pageNumber: number;
  searchKey?: string;
  findMyPatient?: boolean;
  ascending?: boolean;
  sortBy?: PatientListSortKey;
}

export interface GetPatientListResponse {
  pageCount: number;
  patients: Patient[];
  totalCount: number;
}

export interface PostCreatePatientRequest {
  name: string;
  residentRegistrationNumber: string;
  hospitalPatientNum: string;
  guardianName: string;
  guardianPhoneNum: string;
}

export interface PostCreatePatientResponse extends Patient {}

export interface UpdatePatientRequest {
  patientId: number;
  params: {
    name: string;
    residentRegistrationNumber: string;
    hospitalPatientNum: string;
    guardianName: string;
    guardianPhoneNum: string;
    prescriptionStatus: PrescriptionStatus;
  };
}

export interface UpdatePatientResponse extends Patient {}

export interface DeletePatientRequest {
  patientId: number;
}

export interface DeletePatientResponse {}
