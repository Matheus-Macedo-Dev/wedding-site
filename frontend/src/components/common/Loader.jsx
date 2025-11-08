import PropTypes from 'prop-types';

// Spinner Loader
export function Spinner({ size = 'medium', color = 'primary' }) {
  const sizeStyles = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4'
  };

  const colorStyles = {
    primary: 'border-primary border-t-transparent',
    accent: 'border-accent border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div
      className={`
        ${sizeStyles[size]} ${colorStyles[color]}
        rounded-full animate-spin
      `}
    />
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'accent', 'white'])
};

// Full Page Loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <Spinner size="large" color="primary" />
        <p className="mt-4 text-lg text-text-muted">Carregando...</p>
      </div>
    </div>
  );
}

// Skeleton Loader for Content
export function Skeleton({ className = '', variant = 'text' }) {
  const variantStyles = {
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    avatar: 'w-12 h-12 rounded-full',
    thumbnail: 'w-full h-48 rounded-lg',
    card: 'w-full h-64 rounded-lg'
  };

  return (
    <div
      className={`
        ${variantStyles[variant]} ${className}
        bg-gray-200 animate-pulse
      `}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'title', 'avatar', 'thumbnail', 'card'])
};

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <Skeleton variant="thumbnail" className="mb-4" />
      <Skeleton variant="title" className="mb-2" />
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
  );
}

// Default export
export default function Loader({ variant = 'spinner', ...props }) {
  if (variant === 'page') return <PageLoader />;
  if (variant === 'skeleton') return <Skeleton {...props} />;
  if (variant === 'card') return <CardSkeleton />;
  return <Spinner {...props} />;
}

Loader.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'page', 'skeleton', 'card'])
};
