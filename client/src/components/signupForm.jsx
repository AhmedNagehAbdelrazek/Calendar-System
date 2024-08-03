import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Stack } from '@mui/material';

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.BACKEND_URL}/api/auth/signup`, { username, password, email })
      .then(()=>{
        alert('Sign up Sucessfully');
        navigate("/login");
      })
      .catch(err => console.log(err));
    //   onSignup();
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to signup');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction={'row'} alignItems={"center"} justifyContent={"end"} my={"10px"}>
                <Link to={"/login"}>login</Link>
          </Stack>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupForm;
