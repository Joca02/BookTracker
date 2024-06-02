import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { checkSession } from "./checkSession";
import axios from "axios";

const Navigation = () => {

    const [username,setUsername]=useState('')
    const navigate=useNavigate()
    // useEffect(()=>{
    //     const checkSession=async()=>{
    //         let response=await axios.get('http://127.0.0.1:5000/check-session')
    //         console.log(response.data)
    //         if(response.data['username'])
    //             setUsername(response.data['username'])
    //         else navigate('/')
    //     }
    //     checkSession()
    // },[])

    const logOut=async()=>{
        // let response=await axios.get('http://127.0.0.1:5000/logout')
        // navigate('/')                
    }
  return (
    <AppBar position="static" sx={{width:'50%',backgroundColor:'wheat'}} >
      <Toolbar >
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <Typography variant="h6" component={Link} to="/home" color="inherit" style={{ textDecoration: 'none', marginRight: '20px' ,color:'brown'}}>
            Home
          </Typography>
          <Typography variant="h6" component={Link} to="/my-library" color="inherit" style={{ textDecoration: 'none', marginRight: '20px',color:'brown' }}>
            My Library
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            style={{ width: '100%', maxWidth: '300px', marginRight: '90px',marginLeft:'50px' }}
          />
          <Typography>{username}</Typography>
          <Button variant="outlined" color="error" onClick={e=>logOut()}>
            Log Out
          </Button>
        </Box>
      </Toolbar>
      <button onClick={()=>checkSession()}>wqewwqe</button>
    </AppBar>
  );
};

export default Navigation;
