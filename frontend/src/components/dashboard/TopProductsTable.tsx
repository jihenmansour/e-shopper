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

const TopProductsTable = ({ products }: TopProductsTable) => {
 

  return (
    <>
      <div className=" w-full overflow-auto bg-white rounded-xl flex flex-col gap-6 py-6 px-4">
        <div className="flex justify-between">
      <h5 className="text-xl font-semibold">Top Products</h5>
      <p className="text-gray-500 text-sm">
          View all
        </p>
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
                      src={`${apiURL}/images/${item.image}`}
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
