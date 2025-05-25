"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5">
      <Logo fontSize="text-5xl" />
      <p className="text-[color:var(--aiortho-gray-600)] text-xl">
        아이 사경 치료 관리자 페이지
      </p>
      <div className="flex gap-5 items-center">
        <Button
          onClick={() => router.push("/doctor/auth")}
          className="text-white bg-[color:var(--aiortho-primary)] hover:bg-[color:var(--aiortho-primary)] p-6 rounded-lg cursor-pointer w-[168px]"
        >
          의사로 접속
        </Button>
        <Button className="text-white bg-[color:var(--aiortho-gray-800)] hover:bg-[color:var(--aiortho-gray-800)] p-6 rounded-md cursor-pointer w-[168px]">
          간호사로 접속
        </Button>
      </div>
    </main>
  );
};

export default Home;
