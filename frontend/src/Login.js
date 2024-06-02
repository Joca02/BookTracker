import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { checkSession } from './checkSession';
const Login=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();
      let data={
        'username':username,
        'password':password,
        
      }
      console.log(data)
      let response=await axios.post('http://127.0.0.1:5000/login',data, {
        withCredentials: true  // Send cookies with the request
      })
      
      if(!response.data['message'])
        {
          alert(response.data['error'])
          return;
        }
      
      alert(response.data['message'])
      //navigate('/home')

      
    };
  
    return (
      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Box>
        <br></br>
        <Link to={'/register'}>Don't have an account? Sign up now!</Link>
        <button onClick={()=>checkSession()}>wqewwqe</button>
      </Container>
    );
}

export default Login