import { Chart as ChartJS, elements, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import { sharedIcons } from "../../constants";
import CustomSvg from "./CustomSvg";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: true,
      borderColor: "#22C55E",
      backgroundColor: "#C4EFD4",
      tension: 0.4
    }
  ],

};

const options = {
  plugins: {
    legend: {
      display: false, 
    },
    tooltip: {
      intersect: false
  }

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
      radius: 0
    }
  },
  aspectRatio:4,
 
};
ChartJS.register(...registerables);
const CustomCard = () => {
  return (
    <div className=" bg-white rounded-md p-2 flex flex-col">
      <div className="flex justify-between">
      <div className="flex gap-[14px]">
        <div className="bg-green-500 w-14 h-14 flex items-center justify-center rounded-full">
        <CustomSvg
          title="arrow"
          style="w-7 h-7"
          color={sharedIcons.menu.color}
          d={sharedIcons.menu.d}
          viewBox={sharedIcons.arrow?.viewBox}
        />
        </div>
        <div>
        <p>Total sales</p>
        <h4 className="font-bold text-[22px]">34,897</h4>
        </div>
        
       
      </div>
      <div className="flex items-center">
        <p className="text-[14px] font-bold text-gray-600">1.56%</p>
        </div>
        </div>
        <Line data={data} options={options}/>
    </div>
  );
};

export default CustomCard;
