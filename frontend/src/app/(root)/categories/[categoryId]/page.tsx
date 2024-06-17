import CategoriesForm from "@/components/categories/CategoriesForm";
import { getCategory } from "@/lib/actions/category.actions";

const page = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;
  const category = await getCategory(categoryId);
  return (
    <div>
      <CategoriesForm category={category}/>
    </div>
  );
};

export default page;
