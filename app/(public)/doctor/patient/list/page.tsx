"use client";
import React, { useState } from "react";
import PatientList from "./components/PatientList";
import Pagination from "./components/Pagination";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();
  const [showOnlyMyPatients, setShowOnlyMyPatients] = useState(false);

  return (
    <div className="bg-[#F5F9FF] flex flex-col items-end bg-[#F5F9FF] flex flex-col items-end px-8 pb-12 overflow-hidden md:px-8 sm:px-5  px-8 pb-12 overflow-hidden md:px-8 sm:px-5 mt-8">
      <div className="flex w-full max-w-[1136px] items-stretch gap-5 font-bold flex-wrap justify-between sm:max-w-full">
        <div className="text-[#161621] self-stretch my-auto text-3xl">
          환자 명단
        </div>
        <button onClick={() => router.push("/doctor/patient/register")} className="self-stretch rounded-[14px] min-h-[48px] px-[22px] py-3 text-sm text-white bg-[#0054A6] sm:px-5">
          환자 등록하기
        </button>
      </div>

      <div className="rounded-[14px] bg-white shadow-[6px_6px_54px_rgba(0,0,0,0.05)] relative flex mt-5 w-full max-w-[1136px] px-8 py-9 flex-col items-start sm:max-w-full sm:px-5">
        <div className="self-stretch z-0 flex w-full items-center justify-between  sm:max-w-full sm:flex-wrap sm:gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold whitespace-nowrap sm:whitespace-normal">
              <div className="text-[#161621]">총</div>
              <div className="flex items-center sm:whitespace-normal">
                <div className="text-[#0054A6]">12874</div>
                <div className="text-[#161621]">명</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#8395AC] font-medium">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showOnlyMyPatients}
                  onChange={() => setShowOnlyMyPatients(!showOnlyMyPatients)}
                  id="my-patients-filter"
                />
                <label htmlFor="my-patients-filter" className="cursor-pointer">
                  <div
                    className={`w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200 ${
                      showOnlyMyPatients
                        ? "bg-[#0054A6] border border-[#0054A6]"
                        : "bg-white border border-[#8395AC] hover:border-[#6B7280]"
                    }`}
                  >
                    {showOnlyMyPatients && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </label>
              </div>
              <label
                htmlFor="my-patients-filter"
                className={`cursor-pointer transition-colors ${
                  showOnlyMyPatients
                    ? "text-[#0054A6]"
                    : "text-[#8395AC] hover:text-[#0054A6]"
                }`}
              >
                내 환자만 보기
              </label>
            </div>
          </div>
          <div className="w-[272px] max-w-full text-sm text-[#8395AC] font-normal">
            <div className="rounded-[19px] bg-[#F0F3FA] flex w-full px-3 py-2.5 items-center">
              <div className="flex items-center gap-2 w-full">
                <Search className="w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="검색"
                  className="flex-1 bg-transparent border-none outline-none text-[#8395AC] placeholder:text-[#8395AC]"
                  aria-label="환자 검색"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch z-0 flex w-full flex-col items-stretch sm:max-w-full">
          <PatientList />
        </div>
      </div>

      <Pagination />
    </div>
  );
}
