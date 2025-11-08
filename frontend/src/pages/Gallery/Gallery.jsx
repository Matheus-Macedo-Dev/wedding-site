import { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '@/components/features/GalleryGrid';
import Lightbox from '@/components/features/Lightbox';
import Loader from '@/components/common/Loader';

/**
 * GALLERY PHOTOS CONFIGURATION
 * 
 * You can use:
 * 1. Local images: '/images/gallery/photo-1.jpg'
 * 2. Google Drive: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID'
 * 3. CDN (Cloudinary, ImgBB, etc.): Full URL
 * 
 * How to get Google Drive direct link:
 * 1. Upload image to Google Drive
 * 2. Right-click → Share → Anyone with the link can view
 * 3. Copy the file ID from the sharing link
 * 4. Use format: https://drive.google.com/uc?export=view&id=FILE_ID
 * 
 * Example:
 * Original: https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
 * Direct:   https://drive.google.com/uc?export=view&id=1ABC123xyz
 */
const GALLERY_PHOTOS = [
  {
    id: 1,
    src: '/images/gallery/prewedding-1.jpg', // Replace with Google Drive URL or CDN
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Nosso ensaio na praia',
    date: 'Janeiro 2024'
  },
  {
    id: 2,
    src: '/images/gallery/prewedding-2.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Um momento especial',
    date: 'Janeiro 2024'
  },
  {
    id: 3,
    src: '/images/gallery/prewedding-3.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Golden hour',
    date: 'Janeiro 2024'
  },
  {
    id: 4,
    src: '/images/gallery/prewedding-4.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Nosso amor',
    date: 'Janeiro 2024'
  },
  {
    id: 5,
    src: '/images/gallery/prewedding-5.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Tarde perfeita',
    date: 'Janeiro 2024'
  },
  {
    id: 6,
    src: '/images/gallery/prewedding-6.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Pôr do sol',
    date: 'Janeiro 2024'
  },
  {
    id: 7,
    src: '/images/gallery/prewedding-7.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Risadas e alegria',
    date: 'Janeiro 2024'
  },
  {
    id: 8,
    src: '/images/gallery/prewedding-8.jpg',
    alt: 'Foto do ensaio pré-wedding',
    caption: 'Momentos únicos',
    date: 'Janeiro 2024'
  }
  // Add more photos as needed - supports unlimited photos
];

export default function Gallery() {
  const [photos] = useState(GALLERY_PHOTOS);
  const [loading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1]);
    }
  };

  const handlePreviousPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader variant="page" />
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Nosso Ensaio Pré-Wedding
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Momentos especiais capturados no nosso ensaio fotográfico
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <GalleryGrid photos={photos} onPhotoClick={handlePhotoClick} />

        {/* Lightbox */}
        {selectedPhoto && (
          <Lightbox
            photo={selectedPhoto}
            photos={photos}
            onClose={handleCloseLightbox}
            onNext={handleNextPhoto}
            onPrevious={handlePreviousPhoto}
          />
        )}
      </div>
    </div>
  );
}
