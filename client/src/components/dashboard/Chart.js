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
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`);
        const data = await response.json();

        const vendidas = data.filter(property => property.active == 2 && property.vendidaTimestamp);
        const months = [
          'enero',
          'febrero',
          'marzo',
          'abril',
          'mayo',
          'junio',
          'julio',
          'agosto',
          'septiembre',
          'octubre',
          'noviembre',
          'diciembre'
        ];
          
        const monthlyCounts = {};
        months.forEach(month => monthlyCounts[month] = 0);

        vendidas.forEach(property => {
          const timestamp = property.vendidaTimestamp || property.upadated_at;
          if (timestamp) {
            const date = new Date(property.vendidaTimestamp);
      
            if (date.getFullYear() === currentYear) {
              const month = date.toLocaleString('es-ES', { month: 'long' });
              monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
            }
          }
        });

        const labels = months;
        const counts = labels.map(label => monthlyCounts[label]);
        setChartData({ labels, counts });
      } catch (err) {
        console.error(err);
      }
    };
    fetchChartData();
  }, [currentYear]);

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
        pointRadius: 3, 
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
        ticks: {
          stepSize: 1,
          callback: (value) => Number.isInteger(value) ? value : null,
        }
      },
    },
  };

  return (
    <React.Fragment>
      <Title>{`Propiedades Vendidas ${currentYear}`}</Title>
      <div style={{ width: '100%', height: 300, flexGrow: 1, overflow: 'hidden' }}>
        <Line data={data} options={options} />
      </div>
    </React.Fragment>
  );
}
