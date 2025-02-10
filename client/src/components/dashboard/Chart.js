import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import Title from './Title';
import { useState, useEffect } from 'react';
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

export default function Chart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    // Fetch all properties and select vendidas (with fallback timestamp)
    fetch(`${process.env.REACT_APP_API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        // Filter properties that are vendidas and assign fallback timestamp if missing
        const vendidas = data
          .filter(property => property.active === 2)
          .map(property => ({
            ...property,
            vendidaTimestamp: property.vendidaTimestamp || property.createdAt
          }));
        const monthlyCounts = {};
        vendidas.forEach(property => {
          if (property.vendidaTimestamp) {
            const date = new Date(property.vendidaTimestamp);
            const month = date.toLocaleString('default', { month: 'long' });
            monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
          }
        });
        const labels = Object.keys(monthlyCounts);
        const counts = labels.map(label => monthlyCounts[label]);
        setChartData({ labels, counts });
      })
      .catch(err => console.error(err));
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Vendidas',
        data: chartData.counts,
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        tension: 0.4,
        fill: false,
      },
    ],
  };

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
          text: 'Mes',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad Vendidas',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <React.Fragment>
      <Title>Vendidas Mensuales</Title>
      <div style={{ width: '100%', height: 300, flexGrow: 1, overflow: 'hidden' }}>
        <Line data={data} options={options} />
      </div>
    </React.Fragment>
  );
}
