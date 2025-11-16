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
    src: 'https://i.imgur.com/KH0eEGP.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 2,
    src: 'https://i.imgur.com/KDMR3kI.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 3,
    src: 'https://i.imgur.com/iawJmL3.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 4,
    src: 'https://i.imgur.com/QwGnV2z.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 5,
    src: 'https://i.imgur.com/LjU3KR6.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 6,
    src: 'https://i.imgur.com/xVTOgn1.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 7,
    src: 'https://i.imgur.com/HmxBW8i.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 8,
    src: 'https://i.imgur.com/B7NLESx.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 9,
    src: 'https://i.imgur.com/rsrRW8Q.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 10,
    src: 'https://i.imgur.com/LKY9ZbA.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 11,
    src: 'https://i.imgur.com/UDBR7pS.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 12,
    src: 'https://i.imgur.com/gkyPDAz.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 13,
    src: 'https://i.imgur.com/Hz4wsoo.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 14,
    src: 'https://i.imgur.com/NjjtF5c.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 15,
    src: 'https://i.imgur.com/RquLWiF.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 16,
    src: 'https://i.imgur.com/Qesoout.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 17,
    src: 'https://i.imgur.com/DR2sY7Q.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 18,
    src: 'https://i.imgur.com/2kbZI40.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 19,
    src: 'https://i.imgur.com/SjykYvM.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 20,
    src: 'https://i.imgur.com/LJ01ZPQ.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 21,
    src: 'https://i.imgur.com/qEW1b04.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 22,
    src: 'https://i.imgur.com/GVQw4X3.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 23,
    src: 'https://i.imgur.com/cTaiPZh.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 24,
    src: 'https://i.imgur.com/nnMoDC6.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 25,
    src: 'https://i.imgur.com/EeXpwDn.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 26,
    src: 'https://i.imgur.com/NDEnzYU.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 27,
    src: 'https://i.imgur.com/fSYlpnQ.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 28,
    src: 'https://i.imgur.com/l9rPWsY.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 29,
    src: 'https://i.imgur.com/tmIgxV3.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 30,
    src: 'https://i.imgur.com/YPZBu1y.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 31,
    src: 'https://i.imgur.com/39LjGDs.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 32,
    src: 'https://i.imgur.com/XS6yVct.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 33,
    src: 'https://i.imgur.com/xL3sJN8.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 34,
    src: 'https://i.imgur.com/kEXiRbj.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 35,
    src: 'https://i.imgur.com/GJ7Mb6F.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 36,
    src: 'https://i.imgur.com/35PA5P3.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 37,
    src: 'https://i.imgur.com/3Q7sveI.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 38,
    src: 'https://i.imgur.com/8JL3MfL.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 39,
    src: 'https://i.imgur.com/MZ6KSd0.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 40,
    src: 'https://i.imgur.com/fRHEr6a.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 41,
    src: 'https://i.imgur.com/0bitlNj.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 42,
    src: 'https://i.imgur.com/B5evwU0.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 43,
    src: 'https://i.imgur.com/5UG1khg.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 44,
    src: 'https://i.imgur.com/dOR8a6S.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 45,
    src: 'https://i.imgur.com/c2AAZUT.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 46,
    src: 'https://i.imgur.com/18NBe8a.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 47,
    src: 'https://i.imgur.com/xle9BfY.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 48,
    src: 'https://i.imgur.com/LCdWlsk.jpeg',
    alt: 'Foto do ensaio pré-wedding'
  },
  {
    id: 49,
    src: 'https://i.imgur.com/eVwGMBI.jpeg',
    alt: 'Foto do ensaio pré-wedding'
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
