import axios from "axios";

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

export const fetchPriceHistory = async (coinId) => {
  try {
    const res = await axios.get(
      `https://api.coinstats.app/public/v1/charts?period=1w&coinId=${coinId}`
    );
    //return key value pairs
    return {priceHistory:res.data, id: coinId};
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
