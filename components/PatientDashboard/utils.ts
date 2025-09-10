import { TableColumn } from './PatientTable/types';
import {
  loadColumnOrder as loadGenericColumnOrder,
  saveColumnOrder as saveGenericColumnOrder,
} from '@/lib/utils';

// 기본 컬럼 순서 정의
export const DEFAULT_COLUMNS: TableColumn[] = [
  {
    id: 'residentRegistrationNumber',
    className: 'min-w-[144px]',
    label: '병원 환자 번호',
    sortKey: 'createdAt',
  },
  { id: 'name', className: 'min-w-[88px]', label: '환자명', sortKey: 'name' },
  { id: 'birth', className: 'min-w-[92px]', label: '생년월일', sortKey: 'age' },
  { id: 'gender', className: 'min-w-[80px]', label: 'S/A', sortKey: 'age' },
  { id: 'doctorName', className: 'min-w-[84px]', label: '담당 의사', sortKey: 'doctorName' },
  {
    id: 'patientId',
    className: 'min-w-[200px]',
    label: '치료 처방 기간',
    sortKey: '_prescriptionstartDate',
  },
  { id: 'createdAt', className: 'min-w-[140px]', label: '환자 등록일', sortKey: 'createdAt' },
  {
    id: 'updatedAt',
    className: 'min-w-[140px]',
    label: '최종 처방일',
    sortKey: '_prescriptionupdatedAt',
  },
  {
    id: 'prescriptionStatus',
    className: 'min-w-[104px]',
    label: '처방 상태',
    sortKey: 'prescriptionStatus',
  },
];

const STORAGE_KEY = 'patient-table-column-order';

// localStorage에서 컬럼 순서 불러오기
export const loadColumnOrder = (): TableColumn[] => {
  return loadGenericColumnOrder(DEFAULT_COLUMNS, STORAGE_KEY);
};

// localStorage에 컬럼 순서 저장
export const saveColumnOrder = (columns: TableColumn[]): void => {
  saveGenericColumnOrder(columns, STORAGE_KEY);
};
