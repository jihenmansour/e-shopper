import ProductsTable from "@/components/products/ProductsTable";
import { getProducts } from "@/lib/actions/product.actions";
import { Suspense } from "react";

const page = async ({ searchParams: { page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const products = await getProducts(currentPage);
  return (
    <div>
      <Suspense fallback={<p>Fetching data...</p>}>
        <ProductsTable products={products} />
      </Suspense>
    </div>
  );
};

export default page;
