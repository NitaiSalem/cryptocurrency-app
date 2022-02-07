import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {useContext, useState} from "react";
import {Line} from "react-chartjs-2";
import {CoinsContext} from "../../App";
import {getTicksValues} from "../../utils";
import TimePeriodButtons from "./TimePeriodButtons";
ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TestChart = ({index, coinsHistory}) => {
  // console.log(" coin history in line chart ", coinsHistory);

  const data = {
    // labels: [1, 2, 3],
    datasets: [
      {
        yAxisID: "y",
        xAxisId: "x",
        // label: ``,
        data: [
          {x: "2017-01-01", y: 20},
          {x: "2017-05-01", y: 12},
          {x: "2017-12-01", y: 30},
        ],
        pointRadius: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    drawBorder: false,
    scales: {
      x: {
        type: "time",
        time: {
          min: "2017-01-01",
          max: "2017-12-01",
          displayFormats: {
            day: "MMM YY",
          },
        },
        ticks: {
          //   autoSkip: true,
          maxTicksLimit: 4,
          count: 5,
          min: "2017-01-01",
          max: "2017-12-01",
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {},
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} height={100} width={10} options={options} />
    </div>
  );
};
export default TestChart;
