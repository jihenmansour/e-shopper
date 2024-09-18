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
import { deleteCategory } from "@/lib/actions/category.actions";
import { apiURL, createQueryString } from "@/lib/utils";
import { Pencil, Trash, Search } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import CustomPagination from "../widgets/pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { CatgoriesTableProps } from "../../../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

const CategoriesTable = ({
  categories,
}: {
  categories: CatgoriesTableProps;
}) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const searchFilterValue = searchParams.get("search");
  const { toast } = useToast();
  let message: string;
  let isSuccess: "Success" | "Error";
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteCategory(id);
      message = "category deleted successfully";
      isSuccess = "Success";
    } catch (e) {
      message = "Cannot delete this category";
      isSuccess = "Error";
    }
    toast({
      title: isSuccess,
      description: message,
    });

  };
  const handleSearch = (e: any) => {
    router.push(path + '?' + createQueryString('search', e.target.value, searchParams));
   }

  return (
    <>
     <div className="box">
        <div className="table-header">
          <Input 
          type="text"
          onChange={handleSearch}
          value={searchFilterValue!}
          placeholder="Search here..." />
          <Link href="/categories/add-category">
            <Button className="md:px-10">+ Add new</Button>
          </Link>
        </div>
        <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Category</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.data.length>0?(
            categories.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1 items-center">
                  <div className="w-12 h-12 rounded-sm ">
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
                  </div>
                  <p className="font-semibold">{item.name}</p>
                </TableCell>
                <TableCell className="text-center">
                  {item.description}
                </TableCell>
                <TableCell className="flex justify-end gap-4">
                  <Link href={`/categories/${item._id}`}>
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
            )))
            :
              <TableRow>
                <TableCell className="w-full" colSpan={3}>
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
        {categories.data.length>0&&
        <CustomPagination
          page={categories.page}
          totalPages={categories.totalPages}
          nextPage={categories.nextPage}
          previousPage={categories.previousPage}
        />
      }
      </div>
    </>
  );
};

export default CategoriesTable;
