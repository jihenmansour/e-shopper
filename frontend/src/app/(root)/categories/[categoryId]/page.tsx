import CategoriesForm from "@/components/categories/CategoriesForm";
import { getCategory } from "@/lib/actions/category.actions";
import { getAllproducts } from "@/lib/actions/product.actions";

const page = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;
  const category = await getCategory(categoryId);
  const products = await getAllproducts()
  return (
    <div>
      <CategoriesForm category={category} products={products}/>
    </div>
  );
};

export default page;
