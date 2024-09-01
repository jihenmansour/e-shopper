import { Home, Layers, ShoppingCart, FileClock, User, Users, DollarSign, ShoppingBag  } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/dashboard",
    label: "Dashboard"
  },
  {
    icon: Layers,
    label: "Categories",
    subMenuItems: [
      { route: "/categories/add-category", label: "Add Category" },
      { route: "/categories", label: "List Category" },
    ],
  },
  {
    icon: ShoppingCart ,
    label: "Products",
    subMenuItems: [
      { route: "/products/add-product", label: "Add Product" },
      { route: "/products", label: "List Product" },
    ],
  },

  {
    icon: FileClock,
    label: "Orders",
    subMenuItems: [{ route: "/orders", label: "List Order" }],
  },
  {
    icon: User,
    label: "Users",
    subMenuItems: [
      { route: "/users/add-user", label: "Add User" },
      { route: "/users", label: "List User" },
    ],
  },
];

export const sharedIcons = {
  arrow: {
    color: "w-7 h-7 fill-black group-hover:fill-primary",
    open: "fill-primary",
    viewBox: "0 0 24 24",
    width: 5,
    height: 5,
    d: "M5.707 9.71a1 1 0 0 0 0 1.415l4.892 4.887a2 2 0 0 0 2.828 0l4.89-4.89a1 1 0 1 0-1.414-1.415l-4.185 4.186a1 1 0 0 1-1.415 0L7.121 9.71a1 1 0 0 0-1.414 0Z",
  },
  menu: {
    viewBox: "0 0 20 20",
    color: "#000",
    fillRule: "evenodd",
    d: "M19 4a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1zm0 6a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h16a1 1 0 0 1 1 1zm-1 7a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h16z",
  },

  pen: {
    title: "pen",
    color: "none",
    viewBox: "0 0 24 24",
    stroke: "#22c55e",
    strokeLine: "round",
    strokeWidth: 1.5,
    d: "m15.5 5.5 2.828 2.83M13 21h8M3 21l.047-.332c.168-1.175.252-1.763.443-2.311.17-.487.401-.95.69-1.378.323-.482.743-.902 1.583-1.741L17.41 3.59a2 2 0 0 1 2.828 2.828L8.377 18.28c-.761.761-1.142 1.142-1.576 1.445-.385.269-.8.492-1.237.664-.492.193-1.02.3-2.076.513L3 21Z",
  },

  trash: {
    title: "trash",
    color: "none",
    viewBox: "0 0 24 24",
    stroke: "#ff5200",
    strokeLine: "round",
    strokeWidth: 1.5,
    d: "M18 6v10.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C15.72 21 14.88 21 13.2 21h-2.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C6 18.72 6 17.88 6 16.2V6M4 6h16m-4 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 6",
  },

  logout: {
    title: "logout",
    viewBox: "0 -0.5 25 25",
    d: "M11.75 9.874a.75.75 0 0 0 1.5 0h-1.5ZM13.25 4a.75.75 0 0 0-1.5 0h1.5ZM9.81 6.662a.75.75 0 0 0-.62-1.366l.62 1.366ZM5.5 12.16l-.75-.004v.013l.75-.009Zm7 6.84.009-.75h-.018l.009.75Zm7-6.84.75.009v-.013l-.75.004Zm-3.69-6.864a.75.75 0 1 0-.62 1.366l.62-1.366Zm-2.56 4.578V4h-1.5v5.874h1.5ZM9.19 5.296a7.581 7.581 0 0 0-4.44 6.86l1.5.008a6.081 6.081 0 0 1 3.56-5.502l-.62-1.366ZM4.75 12.17a7.671 7.671 0 0 0 7.759 7.581l-.018-1.5a6.17 6.17 0 0 1-6.241-6.099l-1.5.018Zm7.741 7.581a7.67 7.67 0 0 0 7.759-7.581l-1.5-.018a6.171 6.171 0 0 1-6.241 6.099l-.018 1.5Zm7.759-7.594a7.581 7.581 0 0 0-4.44-6.86l-.62 1.366a6.081 6.081 0 0 1 3.56 5.502l1.5-.008Z",
  },
};

export const OrdersStatusStyles = {
  pending: {
    backgroundColor: "bg-pink-100",
    textColor: "text-pink-500"
  },
  processing: {
    backgroundColor: "bg-blue-100",
    textColor: "text-blue-500"
  },
  shipped: {
    backgroundColor: "bg-green-100",
    textColor: "text-green-700"
  },
  cancelled: {
    backgroundColor: "bg-red-100",
    textColor: "text-red-700"
  },
};

export const StatsCardStyle = {
  "Total sales": {
    Icon: ShoppingBag ,
    IconBackground: "bg-green-500",
    ChartBorderColor: "#22C55E",
    ChartBackgroundColor: "#C2EFD2",
  },
  "Total incomes": {
    Icon: DollarSign ,
    IconBackground: "bg-red-500",
    ChartBorderColor: "#FF5301",
    ChartBackgroundColor: "#FFD1BB",
  },
  "Total customers": {
    Icon: Users,
    IconBackground: "bg-blue-500",
    ChartBorderColor: "#2377FC",
    ChartBackgroundColor: "#CEE1FE",
  },
};
