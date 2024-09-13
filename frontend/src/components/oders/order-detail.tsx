import { apiURL, cn } from "@/lib/utils";
import Image from "next/image";
import { orderProps } from "../../../types";
import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const statuses = [
  { type: "pending", message: "Receiving orders" },
  { type: "processing", message: "Order processing" },
  { type: "shipped", message: "Delivered" },
];
const OrderDetail = ({ order }: { order: orderProps }) => {
  const currentStatus = statuses.findIndex(item => item.type === order.status);
 
  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-md:flex-col gap-5">
        <div className=" box overflow-auto h-full flex flex-col">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead colSpan={2} className="text-center">
                  Quantity
                </TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.OrderItems?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-1 items-center">
                    <div className="w-12 h-12 rounded-sm ">
                      <Image
                        src={`${apiURL}/images/${item.product.images[0]}`}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="font-semibold whitespace-nowrap">
                        {item.product.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell colSpan={2} className="text-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.product.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-bold">
                <TableCell colSpan={3}>Total price</TableCell>
                <TableCell className="text-right text-red-500">
                  {order.total}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div>
            
          </div>
        </div>
        <div className="flex gap-5 flex-col md:w-1/3">
          <div className="box">
            <h1 className="mb-2">Customer:</h1>
            <div className="grid grid-cols-2 gap-4">
              <p className="body-text">Full name</p>
              <p className="text-sm">{order.user?.fullname}</p>

              <p className="body-text">Phone number</p>
              <p className="text-sm">{order.user?.phone}</p>

              <p className="body-text">Address</p>
              <p className="text-sm">{order.user?.address![0]?.address}</p>
            </div>
          </div>

          <div className="box">
            <h1 className="mb-2">Shipping Address:</h1>
             <p className="body-text">{order.shippingAddress}</p>
          </div>
        </div>
      </div>
      <div className=" box">
        <div>
          <div className="timeline">
            {statuses.map((item, index) => {
              const isCompleted = currentStatus>=index;
             return( <div key={index} className="timeline-status">
                <div className="flex items-center">
                  <hr className={cn("bg-gray-300",
                   {"bg-primary": isCompleted})}/>
                  <div 
                  className={cn("timeline-status-icon bg-gray-300",
                   {"bg-primary": isCompleted})}>
                    <Check />
                  </div>
                  <hr className={cn("bg-gray-300",
                   {"bg-primary": isCompleted})}/>
                </div>
                <h1 className="text-center">{item.message}</h1>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
