import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

export default function StorySection({ 
  title, 
  date, 
  location, 
  emoji, 
  story, 
  imageLeft = false,
  children 
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 40
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-cover bg-center bg-no-repeat relative z-10"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/images/ourStoryBackground.png)` // Added transparency overlay and aligned image to the left
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
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
  imageLeft: PropTypes.bool,
  children: PropTypes.node
};
