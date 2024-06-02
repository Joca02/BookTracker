
import { TableRow,TableCell, Button, Typography } from "@mui/material"
import { useState } from "react";
import BookInfo from "./BookInfo";
const RowBook=({book,index})=>{
    const [openInfoModal,setOpenInfoModal]=useState(false)
    const styles={width:'50%'}
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return(
        <TableRow sx={{
            backgroundColor: index % 2 === 0 ? '' : '#f5f5f5',
        }}>
            <BookInfo open={openInfoModal}
                      handleClose={()=>setOpenInfoModal(false)}
                      book={book}
                      style={modalStyle}
            />

            <TableCell align="center" sx={styles}><Typography>{book.title}</Typography></TableCell>
            <TableCell align="center" sx={styles}><Typography>{book.author.name+' '+book.author.lastName}</Typography></TableCell>
            <TableCell align="center" sx={styles}><Typography>{book.pageCount}</Typography></TableCell>
            
            <TableCell align="center" sx={styles} >
                <Button onClick={()=>setOpenInfoModal(true)}>
                    More Info
                </Button>
            </TableCell>
            <TableCell align="center" sx={styles} ><Typography> DUGME</Typography></TableCell>
            {/* <TableCell align="center" sx={styles}>
            <Typography>{avg} <FaStar color="#ffc107"/></Typography> 
            </TableCell> */}

        </TableRow>
    )
}

export default RowBook