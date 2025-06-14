"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import OrthoInput from "@/components/OrthoInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "올바르지 않은 아이디 (이메일) 형식이에요." }),

  password: z
    .string()
    .min(8, { message: "8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요." })
    .max(16, {
      message: "8~16자리 영문/숫자/특수문자 조합만 입력할 수 있어요.",
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: "영문, 숫자, 특수문자를 모두 포함해야 합니다.",
    }),
});

type FormValues = z.infer<typeof loginSchema>;

const DoctorAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" flex flex-col items-center pt-10 bg-white w-full h-full justify-center">
      <div className="w-[95%] md:w-[40%] mx-auto">
        <div className="space-y-4">
          <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">
            의사 로그인
          </h1>
          <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
            서비스 사용을 위해 로그인 해주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-8">
          <OrthoInput
            label="이메일"
            placeholder="이메일을 입력하세요"
            registration={register("email")}
            error={errors.email?.message}
            required
          />

          <OrthoInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            type={showPassword ? "text" : "password"}
            registration={register("password")}
            error={errors.password?.message}
            required
            rightIcon={
              showPassword ? (
                <EyeOff size={20} color="#97A8C4" />
              ) : (
                <Eye size={20} color="#97A8C4" />
              )
            }
            onRightIconClick={togglePasswordVisibility}
          />

          <div className="flex justify-between items-center w-full ">
            <div className="flex items-center gap-2">
              <Checkbox
                className="w-4 h-4 border-gray-400 bg-white data-[state=checked]:bg-[#0054A6] data-[state=checked]:border-[#0054A6] data-[state=checked]:text-white"
                checked={isChecked}
                onCheckedChange={(e) => setIsChecked(!isChecked)}
              />
              <p className="font-medium text-sm text-[color:var(--aiortho-gray-700))]">
                자동 로그인
              </p>
            </div>
            <p
              onClick={() => router.push("/doctor/auth/find-id")}
              className="cursor-pointer text-[color:var(--aiortho-primary)] font-nomral text-[13px]"
            >
              아이디 · 비밀번호 찾기 &nbsp;{">"}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0054A6] hover:bg-[#0054A6] text-white py-5 rounded-full h-12"
          >
            로그인
          </Button>
        </form>
        <p
          onClick={() => router.push("/doctor/auth/code-verification")}
          className="font-medium text-center text-sm text-[color:var(--aiortho-gray-800)] my-4 underline cursor-pointer"
        >
          회원가입
        </p>
      </div>
    </div>
  );
};

export default DoctorAuth;
