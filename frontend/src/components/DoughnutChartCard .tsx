"use client";

import { formatMonth } from "@/lib/utils";
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(...registerables);

const DoughnutChartCard = ({ categories, data }: CategoriesChartProps) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const ThisMonthIndex = data?.findIndex((a) => a.month === currentMonth)!;
  const ThisMonthTotal = data[ThisMonthIndex]?data[ThisMonthIndex]?.totalIncome:0;
  
  const DaughnutData = {
    labels: categories.map((a) => a.category),
    datasets: [
      {
        label: "Categories dataset",
        data: categories.map((a) => a.totalIncome.toString()),
        backgroundColor: ["#2377FC", "#D3E4FE", "#BFD7FD"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          spacing: 20,
        },
      },
    },
  };
  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
      <h5 className="text-xl font-semibold">Sales By Category</h5>
      <div>
        <p className="text-gray-500 text-sm">
          Total {formatMonth(currentMonth)}, {currentYear}
        </p>
        <h5 className="text-xl font-semibold">{ThisMonthTotal}$</h5>
      </div>
      <Doughnut data={DaughnutData} options={options} />
    </div>
  );
};

export default DoughnutChartCard;
