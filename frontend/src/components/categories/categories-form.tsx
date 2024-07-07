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
import { CategorySchema } from "@/lib/utils";
import InputField from "../ui/input-field";

import { useRouter } from "next/navigation";

import MultiSelectorField from "../ui/multi-selector-field";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import ImageField from "../ui/image-field";

const CategoriesForm = ({ category, products }: { category?: categoryProps, products: productProps[] }) => {
  const {toast} = useToast()
  const router = useRouter();
  
  let message: string;
  let response: { error: string | undefined; message: string | undefined; };

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
  });


  const onSubmit = async (data: z.infer<typeof CategorySchema>) => {
    const form:any = new FormData();
    data.images?.map( (file: File)=> {
    form.append("images", file);
    }
  )
    form.append("data", JSON.stringify(data));
    try {
      if (category) {
        response = await updateCategory({ id: category?._id, category: form });
      } else {
        response = await createCategory(form);
      }

      if (response.error) {
        message = response.error;
        toast({
          title: "Error",
          description: message,
        });
      } else {
        message = response.message!;
        router.push("/categories");
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
            <div className="md:flex md:gap:4 bg-white py-6 px-4 rounded-sm">
              <div className="w-full">
                <div className="flex flex-col mt-3 gap-8 md:grid">
                  <InputField
                    control={form.control}
                    name="name"
                    label="Name"
                    data={category?.name}
                    placeholder="Enter category name"
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
                 <ImageField
                 control={form.control}
                 name="images"
                 data={category?.images}
                 />
                  <MultiSelectorField
                    control={form.control}
                    data={category?.products}
                    isCol={true}
                    label="products"
                    name="products"
                    placeholder="Enter category products"
                    products={products} />
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
