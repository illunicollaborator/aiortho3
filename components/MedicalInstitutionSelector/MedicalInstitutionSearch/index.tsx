import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MedicalInstitutionSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onClear: () => void;
}

const MedicalInstitutionSearch: React.FC<MedicalInstitutionSearchProps> = ({
  searchQuery,
  onSearch,
  onClear,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container flex items-center gap-2 self-stretch sm:gap-3">
      <div className="search-input-wrapper flex w-[472px] flex-col items-start gap-2 md:w-[calc(100%-68px)] sm:w-full">
        <div className="search-input-container flex h-12 px-4 py-3.5 items-center gap-3 self-stretch rounded-xl border border-[#DADFE9]">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="의료 기관명 검색"
            className="search-input w-full text-[#161621] text-base font-normal leading-none outline-none placeholder:text-[#97A8C4]"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button flex items-center justify-center w-6 h-6 rounded-full bg-[#F0F3FA]"
            >
              <X className="w-4 h-4 text-[#66798D]" />
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="search-button text-white text-sm font-medium w-[30%] sm:w-[15%] h-12 px-2.5 py-2.5 rounded-[10px] bg-[#0054A6] "
      >
        검색
      </button>
    </div>
  );
};

export default MedicalInstitutionSearch;
