import { apiURL } from "@/lib/utils";
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

const status = [
  { type: "pending", message: "Receiving orders" },
  { type: "processing", message: "Order processing" },
  { type: "shipped" , message: "Delivered" }
];
const OrderDetail = ({ order }: { order: orderProps }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className=" w-full overflow-auto bg-white rounded-xl flex flex-col gap-6 py-6 px-4">
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
            {order.OrderItems.map((item, index) => (
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
                $2,500.00
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className=" w-full overflow-auto bg-white rounded-xl flex flex-col gap-6 py-6 px-4">
        <ol className="items-center sm:flex">
          {status.map((item, index) => {
            return (
              <li className="relative mb-6 sm:mb-0 w-full flex items-center" key={index}>
                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center p-5 bg-blue-100 rounded-full  hrink-0">
                    <Check />
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pe-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.message}
                  </h3>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default OrderDetail;
