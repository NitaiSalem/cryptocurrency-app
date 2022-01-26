import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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

/*

 dataSet={{
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
      {
        id: 1,
        label: '',
        data: [5, 6, 7],
      },
      {
        id: 2,
        label: '',
        data: [3, 2, 1],
      },
    ],
  }}
*/ 


const LineChart = ({id, coinHistory}) => {
const priceValue = coinHistory.map(arr=> arr[1]); 
let labelsArr = [];
for (var i = 1; i <= coinHistory.length; i++) {
  labelsArr.push("");
}

console.log( "coins history in line chart " , coinHistory)

    const data = {
      labels:labelsArr,
      datasets: [{
        label: ``,
        data: priceValue,
        pointRadius: 0.1,
        borderColor: priceValue[0]> priceValue[priceValue.length-1] ?'rgb(1, 110, 74)': 'rgb(161, 0, 0)',
      }]
    };
  
    const options = {
      maintainAspectRatio: false,
      responsive:true,
      drawBorder: false,
      scales: {
        x: {
          ticks: {display:false},
          grid:{
            display:false,
            drawBorder: false,
          }
          
        },
        y: {
          ticks: {display:false},
          grid:{
            display:false,
            drawBorder: false,
          }
     }
      },
      plugins: {
        legend: {
          display: false
        }
      },
    }
  
    return (
      <div className= "chart-wrapper">
        <Line
          data={data}
          height={100}
          width={10}
          options={options}
  
        />
      </div>
    )
  }
  
  export default LineChart; 