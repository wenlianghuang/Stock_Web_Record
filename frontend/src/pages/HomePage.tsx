/*
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import image1 from '../assets/images/Image1.jpg';
import image2 from '../assets/images/Image2.jpg';
import image3 from '../assets/images/Image3.jpg';
const images = [image1,image2,image3]

const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is the home page.
        </Typography>
        <Box sx={{ my: 4 }}>
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
*/
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import image1 from "../assets/images/Image1.jpg";
import image2 from "../assets/images/Image2.jpg";
import image3 from "../assets/images/Image3.jpg";
import "../styles/HomePage.css";
const images = [image1, image2, image3];

const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <Box
      /*
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      */
      className="fullscreen-bg"
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      
      <Container
        /*
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
        }}
        */
       className="container-centered"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is the home page.
        </Typography>
      </Container>
      {/* Marquee */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          className="marquee"
        >
          This is a scrolling text... Welcome to our website!
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;


