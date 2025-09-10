import React, { useState, useEffect, useRef, useMemo } from 'react';
import PatientTableHeader from './PatientTableHeader';
import PatientTableRow from './PatientTableRow';
import { TableColumn } from './types';
import { loadColumnOrder, saveColumnOrder } from '../utils';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { usePatients } from '@/hooks/usePatients';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';
import Divider from '@/components/Divider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SquareCheck } from '@/components/Icon';

const PER_PAGE_SIZE = 10;

interface PatientTableProps {
  keyword?: string;
  showMyPatientFilter?: boolean;
  showSearchBar?: boolean;
  clickMode?: 'prescribe' | 'detail';
}

const PatientTable = ({
  keyword,
  showMyPatientFilter = true,
  showSearchBar = true,
  clickMode = 'detail',
}: PatientTableProps) => {
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFindMyPatient, setIsFindMyPatient] = useState(false);
  const [search, setSearch] = useState(keyword || '');
  const [sortBy, setSortBy] = useState<TableColumn['sortKey']>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [currentSortedColumnId, setCurrentSortedColumnId] =
    useState<TableColumn['id']>('createdAt');
  const [isDataChanging, setIsDataChanging] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const debouncedSearch = useDebounce(search, 1000);

  const queryParams = useMemo(
    () => ({
      pageNumber,
      count: PER_PAGE_SIZE,
      findMyPatient: isFindMyPatient,
      ascending: sortDirection === 'asc' ? true : false,
      sortBy,
      searchKey: keyword || debouncedSearch,
    }),
    [pageNumber, isFindMyPatient, sortDirection, sortBy, debouncedSearch, keyword]
  );

  const patientsQuery = usePatients(queryParams);

  useEffect(() => {
    const savedColumns = loadColumnOrder();
    setColumns(savedColumns);
  }, []);

  // 검색/필터 변경 시 페이지 리셋 및 스크롤 활성화
  useEffect(() => {
    // 검색이나 필터가 변경되었을 때만 페이지 리셋
    if (hasUserInteracted) {
      setPageNumber(1);
      setShouldScroll(true);
    }
  }, [debouncedSearch, isFindMyPatient]);

  useEffect(() => {
    if (patientsQuery.isFetching) {
      setIsDataChanging(true);
    } else if (patientsQuery.isSuccess && isDataChanging) {
      setTimeout(() => {
        setIsDataChanging(false);

        // 스크롤 실행
        if (shouldScroll) {
          setTimeout(() => {
            if (tableRef.current) {
              const rect = tableRef.current.getBoundingClientRect();
              const currentScrollY = window.scrollY;

              // 현재 스크롤 위치 기준으로 테이블 상단으로 스크롤
              if (rect.top > 0) {
                // 테이블이 화면 아래에 있으면 테이블 상단으로 스크롤
                const tableTop = rect.top + currentScrollY;
                const targetScrollY = tableTop - 100;
                window.scrollTo({
                  top: targetScrollY,
                  behavior: 'smooth',
                });
              } else if (rect.bottom < window.innerHeight) {
                // 테이블이 화면 위에 있으면 테이블 상단으로 스크롤
                const tableTop = rect.top + currentScrollY;
                const targetScrollY = tableTop - 100;
                window.scrollTo({
                  top: targetScrollY,
                  behavior: 'smooth',
                });
              }
              // 테이블이 화면 중앙에 있으면 스크롤하지 않음
            }
          }, 200);
          setShouldScroll(false); // 스크롤 완료 후 비활성화
        }
      }, 400);
    }
  }, [
    patientsQuery.isFetching,
    patientsQuery.isSuccess,
    isDataChanging,
    shouldScroll,
    hasUserInteracted,
  ]);

  const handleColumnOrderChange = (newColumns: TableColumn[]) => {
    setColumns(newColumns);
    saveColumnOrder(newColumns);
  };

  const handleColumnSortChange = (
    newSortBy: TableColumn['sortKey'],
    columnId: TableColumn['id']
  ) => {
    setShouldScroll(true); // 정렬 변경 시 스크롤 활성화

    if (!hasUserInteracted) {
      setHasUserInteracted(true); // 첫 상호작용 표시
    }

    if (currentSortedColumnId === columnId) {
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortBy(newSortBy);
      setCurrentSortedColumnId(columnId);
      setSortDirection('asc');
    }
  };

  const handleFindMyPatientToggle = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true); // 첫 상호작용 표시
    }
    setIsFindMyPatient(!isFindMyPatient);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true); // 첫 상호작용 표시
    }
    setSearch(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setShouldScroll(true); // 페이지네이션 변경 시 스크롤 활성화
    setPageNumber(page);
  };

  const handleTableRowClick = (patientId: string) => {
    if (clickMode === 'prescribe') {
      router.push(`/prescriptions/patients/${patientId}/prescribe`);
    } else {
      router.push(`/prescriptions/patients/${patientId}`);
    }
  };

  if (patientsQuery.isError || !patientsQuery.data) {
    return null;
  }

  const {
    data: { patients, totalCount },
  } = patientsQuery;

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={tableRef}
        className={cn(
          'flex relative flex-col items-start px-8 py-9 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5',
          isDataChanging && 'opacity-90'
        )}
      >
        <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:items-center gap-5 lg:gap-0">
          <div className="flex flex-row gap-5">
            <div className="flex gap-2 items-center self-start text-2xl font-bold leading-none whitespace-nowrap">
              <h1 className="self-stretch my-auto text-zinc-900">총</h1>
              <div className="flex items-center self-stretch my-auto">
                <span className="self-stretch my-auto text-sky-700">{totalCount ?? 0}</span>
                <span className="self-stretch my-auto text-zinc-900">명</span>
              </div>
            </div>

            {showMyPatientFilter && (
              <div className="flex gap-3 items-center text-sm font-medium leading-non text-slate-400">
                <button
                  type="button"
                  className="self-stretch my-auto flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="내 환자만 보기 필터 적용"
                  onClick={handleFindMyPatientToggle}
                >
                  <SquareCheck isChecked={isFindMyPatient} />내 환자만 보기
                </button>
              </div>
            )}
          </div>

          {showSearchBar && (
            <div className="flex flex-col justify-center px-3 py-2.5 rounded-full bg-slate-100 fill-slate-100 border border-transparent focus-within:border-[#0054A6] focus-within:bg-white transition-colors">
              <div className="flex gap-2 items-center">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="검색"
                  value={search}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent border-none outline-none text-[#343F4E] placeholder:text-aiortho-gray-500"
                  aria-label="환자 검색"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 w-full overflow-x-auto">
          {/* 드래그 가능한 헤더 */}
          <PatientTableHeader
            columns={columns}
            sortDirection={sortDirection}
            currentSortedColumnId={currentSortedColumnId}
            onColumnSortChange={handleColumnSortChange}
            onColumnOrderChange={handleColumnOrderChange}
          />

          {/* 테이블 본문 */}
          <div className="w-full">
            {isDataChanging ? (
              <div className="flex items-center justify-center w-full h-full">
                <Spinner className="my-10 w-16 h-16" />
              </div>
            ) : patients.length === 0 ? (
              <div className="flex flex-col items-center w-full mt-10 xl:mt-15 justify-center">
                <p className="text-[var(--aiortho-gray-600)] mb-4 ">
                  ‘환자 등록’ 후 처방이 가능합니다.
                </p>
                <Button
                  type="button"
                  className="cursor-pointer h-12"
                  onClick={() => router.push('/prescriptions/patients/register')}
                >
                  환자 등록하기
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  'transition-all duration-700 ease-in-out',
                  isDataChanging && 'opacity-75'
                )}
              >
                {patients.map((patient, index) => (
                  <PatientTableRow
                    key={`${patient.patientId}-${index}`}
                    patient={patient}
                    columnOrder={columns}
                    onClick={() => handleTableRowClick(String(patient.patientId))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={pageNumber}
        totalPages={totalCount ? Math.ceil(totalCount / PER_PAGE_SIZE) : 1}
        onPageChange={handlePageChange}
      />

      <Divider className="mt-3 bg-transparent" />
    </div>
  );
};

export default PatientTable;
