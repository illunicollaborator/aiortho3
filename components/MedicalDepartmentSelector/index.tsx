import React, { useState } from 'react';
import MultiColumnDropdown, { ArrayItem } from '@/components/ui/multi-column-dropdown';
import { ChevronDown } from 'lucide-react';
import OrthoInput from '@/components/OrthoInput';
import { MedicalDepartment } from '@/models';
import { UseFormRegisterReturn } from 'react-hook-form';

interface MedicalDepartmentSelectorProps {
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  items: ArrayItem[];
  required?: boolean;
  onChange?: (value: string) => void;
}

export default function MedicalDepartmentSelector({
  label,
  placeholder,
  items,
  registration,
  error,
  required = false,
  onChange,
}: MedicalDepartmentSelectorProps) {
  const [departmentDropDownIsOpen, setDepartmentDropDownIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDepartmentDropDownIsOpen(!departmentDropDownIsOpen);
  };

  const handleDepartmentSelect = (department: MedicalDepartment) => {
    setDepartmentDropDownIsOpen(false);
    onChange?.(department.name);
  };

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <OrthoInput
          label={label}
          registration={registration}
          placeholder={placeholder}
          rightIcon={<ChevronDown size={20} color="#97A8C4" />}
          error={error}
          required={required}
        />
      </div>

      <MultiColumnDropdown
        isOpen={departmentDropDownIsOpen}
        onClose={() => setDepartmentDropDownIsOpen(false)}
        onSelect={handleDepartmentSelect}
        className="mt-3"
        items={items}
        width="w-full"
      />
    </div>
  );
}
