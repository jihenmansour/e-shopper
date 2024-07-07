"use client";

import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormLabel, FormMessage } from "./form";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "./multi-selector";

interface MultiSelectorFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string,
  data?: any;
  isCol?:boolean,
  products?: any 
}

const MultiSelectorField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  data,
  isCol,
  products
}: MultiSelectorFieldProps<T>) => {
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
          <MultiSelector values={field.value  || []} onValuesChange={field.onChange} loop={false}>
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder={placeholder} />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {products?.map((option: any) => (
                <MultiSelectorItem key={option.name} value={option} >
                  {option.name!}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
            <FormMessage className="form-message mt-2" />
          </div>
          </div>
        </div>
      )}
    />
  );
};

export default MultiSelectorField;
