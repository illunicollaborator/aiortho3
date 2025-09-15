'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import NurseSearchModal from './NurseSearchModal';
import { Nurse } from '@/models';
import { cn } from '@/lib/utils';

interface NurseManagerProps {
  nurses?: Nurse[];
  label: string;
  error?: string;
  onChange?: (nurseIds: string[]) => void;
}

const NurseManager: React.FC<NurseManagerProps> = ({ nurses, label, error, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNurses, setSelectedNurses] = useState<Nurse[]>(nurses ?? []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectNurse = (nurse: Nurse) => {
    // 이미 선택된 간호사인지 확인
    const isAlreadySelected = selectedNurses.some(
      selectedNurse => selectedNurse.adminId === nurse.adminId
    );

    if (!isAlreadySelected && selectedNurses.length < 10) {
      const updatedNurses = [...selectedNurses, nurse];
      setSelectedNurses(updatedNurses);

      if (onChange) {
        onChange(updatedNurses.map(n => n.adminId));
      }
    }
  };

  const handleRemoveNurse = (nurseId: string) => {
    const updatedNurses = selectedNurses.filter(nurse => nurse.adminId !== nurseId);
    setSelectedNurses(updatedNurses);

    if (onChange) {
      onChange(updatedNurses.map(n => n.adminId));
    }
  };

  const isMaxNurses = selectedNurses.length === 10;

  return (
    <div className="nurse-manager w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-[var(--aiortho-gray-500)]">{label}</label>
      </div>

      {/* 담당 간호사 추가 버튼 */}
      <button
        type="button"
        onClick={handleOpenModal}
        className={cn(
          'flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl border border-[var(--aiortho-gray-200)] cursor-pointer transition-colors disabled:cursor-not-allowed disabled:hover:border-[var(--aiortho-gray-200)] disabled:[&_*]:opacity-40 hover:border-[var(--aiortho-primary)] hover:ring-1 hover:ring-[var(--aiortho-primary)]',
          selectedNurses.length > 0 && 'mb-2',
          error && 'border-2 border-[color:var(--aiortho-danger)]'
        )}
        disabled={isMaxNurses}
      >
        <Plus className="w-5 h-5 text-[var(--aiortho-primary)] font-bold" />
        <span className="text-base text-[var(--aiortho-primary)] font-bold">담당 간호사 추가</span>
      </button>

      {/* 선택된 간호사들 표시 */}
      <div className="space-y-2">
        {selectedNurses.length > 0 &&
          selectedNurses.map(nurse => (
            <div key={nurse.adminId} className="flex items-center gap-2 w-full">
              <div className="flex h-12 px-4 py-3.5 items-center justify-between self-stretch rounded-xl border border-[var(--aiortho-gray-200)] bg-[#F0F3FA]/60 w-full">
                <div className="flex items-center gap-2">
                  <div className="text-[var(--aiortho-gray-600)] text-base font-medium">
                    {nurse.name}
                  </div>
                </div>
                <div className="flex items-center"></div>
              </div>
              <button
                onClick={() => handleRemoveNurse(nurse.adminId)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--aiortho-gray-100)]"
              >
                <X className="w-4 h-4 text-[var(--aiortho-gray-600)] cursor-pointer" />
              </button>
            </div>
          ))}
      </div>

      {isMaxNurses && (
        <p className="font-normal text-[var(--aiortho-danger)] text-xs mt-2">
          담당 간호사는 최대 10명까지만 등록 가능합니다
        </p>
      )}

      <NurseSearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectNurse}
        selectedNurses={selectedNurses}
      />
    </div>
  );
};

export default NurseManager;
