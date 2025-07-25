import { Search } from 'lucide-react';
import { useState } from 'react';
import MedicalInstitutionModal from './MedicalInstitutionModal';
import { Hospital } from '@/models';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

interface MedicalInstitutionSelectorProps {
  label: string;
  required?: boolean;
  registration?: UseFormRegisterReturn;
  error?: string;
  onChange?: (institution?: Hospital) => void;
}

export default function MedicalInstitutionSelector({
  label,
  required = false,
  registration,
  error,
  onChange,
}: MedicalInstitutionSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Hospital>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectInstitution = (institution?: Hospital) => {
    setSelectedInstitution(institution);

    if (onChange) {
      onChange(institution);
    }
  };

  return (
    <div className="institution-selector w-full">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-sm font-medium text-[#8395AC] gap-0">
          {label}
          {required && (
            <span
              className={`inline-block ${
                error ? 'text-[color:var(--aiortho-danger)]' : 'text-[color:var(--aiortho-primary)]'
              }`}
            >
              *
            </span>
          )}
        </Label>
      </div>

      {/* 의료기관명 검색 버튼 */}
      <button
        type="button"
        onClick={handleOpenModal}
        className={cn(
          'flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl bg-white border border-[#DADFE9] cursor-pointer hover:border-[var(--aiortho-primary)] transition-colors mb-3',
          error && 'border-2 border-[color:var(--aiortho-danger)]'
        )}
      >
        <Search className="w-5 h-5 text-[var(--aiortho-primary)] font-bold" />
        <span className="text-base text-[var(--aiortho-primary)] font-bold">의료기관명 검색</span>
      </button>

      {error && <p className="font-normal text-[var(--aiortho-danger)] text-xs mb-3">{error}</p>}

      <input
        {...registration}
        className={
          'flex w-full h-12 px-3 py-1 items-center self-stretch rounded-xl border disabled:bg-[#F0F3FA99] disabled:border-[#DADFE9] disabled:text-[var(--aiortho-gray-600)]'
        }
        value={selectedInstitution?.name || ''}
        placeholder="선택된 의료기관이 없습니다"
        disabled
      />

      <MedicalInstitutionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectInstitution}
      />
    </div>
  );
}
