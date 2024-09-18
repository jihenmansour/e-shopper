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
import { Pencil, Search, Trash } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductsTableProps } from "../../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import CustomPagination from "../widgets/pagination";

const ProductsTable = ({ products }: { products: ProductsTableProps }) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sortFilterValue = searchParams.get("sort");
  const searchFilterValue = searchParams.get("search");
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
 const handleSearch = (e: any) => {
  router.push(path + '?' + createQueryString('search', e.target.value, searchParams));
 }
 

  return (
    <>
      <div className="box">
        <div className="table-header">
          <div className="flex max-md:flex-col gap-2">
          <div className="table-header-item">
            <p className="text-tiny">sort by</p>
            <select 
             onChange={handleSelect}
             value={sortFilterValue!}>
              <option value="createdAt">created at</option>
              <option value="totalOrderedItems">total ordered items</option>
              <option value="price">price</option>
            </select>
            </div>
            <div className="table-header-item">
            <p className="text-tiny">entries</p>
            <Input 
             type="text"
             onChange={handleSearch}
             value={searchFilterValue!}
            placeholder="Search here..." />
            </div>
            </div>
          <Link href="/products/add-product">
            <Button className="md:px-10">+ Add new</Button>
          </Link>
        </div>
        <div className="overflow-auto">
        <Table >
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
          {products.data.length>0?(
            products.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1 items-center">
                  <div className="w-12 h-12 rounded-sm ">
                    <Image
                      src={item.images.length>0?`${apiURL}/images/${item.images[0]}`:"/images/default-picture.png"}
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
                  <Pencil className="text-green-500"/>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div>
                      <Trash className="text-red-500"/>
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
            )))
            :
              <TableRow>
                <TableCell className="w-full" colSpan={6}>
                  <div className="flex flex-col gap-2 justify-center items-center">
                  <Search/>
                <p className="font-bold">No data found</p>
                </div>
                </TableCell>
                </TableRow>
          }
          </TableBody>
        </Table>
        </div>
        {products.data.length>0&&
        <CustomPagination
          page={products.page}
          totalPages={products.totalPages}
          nextPage={products.nextPage}
          previousPage={products.previousPage}
        />
        }
        
      </div>
    </>
  );
};

export default ProductsTable;
