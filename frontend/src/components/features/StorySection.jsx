import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

export default function StorySection({ 
  title, 
  date, 
  location, 
  emoji, 
  story, 
  image, 
  imageAlt,
  imageLeft = false,
  children 
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: imageLeft ? -60 : 60 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: imageLeft ? 60 : -60 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${
          imageLeft ? 'lg:grid-flow-dense' : ''
        }`}>
          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`${imageLeft ? 'lg:col-start-1' : 'lg:col-start-2'} relative`}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`${imageLeft ? 'lg:col-start-2' : 'lg:col-start-1'} lg:row-start-1`}
          >
            {/* Emoji */}
            {emoji && (
              <div className="text-5xl mb-4">
                {emoji}
              </div>
            )}

            {/* Title & Date */}
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">
              {title}
            </h2>
            
            {date && (
              <p className="text-lg text-secondary-dark font-couple-names font-medium mb-2">
                {date}
              </p>
            )}
            
            {location && (
              <p className="text-primary-light mb-6">
                {location}
              </p>
            )}

            {/* Story */}
            {story && (
              <div className="prose prose-lg max-w-none">
                <p className="text-primary leading-relaxed whitespace-pre-line">
                  {story}
                </p>
              </div>
            )}

            {/* Additional Content (for venue section) */}
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

StorySection.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  location: PropTypes.string,
  emoji: PropTypes.string,
  story: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageLeft: PropTypes.bool,
  children: PropTypes.node
};
