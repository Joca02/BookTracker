import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { SimpleTreeView,TreeItem } from "@mui/x-tree-view"
import { useNavigate } from "react-router-dom";


const AddBookModal = ({ open, handleClose, styles ,setBooks}) => {
    const [title, setTitle] = useState('');
    const [idAuthor, setIdAuthor] = useState('');
    const [authors, setAuthors] = useState([]);
    const [pageCount, setPageCount] = useState('');
    const [description, setDescription] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [isAddingAuthor, setIsAddingAuthor] = useState(false);

    const navigate=useNavigate()
    useEffect(() => {
        // Fetch authors when the modal is opened
        if (open) {
            axios.get('http://127.0.0.1:5000/get-all-authors')
                .then(response => {
                    const sortedAuthors = response.data.sort((a, b) => a.name.localeCompare(b.name));
                    const groupedAuthors = sortedAuthors.reduce((acc, author) => {
                        const firstLetter = author.name.charAt(0).toUpperCase();
                        if (!acc[firstLetter]) {
                            acc[firstLetter] = [];
                        }
                        acc[firstLetter].push(author);
                        return acc;
                    }, {});
                    setAuthors(groupedAuthors);
                })
                .catch(error => {
                    console.error("There was an error fetching authors!", error);
                });
        }
    }, [open]);

    const handleAddBook = () => {
        const bookData = {
            title,
            idAuthor,
            pageCount,
            description,
        };

        axios.post('http://127.0.0.1:5000/add-book', bookData)
            .then(response => {
                if(response.data['error'])
                    {
                        alert(response.data['error'])
                        return;
                    }
                alert(response.data['message']);
                const fetchBooks = async () => {
                    try {
                      const response = await axios.get('http://127.0.0.1:5000/get-all-books');
                      setBooks(response.data);
                      console.log(response.data)
                    } catch (error) {
                      console.error("There was an error fetching the books!", error);
                    }
                  }  
                fetchBooks();
                close()
            })
            .catch(error => {
                console.error("There was an error adding the book!", error);
            });
    };

    const handleAddAuthor = () => {
      
        const [name, lastName] = newAuthor.split(" ");
    
        
        if (!name || !lastName) {
            
            alert("Please enter first and last name");
            return;
        }
        

        axios.post('http://127.0.0.1:5000/add-author', { 'name':name, 'lastName':lastName })
            .then(response => {
                const firstLetter = name.charAt(0).toUpperCase();
                // setAuthors(prevAuthors => ({
                //     ...prevAuthors,
                //     [firstLetter]: [...(prevAuthors[firstLetter] || []), response.data].sort((a, b) => a.name.localeCompare(b.name))
                // }));
                // setNewAuthor('');
                // setIsAddingAuthor(false);
                if(response.data['error'])
                    {
                        alert(response.data['error'])
                        return;
                    }
                alert(response.data['message'])
                close()
            })
            .catch(error => {
                console.error("There was an error adding the author!", error);
            });
    };
    

    const close=()=>{
         setTitle('');
       setIdAuthor('');
        setAuthors([]);
         setPageCount('');
        setDescription('');
        setNewAuthor('');
        setIsAddingAuthor(false);
        handleClose()
    }
    return (
        <Modal open={open} onClose={close}>
            <Box sx={styles}>
                <Typography variant="h6" component="h2">Add New Book</Typography>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Typography variant="h6" component="h2">Author</Typography>
                {isAddingAuthor ? (
                    <Box>
                        <TextField
                            label="New Author"
                            fullWidth
                            margin="normal"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                        />
                        <Button onClick={handleAddAuthor}>Save Author</Button>
                        <Button onClick={() => setIsAddingAuthor(false)}>Cancel</Button>
                    </Box>
                ) : (
                    <Box>
                        <SimpleTreeView>
                            {Object.keys(authors).sort().map(letter => (
                                <TreeItem key={letter} itemId={letter} label={letter}>
                                    {authors[letter].map((author) => (
                                        <TreeItem
                                            key={author.idAuthor}
                                            itemId={author.idAuthor.toString()}
                                            label={author.name+' '+author.lastName}
                                            onClick={() => setIdAuthor(author.idAuthor)}
                                        />
                                    ))}
                                </TreeItem>
                            ))}
                        </SimpleTreeView>
                        <Button onClick={() => setIsAddingAuthor(true)}>Add New Author</Button>
                    </Box>
                )}
                <TextField
                    label="Page Count"
                    fullWidth
                    margin="normal"
                    value={pageCount}
                    onChange={(e) => setPageCount(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleAddBook}>Add Book</Button>
            </Box>
        </Modal>
    );
};

export default AddBookModal;
