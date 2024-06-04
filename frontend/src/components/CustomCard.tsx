import Image from "next/image";
import React, { FC, useState } from "react";


const CustomCard: FC<CustomCardProps> = ({ product }) => {

  return (
    <div className="group my-5 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
    <a className="relative flex h-40 overflow-hidden" href="#">
      {/* <Image className="absolute top-0 right-0 h-full w-full object-cover" src={`data:image/jpeg;base64,${product.image?.data?.data}`} unoptimized  alt="product image" /> */}
    </a>
    <div className="mt-4 px-5 pb-5">
      <a href="#">
        <h5 className="text-md tracking-tight text-slate-900">{product.name}</h5>
      </a>
      <div className="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span className="text-xl font-bold text-slate-900">{product.price} DT</span>
        </p>
      </div>
      <button className="group mb-2 flex h-10 w-full items-stretch font-bold overflow-hidden rounded-md text-blue-600">
          <div className="flex w-full items-center justify-center bg-blue-100 text-xs uppercase transition">Add</div>
          <div className="flex items-center justify-center bg-blue-50 px-5 transition">+</div>
        </button>
    </div>
  </div>
  
  );
};

export default CustomCard;
