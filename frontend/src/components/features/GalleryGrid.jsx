import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './GalleryGrid.css';

export default function GalleryGrid({ photos, onPhotoClick }) {
  const breakpointColumns = {
    default: 4,
    1024: 3,
    768: 2,
    640: 1
  };

  return (
    <div>
      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group cursor-pointer overflow-hidden rounded-lg mb-4"
            onClick={() => onPhotoClick(photo)}
          >
            <LazyLoadImage
              src={photo.src}
              alt={photo.alt}
              effect="blur"
              className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                {photo.caption && (
                  <p className="text-white text-sm font-medium mb-1">
                    {photo.caption}
                  </p>
                )}
                {photo.date && (
                  <p className="text-white text-xs">
                    {photo.date}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>

      {/* Empty State */}
      {photos.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-text-muted">
            Nenhuma foto encontrada.
          </p>
        </div>
      )}
    </div>
  );
}
