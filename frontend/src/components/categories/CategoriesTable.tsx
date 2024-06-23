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
import { deleteUser } from "@/lib/actions/user.actions";
import { useState } from "react";
import { sharedIcons } from "../../../constants";
import CustomSvg from "../CustomSvg";
import CustomPagination from "../Pagination";
import Toast from "../Toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import avatar from '../../../public/images/avatar-category.png'
import { apiURL } from "@/lib/utils";
import { deleteCategory } from "@/lib/actions/category.actions";

const CategoriesTable = ({ categories }: { categories: CatgoriesTableProps }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteCategory(id);
      setShowAlert(true);
      setMessage("Category deleted successfully");
      setIsSuccess(true);
    } catch (e) {
      setShowAlert(true);
      setMessage("Cannot delete this category");
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
          <Link href="/categories/add-category">
            <Button className="justify-end md:px-10">+ Add new</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Category</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1 items-center">
                  <div className="w-12 h-12 rounded-sm ">
                    <img src={item.image?`${apiURL}/images/${item.image}`: avatar.src} alt="" className="object-cover h-full w-full rounded-sm"/>
                  </div>
                    <p className="font-semibold">{item.name}</p>

                </TableCell>
                <TableCell className="text-center">{item.description}</TableCell>
                <TableCell className="flex justify-end gap-4">
                  <Link href={`/categories/${item._id}`}>
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
                        <AlertDialogTitle>Delet category</AlertDialogTitle>
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
          page={categories.page}
          totalPages={categories.totalPages}
          nextPage={categories.nextPage}
          previousPage={categories.previousPage}
        />
      </div>
    </>
  );
};

export default CategoriesTable;
