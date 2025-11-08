import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import confetti from 'canvas-confetti';

export default function PaymentSuccess() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF77', '#8B7355', '#E8DDD3']
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF77', '#8B7355', '#E8DDD3']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-light px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <CheckCircleIcon className="w-24 h-24 text-green-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">
          Obrigado pelo Presente! 💝
        </h1>

        {/* Message */}
        <p className="text-lg text-text-muted mb-8">
          Seu pagamento foi confirmado com sucesso!
          <br />
          Você receberá a confirmação por email.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/presentes"
            className="block w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar para Lista de Presentes
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
