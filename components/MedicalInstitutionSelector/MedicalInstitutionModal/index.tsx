import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useHospitals } from './hooks';
import MedicalInstitutionSearch from '../MedicalInstitutionSearch';
import Pagination from '@/components/Pagination';
import { Hospital } from '@/models';

interface MedicalInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (institution?: Hospital) => void;
}

const ITEMS_PER_PAGE = 3;

export default function MedicalInstitutionModal({
  isOpen,
  onClose,
  onSelect,
}: MedicalInstitutionModalProps) {
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

  const hospitalsQuery = useHospitals(queryParams);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSelect(undefined);
  };

  const handleSelectInstitution = (institution?: Hospital) => {
    onSelect(institution);
    onClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const initialState = {
    hospitals: [],
    counts: 0,
  };

  const { hospitals, counts } = hospitalsQuery.data ?? initialState;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className="medical-institution-modal max-w-[604px] max-h-[636px] w-[604px] h-[636px] sm:w-full p-0 border-none 
                   data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300
                   data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200
                   data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        onPointerDownOutside={e => e.preventDefault()}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle className="sr-only">의료 기관 선택</DialogTitle>
        <DialogDescription className="sr-only">의료 기관 선택 모달</DialogDescription>

        <div className="modal-container flex-1 relative flex flex-col overflow-hidden shadow-lg">
          {/* Header Section */}
          <div className="modal-header relative flex-shrink-0 px-6 sm:px-8 pt-8 sm:pt-12 pb-4 sm:pb-8">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-3 sm:gap-5 flex-1">
                <h2 className="modal-title text-[#161621] text-xl sm:text-2xl font-bold leading-[140%]">
                  의료 기관명을 검색해주세요
                </h2>
                <p className="modal-subtitle text-[#66798D] text-sm sm:text-base font-normal leading-[22px]">
                  {`검색 결과가 없을 경우, 고객센터(02-000-000)로 문의 바랍니다.`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="close-button absolute right-2 top-2 flex justify-center w-8 h-8 items-center rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                aria-label="모달 닫기"
              >
                <X className="w-6 h-6 text-[#66798D]" />
              </button>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section flex-shrink-0 px-4 sm:px-8 pb-4 sm:pb-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              <MedicalInstitutionSearch
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />
            </div>
          </div>

          <div className="flex flex-col px-4 sm:px-8 pb-4 sm:pb-8 mt-4">
            {!searchQuery ? (
              <div className="flex flex-col gap-4 min-h-[150px]">
                <span className="font-bold text-xl text-[var(--aiortho-primary)]">Tip</span>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm text-[var(--aiortho-gray-900)]">
                    의료 기관명 or 소재지
                  </p>
                  <p className="text-sm text-[var(--aiortho-gray-500)]">
                    {'예) 가톨릭대학교 서울성모병원 or 서초구 반포대로 222'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="results-header flex items-center gap-2 mb-5">
                  <h3 className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                    검색 결과
                  </h3>
                  <div className="flex items-center">
                    <span className="text-[var(--aiortho-primary)] text-base sm:text-lg font-bold leading-5">
                      {counts}
                    </span>
                    <span className="text-[#161621] text-base sm:text-lg font-bold leading-5">
                      건
                    </span>
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-section flex-1 flex flex-col min-h-0">
                  {/* Table Header */}
                  <div className="table-header flex-shrink-0 flex h-12 items-center rounded-xl bg-[rgba(241,244,249,0.50)]">
                    <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                      <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                        의료 기관명
                      </div>
                    </div>
                    <div className="w-1/2 h-12 px-4 py-2.5 flex items-center">
                      <div className="text-[#161621] text-sm font-bold opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
                        소재지
                      </div>
                    </div>
                  </div>

                  {/* Table Content with Scroll */}
                  <div
                    className="institutions-list flex-1 flex flex-col items-start overflow-y-auto min-h-0 
                           scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {hospitals.length > 0 ? (
                      hospitals.map((institution, index) => (
                        <div
                          key={institution.hospitalCode}
                          className="institution-row flex flex-col items-start w-full cursor-pointer 
                              hover:bg-blue-50 active:bg-blue-100 transition-colors duration-150"
                          onClick={() => handleSelectInstitution(institution)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectInstitution(institution);
                            }
                          }}
                        >
                          <div className="flex h-[68px] items-center w-full">
                            <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                              <div
                                className="w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                       text-[#161621] text-sm font-normal opacity-80"
                                title={institution.name}
                              >
                                {institution.name}
                              </div>
                            </div>
                            <div className="flex w-1/2 h-[68px] px-4 py-2.5 items-center gap-2.5">
                              <div
                                className="w-full overflow-hidden text-ellipsis whitespace-nowrap 
                                       text-[#161621] text-sm font-normal opacity-80"
                                title={institution.address}
                              >
                                {institution.address}
                              </div>
                            </div>
                          </div>
                          {index < hospitals.length - 1 && (
                            <div className="divider w-full h-[1px] bg-[#8395AC] opacity-20"></div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="w-full flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div className="text-[#66798D] text-sm">검색 결과가 없어요.</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pagination Section */}
                {counts > 1 && (
                  <div className="flex pt-4">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(counts / ITEMS_PER_PAGE)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
