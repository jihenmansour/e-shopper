import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { sharedIcons } from "../../../constants";
import CustomSvg from "../CustomSvg";
import CustomPagination from "../Pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useLoader } from "@/lib/hooks/LoaderProvider";

const UsersTable = ({users}:{users:UsersTableProps}) => {


  return (
    <div className="relative w-full overflow-auto bg-white rounded-sm py-6 px-4">
      <div className="flex justify-between mb-2">
      <Input className="w-1/3 max-lg:w-1/2" type="text" placeholder="Search here..."/>
      <Link href='/users/add-user'>
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
            <TableCell className="flex flex-col gap-1">
              <p className="font-semibold">{item.fullname}</p>
              <p className="font-sm text-gray-400">{item.role}</p>
              </TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell className="flex justify-end gap-4">
              {sharedIcons.actions.map((item)=> {
                return     <CustomSvg
                title={item.title}
                style="w-6 h-6"
                color={item.color}
                d={item.d}
                stroke={item.stroke}
                strokeLine={item.strokeLine}
                strokeWidth={item.strokeWidth}
                viewBox={item.viewBox}
              />
              })}
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
  )
}
 export default UsersTable;