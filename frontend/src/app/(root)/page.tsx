import CategoriesChart from "@/components/dashboard/CategoriesChart";
import OverviewSection from "@/components/dashboard/OverviewSection";
import { getProducts } from "@/lib/actions/product.actions";
import { getCategoriesStats, getStats } from "@/lib/actions/stats.actions";



const Dashboard = async () => {
  const stats = await getStats();
  const categories = await getCategoriesStats()
  const monthlyStats = stats.data;
  const products = await getProducts(1,5,"totalOrderedItems")

  return (
    <div className="flex flex-col gap-8">
      <OverviewSection stats={stats}/>
      <CategoriesChart categories={categories} data={monthlyStats} products={products.data}/>
      </div>
  );
};

export default Dashboard;
