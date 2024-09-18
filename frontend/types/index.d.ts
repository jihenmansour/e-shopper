import { UserInfo } from "os";

declare interface signUpProps {
  name: string;
  email: string;
  password: string;
}

declare interface addressProps {
  address?: string;
  state?: string;
  city?: string;
  zip?: string;
  country?: string;
}

declare interface userProps {
  _id?: string;
  fullname?: string;
  email: string;
  password?: string;
  address?: Array<addressProps>;
  role: "administrator" | "responsible" | "client";
  phone?: string;
  image?: any;
}

declare interface LoginProps {
  email: string;
  password?: string;
}

declare interface productProps {
  _id?: string;
  name?: string;
  price?: string;
  quantity?: string;
  description?: string;
  images: string[];
  categories: categoryProps[];
  totalOrderedItems?: number;
}

declare interface ProductsTableProps {
  data: productProps[];
  page: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}
declare interface CustomCardProps {
  product: productProps;
}

declare interface MenuItemProps {
  imgURL?: string;
  route?: string;
  label: string;
  subMenuItems?: MenuItemProps[];
  icon?: React.ComponentType;
}

declare interface SvgPros {
  title?: string;
  style?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  open?: string;
  d?: string;
  stroke?: string;
  strokeLine?: typeof SVGAttributes<SVGPathElement>;
  strokeWidth?: number | string;
  viewBox?: string;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}

declare interface UsersTableProps {
  data: userProps[];
  page: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type ToastProps = {
  open: boolean;
  close: () => void;
  message?: string;
  success?: boolean;
};

declare type ResponseProps = {
  error?: string;
  message?: string;
};

declare interface categoryProps {
  _id?: string;
  name?: string;
  description?: string;
  images: string[];
  products: productProps[];
}

declare interface CatgoriesTableProps {
  data: categoryProps[];
  page: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}

declare interface orderItem {
  product: productProps;
  quantity: number;
}

type Status = "pending" | "processing" | "shipped" | "cancelled";

declare interface orderProps {
  _id?: string;
  status?: Status;
  OrderItems?: orderItem [];
  total?: number;
  user?: userProps;
  shippingAddress?: string;
}


declare interface OrdersTableProps {
  data: orderProps[];
  page: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}

declare interface MonthlyStats {
  totalIncome: number;
  totalSales: number;
  month: number;
  category?:string,
  totalClients: number;
}
declare interface OverviewSectionProps {
  data: MonthlyStats[];
  totalIncome: number;
  totalSales: number;
  totalClients: number;
}

declare interface DashboardProps {
  stats: OverviewSectionProps;
  categories: MonthlyStats[];
  data: MonthlyStats[];
  products: productProps[]
}

declare interface LineChartCardProps {
  type: string;
  stats: Array<{month: number; total: number}>;
  total: number;
}

declare interface categoryStats {
  category: string;
  totalIncome: number;
  totalSales?: number;
}


declare interface CategoriesChartProps {
  categories: MonthlyStats[];
  data: MonthlyStats[];
  products?: productProps[]
}

declare interface TopProductsTableProps{
  products: productProps[];
}

declare interface ImagesProps{
  files?: File[],
  updatedImages?: string[]
}