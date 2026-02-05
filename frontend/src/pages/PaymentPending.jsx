import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/solid';
import api from '@/services/api';

export default function PaymentPending() {
  const [searchParams] = useSearchParams();
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState(null);

  const handleManualRelease = async () => {
    const giftId = searchParams.get('giftId');
    const preferenceId = searchParams.get('preference_id'); // Mercado Pago uses snake_case
    
    if (!giftId || !preferenceId) return;
    
    try {
      setIsReleasing(true);
      await api.post(`/gifts/${giftId}/release`, { preferenceId });
      setReleaseStatus({ type: 'success', message: '✅ Reserva cancelada. O presente está disponível novamente!' });
    } catch (error) {
      setReleaseStatus({ type: 'error', message: '⚠️ Erro ao liberar a reserva. Tente novamente.' });
    } finally {
      setIsReleasing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-light px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        {/* Pending Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <ClockIcon className="w-24 h-24 text-yellow-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">
          Pagamento em Processamento
        </h1>

        {/* Message */}
        <p className="text-lg text-text-muted mb-8">
          Seu pagamento está sendo processado.
          <br />
          Você será notificado quando for confirmado.
        </p>

        {/* Info Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            Isso pode levar alguns minutos. Verifique seu email para acompanhar o status.
          </p>
        </div>

        {/* Release Status Message */}
        {releaseStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg mb-6 text-sm ${
              releaseStatus.type === 'success' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}
          >
            {releaseStatus.message}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/presentes"
            className="block w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar para Lista de Presentes
          </Link>

          {/* Manual Cancel Reservation Button */}
          {searchParams.get('giftId') && searchParams.get('preference_id') && (
            <button
              onClick={handleManualRelease}
              disabled={isReleasing}
              className="w-full px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isReleasing ? 'Cancelando...' : 'Cancelar Minha Reserva'}
            </button>
          )}

          <Link
            to="/"
            className="block w-full px-6 py-3 bg-secondary text-text-dark font-medium rounded-lg hover:bg-secondary-dark transition-colors"
          >
            Voltar para o Início
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
