import { Search } from 'lucide-react';
import { useState } from 'react';
import MedicalInstitutionModal from './MedicalInstitutionModal';
import { Hospital, HospitalInfo } from '@/models';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import OrthoInput from '../OrthoInput';

interface MedicalInstitutionSelectorProps {
  label: string;
  required?: boolean;
  registration?: UseFormRegisterReturn;
  error?: string;
  institutionInfo: HospitalInfo;
  onChange?: (institution?: Hospital) => void;
}

export default function MedicalInstitutionSelector({
  label,
  required = false,
  registration,
  error,
  institutionInfo,
  onChange,
}: MedicalInstitutionSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectInstitution = (value?: Hospital) => {
    if (onChange) {
      onChange(value);
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
          'flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl bg-white border border-[#DADFE9] cursor-pointer hover:border-[var(--aiortho-primary)] hover:ring-1 hover:ring-[var(--aiortho-primary)] transition-colors mb-2',
          error && 'border-2 border-[color:var(--aiortho-danger)]'
        )}
      >
        <Search className="w-5 h-5 text-[var(--aiortho-primary)] font-bold" />
        <span className="text-base text-[var(--aiortho-primary)] font-bold">의료기관명 검색</span>
      </button>

      {error && <p className="font-normal text-[var(--aiortho-danger)] text-xs mb-3">{error}</p>}

      {institutionInfo.name && (
        <OrthoInput
          registration={registration}
          required={required}
          value={institutionInfo.name}
          placeholder="선택된 의료기관이 없습니다"
          disabled
        />
      )}

      <MedicalInstitutionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectInstitution}
      />
    </div>
  );
}
