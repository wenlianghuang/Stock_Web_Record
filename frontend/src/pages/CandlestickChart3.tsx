import React from 'react';
//import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, TimeSeriesScale, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// 注册必要的组件
//ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, CandlestickController, CandlestickElement);
ChartJS.register(CategoryScale, LinearScale, TimeScale, TimeSeriesScale, Title, Tooltip, Legend, CandlestickController, CandlestickElement);
const options: ChartOptions<'candlestick'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Candlestick Chart Example',
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: 'Price',
      },
    },
  },
};

const data = {
  datasets: [
    {
      label: 'Candlestick Data',
      data: [
        { x: new Date(2023, 0, 1).getTime(), o: 150, h: 160, l: 140, c: 155 },
        { x: new Date(2023, 0, 2).getTime(), o: 155, h: 165, l: 150, c: 160 },
        { x: new Date(2023, 0, 3).getTime(), o: 160, h: 170, l: 155, c: 165 },
        { x: new Date(2023, 0, 4).getTime(), o: 165, h: 175, l: 160, c: 170 },
        { x: new Date(2023, 0, 5).getTime(), o: 170, h: 180, l: 165, c: 170 },
      ],
      type: 'candlestick' as const,
    },
  ],
};

const CandlestickChart3: React.FC = () => {
  return <Chart type='candlestick' options={options} data={data} />;
};

export default CandlestickChart3;