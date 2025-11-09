import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGifts, createCheckout } from '@/services/api';
import GiftList from '@/components/features/GiftList';
import Loader, { Spinner } from '@/components/common/Loader';

export default function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGifts();
      setGifts(response.data);
    } catch (err) {
      console.error('Error fetching gifts:', err);
      setError('Não foi possível carregar os presentes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (giftId) => {
    try {
      const response = await createCheckout(giftId);
      // Redirect to Mercado Pago checkout
      window.location.href = response.data.initPoint;
    } catch (err) {
      console.error('Error creating checkout:', err);
      alert('Não foi possível processar o pagamento. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 pt-32">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Lista de Presentes
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Escolha um presente especial para nos ajudar a começar nossa nova vida juntos!
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <Spinner size="large" color="primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchGifts}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-couple-names"
            >
              Tentar Novamente
            </button>
          </motion.div>
        )}

        {/* Gift List */}
        {!loading && !error && gifts.length > 0 && (
          <GiftList
            gifts={gifts}
            onPurchase={handlePurchase}
            loading={loading}
          />
        )}

        {/* Empty State */}
        {!loading && !error && gifts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-text-muted">
              Nenhum presente disponível no momento.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
