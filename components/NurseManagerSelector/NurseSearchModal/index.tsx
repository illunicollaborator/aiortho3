import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Nurse } from '@/models';
import NurseSearch from '../NurseSearch';
import { useSearchNurses } from '../hooks';

interface NurseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (nurse: Nurse) => void;
  selectedNurses: Nurse[];
}

const ITEMS_PER_PAGE = 3;

export default function NurseSearchModal({
  isOpen,
  onClose,
  onSelect,
  selectedNurses,
}: NurseSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      keyword: searchQuery,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }),
    [searchQuery, currentPage]
  );

  const nursesQuery = useSearchNurses(queryParams);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectNurse = (nurse: Nurse) => {
    onSelect(nurse);
    onClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isNurseSelected = (nurseId: string) => {
    return selectedNurses.some(nurse => nurse.adminId === nurseId);
  };

  const initialState = {
    nurses: [],
    counts: 0,
  };

  const { nurses, counts } = nursesQuery.data ?? initialState;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className="nurse-search-modal max-w-[604px] max-h-[600px] w-[604px] h-[636px] p-0 border-none min-h-[500px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        onPointerDownOutside={e => e.preventDefault()}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle className="sr-only">담당 간호사 선택</DialogTitle>

        <div className="modal-container w-full h-full relative font-['Pretendard_Variable',-apple-system,Roboto,Helvetica,sans-serif] flex flex-col overflow-hidden shadow-lg">
          {/* Header Section */}
          <div className="modal-header relative flex-shrink-0 px-6 sm:px-8 pt-8 sm:pt-12 pb-4 sm:pb-7">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-3 sm:gap-5 flex-1">
                <h2 className="modal-title text-[#161621] text-xl sm:text-2xl font-bold leading-[140%]">
                  담당 간호사명을 검색해주세요
                </h2>
                <p className="modal-subtitle text-[#66798D] text-sm sm:text-base font-normal leading-[22px]">
                  선택된 담당 간호사가 환자 관리를 서포트합니다.
                </p>
              </div>
              <button
                onClick={onClose}
                className="close-button absolute right-2 top-2 flex w-8 h-8 justify-center items-center rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                aria-label="모달 닫기"
              >
                <X className="w-6 h-6 text-[#66798D]" />
              </button>
            </div>
          </div>

          <div className="search-section flex-shrink-0 px-6 sm:px-8 pb-3 sm:pb-8">
            <NurseSearch
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </div>

          {searchQuery && (
            <>
              {/* Search Section */}
              <div className="results-header flex items-center gap-2 flex-shrink-0 px-6 sm:px-8 pb-3 sm:pb-4 mt-4">
                <h3 className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                  검색 결과
                </h3>
                <div className="flex items-center">
                  <span className="text-[#0054A6] text-base sm:text-lg font-bold leading-5">
                    {counts}
                  </span>
                  <span className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                    건
                  </span>
                </div>
              </div>

              {/* Table Section */}
              <div className="table-section flex flex-col px-6 sm:px-8 flex-1 min-h-0">
                {/* Table Header */}
                <div className="table-header flex-shrink-0 flex h-12 items-center rounded-xl bg-[rgba(241,244,249,0.50)]">
                  <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                    <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                      간호사명
                    </div>
                  </div>
                  <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                    <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                      휴대폰번호
                    </div>
                  </div>
                </div>

                {/* Table Content with Scroll */}
                <div
                  className="nurses-list flex-1 flex flex-col items-start overflow-y-auto min-h-[200px]
                           scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                  {nurses.length > 0 ? (
                    nurses.map((nurse, index) => {
                      const isSelected = isNurseSelected(nurse.adminId);
                      return (
                        <div
                          key={nurse.name}
                          className={`nurse-row flex flex-col items-start w-full 
                                transition-colors duration-150 ${
                                  isSelected
                                    ? 'bg-blue-100 hover:bg-blue-100 cursor-not-allowed'
                                    : 'hover:bg-blue-50 active:bg-blue-100 cursor-pointer'
                                }`}
                          onClick={() => !isSelected && handleSelectNurse(nurse)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => {
                            if ((e.key === 'Enter' || e.key === ' ') && !isSelected) {
                              e.preventDefault();
                              handleSelectNurse(nurse);
                            }
                          }}
                        >
                          <div className="flex h-[68px] items-center w-full">
                            <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                              <div
                                className={`w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                         text-sm font-normal ${
                                           isSelected
                                             ? 'text-[#0054A6] font-medium'
                                             : 'text-[#161621] opacity-80'
                                         }`}
                                title={nurse.name}
                              >
                                {nurse.name}
                                {isSelected && <span className="ml-2 text-xs">(선택됨)</span>}
                              </div>
                            </div>
                            <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                              <div
                                className={`w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                         text-sm font-normal ${
                                           isSelected
                                             ? 'text-[#0054A6]'
                                             : 'text-[#161621] opacity-80'
                                         }`}
                                title={nurse.phoneNumber}
                              >
                                {nurse.phoneNumber}
                              </div>
                            </div>
                          </div>
                          {index < nurses.length - 1 && (
                            <div className="divider w-full h-[1px] bg-[#8395AC] opacity-20"></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center py-12 w-full">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="text-[#66798D] text-sm">검색 결과가 없어요.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination Section - Always visible at bottom */}
              <div className="pagination-section flex-shrink-0 flex justify-start py-3 sm:py-4 px-6 sm:px-8 bg-white">
                {counts > 1 ? (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(counts / ITEMS_PER_PAGE)}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <div className="h-8"></div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
