import { Box, Modal, Typography } from "@mui/material";
import './StarRating.css'

const ReviewModal = ({ style, reviewData, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h4">{reviewData.title}</Typography>
        <Typography variant="h6">My Rating: {reviewData.rating}</Typography>
        <Typography variant="h6">Review:</Typography>
        <Typography variant="h6"><i>{reviewData.reviewText}</i></Typography>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
