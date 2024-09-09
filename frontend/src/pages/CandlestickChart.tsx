import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CandlestickChart: React.FC = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Candlestick Data',
                data: [
                    { x: 'Jan', y: [65, 59, 80, 81] },
                    { x: 'Feb', y: [56, 55, 40, 45] },
                    { x: 'Mar', y: [75, 70, 60, 65] },
                    { x: 'Apr', y: [80, 85, 75, 70] },
                    { x: 'May', y: [90, 95, 85, 80] },
                    { x: 'Jun', y: [100, 105, 95, 90] },
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
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Candlestick Chart
            </Typography>
            <Bar data={data} options={options} />
        </Box>
    );
};

export default CandlestickChart;