"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrthoInput from "@/components/OrthoInput";

// Define schema with Zod
const passwordCheckSchema = z.object({
  password: z.string().min(1, { message: "비밀번호를 입력해주세요" }),
});

type FormValues = z.infer<typeof passwordCheckSchema>;

const MemberInfoCheckPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordCheckSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Here you would typically verify the password and then redirect
    router.push("/doctor/mypage/change");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex justify-start items-start min-h-screen bg-white w-[50vw] pl-8">
      <div className="w-full relative bg-white pt-[52px] pl-[32px]">
        <h1 className="text-[#161621] font-bold text-[32px] leading-[40px] mb-5 md:text-[28px] md:leading-[36px] sm:text-[24px] sm:leading-[32px]">
          회원정보 확인
        </h1>

        <p className="text-[#66798D] text-[17px] font-normal leading-[22px] mb-[72px] w-[540px] md:w-full md:text-base md:leading-5 md:mb-12 sm:text-[15px] sm:leading-[18px] sm:mb-8">
          홍길동님의 정보를 안전하게 보호하기 위해 비밀번호를 확인합니다.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-[540px] mb-10 md:w-full md:mb-8 sm:mb-6"
        >
          <div className="flex flex-col gap-3">
            <label className="text-[#8395AC] text-sm font-normal">
              아이디 (이메일)
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex h-12 px-4 py-[14px] items-center gap-3 rounded-xl border border-[#DADFE9] text-base">
                DK198291
              </div>
            </div>
          </div>

          <OrthoInput
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? "text" : "password"}
            registration={register("password")}
            error={errors.password?.message}
            rightIcon={
              showPassword ? (
                <EyeOff size={24} color="#97A8C4" />
              ) : (
                <Eye size={24} color="#97A8C4" />
              )
            }
            onRightIconClick={togglePasswordVisibility}
            required
          />
          <div className="flex flex-row gap-5">
            <Button
              type="button"
              onClick={handleCancel}
              className="h-12 px-5 py-[14px] rounded-full text-sm font-bold text-[#465463] bg-[#DADFE999]/60 hover:bg-[#F0F3FA] w-1/2"
          >
            취소
          </Button>
          <Button
            type="submit"
            className="h-12 px-5 py-[14px] rounded-full text-sm font-bold text-white bg-[#BDD5FF] hover:bg-[#0054A6] w-1/2"
            
          >
            확인
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberInfoCheckPage;
