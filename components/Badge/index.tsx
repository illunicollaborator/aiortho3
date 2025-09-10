import * as React from 'react';
import { PrescriptionStatus, PrescriptionStatusLabel } from '@/models';

interface StatusBadgeProps {
  status: PrescriptionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorClasses: Record<PrescriptionStatus, { text: string; bg: string; dot: string }> = {
    [PrescriptionStatus.Pending]: {
      text: 'text-[#0CA147]',
      bg: 'bg-[#E3FAE6]',
      dot: 'bg-[#0CA147]',
    },
    [PrescriptionStatus.Not_Created]: {
      text: 'text-[#007DEB]',
      bg: 'bg-[#D8EDFF]',
      dot: 'bg-[#007DEB]',
    },
    [PrescriptionStatus.Prescripted]: {
      text: 'text-[#66798D]',
      bg: 'bg-[#E1E5ED]',
      dot: 'bg-[#66798D]',
    },
  };

  const { text, bg, dot } = colorClasses[status];

  return (
    <div className={`flex gap-1 justify-center items-center px-3 py-1 rounded-2xl ${bg} min-h-7`}>
      <span className={`flex shrink-0 w-2 h-2 ${dot} rounded-full`} aria-hidden="true" />
      <span className={`font-bold ${text}`}>{PrescriptionStatusLabel[status]}</span>
    </div>
  );
}
