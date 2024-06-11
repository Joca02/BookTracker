import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import StarRating from './StarRating';
import './StarRating.css';

const AddReviewModal = ({ open, handleClose, idBook, idUser, setIsReviewed, setReviewData, refreshPageCount, bookTitle }) => {
    const [rating, setRating] = useState(null);
    const [reviewText, setReviewText] = useState('');

    const handleRating = (rating) => {
        setRating(rating);
    };

    const handleSubmit = async () => {
        let data = {
            "idBook": idBook,
            "idUser": idUser,
            "rating": rating,
            "reviewText": reviewText
        };

        try {
            let response = await axios.post('http://127.0.0.1:5000/add-review', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data['error']) {
                alert(response.data['error']);
                return;
            }
            alert(response.data['message']);
            setIsReviewed(true);
            setReviewData({
                title: bookTitle,  // Use the actual book title here
                rating: rating,
                reviewText: reviewText
            });
            refreshPageCount();
            handleClose();
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

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

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    Add Your Review
                </Typography>
                <StarRating handleRating={handleRating} />
                <TextField
                    label="Review Text"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Submit Review
                </Button>
            </Box>
        </Modal>
    );
};

export default AddReviewModal;