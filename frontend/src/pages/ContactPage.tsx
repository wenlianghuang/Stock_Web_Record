import React,{useState} from "react";
import { Box, Container, Typography,Button } from "@mui/material";
import image from "../assets/images/Image1.jpg";
import "../styles/SupportedIcon.css"
const ContactPage: React.FC = () => {
    const [useStockState,setStockState] = useState(false);
    const handleToggle = () => {
        setStockState(!useStockState);
        
    };
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
                    <Box sx={{ display: 'inline-block', paddingRight: '80px' }}>
                        <Typography>
                            加權指數 21,638.09
                        </Typography>
                         
                        <Typography
                            sx={{
                                color: useStockState ? 'red' : 'green', 
                                display: 'inline',
                                paddingLeft: '30px',
                            }}
                        >
                            <Box className={useStockState ? 'vertical_triangle' : 'handstand_traiangle'}/>
                                1000.01 (4.43%)
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'inline-block', paddingRight: '80px' }}>
                        <Typography>
                            臺灣50指數 17,402.81
                        </Typography>
                        <Typography
                            sx={{
                                color: useStockState ? 'red' : 'green', 
                                display: 'inline',
                                paddingLeft: '30px',
                            }}
                        >
                            <Box className={useStockState ? 'vertical_triangle' : 'handstand_traiangle'}/>
                                942.5 (5.14%)
                        </Typography>

                    </Box>
                    <Box sx={{ display: 'inline-block', paddingRight: '80px' }}>
                        <Typography>
                            台指期 21,097.00 (-429.00)
                        </Typography>
                        <Typography
                            sx={{
                                color: useStockState ? 'red' : 'green',
                                display: 'inline',
                                paddingLeft: '30px',
                            }}
                        >
                            <Box className={useStockState ? 'vertical_triangle' : 'handstand_traiangle'} />
                                429.00 (-1.99%)
                        </Typography>
                    </Box>
                </Typography>
            </Box>
    </Box>
    );
};

export default ContactPage;
