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

const LineChart = ({index, coinsHistory}) => {
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
        data: priceValue,
        pointRadius: 0.1,
        borderColor:
          priceValue[0] > priceValue[priceValue.length - 1]
            ? "rgb(161, 0, 0)"
            : "rgb(1, 110, 74)",
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
