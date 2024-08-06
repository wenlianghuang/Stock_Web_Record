/*
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
    </div>
  );
};

export default AboutPage;
*/

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AboutPage: React.FC = () => {
  const [data, setData] = useState([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 900 },
    { name: 'May', value: 700 },
  ]);
  /*
  useEffect(() => {
    fetch('http://localhost:3001/update-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(updatedData => setData(updatedData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  */
  useEffect(() => {
    fetchData(1000);
  },[]);

  const fetchData = (newValue: number) => {
    fetch('http://localhost:3001/update-data',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newValue}),
    })
      .then(response => response.json())
      .then(updatedData => setData(updatedData))
      .catch(error => console.error('Error fetch data: ', error));
  }
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              About Page
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography paragraph>
              This is the about page.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Chart Title
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <Button variant="contained" color="primary" onClick={() => fetchData(1500)} sx={{ mt:2}}>
            Update May Value to 1500
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;