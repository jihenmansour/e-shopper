"use client"

import React, { FC } from "react";
import CustomCard from "../CustomCard";
import { Button } from "../ui/button";

const ProductSection: FC<ProductSectionProps> = ({ products }) => {

  return (
    <div className="px-4">
      <header className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">
            Products
          </h1>
          <div className="flex items-center py-4 justify-end">
            <Button variant="outline">view all products</Button>
          </div>
        </div>
      </header>

      <section className=" text-gray-700 ">
        <div className="mx-auto max-w-screen-xl ">
          <div className=" grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 ">
            {products.slice(0,8).map((product, index) => (
              <CustomCard product={product} key={index}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSection;
