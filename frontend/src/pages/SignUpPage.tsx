
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const SignUpPage: React.FC = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState('');

    const handleSignUp = () => {
      if (!account || !password || !confirmPassword) {
        setError('All fields are required');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      axios.post('http://localhost:3001/api/signup', { account, password })
        .then((response) => {
          const data = response.data;
          console.log('data:', data);
          if (data.message === 'Account created') {
            setAccount('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            setSuccessful('Account created');
            // Redirect to the login page
          } else if (data.message === 'Account already exists') {
            setError('Account already exists');
          }
        })
        .catch((error) => {
          console.error('Error signing up:', error);
          setError('An error occurred');
        });

      // Handle sign up logic here
      console.log('Account:', account);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
    };

    return (
      <Container maxWidth="sm">
        <Box display="inline" justifyContent="center" alignItems="center" minHeight="100vh">
          <Box display="inline" flexDirection="column" alignItems="center" width="100%">
            <Typography variant="h4" component="h1" gutterBottom>
              Sign Up
            </Typography>
            {error && (
              <Typography variant="body1" color="error" gutterBottom>
                {error}
              </Typography>
            )}
            {successful && (
              <Typography variant="body1" style={{ color: 'orange' }} gutterBottom>
                {successful}
              </Typography>
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
              sx={{ mt: 3 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };

  export default SignUpPage;