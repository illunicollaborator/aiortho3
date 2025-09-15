import { Admin } from '@/models';
import { TableColumn } from '../types';
import { cn, formatISODate } from '@/lib/utils';

interface DoctorRegistrationTableRowProps {
  admin: Admin;
  columnOrder: TableColumn[];
}

export default function DoctorRegistrationTableRow({
  admin,
  columnOrder,
}: DoctorRegistrationTableRowProps) {
  const isRoot = admin.role === 'Root';

  const renderCellContent = (columnKey: string) => {
    if (columnKey === 'No') {
      return isRoot ? '최고관리자' : admin.no;
    }

    if (columnKey === '코드 번호') {
      return admin.signupCode;
    }

    if (columnKey === '의사명') {
      return admin.name;
    }

    if (columnKey === '아이디(이메일)') {
      return admin.email;
    }

    if (columnKey === '가입일') {
      return formatISODate(admin.createdAt, true);
    }

    return '-';
  };

  return (
    <div className="flex items-center w-full px-3 min-h-[68px] text-sm transition-colors border-b-[0.4px] border-aiortho-gray-100">
      {columnOrder.map(column => (
        <div
          key={column.id}
          className={cn(
            'flex items-center px-3 py-[25.5px] self-stretch min-h-[68px] flex-1 whitespace-nowrap',
            column.className
          )}
        >
          <div
            className={cn(
              'text-aiortho-gray-900 truncate text-ellipsis',
              isRoot && 'text-aiortho-primary'
            )}
          >
            {renderCellContent(column.label)}
          </div>
        </div>
      ))}
    </div>
  );
}
