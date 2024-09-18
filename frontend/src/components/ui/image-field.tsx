"use client";

import { apiURL } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { ImagesProps } from "../../../types";
import { FormControl, FormField, FormLabel, FormMessage } from "./form";
import { InputProps } from "./input";

interface ImageSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  data?: PathValue<T, Path<T>>;
  defaultValue: PathValue<T, Path<T>>;
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
        <input type={type} className="hidden" ref={ref} {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";

const ImageField = <T extends FieldValues>({
  control,
  name,
  data,
  defaultValue,
}: ImageSelectorProps<T>) => {
  const [images, setImages] = useState<ImagesProps>({
    files: [],
    updatedImages: data ?? [],
  });

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
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
                    setImages((prevState) => {
                      const updatedFiles = [
                        ...(prevState?.files || []),
                        selectedFile,
                      ];
                      onChange({ ...prevState, files: updatedFiles });
                      return { ...prevState, files: updatedFiles };
                    });
                  }
                }}
              />
            </FormControl>
            <FormMessage />
            {images.files &&
              images.files.length > 0 &&
              images.files.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-md border border-gray-200 bg-gray-50 p-3 h-36"
                  >
                    <div
                      onClick={() => {
                        setImages((prevState) => {
                          const updatedFiles =
                            prevState?.files?.filter(
                              (prevItem) => prevItem !== file
                            ) || [];
                          onChange({
                            ...prevState,
                            files: updatedFiles,
                          });

                          return { ...prevState, files: updatedFiles };
                        });
                      }}
                      className="text-gray-600 cursor-pointer"
                    >
                      <X size={18} />
                    </div>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                );
              })}

            {images.updatedImages &&
              images.updatedImages.length > 0 &&
              images.updatedImages.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-md border border-gray-200 bg-gray-50 p-3 h-36"
                  >
                    <div
                      onClick={() => {
                        setImages((prevState) => {
                          const updatedFiles =
                            prevState?.updatedImages?.filter(
                              (prevItem) => prevItem !== image
                            ) || [];
                          onChange({
                            ...prevState,
                            updatedImages: updatedFiles,
                          });
                          return { ...prevState, updatedImages: updatedFiles };
                        });
                      }}
                      className="text-gray-600 cursor-pointer"
                    >
                      <X size={18} />
                    </div>
                    <Image
                      src={`${apiURL}/images/${image}`}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-contain"
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
