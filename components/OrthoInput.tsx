import { UseFormRegisterReturn } from "react-hook-form";
import React, { FC, InputHTMLAttributes } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface OrthoInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  placeholder?: string;
  error?: string;
  apiResponse?: boolean;
  apiResponseMessage?: string;
  registration?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  width?: string;
  maxLength?: number;
  minLength?: number;
  className?: string;
}

const OrthoInput: FC<OrthoInputProps> = ({
  label,
  placeholder,
  error,
  registration,
  onChange,
  type = "text",
  required = false,
  rightIcon,
  onRightIconClick,
  width = "w-full",
  apiResponse,
  apiResponseMessage,
  maxLength,
  minLength,
  className,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${width}`}>
      {label && (
        <Label className="text-sm font-medium text-[color:var(--aiortho-gray-500)] relative">
          <span className="-mr-2 -mb-1">{label}</span>
          {required && (
            <span
              className={`inline-block ${
                apiResponse || error
                  ? "text-[color:var(--aiortho-danger)]"
                  : "text-[color:var(--aiortho-primary)]"
              }`}
            >
              *
            </span>
          )}
        </Label>
      )}
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full placeholder:text-[color:var(--aiortho-gray-400)] h-10",
            error && "border-[1px] border-[color:var(--aiortho-danger)]",
            className
          )}
          {...registration}
          onChange={(e) => {
            registration?.onChange && registration.onChange(e);
            onChange && onChange(e);
          }}
          maxLength={maxLength}
          minLength={minLength}
          {...props}
        />
        {rightIcon && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="font-normal text-[color:var(--aiortho-danger)] text-xs mt-1">
          {error}
        </p>
      )}
      {apiResponseMessage && (
        <p
          className={`font-normal ${
            apiResponse
              ? "text-[color:var(--aiortho-danger)]"
              : "text-[#1FB059]"
          }  text-xs mt-1`}
        >
          {apiResponseMessage}
        </p>
      )}
    </div>
  );
};

export default OrthoInput;
