import React, { useState, useEffect, useRef } from 'react';
import PatientTableHeader from './PatientTableHeader';
import PatientTableRow from './PatientTableRow';
import { TableColumn } from './types';
import { loadColumnOrder, saveColumnOrder } from '../utils';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { SquareCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePatients } from '@/hooks/usePatients';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';
import Divider from '@/components/Divider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const PER_PAGE_SIZE = 10;

const PatientTable = () => {
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFindMyPatient, setIsFindMyPatient] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<TableColumn['sortKey']>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [currentSortedColumnId, setCurrentSortedColumnId] =
    useState<TableColumn['id']>('createdAt');
  const [isDataChanging, setIsDataChanging] = useState(false);
  const debouncedSearch = useDebounce(search, 2000);

  const patientsQuery = usePatients({
    pageNumber,
    count: PER_PAGE_SIZE,
    findMyPatient: isFindMyPatient,
    ascending: sortDirection === 'asc' ? true : false,
    sortBy,
    ...(debouncedSearch && { searchKey: debouncedSearch }),
  });

  // 컴포넌트 마운트 시 localStorage에서 컬럼 순서 불러오기
  useEffect(() => {
    const savedColumns = loadColumnOrder();
    setColumns(savedColumns);
    setIsLoading(false);
  }, []);

  // 검색 키워드나 필터 변경 시 페이지 초기화
  useEffect(() => {
    setPageNumber(1);
  }, [debouncedSearch, isFindMyPatient]);

  // 데이터 변경 시 테이블 전체가 보이도록 스크롤
  useEffect(() => {
    if (patientsQuery.isFetching) {
      setIsDataChanging(true);
    } else if (patientsQuery.isSuccess && isDataChanging) {
      // 데이터 로딩 완료 시 테이블 전체가 보이도록 스크롤
      setTimeout(() => {
        if (tableRef.current) {
          const rect = tableRef.current.getBoundingClientRect();
          const offset = rect.top - 100; // 테이블 상단에서 100px 위로 스크롤

          window.scrollBy({
            top: offset,
            behavior: 'smooth',
          });
        }
        setIsDataChanging(false);
      }, 100);
    }
  }, [patientsQuery.isFetching, patientsQuery.isSuccess, isDataChanging]);

  if (patientsQuery.isError || !patientsQuery.data) return null;

  const {
    data: { patients, totalCount },
    isFetching,
  } = patientsQuery;

  // 컬럼 순서 변경 핸들러
  const handleColumnOrderChange = (newColumns: TableColumn[]) => {
    setColumns(newColumns);
    saveColumnOrder(newColumns);
  };

  const handleColumnSortChange = (
    newSortBy: TableColumn['sortKey'],
    columnId: TableColumn['id']
  ) => {
    if (currentSortedColumnId === columnId) {
      // 같은 컬럼을 클릭한 경우: null -> asc -> desc -> asc -> desc ...
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
    } else {
      // 다른 컬럼을 클릭한 경우: 해당 컬럼으로 정렬하고 오름차순으로 설정
      setSortBy(newSortBy);
      setCurrentSortedColumnId(columnId);
      setSortDirection('asc');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={tableRef}
        className={cn(
          'flex relative flex-col items-start px-8 py-9 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5 w-full transition-all duration-5000 ease-in-out',
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

            <div className="flex gap-2 items-center text-sm font-medium leading-non text-slate-400">
              <button
                type="button"
                className="self-stretch my-auto flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="내 환자만 보기 필터 적용"
                onClick={() => setIsFindMyPatient(!isFindMyPatient)}
              >
                <SquareCheck
                  className={cn(
                    'w-4 h-4 text-gray-500',
                    isFindMyPatient && 'text-white fill-sky-700'
                  )}
                />
                내 환자만 보기
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center px-3 py-2.5 rounded-2xl bg-slate-100 fill-slate-100 border border-transparent focus-within:border-[#0054A6] focus-within:border-2 focus-within:bg-white transition-colors">
            <div className="flex gap-2 items-center">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="검색"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-400 placeholder:text-slate-400 focus:text-[#161621]"
                aria-label="환자 검색"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 w-full overflow-x-auto">
          {/* 드래그 가능한 헤더 */}
          <PatientTableHeader
            columns={columns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            currentSortedColumnId={currentSortedColumnId}
            onColumnSortChange={handleColumnSortChange}
            onColumnOrderChange={handleColumnOrderChange}
          />

          {/* 테이블 본문 */}
          <div className="w-full">
            {patients.length === 0 ? (
              <div className="flex flex-col items-center w-full mt-10 xl:mt-15">
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
            ) : isFetching ? (
              <div className="flex items-center justify-center w-full h-full">
                <Spinner className="my-10 w-16 h-16" />
              </div>
            ) : (
              <div
                className={cn(
                  'transition-all duration-300 ease-in-out',
                  isDataChanging && 'opacity-75'
                )}
              >
                {patients.map((patient, index) => (
                  <React.Fragment key={`${patient.patientId}-${index}`}>
                    <PatientTableRow patient={patient} columnOrder={columns} />
                    {index < patients.length - 1 && (
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/c914df031f0a54b8061f5d8235a95b70eec4cdf0?placeholderIfAbsent=true"
                        className="object-contain w-full stroke-[0.4px] stroke-slate-400"
                        alt=""
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={pageNumber}
        totalPages={totalCount ? Math.ceil(totalCount / PER_PAGE_SIZE) : 1}
        onPageChange={page => setPageNumber(page)}
      />

      <Divider className="mt-3 bg-transparent" />
    </div>
  );
};

export default PatientTable;
