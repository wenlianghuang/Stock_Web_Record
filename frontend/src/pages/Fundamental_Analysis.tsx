import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import CandlestickChart from './CandlestickChart';
import { CandlestickChartGoogleChart } from './CandlestickGooleChart';
import CandlestickChart3 from './CandlestickChart3';
const Fundamental_Analysis: React.FC = () => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        axios.post('http://localhost:3001/api/send-fundamental-analysis')
            .then((response) => {
                setContent(response.data.content);
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4">Content from Previous Page:</Typography>
            <Typography variant="h6">{content}</Typography>
            <CandlestickChart3 />
        </div>
    );
};

export default Fundamental_Analysis;
