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
      <div className="inline-flex items-center gap-5 absolute right-[20px] top-4 w-[100px] h-10 lg:right-[20px] md:right-[20px] sm:right-4 sm:gap-4">
        <div className="relative flex items-center justify-center w-10 h-10 p-0">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="notification-icon"
          >
            <path
              d="M12.1056 24.5624L11.2756 24.0047L11.2756 24.0047L12.1056 24.5624ZM13.2686 20.835L12.2686 20.8242V20.835H13.2686ZM13.293 18.5814L14.293 18.5922V18.5814H13.293ZM27.9006 24.5805L28.7412 24.0388L28.7412 24.0388L27.9006 24.5805ZM26.7814 20.835L25.7814 20.8236V20.835H26.7814ZM26.8058 18.6931L27.8058 18.7045V18.6931H26.8058ZM17.3333 28C16.781 28 16.3333 28.4477 16.3333 29C16.3333 29.5523 16.781 30 17.3333 30V28ZM22.6667 30C23.219 30 23.6667 29.5523 23.6667 29C23.6667 28.4477 23.219 28 22.6667 28V30ZM12.1056 24.5624L12.9356 25.1202C13.6078 24.1199 14.2686 22.6372 14.2686 20.835H13.2686H12.2686C12.2686 22.1434 11.7869 23.2438 11.2756 24.0047L12.1056 24.5624ZM13.2686 20.835L14.2685 20.8459L14.2929 18.5922L13.293 18.5814L12.293 18.5706L12.2686 20.8242L13.2686 20.835ZM27.9006 24.5805L28.7412 24.0388C28.2508 23.2779 27.7814 22.1648 27.7814 20.835H26.7814H25.7814C25.7814 22.6372 26.415 24.1213 27.0601 25.1222L27.9006 24.5805ZM26.7814 20.835L27.7814 20.8464L27.8058 18.7045L26.8058 18.6931L25.8059 18.6817L25.7815 20.8236L26.7814 20.835ZM26.8058 18.6931H27.8058C27.8058 14.0107 24.4227 10 20 10V11V12C23.0948 12 25.8058 14.8779 25.8058 18.6931H26.8058ZM27.4933 25.625V26.625C28.2957 26.625 28.7284 26.0028 28.8809 25.5978C29.042 25.1701 29.0779 24.5612 28.7412 24.0388L27.9006 24.5805L27.0601 25.1222C27.0102 25.0448 27.0016 24.9807 27.0003 24.9546C26.9989 24.9285 27.0027 24.9102 27.0092 24.893C27.0147 24.8785 27.0364 24.8268 27.1034 24.7673C27.1782 24.7009 27.314 24.625 27.4933 24.625V25.625ZM13.293 18.5814H14.293C14.293 14.8279 16.9597 12 20 12V11V10C15.6319 10 12.293 13.9607 12.293 18.5814H13.293ZM12.5076 25.625V24.625C12.6908 24.625 12.8279 24.7038 12.9017 24.7706C12.9677 24.8302 12.9877 24.8808 12.9922 24.8929C12.9977 24.908 13.0012 24.9244 12.9996 24.9498C12.9981 24.9749 12.9889 25.0409 12.9356 25.1202L12.1056 24.5624L11.2756 24.0047C10.9229 24.5295 10.9564 25.1489 11.1136 25.5791C11.2616 25.9845 11.6924 26.625 12.5076 26.625V25.625ZM27.4933 25.625V24.625H12.5076V25.625V26.625H27.4933V25.625ZM17.3333 29V30H22.6667V29V28H17.3333V29Z"
              fill="#465463"
            />
            <circle cx="31" cy="9" r="3" fill="#FF0D4E" />
          </svg>
        </div>
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
