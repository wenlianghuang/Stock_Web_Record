import React from 'react';
import { Grid,Typography,Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const StockListPage: React.FC = () => {
    const navigate = useNavigate();
    const items = [
        { id: 1, top_title: '聯上發 2537', content: '22.00', bottom_number: '0.60 2,80%',link: '/Fundamental_Analysis' },
        { id: 2, top_title: '金居 8358', content: '20.85', bottom_number: '2.00 3.38%',  link: '/Fundamental_Analysis' },
        { id: 3, top_title: '富強鑫 6603', content: '20.70', bottom_number: '0.25 1.19%', link: '/Fundamental_Analysis' },
        { id: 4, top_title: '友達 2409', content: '15.45', bottom_number: '0.40 2.65%', link: '/Fundamental_Analysis' },
        { id: 5, top_title: '合勤控 3704', content: '33.55', bottom_number: '0.05 0.14%', link: '/Fundamental_Analysis' },
        { id: 6, top_title: '南亞科 2408', content: '51.00', bottom_number: '1.50 3.03%', link: '/Fundamental_Analysis' },
        { id: 7, top_title: '品安 8088', content: '31.85', bottom_number: '0.05 0.15%', link: '/Fundamental_Analysis' },
        { id: 8, top_title: '鴻海 2317', content: '168.50', bottom_number: '5.00 3.05%', link: '/Fundamental_Analysis' },

    ];

    const handleButtonClick = (content: string, link: string) => {
        axios.post('http://localhost:3001/api/receiv-fundamental-analysis', { content })
            .then(() => {
                navigate(link);
            })
            .catch((error) => {
                console.error('Error sending content:', error);
            });
    };
    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <Button 
                        onClick={() => handleButtonClick(item.top_title, item.link)}
                        sx={{
                            width: '100%',
                            padding: 0,
                            textTransform: 'none',
                        }}
                        >
                    <Box
                        sx={{
                            height: 150,
                            width: '300px',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 2,
                            boxShadow: 2,
                            marginTop: '25px',
                            marginBottom: '25px',
                            marginLeft: '100px',
                            marginRight: '100px',
                            
                        }}
                    >
                        <Typography variant="body1">{item.top_title}</Typography>
                        <Typography variant="h6">{item.content}</Typography>
                        <Typography variant="body1">{item.bottom_number}</Typography>
                    </Box>
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

export default StockListPage;