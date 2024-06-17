"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCategory, updateCategory } from "@/lib/actions/category.actions";
import { CategoriesSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomInput from "../CustomInput";
import Toast from "../Toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CategoriesForm = ({ category }: { category?: categoryProps }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof CategoriesSchema>>({
    resolver: zodResolver(CategoriesSchema),
  });
  let response: { error: string | undefined; message: string | undefined };
  const onSubmit = async (data: z.infer<typeof CategoriesSchema>) => {
    const form = new FormData();

    form.append("image", data.image);
    form.append("data", JSON.stringify(data));
    try {
      setShowAlert(true);
      if (category) {
        response = await updateCategory({ id: category?._id, category: form });
      } else {
        response = await createCategory(form);
      }

      if (response.error) {
        setIsSuccess(false);
        setMessage(response.error);
      } else {
        setIsSuccess(true);
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toast
        open={showAlert}
        close={() => {
          setShowAlert(false);
        }}
        message={message}
        success={isSuccess}
      />

      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="md:flex md:gap:4 bg-white py-6 px-4 rounded-sm">
              <div className="w-full">
                <div className="flex flex-col mt-3 gap-8 md:grid">
                  <CustomInput
                    control={form.control}
                    name="name"
                    label="Name"
                    data={category?.name}
                    placeholder="Enter your email"
                    isCol={true}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    defaultValue={category?.description}
                    render={({ field }) => (
                        <div className="md:flex md:gap:4">
                          <FormLabel className="font-bold text-[14px] w-1/2">
                            description
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Textarea
                               {...field}
                               placeholder="description..." />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <div className="md:flex">
                        <FormLabel className="font-bold text-[14px] w-1/2">Picture</FormLabel>
                        <div className="flex flex-col w-full">
                        <FormControl>
                          <Input
                            {...fieldProps}
                            placeholder="Picture"
                            type="file"
                            accept="image/*, application/pdf"
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0]
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button className="ml-auto mt-4" type="submit">
              {category ? <p>update</p> : <p>create</p>}
            </Button>
          </form>
        </Form>
      </>
    </>
  );
};

export default CategoriesForm;
