import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseProgressChart = () => {
  const data = {
    labels: ['Pending', 'Approved'],
    datasets: [
      {
        label: 'Course Request Status',
        data: [10, 5], // change these values based on real stats
        backgroundColor: ['#4CAF50', '#FF9800'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="max-w-sm mx-auto ">
      <h2 className="text-xl font-semibold mb-4 text-center">Course Request</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CourseProgressChart;
