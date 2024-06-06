import {  Paper, TableBody, TableCell, TableContainer, TableHead, TableRow,Table, Input, Button, Modal, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
import RowBook from './RowBook';
import AddBookModal from './AddBookModal';
const TableBooks=({idUser,homeView})=>{

    const [books,setBooks]=useState([])
    const [openAddBook,setOpenAddBook]=useState(false)
    const [filterTitle,setFilterTitle]=useState('')
    const styles={
        'color':'white'
    }
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


    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/get-all-books');
            setBooks(response.data);
            console.log(response.data)
          } catch (error) {
            console.error("There was an error fetching the books!", error);
          }
        }  
        const fetchLibaryBooks=async()=>{
          try {
            const response = await axios.get('http://127.0.0.1:5000/get-books-by-user/'+idUser);
            setBooks(response.data);
            console.log(response.data)
          } catch (error) {
            console.error("There was an error fetching the books!", error);
          }
        }
        homeView?fetchBooks():fetchLibaryBooks();////if homeview
      }, [])

      const filterBooks=async (title)=>{
        console.log(title)
        if (homeView)
            {
              const response = await axios.get('http://127.0.0.1:5000/filter-books',{
                params: { title }
            });
              setBooks(response.data);
          }
          else{
            const response = await axios.get('http://127.0.0.1:5000/filter-books-by-user', {
              params: { title, idUser }
          });
              setBooks(response.data);
          }
        
      }

    return(
        <TableContainer component={Paper} sx={{ maxWidth: 1100,maxHeight:700 }}>
          <AddBookModal open={openAddBook} handleClose={e=>setOpenAddBook(false)} styles={modalStyle} setBooks={setBooks}/>
        <Table aria-label="car table" sx={{tableLayout:'fixed'}}>
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#252529' }}>
            <TableRow >
              <TableCell align="center" sx={styles}><Typography> Title</Typography></TableCell>
              <TableCell align="center" sx={styles}><Typography>Author</Typography></TableCell>
              <TableCell align="center" sx={styles}><Typography>Page Count</Typography></TableCell>

              
              <TableCell align="center"  sx={styles}>Search 
                  <Input type="text" sx={{ backgroundColor: 'white',ml:2 }}
                  // value={filterTitle}
                  onChange={e=>{
                    //setFilterTitle(e.target.value)
                    filterBooks(e.target.value)

                  }}
                  ></Input>
              </TableCell>
              {homeView?
                <TableCell align='center'>
                    <Button
                    variant='outlined'
                    onClick={e=>setOpenAddBook(true)}
                  ><Typography variant='button'>Add a Book</Typography>
                  </Button>
                </TableCell>
              :<TableCell></TableCell>}
             
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((b,index)=><RowBook key={b.idBook} book={b} index={index} idUser={idUser} homeView={homeView}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default TableBooks