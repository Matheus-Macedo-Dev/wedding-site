import { motion } from 'framer-motion';
import { MapPinIcon, ClockIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Information() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-secondary-light to-background"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4 uppercase">
          Informações
        </h1>
        <p className="text-lg text-primary-light max-w-2xl mx-auto">
          Detalhes importantes sobre o nosso grande dia
        </p>
      </motion.div>

      {/* Event Details Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column - Event Details */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8 uppercase">
                O Grande Dia
              </h2>

              <div className="bg-secondary-light rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Data</h3>
                    <p className="text-primary-light">Quarta-feira, 04 de Junho de 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Horário</h3>
                    <p className="text-primary-light">Cerimônia às 16:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Local</h3>
                    <p className="text-primary-light">
                      Lounge Conceito<br />
                      Praia de Iparana - Caucaia/CE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <SparklesIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Dress Code</h3>
                    <p className="text-primary-light">Traje Esporte Fino</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Venue Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/timeline/venue.jpg`}
                  alt="Local do casamento - Lounge Conceito"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.5554841815792!2d-38.63371762410233!3d-3.6880824429702836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c735ef032d79ef%3A0x7d80b9d6dcb0c893!2sLounge%20Conceito!5e0!3m2!1spt-BR!2sbr!4v1762615994384!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lounge Conceito - Praia de Iparana, Caucaia/CE"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
