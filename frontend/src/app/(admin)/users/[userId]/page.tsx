
import UsersForm from "@/components/users/users-form";
import { getUser } from "@/lib/actions/user.actions";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUser(userId);
  return (
    <div>
        <h3 >
          Update user
        </h3>
      <UsersForm user={user}/>
    </div>
  );
};

export default page;
