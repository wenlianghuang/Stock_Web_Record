
import { Box, Container, Typography,Button,TextField,Grid,Alert} from "@mui/material";
import React, { useEffect, useState } from "react";
import image1 from "../assets/images/Image1.jpg";
import image2 from "../assets/images/Image2.jpg";
import image3 from "../assets/images/Image3.jpg";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const images = [image1, image2, image3];

const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    axios.post("http://localhost:3001/api/login", { username, password })
      .then((response) => {
        const data = response.data;
        if (data.message === "Login successful") {
          setError("");
          navigate("/stocklist", { state: { username: username } });
        } else if(data.message === "Invalid username or password") {
          setError("Invalid username or password.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError("An error occurred.");
      });
    // Add your authentication logic here
    //setError("");
    //console.log("Username:", username);
    //console.log("Password:", password);
    //navigate("/stocklist");
    
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <React.Fragment>
      <Box 
      className="first-block"
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      
      <Container
       className="container-centered"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          台股資訊網
        </Typography>
        <Typography variant="body1" paragraph>
          個人股票投資紀錄
        </Typography>
      </Container>
      {/* Marquee */}
      <Box
        className="marquee-wrapper" 
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
    {/* Login Box */}
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          boxShadow={3}
          borderRadius={2}
          bgcolor="white"
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!username && error !== ""}
                helperText={!username && error !== "" ? "Username is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!password && error !== ""}
                helperText={!password && error !== "" ? "Password is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
    
  );
};

export default HomePage;


