export const sidebarLinks = [
  {
    route: "/",
    label: "Dashboard",
    icon: {
      color: "w-7 h-7 fill-none stroke-black group-hover:stroke-primary",
      open: "stroke-white",
      strokeLine: "round",
      strokeWidth: 2,
      d: "M8 17h8M11.018 2.764 4.235 8.039c-.453.353-.68.53-.843.75a2 2 0 0 0-.318.65C3 9.704 3 9.991 3 10.565V17.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8v-7.235c0-.574 0-.861-.074-1.126a2.002 2.002 0 0 0-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275c-.351-.273-.527-.41-.72-.462a1 1 0 0 0-.523 0c-.194.052-.37.189-.721.462Z",
    },
  },
  {
    icon: {
      color: "w-7 h-7 fill-none stroke-black group-hover:stroke-primary",
      open: "stroke-white",
      strokeLine: "round",
      strokeWidth: 2,
      d: "M9 12h12M9 4v16m-2.8 0h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 18.48 21 17.92 21 16.8V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 4 18.92 4 17.8 4H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 5.52 3 6.08 3 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 20 5.08 20 6.2 20Z",
    },
    label: "Categories",
    subMenuItems: [
      { route: "/categories/add-category", label: "Add Category" },
      { route: "/categories", label: "List Category" },
    ],
  },
  {
    icon: {
      color: "w-7 h-7 fill-black group-hover:fill-primary",
      open: "fill-white",
      viewBox: "0 0 512 512",
      d: "m256 34.347 192 110.85V366.9L256 477.752 64 366.9V145.198L256 34.347Zm-64.001 206.918.001 150.27 42.667 24.636V265.899l-42.668-24.634ZM106.667 192v150.267l42.666 24.635v-150.27L106.667 192Zm233.324-59.894-125.578 72.836L256 228.952l125.867-72.669-41.876-24.177ZM256 83.614l-125.867 72.669 41.662 24.053L297.374 107.5 256 83.614Z",
    },
    label: "Products",
    subMenuItems: [
      { route: "/products/add-product", label: "Add Product" },
      { route: "/products", label: "List Product" },
    ],
  },

  {
    icon: {
      color: "w-7 h-7 fill-none stroke-black group-hover:stroke-primary",
      open: "stroke-white",
      viewBox: "0 0 24 24",
      strokeLine: "round",
      strokeWidth: 2,
      d: "M10 15h4m-2-2v4m1-14H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 21 7.08 21 8.2 21h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 19.48 19 18.92 19 17.8V9m-6-6 6 6m-6-6v4.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C13.76 9 14.04 9 14.6 9H19",
    },
    label: "Orders",
    subMenuItems: [{ route: "/orders", label: "List Order" }],
  },
  {
    icon: {
      color: "w-7 h-7 fill-none stroke-black group-hover:stroke-primary",
      open: "stroke-white",
      stroke: "#000",
      strokeLine: "round",
      strokeWidth: 2,
      d: "M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z",
    },
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
    open: "fill-white",
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
    borderColor: "border-pink-400",
    backgroundColor: "bg-pink-25",
    textColor: "text-pink-500",
    circleBg:"bg-pink-400"
  },
  processing: {
    borderColor: "border-blue-400",
    backgroundColor: "bg-blue-25",
    textColor: "text-blue-500",
    circleBg:"bg-blue-400"
  },
  shipped: {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-500",
    textColor: "text-green-700",
    circleBg:"bg-green-400"
  },
  cancelled: {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-500",
    textColor: "text-red-700",
    circleBg:"bg-red-400"
  },
};

export const StatsCardStyle = {
  "Total sales": {
    Icon: {
      style: "w-8 h-8",
      fill:"none",
      stroke:"#ffff",
      strokeWidth:2,
      viewBox: "0 0 24 24",
      d: "M9 8a3 3 0 1 0 6 0M3 16.8V7.2c0-1.12 0-1.68.218-2.108.192-.377.497-.682.874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.107.218.377.192.683.497.875.874.218.427.218.987.218 2.105v9.607c0 1.118 0 1.677-.218 2.104a2.002 2.002 0 0 1-.875.874c-.427.218-.986.218-2.104.218H6.197c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C3 18.48 3 17.92 3 16.8Z",
    },
    IconBackground: "bg-green-500",
    ChartBorderColor: "#22C55E",
    ChartBackgroundColor: "#C2EFD2",
  },
  "Total incomes": {
    Icon: {
      style: "w-8 h-8",
      fill:"none",
      stroke:"#ffff",
      strokeWidth:2,
      viewBox: "0 0 24 24",
      d: "M18 8.5v-.146A3.354 3.354 0 0 0 14.646 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H9.427A3.427 3.427 0 0 1 6 15.573V15.5M12 3v18",
    },
    IconBackground: "bg-red-500",
    ChartBorderColor: "#FF5301",
    ChartBackgroundColor: "#FFD1BB",
  },
  "Total customers": {
    Icon: {
      style: "w-8 h-8",
      fill:"none",
      stroke:"#ffff",
      strokeWidth:2,
      viewBox: "0 0 24 24",
      d: "M13 20v-2a5 5 0 0 0-10 0v2h10Zm0 0h8v-1c0-2.945-2.239-5-5-5-1.413 0-2.69.626-3.6 1.631M11 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
    },
    IconBackground: "bg-blue-500",
    ChartBorderColor: "#2377FC",
    ChartBackgroundColor: "#CEE1FE",
  },
};
