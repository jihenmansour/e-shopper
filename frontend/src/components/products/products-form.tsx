"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { ProductSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";

import InputField from "../ui/input-field";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import MultiSelectorField from "../ui/multi-selector-field";
import ImageField from "../ui/image-field";
import { categoryProps, productProps } from "../../../types";

const ProductsForm = ({
  product,
  categories,
}: {
  product?: productProps;
  categories: categoryProps[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  let response: { error: string | undefined; message: string | undefined };
  let message: string;

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });
  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    const form = new FormData();
    data.images?.map( (file: File)=> {
      form.append("images", file);
      }
    )
    form.append(
      "data",
      JSON.stringify({
        ...data,
        categories: data.categories?.map((item: categoryProps) => item._id),
      })
    );
    try {
      if (product) {
        response = await updateProduct({ id: product?._id, product: form });
      } else {
        response = await createProduct(form);
      }

      if (response.error) {
        message = response.error;
        toast({
          title: "Error",
          description: message,
        });
      } else {
        message = response.message!;
        router.push("/products");
        toast({
          title: "Success",
          description: message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="box md:flex md:gap:4">
              <div className="w-full">
                <div className="flex flex-col mt-3 gap-8 md:grid">
                  <InputField
                    control={form.control}
                    name="name"
                    label="Name"
                    data={product?.name}
                    placeholder="Enter product name"
                    isCol={true}
                  />
                  <InputField
                    control={form.control}
                    name="price"
                    label="Price"
                    type="number"
                    data={product?.price}
                    placeholder="Enter product price"
                    isCol={true}
                  />
                  <InputField
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
                            <Textarea {...field} placeholder="description..." />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
                  <ImageField
                 control={form.control}
                 name="images"
                 data={product?.images}
                 />
                  <MultiSelectorField
                    control={form.control}
                    data={product?.categories}
                    isCol={true}
                    label="categories"
                    name="categories"
                    placeholder="Enter product categories"
                    products={categories}
                  />
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
