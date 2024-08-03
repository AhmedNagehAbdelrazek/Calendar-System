import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../RTK/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Stack } from '@mui/material';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`, { username, password });
      const { token } = response.data;
      dispatch(setToken(token));
      const userResponse = await axios.get(`${process.env.BACKEND_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(userResponse.data));
      alert(`login successfully ${userResponse?.data?.username}`);

      navigate("/");
    //   onLogin();
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
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
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Stack direction={'row'} alignItems={"center"} justifyContent={"end"} my={"10px"}>
                <Link to={"/signup"}>Sign Up</Link>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
