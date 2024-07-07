
import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/actions/product.actions";
import { Suspense } from "react";

const page = async ({ searchParams: { page, sort  } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const sortFilter = sort as string;
  const products = await getProducts(currentPage,10,sortFilter);
  return (
    <div>
      <Suspense fallback={<p>Fetching data...</p>}>
        <ProductsTable products={products} />
      </Suspense>
    </div>
  );
};

export default page;
