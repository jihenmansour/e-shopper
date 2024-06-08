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
import avatar from '../../../public/images/avatar-profile.png'
import { apiURL } from "@/lib/utils";

const UsersTable = ({ users }: { users: UsersTableProps }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteUser(id);
      setShowAlert(true);
      setMessage("User deleted successfully");
      setIsSuccess(true);
    } catch (e) {
      setShowAlert(true);
      setMessage("Cannot delete this user");
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
                    <img src={item.image?`${apiURL}/images/${item.image}`: avatar.src} alt="" className="object-cover h-full w-full rounded-sm"/>
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
