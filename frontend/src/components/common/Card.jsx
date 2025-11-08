import PropTypes from 'prop-types';

export default function Card({
  children,
  hover = true,
  className = '',
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hover: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};
