import { Box, Modal } from "@mui/material"

const BookInfo=({style,book,open,handleClose})=>{


    return(
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <h2>{book.title}</h2>
                <h3>by {book.author.name+' '+book.author.lastName}</h3>
                <p>Page count: {book.pageCount}</p>
                <p>Description: {book.description}</p>
            </Box>
            
        </Modal>
    )
}
export default BookInfo