"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { deleteProduct } from "@/lib/actions/product.actions";
import { apiURL, createQueryString } from "@/lib/utils";
import { Pencil, Trash } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CustomPagination from "../Pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const ProductsTable = ({ products }: { products: ProductsTableProps }) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sortFilterValue = searchParams.get("sort");
  const { toast } = useToast();
  let message: string;
  let isSuccess: "Success" | "Error";

  
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteProduct(id);
      message = "product deleted successfully";
      isSuccess = "Success";
    } catch (e) {
      message = "Cannot delete this product";
      isSuccess = "Error";
    }
    toast({
      title: isSuccess,
      description: message,
    });
  };


 const handleSelect = (e: any) => {
  router.push(path + '?' + createQueryString('sort', e.target.value, searchParams));
 }

  return (
    <>
      {/* <Toast
        open={showAlert}
        close={() => {
          setShowAlert(false);
        }}
        message={message}
        success={isSuccess}
      /> */}
      <div className=" w-full overflow-auto bg-white rounded-sm py-6 px-4">
        <div className="flex justify-between mb-2">
          <div className="flex gap-2  items-center">
            <p className="text-gray-500 text-sm whitespace-nowrap">sort by</p>
            <select 
            className="border border-gray-300 rounded-md p-1 cursor-pointer"
             onChange={handleSelect}
             value={sortFilterValue!}>
              <option value="createdAt">created at</option>
              <option value="totalOrderedItems">total ordered items</option>
              <option value="price">price</option>
            </select>
            <p className="text-gray-500 text-sm whitespace-nowrap">entries</p>
            <Input type="text" placeholder="Search here..." />
          </div>
          <Link href="/products/add-product">
            <Button className="justify-end md:px-10">+ Add new</Button>
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((item, index) => (
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
                <TableCell className="flex justify-end gap-4">
                  <Link href={`/products/${item._id}`}>
                  <Pencil color="#22c55e"/>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div>
                      <Trash color="#ff5200"/>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delet product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {item.name} ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CustomPagination
          page={products.page}
          totalPages={products.totalPages}
          nextPage={products.nextPage}
          previousPage={products.previousPage}
        />
      </div>
    </>
  );
};

export default ProductsTable;
