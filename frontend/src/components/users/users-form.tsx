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
import InputField from "../ui/input-field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { userProps } from "../../../types";

const UsersForm = ({ user }: { user?: userProps }) => {
  const { toast } = useToast();
  const router = useRouter();
  let response: { error: string | undefined; message: string | undefined };
  let message: string;

  const authformSchema = formSchema(user ? "edit user" : "");

  const form = useForm<z.infer<typeof authformSchema>>({
    resolver: zodResolver(authformSchema),
  });
  const onSubmit = async (data: z.infer<typeof authformSchema>) => {
    const form = new FormData();

    form.append("image", data.image);
    form.append("data", JSON.stringify(data));
    try {
      if (user) {
        response = await updateUser({ id: user._id, user: form });
      } else {
        response = await register(form);
      }

      if (response.error) {
        message = response.error;
        toast({
          title: "Error",
          description: message,
        });
      } else {
        message = response.message!;
        router.push("/users");
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
              <div className="flex flex-col md:w-1/2">
                <h1>Account</h1>
                <p className="body-text">
                  Fill in the information below to add a new account
                </p>
              </div>
              <div className="w-full">
                <div className="grid-cols-2 mt-3 gap-8 md:grid">
                  <InputField
                    control={form.control}
                    name="email"
                    label="Email"
                    data={user?.email}
                    placeholder="Enter your email"
                  />
                  <InputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <InputField
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
                              <SelectValue placeholder="Choose a role" />
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

            <div className="box md:flex md:gap:4">
              <div className="flex flex-col md:w-1/2">
                <h1>Additional Details</h1>
                <p className="body-text">
                  Add more details to make your profile complete
                </p>
              </div>
              <div className="w-full">
                <div className="grid-cols-2 mt-3 gap-8 md:grid">
                  <InputField
                    control={form.control}
                    name={`address.${0}.country`}
                    label="Country"
                    data={user?.address![0]?.country}
                    placeholder="Enter your country"
                  />
                  <InputField
                    control={form.control}
                    name={`address.${0}.state`}
                    label="State"
                    data={user?.address![0]?.state}
                    placeholder="Enter your state"
                  />
                  <InputField
                    control={form.control}
                    name={`address.${0}.city`}
                    label="City"
                    data={user?.address![0]?.city}
                    placeholder="Enter your city"
                  />
                  <InputField
                    control={form.control}
                    name={`address.${0}.address`}
                    label="Address"
                    data={user?.address![0]?.address}
                    placeholder="Enter your full address"
                  />
                  <InputField
                    control={form.control}
                    name={`address.${0}.zip`}
                    label="Zip"
                    data={user?.address![0]?.zip}
                    placeholder="Enter your zip"
                  />
                  <InputField
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
              {user ? <p>update</p> : <p>create</p>}
            </Button>
          </form>
        </Form>
      </>
    </>
  );
};

export default UsersForm;
