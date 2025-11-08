import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function PaymentError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-light px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <XCircleIcon className="w-24 h-24 text-red-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">
          Ops! Algo deu errado
        </h1>

        {/* Message */}
        <p className="text-lg text-text-muted mb-8">
          Não conseguimos processar seu pagamento.
          <br />
          Por favor, tente novamente ou escolha outro presente.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/presentes"
            className="block w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Tentar Novamente
          </Link>
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
