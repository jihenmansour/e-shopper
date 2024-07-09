

import ProductsForm from "@/components/products/products-form";
import { getAllcategories } from "@/lib/actions/category.actions";
import { getProduct } from "@/lib/actions/product.actions";

const page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const product = await getProduct(productId);
  const categories = await getAllcategories()
  return (
    <div>
        <h3 >
          Update product
        </h3>
      <ProductsForm product={product} categories={categories}/>
    </div>
  );
};

export default page;
