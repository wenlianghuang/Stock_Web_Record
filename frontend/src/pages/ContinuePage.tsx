import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import page1 from '../assets/images/Image1.jpg';
import page2 from '../assets/images/Image2.jpg';
const ScrollImagePage: React.FC = () => {
  const { ref: secondImageRef, inView: secondImageInView } = useInView({
    triggerOnce: false, // only trigger once
    threshold: 0.1, // 10% visibility to trigger
  });

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* 第二張全螢幕圖片 */}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${page1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      />
      {/* 滾動後的內容 */}
      <Container sx={{ mt: 4 }}>
        {/* 第二張圖片 */}
        <Box
          ref={secondImageRef}
          sx={{
            height: '100vh',
            width: '100vw',
            backgroundImage: `url(${page2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            opacity: secondImageInView ? 1 : 0, // 滚动到时显示图片
            transition: 'opacity 1s ease-in-out', // 渐显动画
          }}
        />
        {/* 其他内容 */}
        <Typography variant="h4" sx={{ mt: 4 }}>
          這裡可以放一些其他內容...
        </Typography>
      </Container>
    </div>
  );
};

export default ScrollImagePage;
