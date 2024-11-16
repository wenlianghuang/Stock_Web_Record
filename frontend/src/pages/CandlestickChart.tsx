import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, TimeSeriesScale, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {generateStockData,StockData} from '../components/generateStockData';
//import { generateStockData, StockData } from '../pages/generateStockData';
ChartJS.register(CategoryScale, LinearScale, TimeScale, TimeSeriesScale, Title, Tooltip, Legend, CandlestickController, CandlestickElement);

interface CandlestickChartProps {
  title: string;
}

// Define the functional component with props
//const CandlestickChart3: React.FC<CandlestickChart3Props> = ({ title }) => {
const CandlestickChart = ({ title }: CandlestickChartProps) => {
  const options: ChartOptions<'candlestick'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
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

  // Generate stock data for an entire year

  const stockData: StockData[] = generateStockData();
  /*
  const stockData = [
    { date: new Date(2023, 0, 1).getTime(), o: 150, h: 160, l: 130, c: 141 },
    { date: new Date(2023, 0, 2).getTime(), o: 148, h: 148, l: 133, c: 136 },
    { date: new Date(2023, 0, 3).getTime(), o: 160, h: 170, l: 155, c: 165 },
    { date: new Date(2023, 0, 4).getTime(), o: 165, h: 175, l: 160, c: 170 },
    { date: new Date(2023, 0, 5).getTime(), o: 170, h: 180, l: 165, c: 165 },
  ];
  */

  // Generate rawData using the varirables
  const rawData = stockData.map((data) => ({
    x: data.date,
    o: data.o,
    h: data.h,
    l: data.l,
    c: data.c,
  }));
  const data = {
    datasets: [
      {
        label: 'Candlestick Data',
        data: rawData,
        type: 'candlestick' as const,
        borderColor: rawData.map((d, i) => (i === 0 || d.c >= rawData[i - 1].c ? 'red' : 'green')),
        color: {
          up: 'green',
          down: 'red',
          unchanged: 'gray',
        },
      },
    ],
  };

  return (
    <div style={{ width: '100vw' }}>
      <Chart type='candlestick' options={options} data={data} />
    </div>
  );
};

export default CandlestickChart;