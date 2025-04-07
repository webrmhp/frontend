import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const dummyData = {
  '2023': {
    online: [30, 45, 20, 60, 55, 40, 35, 50, 45, 60, 70, 80],
    physical: [20, 35, 15, 40, 45, 30, 25, 40, 35, 50, 60, 70],
  },
  '2024': {
    online: [40, 50, 35, 70, 65, 50, 45, 60, 55, 65, 75, 85],
    physical: [25, 30, 20, 50, 40, 35, 30, 45, 40, 55, 65, 75],
  },
  '2025': {
    online: [35, 55, 25, 65, 60, 45, 40, 55, 50, 60, 70, 90],
    physical: [20, 25, 10, 45, 35, 25, 20, 35, 30, 40, 50, 65],
  },
};

const years = ['2023', '2024', '2025'];

const ChartWithYearDropdown = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Online Registration',
        data: dummyData[selectedYear].online,
        backgroundColor: '#6359E9',
      },
      {
        label: 'Physical Registration',
        data: dummyData[selectedYear].physical,
        backgroundColor: '#64CFF6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Course Registration (${selectedYear})`,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Online & Physical Course Registration</h2>
        <select
          className="border px-2 py-1 rounded-md text-sm"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartWithYearDropdown;
