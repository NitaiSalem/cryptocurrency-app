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
so each label is for one dot.. you need it for each one? 

so data sets for chart needs to be an array of objects, each one with props: id, label, and each array from api. 
pass to each linechart the obj.id where id is the name of the coins, same as our coins data, thats how you know you pass the right history for right coin..

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
const pricevalue = coinHistory.map(arr=> arr[1]); 
let labelsArr = [];
for (var i = 1; i <= coinHistory.length; i++) {
  labelsArr.push("");
}

console.log( "coins history inline chart " , coinHistory)

    const data = {
      labels:labelsArr,
      datasets: [{
        label: ``,
        data: pricevalue,
        //set to red or green...
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
       
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
      <div>
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