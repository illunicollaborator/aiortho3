import { toMatrix } from '@/lib/utils';
import { useRef, useEffect } from 'react';

// Define the type for specialty items
export type ArrayItem = {
  code: string;
  name: string;
};

// Define props for our multi-column dropdown component
type MultiColumnDropdownProps = {
  onSelect?: (item: ArrayItem) => void;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  items: ArrayItem[];
  width?: string;
  height?: string;
  maxHeight?: string;
  containerStyle?: React.CSSProperties;
  columns?: number;
};

export default function MultiColumnDropdown({
  onSelect,
  className = '',
  isOpen = false,
  onClose,
  items,
  width = 'w-full',
  columns = 4,
}: MultiColumnDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onClose) onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSelect = (item: ArrayItem) => {
    if (onSelect) {
      onSelect(item);
    }
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Determine column grid class
  const gridClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] || 'grid-cols-4';

  return (
    <div
      ref={dropdownRef}
      className={`scrollable absolute z-50 bg-white rounded-xl overflow-y-scroll ${width} ${className} shadow-[0_0_30px_0_#9FABC44D] max-h-[292px] p-2`}
    >
      <div className={`grid ${gridClass} gap-1`}>
        {toMatrix(items, columns).map(row =>
          row.map(item => (
            <button
              key={item.code}
              className="px-3 h-12 text-sm font-bold text-center text-[#343A47] hover:bg-[#F3F5FB] rounded-[10px] focus:outline-none focus:bg-[#F3F5FB] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
