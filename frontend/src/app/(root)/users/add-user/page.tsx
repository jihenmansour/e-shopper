import UsersForm from "@/components/users/UsersForm";
import React from "react";

const page = () => {
  return (
    <div>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-ibm-plex-serif font-bold text-black-1 ">
          Add user
        </h1>
      </header>
      <UsersForm />
    </div>
  );
};

export default page;
