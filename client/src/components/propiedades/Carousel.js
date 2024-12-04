// src/components/Carousel.js

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Carousel = ({ images }) => {
  const galleryImages = images.map(image => ({
    original: image.url,
    thumbnail: image.url,
  }));

  return (
    <ImageGallery items={galleryImages} showPlayButton={false} />
  );
};

export default Carousel;