import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/ConfirmModal';
import { UserRole } from '@/models';

interface PatientControllerProps {
  role: UserRole;
  name: string;
  disabled: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function PatientController({
  role,
  name,
  disabled,
  onClick,
  onDelete,
}: PatientControllerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    handleClose();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button
        type="button"
        className="w-full h-12 rounded-full font-bold cursor-pointer"
        disabled={disabled}
        onClick={onClick}
      >
        {role === 'Nurse' ? '처방 요청' : '처방하기'}
      </Button>

      <button
        type="button"
        className="underline underline-offset-4 text-[var(--aiortho-gray-800)] text-sm cursor-pointer"
        onClick={handleOpen}
      >
        환자 삭제
      </button>

      <ConfirmModal
        isOpen={isOpen}
        title={`${name}님을 정말 삭제하시겠어요?`}
        description="삭제된 환자는 복구할 수 없어요."
        confirmText="네, 삭제할게요"
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </div>
  );
}
