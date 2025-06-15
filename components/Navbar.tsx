"use client";
import React from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  return (
    <div className="w-full h-[72px] relative bg-white">
      <div className="w-full h-[72px] absolute left-0 top-0 bg-white"></div>
      <Link href="/">
        <div className="text-[#0054A6] font-bold text-[22px] leading-6 absolute left-7 top-6 w-[82px] h-6 sm:left-4 sm:text-[20px]">
          AIOrtho
        </div>
      </Link>
      <div className="inline-flex items-center justify-end gap-5 absolute right-[20px] top-4 w-[100px] h-10 lg:right-[20px] md:right-[20px] sm:right-4 sm:gap-4">
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex w-10 h-10 p-1 justify-center items-center text-[#465463] rounded-full font-medium text-sm hover:bg-[#004385]/10 transition-colors">
              MY
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end" alignOffset={0}>
            <div className="grid gap-4 p-4">
              <div className="font-medium">박의사 님</div>
              <div className="text-sm text-muted-foreground">
                의사 코드 (UH2406001)
              </div>
              <hr className="my-2" />
              <Link
                href="/doctor/mypage/check"
                className="text-sm hover:bg-accent hover:text-accent-foreground rounded p-2 -mx-2"
              >
                프로필 설정
              </Link>
              <button
                className="text-sm text-red-500 hover:bg-red-50 text-left rounded p-2 -mx-2"
                onClick={() => {
                  // 로그아웃 로직 추가
                }}
              >
                로그아웃
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
