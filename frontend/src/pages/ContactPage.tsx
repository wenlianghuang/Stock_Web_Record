/*
import React from "react";

const ContactPage: React.FC = () => {
    return (
        <div>
        <h1>Contact Page</h1>
        <p>This is the contact page.</p>
        </div>
    );
};

export default ContactPage;
*/
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import backgroundImage from "../assets/images/Image1.jpg"; // Adjust the path as needed

const ContactPage: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',  // Changed from 'relative' to 'absolute'
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Contact Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is the contact page.
        </Typography>
      </Container>
    </Box>
  );
};

export default ContactPage;