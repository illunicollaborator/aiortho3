import { Exercise, Prescription } from '@/models';

export interface GetActivePrescriptionRequest {
  patientId: number;
}

export interface GetActivePrescriptionResponse extends Prescription {}

export interface GetPrescriptionHistoryRequest {
  page: number;
  count?: number;
}

export interface GetPrescriptionHistoryResponse {
  pageCount: number;
  prescriptions: Prescription[];
  totalCount: number;
}

export interface PostCreatePrescriptionRequest {
  exercises: Exercise[];
  repeatCount: number;
  startDate: string;
  endDate: string;
  patientId: number;
  name: string;
}

export interface PostCreatePrescriptionResponse extends Prescription {}
