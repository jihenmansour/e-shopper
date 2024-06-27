"use client";

import { formatStats } from "@/lib/utils";
import LineChartCard from "../LineChartCard";

const OverviewSection = ({ stats }: { stats: OverviewSectionProps }) => {
  const cardsData = formatStats(stats);
  return (
    <div className="grid grid-flow-row lg:grid-cols-3 gap-4">
      {cardsData.map((item, index) => {
        return <LineChartCard 
        key={index} 
        stats={item.stats} 
        type={item.type} 
        total={item.total}/>;
      })}
    </div>
  );
};

export default OverviewSection;
