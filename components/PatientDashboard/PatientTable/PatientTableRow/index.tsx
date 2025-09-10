'use client';

import React from 'react';
import { StatusBadge } from '@/components/Badge';
import { Patient, PrescriptionStatus } from '@/models';
import { formatPeriod, formatISODate } from '@/lib/utils';
import { TableColumn } from '../types';
import { cn } from '@/lib/utils';
interface PatientTableRowProps {
  patient: Patient;
  columnOrder: TableColumn[];
  onClick?: () => void;
}

const PatientTableRow = ({ patient, columnOrder, onClick }: PatientTableRowProps) => {
  // 컬럼 데이터 렌더링 함수
  const renderCellContent = (columnKey: string) => {
    if (columnKey === '병원 환자 번호') {
      return patient.hospitalPatientNum;
    }

    if (columnKey === '환자명') {
      return patient.name;
    }

    if (columnKey === '생년월일') {
      return patient.birth;
    }

    if (columnKey === 'S/A') {
      return `${patient.gender}/${patient.age}`;
    }

    if (columnKey === '담당 의사') {
      return patient.doctorName ?? '-';
    }

    if (columnKey === '치료 처방 기간') {
      if (patient.prescription?.startDate && patient.prescription?.endDate) {
        return formatPeriod(patient.prescription.startDate, patient.prescription.endDate);
      }
    }

    if (columnKey === '환자 등록일') {
      return formatISODate(patient.createdAt, true);
    }

    if (columnKey === '최종 처방일') {
      if (patient.updatedAt) {
        return formatISODate(patient.updatedAt, true);
      }
    }

    if (columnKey === '처방 상태') {
      return <StatusBadge status={patient.prescriptionStatus ?? PrescriptionStatus.Not_Created} />;
    }

    return '-';
  };

  return (
    <div
      className="flex items-center w-full px-3 min-h-[68px] text-sm text-zinc-900 cursor-pointer hover:bg-gray-50 transition-colors border-b-[0.4px] border-aiortho-gray-100"
      onClick={onClick}
    >
      {columnOrder.map(column => (
        <div
          key={column.id}
          className={cn(
            'flex items-center px-3 py-[25.5px] self-stretch min-h-[68px] flex-1',
            column.label === '처방 상태'
              ? 'font-bold leading-none text-center whitespace-nowrap'
              : 'whitespace-nowrap',
            column.className
          )}
        >
          <div className="text-aiortho-gray-900 truncate text-ellipsis">
            {renderCellContent(column.label)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientTableRow;
