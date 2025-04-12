import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RequestState = () => {
  const dispatch = useDispatch();
  const { requestByStatus } = useSelector((state) => state.auth);

  const data = {
    labels: ['Add To Cart', 'Chalan Paid (Unverified)', 'Chalan Paid (Verified)'],
    datasets: [
      {
        data: [
          requestByStatus?.requestSent || 0,
          requestByStatus?.quotationMade || 0,
          requestByStatus?.paymentDone || 0,
        ],
        backgroundColor: ['#FACC15', '#C026D3', '#14B8A6'],
        hoverBackgroundColor: ['#EAB308', '#A21CAF', '#0D9488'],
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0].data;
          const total = dataset.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#000',
        font: {
          size: 12,
          weight: 'bold',
        },
        anchor: 'end',
        align: 'start',
      },
    },
  };

  return (
    <div className="flex justify-center p-2">
      <div className="flex flex-col items-center sm:items-start">
        {/* Doughnut Chart */}
        {/* <div className="relative w-48 sm:w-64">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-bold text-sm sm:text-lg">Projected from all</p>
            <p className="font-bold text-sm sm:text-lg">Course</p>
          </div>
        </div> */}

        {/* Custom Legend */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-xs sm:text-sm font-medium">Add To Cart</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-pink-600"></div>
            <span className="text-xs sm:text-sm font-medium">Chalan Paid (Unverified)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-teal-500"></div>
            <span className="text-xs sm:text-sm font-medium">Chalan Paid (Verified)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestState;
