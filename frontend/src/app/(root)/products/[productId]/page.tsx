import CategoriesForm from "@/components/categories/CategoriesForm";
import ProductsForm from "@/components/products/ProductsForm";
import { getAllcategories, getCategory } from "@/lib/actions/category.actions";
import { getAllproducts, getProduct } from "@/lib/actions/product.actions";

const page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const product = await getProduct(productId);
  const categories = await getAllcategories()
  return (
    <div>
      <ProductsForm product={product} categories={categories}/>
    </div>
  );
};

export default page;
