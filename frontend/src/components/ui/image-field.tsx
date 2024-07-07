"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./form";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";
import Image from "next/image";
import { ImagePlus, X  } from 'lucide-react';
import { apiURL, cn } from "@/lib/utils";
import { InputProps } from "./input";

interface ImageSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  data?: PathValue<T, Path<T>>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    return (
      <div>
        <label
          htmlFor="upload"
          className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-md border border-gray-200 text-primary bg-gray-50 p-4 h-36"
        >
          <ImagePlus />
          <span className="font-medium text-center">Upload image</span>
        </label>
        <input
          type={type}
          className="hidden"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

const ImageField = <T extends FieldValues>({
  control,
  name,
  data,
}: ImageSelectorProps<T>) => {
  const [Files, setFiles] = useState<File[]>([]);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={data}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <div className="md:flex">
          <FormLabel className="font-bold text-[14px] w-1/2">Picture</FormLabel>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-5 w-full items-center">
            <FormControl>
              <Input
                {...fieldProps}
                placeholder="Picture"
                type="file"
                id="upload"
                multiple
                accept="image/*, application/pdf"
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    const selectedFile = event.target.files[0];
                    setFiles((prevImages) => [...prevImages, selectedFile]);
                    onChange([...Files, selectedFile]);
                    
                  }
                }}
              />
            </FormControl>
            <FormMessage />
            {Files.length>0  &&
              Files.map((file, index) => {
                return (
                  <div 
                  key={index}
                  className="rounded-md border border-gray-200 bg-gray-50 p-3 h-36">
                    <div onClick={() => {
                      setFiles((prevState) => {
                        const updatedFiles = prevState.filter((prevItem) => prevItem !== file);
                        onChange(updatedFiles);
                        return updatedFiles;
                      });
                    }}
                    className="text-gray-600 cursor-pointer">
                      <X size={18}/>
                      </div>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className='h-full w-full object-contain'
                    />

                  </div>
                );
              })}
          </div>
        </div>
      )}
    />
  );
};

export default ImageField;
