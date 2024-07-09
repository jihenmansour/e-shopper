"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiURL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TopProductsTableProps } from "../../../types";

const TopProductsTable = ({ products }: TopProductsTableProps) => {
  return (
    <>
      <div className="  box flex flex-col gap-6 ">
        <div className="flex justify-between ">
          <h5 className="text-xl font-semibold">Top Products</h5>
          <Link href="/products?sort=totalOrderedItems">
            <p className="text-gray-500 text-sm">View all</p>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total ordered items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1 items-center">
                  <div className="w-12 h-12 rounded-sm ">
                    <Image
                      src={`${apiURL}/images/${item.images[0]}`}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold whitespace-nowrap">
                      {item.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {item.description}
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.totalOrderedItems}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TopProductsTable;
