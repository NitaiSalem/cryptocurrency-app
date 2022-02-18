import axios from "axios";
import {format} from "date-fns";

export const fetchCoins = async () => {
  try {
    const res = await axios.get(
      `https://api.coinstats.app/public/v1/coins?skip=0&limit=300`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPriceHistory = async (coinId, period) => {
  try {
    const res = await axios.get(
      `https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${coinId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getNumber = function (num) {
  var units = ["M", "B", "T", "Q"];
  var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
  var r = unit % 3;
  var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
  return x.toFixed(1) + " " + units[Math.floor(unit / 3) - 2];
};

export const getCoinValue = (arr, historyIndex) => {
  console.log("getCoinValue called");
  return arr.map((arr) => ({
    x: new Date(arr[0] * 1000),
    y: arr[historyIndex],
  }));
};

export const distributeArray = (arr) => {
  let divider = Math.ceil(arr.length / 6);
  const first = arr[0];
  const last = arr[arr.length - 1];
  let returnArr = [first];
  for (var i = 1; i < 5; i++) {
    returnArr.push(arr[i * divider]);
  }

  return [...returnArr, last];
};

export const formatDateLabel = (array, currentCoin) => {
  let returnLabelArray = [];
  switch (currentCoin.coinTimePeriod) {
    case "24h":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "HH:00	a")
      );
      break;
    case "1w":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "eeee")
      );
      break;
    case "1m":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "MMM yy")
      );
      break;
    case "3m":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "MMM yy")
      );
      break;
    case "6m":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "MMM yy")
      );
      break;
    case "1y":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "MMM yyyy")
      );
      break;
    case "all":
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "MMM yyyy")
      );
      break;
    default:
      returnLabelArray = array.map((coinArr) =>
        format(new Date(coinArr[0] * 1000), "HH:00	a")
      );
  }
  return returnLabelArray;
};

export const BUTTON_DATA = [
  {
    name: "24H",
    value: "24h",
  },
  {
    name: "1W",
    value: "1w",
  },
  {
    name: "1M",
    value: "1m",
  },
  {
    name: "3M",
    value: "3m",
  },
  {
    name: "6M",
    value: "6m",
  },
  {
    name: "1Y",
    value: "1y",
  },
  {
    name: "ALL",
    value: "all",
  },
];

export const COLUMNS = [
  "Rank ",
  "1h Change",
  "24h Change",
  "7d Change",
  "Price ",
  "Price in BTC",
  "Market Cap",
  "24 Volume",
];
