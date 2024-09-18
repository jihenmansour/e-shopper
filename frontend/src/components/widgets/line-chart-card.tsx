import { cn, formatMonth } from "@/lib/utils";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { StatsCardStyle } from "../../../constants";
import { LineChartCardProps } from "../../../types";

ChartJS.register(...registerables);

const LineChartCard = ({type, stats}: LineChartCardProps) => {
  const { Icon, IconBackground, ChartBorderColor, ChartBackgroundColor } =
    StatsCardStyle[type as keyof typeof StatsCardStyle];
    console.log(stats)
  const months = stats.map((a) => formatMonth(a.month!));
  const totals = stats.map((a) => a.total);
  console.log(totals)
  const currentMonth = new Date().getMonth()+1;
  const ThisMonthIndex =  stats?.findIndex(a => a.month === currentMonth)!;
  const LastMonthIndex =  stats?.findIndex(a => a.month === currentMonth-1)!;
  const ThisMonthTotal = stats[ThisMonthIndex].total;
  const LastMonthTotal = stats[LastMonthIndex]?stats[LastMonthIndex].total:0;
  const growthRate = LastMonthTotal?(
    ((ThisMonthTotal! - LastMonthTotal!) / LastMonthTotal!) *
    100
  ).toFixed(2):0;

  const dataset = {
    labels: months,
    datasets: [
      {
        label: type,
        data: totals,
        fill: true,
        borderColor: ChartBorderColor,
        backgroundColor: ChartBackgroundColor,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    aspectRatio: 4,
  };
  return (
    <div className=" bg-white rounded-xl p-2 flex flex-col gap-4 ">
      <div className="flex justify-between">
        <div className="flex gap-[14px]">
          <div
            className={cn(
              "w-14 h-14 flex items-center justify-center rounded-full text-white",
              IconBackground
            )}
          >
          <Icon/>  
          </div>
          <div>
            <p>{type}</p>
            <h4 className="font-semibold text-xl">
              {type === "Total incomes"
                ? `${ThisMonthTotal} $`
                : ThisMonthTotal}
            </h4>
          </div>
        </div>
        <div className="flex items-center">
          <p className=" font-semibold text-gray-600">{growthRate}%</p>
        </div>
      </div>
      <Line data={dataset} options={options} />
    </div>
  );
};

export default LineChartCard;
