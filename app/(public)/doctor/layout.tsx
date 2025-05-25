"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/(public)/doctor/components/sidebar/index";

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = usePathname();
  const shouldShowSidebar = !pathname.includes('/doctor/auth');

  // 배경색이 white인 경로들 리스트
  const whiteBackgroundRoutes = [
    '/doctor/patient/register',
    '/doctor/mypage',
    '/doctor/program'
  ];

  // 현재 pathname이 white 배경을 사용해야 하는지 확인
  const shouldUseWhiteBackground = whiteBackgroundRoutes.some(route => 
    pathname.startsWith(route)
  );

  return (
    <div className="flex">
      {shouldShowSidebar && <Sidebar />}
      <div className={`flex flex-col w-full ${shouldUseWhiteBackground ? 'bg-white' : 'bg-[#F5F9FF]'}`}>
        {shouldShowSidebar && (
          <div className="px-8 w-full h-12 flex items-center text-[#66798D] ">
              여기여기 {">"} 거기거기
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
