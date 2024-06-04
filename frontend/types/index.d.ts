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
  country?: string
}

declare interface userProps {
  _id?: string
  fullname?: string;
  email: string;
  password: string;
  address?:Array<addressProps>;
  role?: string;
  phone?: string;
  }


declare interface LoginProps {
    email: string;
    password: string;
  }

declare interface productProps {
    _id?: string;
    name?: string;
    price?: string;
    quantity?: string;
    description?: string;
    image?: any;
  }

declare interface CustomCardProps {
    product: productProps;
  }
  
declare interface ProductSectionProps {
    products: productProps[];
  }

  declare interface MenuItemProps {
    imgURL?: string;
    route: string;
    label: string;
    subMenuItems?: MenuItemProps[];
    icon?: SvgPros;
  }

declare interface SvgPros {
  title?: string;
  style?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  d?: string;
  stroke?: string;
  strokeLine?: typeof SVGAttributes<SVGPathElement>;
  strokeWidth?: number | string;
  viewBox?: string
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
 }

declare interface UsersTableProps{
  data: userProps[];
  page: number;
  total:number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}