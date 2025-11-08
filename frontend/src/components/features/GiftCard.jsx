import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function GiftCard({ gift, onPurchase, loading }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    await onPurchase(gift.id);
    setIsProcessing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-full object-cover"
          />
          {!gift.isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Esgotado</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category Badge */}
          {gift.category && (
            <span className="text-xs text-accent font-medium mb-2">
              {gift.category}
            </span>
          )}

          {/* Name */}
          <h3 className="text-lg font-serif font-bold text-text-dark mb-2">
            {gift.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-muted mb-4 line-clamp-2 flex-grow">
            {gift.description}
          </p>

          {/* Price and Availability */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(gift.price)}
            </span>
            <span className={`text-sm font-medium ${
              gift.isAvailable ? 'text-green-600' : 'text-red-600'
            }`}>
              {gift.available > 0 
                ? `${gift.available} ${gift.available === 1 ? 'disponível' : 'disponíveis'}`
                : 'Esgotado'
              }
            </span>
          </div>

          {/* Purchase Button */}
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            disabled={!gift.isAvailable || isProcessing || loading}
            onClick={handlePurchase}
          >
            {isProcessing ? 'Processando...' : 'Presentear'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

GiftCard.propTypes = {
  gift: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    purchased: PropTypes.number.isRequired,
    available: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired
  }).isRequired,
  onPurchase: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
