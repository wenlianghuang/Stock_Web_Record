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

import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 700 },
];

const AboutPage: React.FC = () => {
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