import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import {useState} from "react";
import {Bar} from "react-chartjs-2";
import {distributeArray, formatDateLabel} from "../../utils";
import "chartjs-adapter-date-fns";
import {memo} from "react";

import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({currentCoin, labelFonts, lineBorderWidth}) => {
  const [shownLines, setShownLines] = useState({
    usd: false,
    btc: false,
    eth: false,
  });

  const historyArr = currentCoin ? currentCoin.coinHistory.chart : [];
  const barArr = currentCoin ? distributeArray(historyArr) : [];
  const datesArr = currentCoin ? formatDateLabel(barArr, currentCoin) : [];
  const usdValue = currentCoin ? barArr.map((arr) => arr[1]) : [];
  const bitCoinValue = currentCoin ? barArr.map((arr) => arr[2]) : [];
  const ethereumValue = currentCoin ? barArr.map((arr) => arr[3]) : [];

  const data = {
    labels: datesArr,
    datasets: [
      {
        hidden: shownLines.usd,
        yAxisID: "y1",
        data: usdValue,
        backgroundColor: "#e28811",
        borderColor: "#e28811",
        borderWidth: lineBorderWidth,
      },
      {
        hidden: shownLines.btc,
        yAxisID: "y2",
        data: bitCoinValue,
        backgroundColor: "#0E7C4A",
        borderColor: "#0E7C4A",
        borderWidth: lineBorderWidth,
      },
      {
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
        ticks: {
          font: {
            size: labelFonts,
          },
        },
      },

      y1: {
        position: "left",
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

          callback: function (value, index, ticks) {
            return new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 5,
            }).format(value);
          },
        },
      },

      y2: {
        position: "right",

        ticks: {
          font: {
            size: labelFonts,
          },
          color: "#0E7C4A",
          count: 5,
          callback: function (value, index, ticks) {
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
      <Bar options={options} data={data} height={120} />
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
    </div>
  );
};

export default memo(BarChart);
