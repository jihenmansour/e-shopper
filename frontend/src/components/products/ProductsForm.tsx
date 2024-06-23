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
import { CategorySchema, ProductSchema } from "@/lib/utils";
import { useState } from "react";
import CustomInput from "../CustomInput";
import MultiSelect from "../CustomMultiSelector";
import Toast from "../Toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";

const ProductsForm = ({ product, categories }: { product?: productProps, categories: categoryProps[] }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);


  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  let response: { error: string | undefined; message: string | undefined; };
  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    const form = new FormData();
    form.append("image", data.image);
    form.append("data", JSON.stringify({...data, categories:data.categories.map((item: categoryProps)=>item._id)}));
    try {
      setShowAlert(true);
      if (product) {
        response = await updateProduct({ id: product?._id, product: form });
      } else {
        response = await createProduct(form);
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
                    data={product?.name}
                    placeholder="Enter product name"
                    isCol={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="price"
                    label="Price"
                    type="number"
                    data={product?.price}
                    placeholder="Enter product price"
                    isCol={true}
                  />
                  <CustomInput
                    control={form.control}
                    name="quantity"
                    label="Quantity"
                    type="number"
                    data={product?.quantity}
                    placeholder="Enter product quantity"
                    isCol={true}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    defaultValue={product?.description}
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
                  <MultiSelect
                    control={form.control}
                    data={product?.categories}
                    isCol={true}
                    label="categories"
                    name="categories"
                    placeholder="Enter product categories"
                    products={categories} />
                </div>
              </div>
            </div>

            <Button className="ml-auto mt-4" type="submit">
              {product ? <p>update</p> : <p>create</p>}
            </Button>
          </form>
        </Form>
      </>
    </>
  );
};

export default ProductsForm;
