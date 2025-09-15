import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { TableColumn } from '../types';
import { cn } from '@/lib/utils';

interface DoctorRegistrationTableHeaderCellProps {
  column: TableColumn;
  sortBy: boolean;
  sortDirection: 'asc' | 'desc' | null;
  onColumnSortChange: (newSortBy: TableColumn['sortKey'], columnId: TableColumn['id']) => void;
}

export default function DoctorRegistrationTableHeaderCell({
  column,
  sortBy,
  sortDirection,
  onColumnSortChange,
}: DoctorRegistrationTableHeaderCellProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center px-3 py-3 min-h-12 cursor-grab flex-1 active:cursor-grabbing',
        column.className,
        isDragging && 'z-50 opacity-50'
      )}
      {...attributes}
      {...listeners}
    >
      <h2 className="text-sm font-bold text-aiortho-gray-900 select-none shrink-0">
        {column.label}
      </h2>

      <div
        className="ml-2 shrink-0 cursor-pointer flex flex-col gap-0"
        onClick={() => onColumnSortChange(column.sortKey, column.id)}
      >
        <FaSortUp
          className={cn(
            'w-5 h-4 text-aiortho-gray-200 -mb-1.5',
            sortBy && sortDirection === 'asc' && 'text-[var(--aiortho-primary)]'
          )}
        />
        <FaSortDown
          className={cn(
            'w-5 h-4 text-aiortho-gray-200 -mt-1.5',
            sortBy && sortDirection === 'desc' && 'text-[var(--aiortho-primary)]'
          )}
        />
      </div>

      {/* 드래그 중임을 나타내는 시각적 피드백 */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-100 border-2 border-blue-300 rounded opacity-30" />
      )}
    </div>
  );
}
