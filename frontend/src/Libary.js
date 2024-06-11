import { Box, Typography } from "@mui/material";
import Navigation from "./Navigation";
import TableBooks from "./TableBooks";
import { useEffect, useState } from "react";
import axios from "axios";

const Libary=({ session, setSession, usr, idUsr })=>{

  const [totalPageCount,setTotalPageCount]=useState(0)
  const [refreshPageCount,setRefreshPageCount]=useState(0)

  useEffect(()=>{
    const fetchTotalPageCount = async () =>{
      const response = await axios.get('http://127.0.0.1:5000/total-page-count-reviewed', {
        params: {"idUser": idUsr }
      })
      setTotalPageCount(response.data['totalPageCount'])
    }
    fetchTotalPageCount()
  },[refreshPageCount])

  const refresh=()=>{
    setRefreshPageCount(counter=>counter+1)
  }
    return (
        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
          <Navigation session={session} setSession={setSession} usr={usr} idUsr={idUsr} />
          <br />
          <Typography sx={{fontSize:'20pt',mb:3}}>{usr}'s Libary</Typography>
          <Typography sx={{fontSize:'20pt',mb:3}}>You have read {totalPageCount} pages total!</Typography>
          <TableBooks idUser={idUsr} homeView={false} refreshPageCount={refresh}/>
        </Box>
      );

}

export default Libary