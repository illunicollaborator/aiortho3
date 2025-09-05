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
          value={medicalDepartmentInfo ? medicalDepartmentInfo.name : ''}
          rightIcon={<ChevronDown size={20} color="#97A8C4" />}
          error={error}
          required={required}
          isDirty={isDirty}
          className="bg-white border-[var(--aiortho-gray-200)] cursor-pointer text-[color:var(--aiortho-gray-900)] hover:border-[var(--aiortho-primary)]"
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
