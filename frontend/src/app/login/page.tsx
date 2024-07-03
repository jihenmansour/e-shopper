"use client";
import Login from "@/components/Login";
import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-screen grid grid-flow-row lg:grid-cols-2 items-center">
      <Login />
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
          className="absolute shadow-xl animate-infinite-bounce bottom-20 left-16"
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
