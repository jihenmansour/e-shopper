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
import { apiURL } from "@/lib/utils";
import { Pencil, Trash } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import CustomPagination from "../Pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const UsersTable = ({ users }: { users: UsersTableProps }) => {
  const { toast } = useToast();
  let message: string;
  let isSuccess: "Success" | "Error";
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteUser(id);
      message = "user deleted successfully";
      isSuccess = "Success";
    } catch (e) {
      message = "Cannot delete this user";
      isSuccess = "Error";
    }
    toast({
      title: isSuccess,
      description: message,
    });
  };

  return (
    <>
      <div className=" w-full overflow-auto bg-white rounded-sm py-6 px-4">
        <div className="flex justify-between mb-2">
          <Input
            className="w-1/3 max-lg:w-1/2"
            type="text"
            placeholder="Search here..."
          />
          <Link href="/users/add-user">
            <Button className="justify-end md:px-10">+ Add new</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1">
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
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.fullname}</p>
                    <p className="font-sm text-gray-400">{item.role}</p>
                  </div>
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="flex justify-end gap-4">
                  <Link href={`/users/${item._id}`}>
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
                        <AlertDialogTitle>Delet user</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {item.fullname} ?
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
          page={users.page}
          totalPages={users.totalPages}
          nextPage={users.nextPage}
          previousPage={users.previousPage}
        />
      </div>
    </>
  );
};

export default UsersTable;
