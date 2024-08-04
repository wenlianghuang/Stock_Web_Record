import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import page1 from '../assets/images/Image1.jpg'
import page2 from '../assets/images/Image2.jpg'
const ScrollImagePage: React.FC = () => {
  const { ref: secondImageRef, inView: secondImageInView } = useInView({
    triggerOnce: false, // 只触发一次
    threshold: 0.1, // 在10%的可见度时触发
  });

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* 第一张全屏图片 */}
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
      {/* 滚动后的内容 */}
      <Container sx={{ mt: 4 }}>
        {/* 第二张图片 */}
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
          这里可以放一些其他内容...
        </Typography>
      </Container>
    </div>
  );
};

export default ScrollImagePage;
