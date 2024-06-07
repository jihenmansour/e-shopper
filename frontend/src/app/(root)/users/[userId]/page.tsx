import UsersForm from "@/components/users/UsersForm";
import { getUser } from "@/lib/actions/user.actions";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUser(userId);
  return (
    <div>
      <UsersForm user={user}/>
    </div>
  );
};

export default page;
