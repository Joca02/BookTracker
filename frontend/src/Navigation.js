import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navigation = ({ session, setSession, usr }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleLogout = () => {
    setSession(false);
    localStorage.removeItem('session');
    localStorage.removeItem('usr');
    localStorage.removeItem('idUsr');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ width: '1100px', backgroundColor: 'wheat' }}>
      <Toolbar>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <Typography variant="h6" component={Link} to="/home" color="inherit" style={{ textDecoration: 'none', marginRight: '50px', color: 'brown' }}>
            Home
          </Typography>
          <Typography variant="h6" component={Link} to="/my-library" color="inherit" style={{ textDecoration: 'none', marginRight: '50px', color: 'brown' }}>
            My Library
          </Typography>
          <Typography sx={{ mr: '50px', color: '#a1858c' }}>Logged as: {usr}</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
