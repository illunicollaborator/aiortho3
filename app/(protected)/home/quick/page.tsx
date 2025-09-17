'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PatientTable from '@/components/PatientDashboard/PatientTable';
import OrthoInput from '@/components/OrthoInput';

export default function QuickMenuPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearch = () => {
    setSearchKeyword(searchValue);
    setIsSearch(true);
  };

  return (
    <section className="flex flex-col">
      <h1 className="text-[32px] font-bold text-aiortho-gray-900 mb-5">처방할 환자 검색</h1>
      <h2 className="text-[17px] text-aiortho-gray-600">처방할 환자명을 입력해주세요. </h2>

      {/* 검색 폼 */}
      <div className="flex flex-col items-start gap-3 w-full mt-7 mb-6">
        <div className="flex flex-col items-start gap-2 w-full">
          {/* PC 레이아웃 - 가로 배치 */}
          <div className="flex flex-wrap items-center gap-2 w-full">
            <OrthoInput
              type="text"
              placeholder="환자명 검색"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !(e.nativeEvent as any).isComposing) {
                  e.preventDefault(); // 기본 동작 방지
                  handleSearch();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              width="flex-1"
            />

            <Button
              type="button"
              onClick={handleSearch}
              className="flex w-full md:w-[108px] h-12 py-3 px-6 justify-center items-center rounded-[12px] bg-aiortho-primary hover:bg-aiortho-primary/90 cursor-pointer"
            >
              <span className="font-bold text-sm text-white leading-6">환자 검색</span>
            </Button>
          </div>
        </div>
      </div>

      {isSearch && searchKeyword && (
        <PatientTable
          keyword={searchKeyword}
          showMyPatientFilter={false}
          showSearchBar={false}
          clickMode="prescribe"
          className="shadow-none p-0 mt-14"
        />
      )}
    </section>
  );
}
