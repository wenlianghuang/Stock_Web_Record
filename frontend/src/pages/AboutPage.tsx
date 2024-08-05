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

import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AboutPage: React.FC = () => {
  const [data, setData] = useState([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 900 },
    { name: 'May', value: 700 },
  ]);

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
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;