import DoctorRegistrationTableHeader from '../DoctorRegistrationTableHeader';
import { TableColumn } from '../types';
import { Admin } from '@/models';
import DoctorRegistrationTableRow from '../DoctorRegistrationTableRow';

interface DoctorRegistrationTableProps {
  columns: TableColumn[];
  sortBy: TableColumn['id'];
  sortDirection: 'asc' | 'desc' | null;
  onColumnOrderChange: (newColumns: TableColumn[]) => void;
  onColumnSortChange: (newSortBy: TableColumn['id']) => void;
  admins: Admin[];
}

export default function DoctorRegistrationTable({
  columns,
  sortBy,
  sortDirection,
  onColumnOrderChange,
  onColumnSortChange,
  admins,
}: DoctorRegistrationTableProps) {
  return (
    <div className="w-full overflow-x-hidden mt-7">
      {/* 드래그 가능한 헤더 */}
      <DoctorRegistrationTableHeader
        columns={columns}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onColumnSortChange={onColumnSortChange}
        onColumnOrderChange={onColumnOrderChange}
      />

      {/* 테이블 본문 */}
      <div className="w-full">
        <DoctorRegistrationTableRow admin={admins[0]} columnOrder={columns} />

        {admins.slice(1).map((admin, index) => (
          <DoctorRegistrationTableRow
            key={`${admin.adminId}-${index}`}
            admin={admin}
            columnOrder={columns}
          />
        ))}
      </div>
    </div>
  );
}
