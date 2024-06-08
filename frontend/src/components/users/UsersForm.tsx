"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register, updateUser } from "@/lib/actions/user.actions";
import { formSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CustomInput from "../CustomInput";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCallback, useEffect, useState } from "react";
import Toast from "../Toast";

const UsersForm = ({user}: {user?:userProps}) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();
 
  const authformSchema = formSchema(user?'edit user': '');

  const form = useForm<z.infer<typeof authformSchema>>({
    resolver: zodResolver(authformSchema),
  });
  let response: { error: string | undefined; message: string | undefined; };
  const onSubmit = async (data: z.infer<typeof authformSchema>) => {
    const form = new FormData();

    form.append("image", data.image);
    form.append("data", JSON.stringify(data));
    try {
      setShowAlert(true);
      if(user){
      response = await updateUser({id: user._id, user: form})
      }else{
      response = await register(form);
    }

    if (response.error) {
      setIsSuccess(false);
      setMessage(response.error);
      
    } else {
      setIsSuccess(true);
      setMessage(response.message);
     
    }
    
    } catch (error) {
     console.log(error)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="md:flex md:gap:4 bg-white py-6 px-4 rounded-sm">
                <div className="flex flex-col w-1/2">
                   <h1 className="text-lg font-bold">
                      Account
                   </h1>
                   <p className="text-gray-600 text-[14px]">Fill in the information below to add a new account</p>
                </div>
                <div className="w-full">
                <div className="grid-cols-2 mt-3 gap-8 md:grid">
                <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    data={user?.email}
                    placeholder="Enter your email"
                  />
                   <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                    <CustomInput
                    control={form.control}
                    name="fullname"
                    label="Full name"
                    data={user?.fullname}
                    placeholder="Enter your full name"
                  />
                    <FormField
                    control={form.control}
                    name="role"
                    defaultValue={user?.role}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue 
                              placeholder="Choose a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="administrator">
                              administrator
                            </SelectItem>
                            <SelectItem value="responsible">
                              responsible
                            </SelectItem>
                            <SelectItem value="client">client</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 

                </div>

                </div>
              </div>




              <div className="md:flex md:gap:4 bg-white py-6 px-4 rounded-sm">
                <div className="flex flex-col w-1/2">
                   <h1 className="text-lg font-bold">
                   Additional Details
                   </h1>
                   <p className="text-gray-600 text-[14px]">Add more details to make your profile complete</p>
                </div>
                <div className="w-full">
                <div className="grid-cols-2 mt-3 gap-8 md:grid">
                <CustomInput
                    control={form.control}
                    name={`address.${0}.country`}
                    label="Country"
                    data={user?.address![0]?.country}
                    placeholder="Enter your country"
                  />
                  <CustomInput
                    control={form.control}
                    name={`address.${0}.state`}
                    label="State"
                    data={user?.address![0]?.state}
                    placeholder="Enter your state"
                  />
                  <CustomInput
                    control={form.control}
                    name={`address.${0}.city`}
                    label="City"
                    data={user?.address![0]?.city}
                    placeholder="Enter your city"
                  />
                   <CustomInput
                    control={form.control}
                    name={`address.${0}.address`}
                    label="Address"
                    data={user?.address![0]?.address}
                    placeholder="Enter your full address"
                  />
                   <CustomInput
                    control={form.control}
                    name={`address.${0}.zip`}
                    label="Zip"
                    data={user?.address![0]?.zip}
                    placeholder="Enter your zip"
                  />
                  <CustomInput
                    control={form.control}
                    name="phone"
                    label="Phone"
                    data={user?.phone}
                    placeholder="Enter your phone"
                  />
                 <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Picture</FormLabel>
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
                      </FormItem>
                    )}
                  />

                </div>

                </div>
              </div>


  
                <Button className="ml-auto mt-4" type="submit">
                  {user? 
                  <p>update</p>: 
                  <p>create</p>}
                </Button>
            </form>
          </Form>
        </>
    </>
  );
};

export default UsersForm;
