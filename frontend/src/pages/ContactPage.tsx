import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../assets/images/Image1.jpg";
import "../styles/SupportedIcon.css";
const ContactPage: React.FC = () => {
    const [useStockState,setStockState] = useState(false);
    const [stockData, setStockData] = useState([
        { name: "Dow Jones Industrial Average", value: "21,638.09", change: "1000.01 (-4.43%)" },
        { name: "NASDAQ Composite", value: "17,402.81", change: "942.5 (-5.14%)" },
        { name: "S&P 500", value: "21,097.00", change: "429.00 (-1.99%)" },
        { name: "PHLX Semiconductor", value: "4,426.27", change: "-141.30 (-3.09%)"}
    ]);
    const handleToggle = () => {
        setStockState(!useStockState);   
    };
    const fetchUpdatedData = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/update-data", stockData);
            setStockData(response.data);
        } catch (error) {
            console.error("Error fetching updated data:", error);
        }
    };

    useEffect(() => {
        fetchUpdatedData();

        const interval = setInterval(()=>{
            fetchUpdatedData();
        },30000);

        return () => clearInterval(interval)
    }, []);
    return (
        <Box
      sx={{
        width: '100vw',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: '40%', // 这个可以调整，取决于你想要的图片比例
        
        
      }}
    >
        <Button
                onClick={handleToggle}
                sx={{ position: 'absolute', bottom: 100, left: 20, zIndex: 1000 }}
            >
                Toggle Triangle Color
            </Button>
        {/* 跑馬燈 */}
        <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 跑馬燈背景顏色
                    color: 'white', // 跑馬燈文字顏色
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    overflow: 'hidden', // 確保文字只在盒子內滾動
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    padding: '10px 0',
                    '&:hover .marquee-content': {
                        animationPlayState: 'paused',
                    },
                }}
            >
            
                <Typography
                    className="marquee-content"
                    sx={{
                        display: 'inline-block',
                        animation: 'marquee 15s linear infinite',
                        // 允許動畫暫停和恢復
                        animationPlayState: 'running',
                    }}
                >    
                    {stockData.map((stock,index) => (
                        <Box key={index} sx={{ display: 'inline-block', paddingRight: '80px' }}>
                        <Typography>
                            {stock.name} {stock.value}
                        </Typography>
                        <Typography
                            sx={{
                                //color: useStockState ? 'red' : 'green',
                                color: stock.change.startsWith('-') ? 'green' : 'red',
                                display: 'inline',
                                paddingLeft: '30px',
                            }}
                        >
                            <Box className={stock.change.startsWith('-') ? 'handstand_traiangle' : 'vertical_triangle'}/>
                            {stock.change}
                        </Typography>
                    </Box>
                    ))}
                </Typography>
                    
            </Box>
    </Box>
    );
};

export default ContactPage;
