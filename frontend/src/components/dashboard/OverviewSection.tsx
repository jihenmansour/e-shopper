"use client"

import CustomCard from "../CustomCard";


const OverviewSection = () => {

  return (
    <div className="grid grid-flow-row lg:grid-cols-3 gap-4">
      <CustomCard />
      <CustomCard />
      <CustomCard />
    </div>
  );
};

export default OverviewSection;
