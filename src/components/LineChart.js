import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import "./table.scss";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({index, coin, coinsHistory}) => {
  const coinHistoryArr = coinsHistory[index] ? coinsHistory[index].chart : [];
  const priceValue = coinHistoryArr.map((arr) => arr[1]);
  let labelsArr = [];
  for (let i = 1; i <= coinHistoryArr.length; i++) {
    labelsArr.push("");
  }

  const data = {
    labels: labelsArr,
    datasets: [
      {
        label: ``,
        borderWidth: 0.9,
        data: priceValue,
        pointRadius: 0,
        borderColor:
          coin.priceChange1w >= 0 ? "rgb(43, 139, 85)" : "rgb(194, 39, 39)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    drawBorder: false,
    scales: {
      x: {
        ticks: {display: false},
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {display: false},
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="chart-wrapper">
      <Line data={data} width={10} height={50} options={options} />
    </div>
  );
};

export default LineChart;
