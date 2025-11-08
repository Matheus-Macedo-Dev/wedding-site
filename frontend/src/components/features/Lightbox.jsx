import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline';

export default function Lightbox({ photo, photos, onClose, onNext, onPrevious }) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrevious,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const currentIndex = photos.findIndex(p => p.id === photo.id);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = photo.alt || 'photo';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
        onClick={onClose}
        {...swipeHandlers}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
          aria-label="Close lightbox"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 text-white hover:text-accent transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeftIcon className="w-12 h-12" />
          </button>
        )}

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl max-h-[90vh] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          
          {/* Photo Info */}
          <div className="text-white text-center mt-4">
            {photo.caption && (
              <p className="text-lg font-medium mb-1">{photo.caption}</p>
            )}
            {photo.date && (
              <p className="text-sm text-gray-300">{photo.date}</p>
            )}
          </div>
        </motion.div>

        {/* Next Button */}
        {currentIndex < photos.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 text-white hover:text-accent transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRightIcon className="w-12 h-12" />
          </button>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          {/* Counter */}
          <span className="text-white text-sm">
            {currentIndex + 1} / {photos.length}
          </span>

          {/* Download Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="text-white hover:text-accent transition-colors"
            aria-label="Download photo"
            title="Download"
          >
            <ArrowDownTrayIcon className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
