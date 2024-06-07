"use client";

import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  data?: PathValue<T, Path<T>>;
  placeholder: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  data,
  label,
  placeholder,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={data}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label font-bold text-[14px]">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
