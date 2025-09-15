import { TableColumn } from './types';
import {
  loadColumnOrder as loadGenericColumnOrder,
  saveColumnOrder as saveGenericColumnOrder,
} from '@/lib/utils';

// 기본 컬럼 순서 정의
export const DEFAULT_COLUMNS: TableColumn[] = [
  {
    id: 'no',
    className: 'min-w-[124px]',
    label: 'No',
    sortKey: 'no',
  },
  {
    id: 'signupCode',
    className: 'min-w-[188px]',
    label: '코드 번호',
    sortKey: 'signupCode',
  },
  { id: 'name', className: 'min-w-[176px]', label: '의사명', sortKey: 'name' },
  { id: 'email', className: 'min-w-[328px]', label: '아이디(이메일)', sortKey: 'email' },
  {
    id: 'createdAt',
    className: 'min-w-[256px]',
    label: '가입일',
    sortKey: 'createdAt',
  },
];

const STORAGE_KEY = 'doctor-registration-table-column-order';

// localStorage에서 컬럼 순서 불러오기
export const loadColumnOrder = (): TableColumn[] => {
  return loadGenericColumnOrder(DEFAULT_COLUMNS, STORAGE_KEY);
};

// localStorage에 컬럼 순서 저장
export const saveColumnOrder = (columns: TableColumn[]): void => {
  saveGenericColumnOrder(columns, STORAGE_KEY);
};
