"use client";

import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string,
  data?: PathValue<T, Path<T>>;
  placeholder: string;
  isCol?:boolean
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  data,
  label,
  type,
  placeholder,
  isCol
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={data}
      render={({ field }) => (
        <div className="form-item">
          <div className={cn({"md:flex md:gap:4": isCol})}>
          <FormLabel className="form-label font-bold text-[14px] w-1/2">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type? type : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
