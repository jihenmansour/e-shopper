
import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/actions/product.actions";
import { Suspense } from "react";
import { SearchParamProps } from "../../../../types";

const page = async ({ searchParams: { page, sort, search  } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const sortFilter = sort as string;
  const searchFilter = search as string;
  const products = await getProducts(currentPage,10,sortFilter,searchFilter);
  return (
    <div>
        <h3 >
          Products list
        </h3>
        <ProductsTable products={products} />
    </div>
  );
};

export default page;
