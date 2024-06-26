import { Box, Typography } from "@mui/material";
import Navigation from "./Navigation";
import TableBooks from "./TableBooks";

const Home = ({ session, setSession, usr, idUsr }) => {
  return (
    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
      <Navigation session={session} setSession={setSession} usr={usr} idUsr={idUsr} />
      <br />
      <Typography sx={{fontSize:'20pt',mb:3}}>Home Page</Typography>
      <TableBooks idUser={idUsr} homeView={true}/>
    </Box>
  );
};

export default Home;
