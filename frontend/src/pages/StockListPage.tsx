import React,{useState,useEffect} from 'react';
import { Grid,Typography,Box, Button } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
const StockListPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [stockitems, setStockItems] = useState([]);
    const [username, setUsername] = useState("");

    
    useEffect(() => {
        // location.state主要是擷取從HomePage傳過來的username
        const state = location.state as { username: string };
        if (state && state.username) {
            setUsername(state.username);
        }

        axios.post('http://localhost:3001/api/ownerstock', { username: state.username })
            .then(response => {
                setStockItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, [location.state]);
    // [location.state]是為了讓useEffect在location.state改變時執行

    
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
            {stockitems.map((stockitem:any) => (
                <Grid item xs={12} sm={4} key={stockitem.stock_name}>
                    <Button 
                        //onClick={() => handleButtonClick(item.top_title, item.link)}
                        onClick={() => handleButtonClick(stockitem.stock_name, "/Fundamental_Analysis")}
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
                        
                        <Typography variant="body1">{stockitem.stock_code}</Typography>
                        <Typography variant="h6">{stockitem.stock_name}</Typography>
                        <Typography variant="body1">Number: {stockitem.stock_number}</Typography>
                    
                    </Box>
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

export default StockListPage;