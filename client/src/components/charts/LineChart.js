import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function LineChart() {
    const user = JSON.parse(localStorage.getItem('user'));
  //     let Resolved = []; // Define Resolved as an empty array
  // let Total = [];
  const [data, setData] = useState({
    labels: [1,2,3,4,5,6,7,8,9,10,11],
    datasets: [
      {
        label: "API Calls",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10,20,30,40,20,15,25,5,25,12,15],
      },
    
    ],
  });

//   useEffect(() => {
//     async function loadPieData() {
//       try {
//         const response = await fetch("http://localhost:5003/api/graphs/line", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//              body: JSON.stringify(user),
//         });

//         // if (!response.ok) {
//         //     throw new Error("Network response was not ok");
//         // }

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
 

//         response.json()
//             .then((responseData) => {
//                 console.log(responseData);
//                 const labels= Array.from({ length: responseData.length }, (_, i) => i + 1);
//                 setData((prevData) => ({
//                     ...prevData,
//                     labels: labels,
//                     datasets: [
//                         {
//                             ...prevData.datasets[0],
//                             data: responseData,
//                         },
//                     ],
//                 }));
//             })
//             .catch((error) => {
//                 console.error('There has been a problem with your fetch operation:', error);
//             });

//       } catch (error) {
//         console.error(
//           "There has been a problem with your fetch operation:",
//           error
//         );
//       }
//     }

//     console.log(data); // Check the state data

//     loadPieData();
//   }, []);

  console.log({ data });

        return (
            <div>
                <div style={{height:'300px',width:'600px'}}>
                    <Line data={data} />
                </div>
            </div>
        );
    }
        
    export default LineChart; 
