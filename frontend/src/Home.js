import { Box } from "@mui/material";
import Navigation from "./Navigation";
import TableBooks from "./TableBooks";

const Home = ({ session, setSession, usr, idUsr }) => {
  return (
    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
      <Navigation session={session} setSession={setSession} usr={usr} idUsr={idUsr} />
      <br />
      <TableBooks />
    </Box>
  );
};

export default Home;
