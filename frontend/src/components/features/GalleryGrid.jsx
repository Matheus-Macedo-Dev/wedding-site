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
           
            src={photo.src}
            alt={photo.alt}
            effect="blur"
            className="relative group cursor-pointer rounded-lg mb-4"
            onClick={() => onPhotoClick(photo)}
          >
            <LazyLoadImage
              src={photo.src}
              alt={photo.alt}
              effect="blur"
              className="w-full h-auto"
            />
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
