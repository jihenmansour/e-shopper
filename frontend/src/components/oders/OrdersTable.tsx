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
import { deleteOrder, exportExcel } from "@/lib/actions/order.actions";
import { apiURL, cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { OrdersStatusStyles, sharedIcons } from "../../../constants";
import CustomSvg from "../CustomSvg";
import CustomPagination from "../Pagination";
import Toast from "../Toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const StatusBadge = ({ status }: { status: string }) => {
  const { borderColor, backgroundColor, textColor, circleBg } =
    OrdersStatusStyles[status as keyof typeof OrdersStatusStyles];

  return (
    <div
      className={cn(
        "flex border-2 rounded-full items-center justify-center gap-2 ",
        backgroundColor,
        borderColor
      )}
    >
      <div className={cn("size-2 rounded-full", circleBg)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{status}</p>
    </div>
  );
};

const OrdersTable = ({ orders }: { orders: OrdersTableProps }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteOrder(id);
      setShowAlert(true);
      setMessage("order deleted successfully");
      setIsSuccess(true);
    } catch (e) {
      setShowAlert(true);
      setMessage("Cannot delete this order");
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
          <Button className="justify-end md:px-10" onClick={exportExcel}>
            Download excel
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Customer</TableHead>
              <TableHead className="text-center">Content</TableHead>
              <TableHead>address</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-1 orders-center">
                  <div className="w-12 h-12 rounded-sm ">
                    <Image
                     src={`${apiURL}/images/${order.user.image}`}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold whitespace-nowrap">
                      {order.user.fullname}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <ul className="list-disc flex flex-col items-center text-base">
                    {order.OrderItems.map((item, index) => {
                      return (
                        <li key={index}>
                          {item.quantity} + {item.product.name}
                        </li>
                      );
                    })}
                  </ul>
                </TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="flex justify-end gap-4">
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
                        <AlertDialogTitle>Delete product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this order ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDelete(order._id);
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
          page={orders.page}
          totalPages={orders.totalPages}
          nextPage={orders.nextPage}
          previousPage={orders.previousPage}
        />
      </div>
    </>
  );
};

export default OrdersTable;
