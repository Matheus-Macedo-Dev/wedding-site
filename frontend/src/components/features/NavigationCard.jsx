import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export function NavigationCard({ 
  id, 
  title, 
  description, 
  image, 
  gradient,
  path, 
  external = false 
}) {
  const cardContent = (
    <motion.div 
      className="relative flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[500px] h-[500px] md:h-[600px] rounded-2xl overflow-hidden snap-center group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image or Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={
          image 
            ? { backgroundImage: `url(${image})` }
            : { background: gradient }
        }
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <h3 className="text-2xl md:text-3xl font-serif font-normal uppercase text-white mb-3">
          {title}
        </h3>
        <p className="font-couple-names text-sm md:text-base text-white/90 mb-6 line-clamp-2">
          {description}
        </p>
        
        {/* Button */}
        <button className="self-start px-8 py-3 bg-transparent border-2 border-white text-accent font-couple-names font-medium text-sm tracking-wider rounded-full hover:bg-accent hover:text-white transition-colors duration-300">
          {external ? 'Acessar' : 'Ver Mais'}
        </button>
      </div>
    </motion.div>
  );

  if (external) {
    return (
      <a 
        href={path} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return <Link to={path}>{cardContent}</Link>;
}

NavigationCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  gradient: PropTypes.string,
  path: PropTypes.string.isRequired,
  external: PropTypes.bool
};

NavigationCard.defaultProps = {
  external: false,
  image: null,
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};
