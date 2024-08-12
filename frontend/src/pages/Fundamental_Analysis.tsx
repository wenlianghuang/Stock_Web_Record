import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

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
        </div>
    );
};

export default Fundamental_Analysis;
