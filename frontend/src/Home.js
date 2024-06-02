import { Box } from "@mui/material"
import { useEffect } from "react"
import { checkSession } from "./checkSession"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navigation from "./Navigation"

const Home=()=>{

    
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Navigation/>
        </Box>
    )
}

export default Home