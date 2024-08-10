import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockListPage: React.FC = () => {
    const data = [
        { name: 'Jan', value: 100 },
        { name: 'Feb', value: 200 },
        { name: 'Mar', value: 150 },
        { name: 'Apr', value: 300 },
        { name: 'May', value: 250 },
        { name: 'Jun', value: 400 },
    ];

    const chartCount = 6;
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Array.from({ length: chartCount }).map((_, index) => (
                    <div key={index} style={{ width: '33%', padding: '10px' }}>
                        <LineChart width={300} height={200} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockListPage;