/* import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00'),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Monthly Production</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.light} activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </React.Fragment>
  );
} */

  import * as React from 'react';
  import { useTheme } from '@mui/material/styles';
  import { Line } from 'react-chartjs-2';
  import Title from './Title';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
  );
  
  // Generate Sales Data
  function createData(time, amount) {
    return { time, amount: amount ?? null };
  }
  
  const rawData = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00'),
  ];
  
  export default function Chart() {
    const theme = useTheme();
  
    // Extract labels and amounts from rawData
    const labels = rawData.map((item) => item.time);
    const amounts = rawData.map((item) => item.amount);
  
    // Prepare the data object for Chart.js
    const data = {
      labels,
      datasets: [
        {
          label: 'Ventas',
          data: amounts,
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          tension: 0.4, // Smooth the line
          fill: false,  // No fill under the line
        },
      ],
    };
  
    // Define chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Amount',
          },
          beginAtZero: true,
        },
      },
    };
  
    return (
      <React.Fragment>
        <Title>Ventas Mensuales</Title>
        <div style={{ width: '100%', height: 300, flexGrow: 1, overflow: 'hidden' }}>
          <Line data={data} options={options} />
        </div>
      </React.Fragment>
    );
  }
  