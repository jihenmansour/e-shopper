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
import { apiURL } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { sharedIcons } from "../../../constants";
import avatar from '../../../public/images/avatar-category.png';
import CustomSvg from "../CustomSvg";
import CustomPagination from "../Pagination";
import Toast from "../Toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProductsTable = ({ products }: { products: ProductsTableProps }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteProduct(id);
      setShowAlert(true);
      setMessage("product deleted successfully");
      setIsSuccess(true);
    } catch (e) {
      setShowAlert(true);
      setMessage("Cannot delete this product");
    }
  };


  return (
    <>
      <Toast
        open={showAlert}
        close={() => {
          setShowAlert(false);
        }}
        message={message}
        success={isSuccess}
      />
      <div className=" w-full overflow-auto bg-white rounded-sm py-6 px-4">
        <div className="flex justify-between mb-2">
          <Input
            className="w-1/3 max-lg:w-1/2"
            type="text"
            placeholder="Search here..."
          />
          <Link href="/products/add-product">
            <Button className="justify-end md:px-10">+ Add new</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Category</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead >Price</TableHead>
              <TableHead >Quantity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1 items-center">
                  <div className="w-12 h-12 rounded-sm ">
                    <img src={item.image?`${apiURL}/images/${item.image}`: avatar.src} alt="" className="object-cover h-full w-full rounded-sm"/>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold whitespace-nowrap">
                      {item.name}
                    </p>
                  </div>

                </TableCell>
                <TableCell className="text-center">{item.description}</TableCell>
                <TableCell >{item.price}</TableCell>
                <TableCell >{item.quantity}</TableCell>
                <TableCell className="flex justify-end gap-4">
                  <Link href={`/products/${item._id}`}>
                    <CustomSvg
                      title={sharedIcons.pen.title}
                      style="w-6 h-6 cursor-pointer"
                      color={sharedIcons.pen.color}
                      d={sharedIcons.pen.d}
                      stroke={sharedIcons.pen.stroke}
                      strokeLine={sharedIcons.pen.strokeLine}
                      strokeWidth={sharedIcons.pen.strokeWidth}
                      viewBox={sharedIcons.pen.viewBox}
                    />
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div>
                        <CustomSvg
                          title={sharedIcons.trash.title}
                          style="w-6 h-6 cursor-pointer"
                          color={sharedIcons.trash.color}
                          d={sharedIcons.trash.d}
                          stroke={sharedIcons.trash.stroke}
                          strokeLine={sharedIcons.trash.strokeLine}
                          strokeWidth={sharedIcons.trash.strokeWidth}
                          viewBox={sharedIcons.trash.viewBox}
                        />
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
