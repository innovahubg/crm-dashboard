import React from "react"
import { Pie } from "react-chartjs-2"


const PieChart = () =>{
  const data = {
    labels: ["Drixo", "Upclub", "Vakavia", "Devazo"],
    datasets: [
      {
        data: [21, 16, 48, 31],
        backgroundColor: [
          '#0db4d6',
          '#f1b44c',
          '#fb4d53',
          '#343a40'
      ],
      borderColor: [
        '#0db4d6',
        '#f1b44c',
        '#fb4d53',
        '#343a40'
    ],
        hoverBackgroundColor: ["#34c38f", "#ff3d60","#4aa3ff","#212529"],
        hoverBorderColor: "#fff",
      },
    ],
  }
  return (
    <React.Fragment>
        <Pie width={537} height={268} data={data} />
    </React.Fragment>
  );
}

export default PieChart
