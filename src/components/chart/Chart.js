import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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
import TestChart from "./testChart";
import "chartjs-adapter-date-fns";
import {format, compareAsc} from "date-fns";
import CoinsToCompare from "./CoinsToCompare";

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//available periods - 24h | 1w | 1m | 3m | 6m | 1y |all
//set the api search coin by var, also same for period, and seperate request for each currency
//I need coin value in usd, btc and eth - so kind of compare i guess
// I just need the corresponding history of the eterium to compare?
//in coin history array bitcoin value is index 2 and eth is index 3

//maybe in 5 they mean you can click a coin and then the chart shows the data for each coin?

const Chart = () => {
  const {toCompare} = useContext(CoinsContext);

  const [currentCoin, setCurrentCoin] = useState(
    toCompare ? toCompare[toCompare.length - 1] : []
  );

  const [shownLines, setShownLines] = useState({
    usd: false,
    btc: false,
    eth: false,
  });
  const historyArr = currentCoin ? currentCoin.coinHistory.chart : [];

  console.log("value of to compare ", toCompare);
  console.log(" current coin state ", currentCoin);

  const usdValue = currentCoin
    ? historyArr.map((arr) => ({x: new Date(arr[0] * 1000), y: arr[1]}))
    : [];
  // console.log(" price value ", usdValue);
  const bitCoinValue = currentCoin
    ? historyArr.map((arr) => ({x: new Date(arr[0] * 1000), y: arr[2]}))
    : [];
  const ethereumValue = currentCoin
    ? historyArr.map((arr) => ({x: new Date(arr[0] * 1000), y: arr[3]}))
    : [];

  console.log({usdValue});
  //new Date().toString()

  let timeLabelsArr = currentCoin
    ? historyArr.map((arr) => format(new Date(arr[0] * 1000), "yyyyMMdd"))
    : [];

  console.log({timeLabelsArr});

  // if (usdValue) {
  //   for (let i = 1; i <= usdValue.length; i++) {
  //     labelsArr.push("");
  //   }
  // }

  // const usdTicks = getTicksValues(usdValue);
  // const bitCoinTicks = getTicksValues(bitCoinValue);
  // const ethereumTicks = getTicksValues(ethereumValue);
  //const testArr = Array(170).fill({x: "2016-12-26", y: 10});

  const data = {
    // labels: timeLabelsArr,
    datasets: [
      {
        pointRadius: 0.4,
        label: `$`,
        hidden: shownLines.usd,
        yAxisID: "y1",
        data: usdValue,
        backgroundColor: ["rgb(236, 167, 16)"],
        borderColor: ["rgb(236, 167, 16)"],
        borderWidth: 1,
      },
      {
        pointRadius: 0.4,
        label: `₿`,
        hidden: shownLines.btc,
        yAxisID: "y2",
        data: bitCoinValue,
        backgroundColor: ["rgb(223, 160, 24)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        pointRadius: 0.4,
        label: `Ξ`,
        hidden: shownLines.eth,
        yAxisID: "y3",
        data: ethereumValue,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    scales: {
      x: {
        type: "time",
        time: {
          round: true,
          // min: timeLabelsArr[0],
          // max: timeLabelsArr[timeLabelsArr.length - 1],
          displayFormats: {
            quarter: "MMM YYYY",
            day: "MMM  yy",
            hour: "HH:mm",
          },
        },
        ticks: {
          maxTicksLimit: 5,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },

      y1: {
        position: "left",
        type: "linear",
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          count: 5,
          // precision: 2,
          // min: usdTicks.min,
          // max: usdTicks.max,
          // stepSize: usdTicks.stepSize,
          callback: function (value, index, ticks) {
            // value = value < 1 ? value.toFixed(6) : value.toFixed(2);
            return new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 5,
            }).format(value);
          },
        },
      },

      y2: {
        type: "linear",
        position: "right",

        ticks: {
          count: 5,
          // precision: 2,
          // min: bitCoinTicks.min,
          // max: bitCoinTicks.max,
          // stepSize: bitCoinTicks.stepSize,
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            value = value < 1 ? value.toFixed(8) * 1 : value.toFixed(2);
            // new Intl.NumberFormat().format(value);
            // return new Intl.NumberFormat("en-IN", {
            //   style: "currency",
            //   // currency: "Bitcoin",
            //   maximumSignificantDigits: 5,
            // }).format(value);
            return "₿" + value;
            // Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks])
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },

      y3: {
        type: "linear",
        position: "right",
        ticks: {
          count: 5,
          // min: ethereumTicks.min,
          // max: ethereumTicks.max,
          callback: function (value, index, ticks) {
            value = value < 1 ? value.toFixed(8) * 1 : value.toFixed(2);
            return "Ξ" + value;
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    legend: {
      labels: {
        display: false,
        fontSize: 25,
      },
    },
  };

  return (
    <div id="chart-container" style={{width: "100%", margin: "5vw"}}>
      <CoinsToCompare
        setCurrentCoin={setCurrentCoin}
        currentCoin={currentCoin}
      />
      <Line options={options} data={data} height={100} datasetIdKey="id" />
      <TimePeriodButtons
        setCurrentCoin={setCurrentCoin}
        currentCoin={currentCoin}
      />

      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="usd"
            onChange={() =>
              setShownLines({...shownLines, usd: shownLines.usd ? false : true})
            }
            control={<Checkbox defaultChecked />}
            label="USD"
            labelPlacement="end"
          />
          <FormControlLabel
            value="btc"
            onChange={() =>
              setShownLines({...shownLines, btc: shownLines.btc ? false : true})
            }
            control={<Checkbox defaultChecked />}
            label="BTC"
            labelPlacement="end"
          />
          <FormControlLabel
            value="eth"
            onChange={() =>
              setShownLines({...shownLines, eth: shownLines.eth ? false : true})
            }
            control={<Checkbox defaultChecked />}
            label="ETH"
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>

      {/* <TestChart /> */}
    </div>
  );
};

export default Chart;
