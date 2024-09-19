"use client";

import React from "react";
import Image from "next/image";
import LoginForm from "@/components/login/login-form";

function page() {
  return (
    <div className="min-h-screen grid grid-flow-row lg:grid-cols-2 items-center">
      <LoginForm/>
      <div className="flex h-screen w-full items-center justify-end relative  max-lg:hidden">
        <Image
          src="/images/main.png"
          alt=""
          className="rounded-xl absolute "
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <Image
          src="/images/products.png"
          alt=""
          className="absolute shadow-xl bottom-20 left-16"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '30%', height: 'auto' }}
        />
        </div>
      </div>
  );
}

export default page;
