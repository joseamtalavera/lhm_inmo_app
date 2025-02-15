// src/components/Carousel.js

import React, { useState } from 'react';
import Button from '@mui/material/Button'; // added import
// Added imports for modal dialog
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// New imports for icon buttons and icons
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery'; // added import

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Added state to handle modal open/close
  const [open, setOpen] = useState(false);
  // New state to track the currently displayed image in modal
  const [modalIndex, setModalIndex] = useState(0);
  
  const isMobile = useMediaQuery('(max-width:600px)'); // mobile detection

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  // Get four thumbnails starting from the next image(s)
  const thumbnails = images.slice(currentIndex + 1, currentIndex + 5);

  const handleThumbnailClick = (index) => {
    // Calculate the new index relative to all images
    setCurrentIndex(currentIndex + 1 + index);
  };

  const handleSeeAll = () => {
    if (!isMobile) {
      setModalIndex(currentIndex);
      setOpen(true);
    } // added missing closing brace for if-block
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handlers to navigate modal images
  const handleModalPrev = () => {
    setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleModalNext = () => {
    setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Shared navigation handlers for mobile
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      {isMobile ? (
        <div style={{ position: 'relative', width: '100%' /* replaced fixed height */ }}>
          <img
            src={images[currentIndex].url}
            alt={`${currentIndex + 1}`}
            style={{
              width: '100%',
              height: 'auto', // updated for responsiveness
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
          <IconButton
            onClick={handlePrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)'
              // removed backgroundColor property
            }}
          >
            <ArrowBackIosIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)'
              // removed backgroundColor property
            }}
          >
            <ArrowForwardIosIcon style={{ color: 'white' }} />
          </IconButton>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', position: 'relative', height: '500px' /* Increased height */ }}>
            {/* Left half: Main image */}
            <div style={{ flex: 1, marginRight: '5px', height: '100%' }}>
              <img
                src={images[currentIndex].url}
                alt={`${currentIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderTopLeftRadius: '8px', // added border radius to top left corner
                  borderBottomLeftRadius: '8px' // added border radius to bottom left corner
                }}
              />
            </div>

            {/* Right half: Thumbnails */}
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr', // Added to split vertical space equally
                gridGap: '5px',
                position: 'relative',
                height: '100%'
              }}
            >
              {thumbnails.map((img, idx) => (
                <img
                  key={currentIndex + 1 + idx}
                  src={img.url}
                  alt={`${currentIndex + 1 + idx}`}
                  style={{
                    width: '100%',
                    height: '100%', // Modified to take the full space of its grid cell
                    objectFit: 'cover',
                    cursor: 'pointer',
                    ...(idx === 1 && { borderTopRightRadius: '8px' }), // added border radius to top right corner on second thumbnail
                    ...(idx === 3 && { borderBottomRightRadius: '8px' }) // added border radius to bottom right corner on fourth thumbnail
                  }}
                  onClick={() => handleThumbnailClick(idx)}
                />
              ))}
              <Button 
                variant="outlined" 
                size="small"
                onClick={handleSeeAll}
                sx={{
                  position: 'absolute',
                  bottom: '5px', // moved from top to botto
                  right: '5px',
                  backgroundColor: 'rgba(0, 0, 255, 0.05)', 
                  textTransform: 'none'
                }}
              >
                Ver todas las fotos
              </Button>
            </div>
          </div>
          
          {/* Updated Dialog with arrow icons for navigation and X icon to close */}
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src={images[modalIndex].url}
                alt={`${modalIndex + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              {/* Removed previous absolute arrow IconButtons and counter */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <IconButton onClick={handleModalPrev} style={{ backgroundColor: 'transparent' }}>
                  <ArrowBackIosIcon style={{ color: 'black' }} />
                </IconButton>
                <div>{modalIndex + 1} / {images.length}</div>
                <IconButton onClick={handleModalNext} style={{ backgroundColor: 'transparent' }}>
                  <ArrowForwardIosIcon style={{ color: 'black' }} />
                </IconButton>
              </div>
              <IconButton
                onClick={handleClose}
                style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Carousel;