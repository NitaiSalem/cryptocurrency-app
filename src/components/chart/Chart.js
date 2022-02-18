import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import {useContext, useEffect, useMemo, useState} from "react";
import {Line} from "react-chartjs-2";
import {CoinsContext} from "../../App";
import {getCoinValue} from "../../utils";
import TimePeriodButtons from "./TimePeriodButtons";
import "chartjs-adapter-date-fns";
import CoinsToCompare from "./CoinsToCompare";
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
import BarChart from "./BarChart";

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

const Chart = () => {
  const {toCompare} = useContext(CoinsContext);
  const [labelFonts, setlabelFonts] = useState(12);
  const [lineBorderWidth, setLineBorderWidth] = useState(1.5);
  const [shownLines, setShownLines] = useState({
    usd: false,
    btc: false,
    eth: false,
  });
  const [currentCoin, setCurrentCoin] = useState(
    toCompare ? toCompare[toCompare.length - 1] : []
  );

  const historyArr = currentCoin ? currentCoin.coinHistory.chart : [];

  const usdValue = useMemo(
    () => (currentCoin ? getCoinValue(historyArr, 1) : []),
    [currentCoin]
  );

  const bitCoinValue = useMemo(
    () => (currentCoin ? getCoinValue(historyArr, 2) : []),
    [currentCoin]
  );

  const ethereumValue = useMemo(
    () => (currentCoin ? getCoinValue(historyArr, 3) : []),
    [currentCoin]
  );
  const resizeWindow = () => {
    if (window.innerWidth < 550) {
      setlabelFonts(7);
      setLineBorderWidth(0.5);
    }
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const data = {
    datasets: [
      {
        pointRadius: 0,
        hidden: shownLines.usd,
        yAxisID: "y1",
        data: usdValue,
        backgroundColor: "#e28811",
        borderColor: "#e28811",
        borderWidth: lineBorderWidth,
      },
      {
        pointRadius: 0,
        hidden: shownLines.btc,
        yAxisID: "y2",
        data: bitCoinValue,
        backgroundColor: "#0E7C4A",
        borderColor: "#0E7C4A",
        borderWidth: lineBorderWidth,
      },
      {
        pointRadius: 0,
        hidden: shownLines.eth,
        yAxisID: "y3",
        data: ethereumValue,
        backgroundColor: "#2258A5",
        borderColor: "#2258A5",
        borderWidth: lineBorderWidth,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    layout: {
      padding: {
        left: 3,
        right: 5,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          round: true,
          displayFormats: {
            quarter: "MMM YYYY",
            day: "MMM  yy",
            hour: "HH:mm",
          },
        },
        ticks: {
          maxTicksLimit: 6,
          font: {
            size: labelFonts,
          },
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
          font: {
            size: labelFonts,
          },
          color: "#e28811",
          count: 5,

          callback: function (value) {
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
          font: {
            size: labelFonts,
          },
          color: "#0E7C4A",
          count: 5,
          callback: function (value) {
            value = value < 1 ? value.toFixed(7) * 1 : value.toFixed(2) * 1;
            return "₿" + value;
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
          font: {
            size: labelFonts,
          },
          color: "#2258A5",
          count: 5,
          callback: function (value, index, ticks) {
            value = value < 1 ? value.toFixed(7) * 1 : value.toFixed(2) * 1;
            return "Ξ" + value;
          },
        },
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
    <div
      className="chart-container"
      style={{position: "relative", width: "70vw"}}
    >
      <CoinsToCompare
        setCurrentCoin={setCurrentCoin}
        currentCoin={currentCoin}
      />
      <Line options={options} data={data} height={120} />
      <FormControl component="fieldset" className="checkbox-container">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            style={{
              transform: "scale(0.9)",
            }}
            value="usd"
            onChange={() =>
              setShownLines({...shownLines, usd: shownLines.usd ? false : true})
            }
            control={
              <Checkbox
                checkedIcon={
                  <CheckBoxOutlinedIcon style={{color: "#e28811"}} />
                }
                icon={
                  <CheckBoxOutlineBlankOutlinedIcon
                    style={{color: "#e28811"}}
                  />
                }
                defaultChecked
              />
            }
            label="USD"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{
              transform: "scale(0.9)",
            }}
            value="btc"
            onChange={() =>
              setShownLines({...shownLines, btc: shownLines.btc ? false : true})
            }
            control={
              <Checkbox
                checkedIcon={
                  <CheckBoxOutlinedIcon style={{color: "#0E7C4A"}} />
                }
                icon={
                  <CheckBoxOutlineBlankOutlinedIcon
                    style={{color: "#0E7C4A"}}
                  />
                }
                defaultChecked
              />
            }
            label="BTC"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{
              transform: "scale(0.9)",
            }}
            value="eth"
            onChange={() =>
              setShownLines({...shownLines, eth: shownLines.eth ? false : true})
            }
            control={
              <Checkbox
                checkedIcon={
                  <CheckBoxOutlinedIcon style={{color: "#2258A5"}} />
                }
                icon={
                  <CheckBoxOutlineBlankOutlinedIcon
                    style={{color: "#2258A5"}}
                  />
                }
                defaultChecked
              />
            }
            label="ETH"
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <TimePeriodButtons
        setCurrentCoin={setCurrentCoin}
        currentCoin={currentCoin}
      />
      <BarChart
        currentCoin={currentCoin}
        labelFonts={labelFonts}
        lineBorderWidth={lineBorderWidth}
      />
    </div>
  );
};

export default Chart;
