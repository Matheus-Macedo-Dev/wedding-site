import { motion } from 'framer-motion';
import useCountdown from '@/hooks/useCountdown';
import { WEDDING_DATE } from '@/utils/constants.js';

function CountdownCard({ value, label }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl md:text-6xl font-serif font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="text-sm md:text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export default function Countdown() {
  const timeData = useCountdown(WEDDING_DATE);
  const { isMarried, days, hours, minutes, seconds, months } = timeData;

  const timeUnits = isMarried
    ? [
        { value: months, label: months === 1 ? 'Mês' : 'Meses' },
        { value: days, label: days === 1 ? 'Dia' : 'Dias' }
      ]
    : [
        { value: days, label: 'Dias' },
        { value: hours, label: 'Horas' },
        { value: minutes, label: 'Minutos' },
        { value: seconds, label: 'Segundos' }
      ];

  return (
    <section className="relative py-16 md:py-24 bg-transparent">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-4 uppercase">
            {isMarried ? 'Casados Há' : 'Contagem Regressiva'}
          </h2>
          <p className="text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {isMarried
              ? 'Celebrando nosso amor a cada dia!'
              : 'Falta pouco para o grande dia!'}
          </p>
        </motion.div>

        <div className={`grid gap-4 md:gap-6 max-w-4xl mx-auto ${
          isMarried ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
        }`}>
          {timeUnits.map((unit) => (
            <CountdownCard
              key={unit.label}
              value={unit.value}
              label={unit.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
