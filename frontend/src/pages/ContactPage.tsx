import { Box, Button, Typography,Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../assets/images/Image1.jpg";
import "../styles/SupportedIcon.css";
import anotherimage from "../assets/images/Image2.jpg";
import image4 from "../assets/images/image4.jpg";
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
        <React.Fragment>
            {/* 第一個區塊 */}
            <Box
                sx={{
                    width: '100vw',
                    height: '500px', // 限制背景圖像的高度
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                
            </Box>

            {/* 跑馬燈 */}
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 跑馬燈背景顏色
                    color: 'white', // 跑馬燈文字顏色
                    position: 'relative',
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
                        animationPlayState: 'running',
                    }}
                >    
                    {stockData.map((stock, index) => (
                        <Box key={index} sx={{ display: 'inline-block', paddingRight: '80px' }}>
                            <Typography>
                                {stock.name} {stock.value}
                            </Typography>
                            <Typography
                                sx={{
                                    color: stock.change.startsWith('-') ? 'green' : 'red',
                                    display: 'inline',
                                    paddingLeft: '30px',
                                }}
                            >
                                <Box className={stock.change.startsWith('-') ? 'handstand_traiangle' : 'vertical_triangle'} />
                                {stock.change}
                            </Typography>
                        </Box>
                    ))}
                </Typography>        
            </Box>

            {/* 第二個區塊 */}
            <Box sx={{ marginTop: '0px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            src={anotherimage}
                            alt="Another Image"
                            sx={{
                                width: '400px',
                                height: '400px',
                                //borderRadius: '8px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6">
                            這是一個示例文本，顯示在圖片的右側。你可以在這裡放置任意的內容，根據你的需求調整佈局和樣式。
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                <Grid container spacing={2}>
                    <Grid item xs={8} sx={{display: 'flex',alignItems: 'center'}}>
                        <Typography variant="h6">
                            ETF整合資訊平台「e添富」於8月11日正式上線
                            <Typography variant="body1">
                                本網站提供了ETF的最新資訊，包括價格、漲跌幅等。歡迎訪問！
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box
                            component="img"
                            src={image4}
                            alt="Image 4"
                            sx={{
                                width: '400px',
                                height: '400px',
                            }}
                            />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
        
    );
};

export default ContactPage;
