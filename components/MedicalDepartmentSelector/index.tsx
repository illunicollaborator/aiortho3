import React, { useState } from 'react';
import MultiColumnDropdown, { ArrayItem } from '@/components/ui/multi-column-dropdown';
import { ChevronDown } from 'lucide-react';
import OrthoInput from '@/components/OrthoInput';
import { MedicalDepartmentInfo } from '@/models';
import { UseFormRegisterReturn } from 'react-hook-form';

interface MedicalDepartmentSelectorProps {
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  items: ArrayItem[];
  medicalDepartmentInfo?: MedicalDepartmentInfo;
  required?: boolean;
  isDirty?: boolean;
  onChange?: (department?: MedicalDepartmentInfo) => void;
}

export default function MedicalDepartmentSelector({
  label,
  placeholder,
  items,
  registration,
  error,
  medicalDepartmentInfo,
  required = false,
  isDirty = false,
  onChange,
}: MedicalDepartmentSelectorProps) {
  const [departmentDropDownIsOpen, setDepartmentDropDownIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDepartmentDropDownIsOpen(!departmentDropDownIsOpen);
  };

  const handleSelectDepartment = (department?: MedicalDepartmentInfo) => {
    if (onChange) {
      onChange(department);
    }
  };

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <OrthoInput
          label={label}
          registration={registration}
          placeholder={placeholder}
          value={medicalDepartmentInfo?.name || ''}
          rightIcon={<ChevronDown size={20} color="#97A8C4" />}
          error={error}
          required={required}
          isDirty={isDirty}
          className="text-aiortho-gray-900 cursor-pointer hover:border-[var(--aiortho-primary)] hover:ring-1 hover:ring-[var(--aiortho-primary)] transition-colors"
          readOnly
        />
      </div>

      <MultiColumnDropdown
        isOpen={departmentDropDownIsOpen}
        onClose={() => setDepartmentDropDownIsOpen(false)}
        onSelect={handleSelectDepartment}
        className="mt-3"
        items={items}
        width="w-full"
      />
    </div>
  );
}
