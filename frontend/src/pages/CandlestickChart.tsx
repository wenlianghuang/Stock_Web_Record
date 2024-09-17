// CandlestickChart.tsx
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CandlestickChart: React.FC = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Candlestick Data',
                data: [
                    { x: 'January', y: [65, 59, 80, 81] },
                    { x: 'February', y: [56, 55, 40, 45] },
                    { x: 'March', y: [75, 70, 60, 65] },
                    { x: 'April', y: [81, 80, 70, 75] },
                    { x: 'May', y: [56, 55, 40, 45] },
                    { x: 'June', y: [65, 59, 80, 81] },
                    { x: 'July', y: [75, 70, 60, 65] },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Candlestick Chart',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default CandlestickChart;