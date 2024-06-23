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
    <div className=" bg-white flex flex-col justify-center p-8 rounded shadow-sm max-w-2xl w-full mx-auto">
      <h1 className="2xl:text-26 font-ibm-plex-serif text-[24px] font-bold max-xl:hidden;">
        Login to account
      </h1>
      <p className="text-gray-600 text-[14px] mb-10">
        Enter your email & password to login
      </p>
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
