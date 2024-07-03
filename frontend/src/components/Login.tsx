"use client";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { login } from "@/lib/actions/user.actions";
import { formSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CustomInput from "./CustomInput";
import Image from "next/image";

export default function Home() {
  const useFormSchema = formSchema("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<String>();

  const form = useForm<z.infer<typeof useFormSchema>>({
    resolver: zodResolver(useFormSchema),
  });

  useEffect(() => {
    setMessage("");
  }, [form.control._formValues]);

  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof useFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await login(values);
      if (response) router.push("/");
      // else setMessage('Email or Password incorrect')
    } catch (error) {
      console.log("error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center p-8 rounded shadow-sm max-w-2xl w-full mx-auto items-center">
      <Image 
          src="/images/e-shopper logo(3).png"
          alt=""
          width={0}
          height={0}
          className="mb-8"
          sizes="100vw"
          style={{ width: '50%', height: 'auto' }}
        />
      <h1 className="2xl:text-26 font-ibm-plex-serif text-[24px] font-bold max-xl:hidden;">
        Login to account
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" w-full flex flex-col gap-4"
        >
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email address"
          />
          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
          />
          <FormMessage className="form-message mt-2">{message}</FormMessage>
          <Button type="submit" disabled={isLoading} className="font-bold ">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              <>Login</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
