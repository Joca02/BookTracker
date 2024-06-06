import { TableRow, TableCell, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import AddReviewModal from "./AddReviewModal";
import axios from "axios";
import ReviewModal from "./ReviewModal";

const RowBook = ({ book, index, idUser, homeView }) => {
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [openReviewed,setOpenReviewed]=useState(false)
    const [isInLibary, setIsInLibary] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    const styles = { width: '50%' };


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
        const checkLibary = async () => {
            let data = {
                "idBook": book.idBook,
                "idUser": idUser
            };
            try {
                let response = await axios.post('http://127.0.0.1:5000/check-libary', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setIsInLibary(response.data['isInLibary']);
            } catch (error) {
                console.error("Error checking library status:", error);
            }
        };

        const checkReview = async () => {
            let data = {
                "idBook": book.idBook,
                "idUser": idUser
            };
            try {
                let response = await axios.post('http://127.0.0.1:5000/get-review-info', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setIsReviewed(!response.data['error']);
                console.log(response.data);
                if (response.data['error']) {
                    return null;
                }
                setReviewData(response.data);
            } catch (error) {
                console.error("Error checking review info:", error);
                return null;
            }
        };

        if (homeView) {
            checkLibary();
        } else {
            checkReview();
        }
    }, [book.idBook, idUser, homeView]);

    const addToLibary = async () => {
        let data = {
            "idBook": book.idBook,
            "idUser": idUser
        };
        let response = await axios.post('http://127.0.0.1:5000/add-to-libary', data);

        if (response.data['error']) {
            alert(response.data['error']);
            return;
        }
        alert(response.data['message']);
        setIsInLibary(true);
    };

    const removeFromLibary = async () => {
        let data = {
            "idBook": book.idBook,
            "idUser": idUser
        };
        let response = await axios.delete('http://127.0.0.1:5000/remove-from-libary', { data: data });

        if (response.data['error']) {
            alert(response.data['error']);
            return;
        }
        alert(response.data['message']);
        setIsInLibary(false);
    };

    return (
        <TableRow sx={{ backgroundColor: index % 2 === 0 ? '' : '#f5f5f5' }}>
            <BookInfo open={openInfoModal}
                      handleClose={() => setOpenInfoModal(false)}
                      book={book}
                      style={modalStyle}
            />
            <AddReviewModal open={openReviewModal}
                            handleClose={() => setOpenReviewModal(false)}
                            idBook={book.idBook}
                            idUser={idUser}
                            setIsReviewed={setIsReviewed}
                            setReviewData={setReviewData}
            />

            <TableCell align="center" sx={styles}><Typography>{book.title}</Typography></TableCell>
            <TableCell align="center" sx={styles}><Typography>{book.author.name + ' ' + book.author.lastName}</Typography></TableCell>
            <TableCell align="center" sx={styles}><Typography>{book.pageCount}</Typography></TableCell>

            <TableCell align="center" sx={styles} >
                <Button onClick={() => setOpenInfoModal(true)} variant="outlined">
                    More Info
                </Button>
            </TableCell>
            <TableCell align="center" sx={styles} >
                <Typography> {
                    homeView ?
                        isInLibary ?
                            <Button variant="outlined" color="error" onClick={removeFromLibary}>
                                Remove from libary
                            </Button>
                            :
                            <Button variant="outlined" color="success" onClick={addToLibary}>
                                Add to libary
                            </Button>
                        :
                        isReviewed ?
                            <div>

                    <Button onClick={() => setOpenReviewed(true)} variant="outlined" color="secondary">
                    View Review
                    
                </Button>
                <ReviewModal
                    open={openReviewed}
                    handleClose={() => setOpenReviewed(false)}
                    reviewData={reviewData}
                    style={modalStyle}
        />
                            </div>
                            :
                            <Button color="success" variant="outlined" onClick={() => setOpenReviewModal(true)}>
                                Add Review
                            </Button>
                }</Typography>
            </TableCell>
        </TableRow>
    );
};

export default RowBook;
