import Dashboard from "@/components/dashboard";
import { getProducts } from "@/lib/actions/product.actions";
import { getCategoriesStats, getStats } from "@/lib/actions/stats.actions";



const Home = async () => {
  const stats = await getStats();
  const categories = await getCategoriesStats()
  const monthlyStats = stats.data;
  const products = await getProducts(1,5,"totalOrderedItems")

  return (
    <div className="flex flex-col gap-8">
      <Dashboard stats={stats} categories={categories} data={monthlyStats} products={products.data}/>
      </div>
  );
};

export default Home;
