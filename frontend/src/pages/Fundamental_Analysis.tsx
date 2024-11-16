import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import CandlestickChart from './CandlestickChart';
const Fundamental_Analysis: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [stockid, setStockID] = useState<string>('');
    useEffect(() => {
        axios.post('http://localhost:3001/api/send-fundamental-analysis')
            .then((response) => {
                console.log('Response:', response);
                setContent(response.data.content);
                setStockID(response.data.stockid);
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4">Content from Previous Page:</Typography>
            <Typography variant="h6">Stock: {stockid} {content}</Typography>
            <CandlestickChart title={`Candlestick Chart for ${content}`}/>
        </div>
    );
};

export default Fundamental_Analysis;
