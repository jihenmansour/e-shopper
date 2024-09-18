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
import { Checkbox } from "@/components/ui/checkbox";
import { deleteOrder,  updateOrder } from "@/lib/actions/order.actions";
import { apiURL, cn, createQueryString } from "@/lib/utils";
import { Eye, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrdersStatusStyles } from "../../../constants";
import { orderProps, OrdersTableProps, Status } from "../../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import CustomPagination from "../widgets/pagination";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { exportExcel } from "@/lib/actions/stats.actions";

const StatusBadge = ({ status }: { status: string }) => {
  const { backgroundColor, textColor } =
    OrdersStatusStyles[status as keyof typeof OrdersStatusStyles];

  return (
    <div
      className={cn(
        "flex rounded-full items-center justify-center p-1 gap-2 ",
        backgroundColor
      )}
    >
      <p className={cn("text-[14px] font-medium", textColor)}>{status}</p>
    </div>
  );
};

const OrdersTable = ({ orders }: { orders: OrdersTableProps }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [updatedOrder, setUpdatedOrder] = useState<orderProps>({status:"pending"})
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const searchFilterValue = searchParams.get("search");
  const { toast } = useToast();
  let message: string;
  let isSuccess: "Success" | "Error";

  const handleSelectAll = (checked: CheckedState) => {
    checked
    ? setSelectedItems(orders.data.map((item)=> item._id!))
    : setSelectedItems([]);
  }

  const handleSelect = (item: string, checked: CheckedState) => {
    checked
      ? setSelectedItems([...selectedItems, item!])
      : setSelectedItems(selectedItems?.filter((value) => value !== item));
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("orders", 
      JSON.stringify([...selectedItems]));
    form.append("updatedOrder", 
        JSON.stringify(updatedOrder));
    try {
      const response = await updateOrder(form);
      message = "order updated successfully";
      isSuccess = "Success";
    } catch (e) {
      message = "Cannot update this order";
      isSuccess = "Error";
    }
    toast({
      title: isSuccess,
      description: message,
    });
  }
  const handleDelete = async (id?: string) => {
    try {
      const response = await deleteOrder(id);
      message = "order deleted successfully";
      isSuccess = "Success";
    } catch (e) {
      message = "Cannot delete this order";
      isSuccess = "Error";
    }
    toast({
      title: isSuccess,
      description: message,
    });
  };
  const handleSearch = (e: any) => {
    router.push(
      path + "?" + createQueryString("search", e.target.value, searchParams)
    );
  };
  return (
    <>
      <div className="box">
        <div className="table-header">
        <div className="flex max-md:flex-col gap-2">
          <div className="table-header-item">
            <p className="text-tiny">change status to</p>
            <select onChange={(e)=> setUpdatedOrder({status:e.target.value as Status})}>
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="shipped">shipped</option>
              <option value="cancelled">cancelled</option>
            </select>
            <Button onClick={()=> {handleUpdate()}}>apply</Button>
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
             <div>
            <Button onClick={() => exportExcel(searchFilterValue!)}>
              Download excel
            </Button>
          </div>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox 
                  checked={orders.data.map((item)=> item._id!)
                    .every((item)=> selectedItems.includes(item))}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked)
                  }/>
                </TableHead>
                <TableHead className="w-[100px]">Customer</TableHead>
                <TableHead className="text-center">Content</TableHead>
                <TableHead>address</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data.length > 0 ? (
                orders.data.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems?.includes(order._id!)}
                        onCheckedChange={(checked) =>
                        handleSelect(order._id!, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="flex gap-1 orders-center">
                      <div className="w-12 h-12 rounded-sm ">
                        <Image
                          src={`${apiURL}/images/${order.user?.image}`}
                          alt=""
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-center">
                        <p className="font-semibold whitespace-nowrap">
                          {order.user?.fullname}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc flex flex-col items-center text-base">
                        {order.OrderItems?.map((item, index) => {
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
                      <StatusBadge status={order.status!} />
                    </TableCell>
                    <TableCell className="flex justify-end gap-4">
                      <Link href={`/orders/${order._id}`}>
                        <Eye className="text-green-500" />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div>
                            <Trash className="text-red-500" />
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
                ))
              ) : (
                <TableRow>
                  <TableCell className="w-full" colSpan={6}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <Search />
                      <p className="font-bold">No data found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {orders.data.length > 0 && (
          <CustomPagination
            page={orders.page}
            totalPages={orders.totalPages}
            nextPage={orders.nextPage}
            previousPage={orders.previousPage}
          />
        )}
      </div>
    </>
  );
};

export default OrdersTable;
