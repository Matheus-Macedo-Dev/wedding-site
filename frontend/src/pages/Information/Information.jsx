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
                    <h3 className="font-couple-names font-semibold text-primary mb-1">Data</h3>
                    <p className="text-primary-light">Quinta-feira, 04 de Junho de 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-couple-names font-semibold text-primary mb-1">Horário</h3>
                    <p className="text-primary-light">Cerimônia às 16:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-couple-names font-semibold text-primary mb-1">Local</h3>
                    <p className="text-primary-light">
                      Lounge Conceito<br />
                      Praia de Iparana - Caucaia/CE
                    </p>
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
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
          {/* Dress Code Section */}
          <section className="mt-12 md:mt-20 py-16 md:py-24 bg-secondary-light -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8 uppercase text-center">
                  Vestimenta
                </h2>
                <p className="text-lg text-primary mb-8 text-center font-light">Esporte Fino</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-8 bg-background rounded-xl p-8 shadow-md"
              >
                <p className="text-primary-light text-center mb-12 leading-relaxed text-base">
                  Pensando no conforto e na harmonia do nosso grande dia, criamos uma pasta de 
                  inspirações para auxiliar na escolha do look.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* Women's Guidelines */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-serif text-primary font-semibold mb-4">Mulheres</h3>
                    <p className="text-primary-light leading-relaxed mb-6">
                      Sugerimos tecidos leves e modelagens elegantes. Para maior conforto durante 
                      toda a celebração, indicamos o uso de saltos em bloco ou opções que permitam 
                      aproveitar o evento com tranquilidade.
                    </p>
                    <a
                      href="https://pin.it/1OfsRdsUL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-all duration-300 font-light text-sm hover:underline underline-offset-2 hover:scale-105 hover:-translate-y-0.5 cursor-pointer group"
                    >
                      <span>Confira a pasta no Pinterest</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.937-.199-2.382.04-3.411.217-.937 1.402-5.938 1.402-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726.098.12.112.224.083.345-.091.376-.293 1.204-.334 1.372-.053.22-.174.267-.402.161-1.499-.742-2.443-3.084-2.443-4.961 0-3.756 2.73-7.214 7.877-7.214 4.138 0 7.327 2.946 7.327 6.884 0 4.101-2.582 7.401-6.162 7.401-1.202 0-2.331-.623-2.72-1.36l-.74 2.817c-.268 1.035-.994 2.33-1.482 3.121 1.119.347 2.297.536 3.552.536 6.628 0 12-5.372 12-12S18.628 0 12 0z"/>
                      </svg>
                      <motion.svg
                        className="w-4 h-4 md:hidden"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path d="M15 5l-7 7 7 7"/>
                      </motion.svg>
                    </a>
                  </motion.div>

                  {/* Men's Guidelines */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-serif text-primary font-semibold mb-4">Homens</h3>
                    <p className="text-primary-light leading-relaxed mb-6">
                      Traje esporte fino, como camisas sociais, calças de alfaiataria ou chino e 
                      sapatos fechados. Blazers são bem-vindos, conforme preferência.
                    </p>
                    <a
                      href="https://pin.it/3zADVYMcR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-all duration-300 font-light text-sm hover:underline underline-offset-2 hover:scale-105 hover:-translate-y-0.5 cursor-pointer group"
                    >
                      <span>Confira a pasta no Pinterest</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.937-.199-2.382.04-3.411.217-.937 1.402-5.938 1.402-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726.098.12.112.224.083.345-.091.376-.293 1.204-.334 1.372-.053.22-.174.267-.402.161-1.499-.742-2.443-3.084-2.443-4.961 0-3.756 2.73-7.214 7.877-7.214 4.138 0 7.327 2.946 7.327 6.884 0 4.101-2.582 7.401-6.162 7.401-1.202 0-2.331-.623-2.72-1.36l-.74 2.817c-.268 1.035-.994 2.33-1.482 3.121 1.119.347 2.297.536 3.552.536 6.628 0 12-5.372 12-12S18.628 0 12 0z"/>
                      </svg>
                      <motion.svg
                        className="w-4 h-4 md:hidden"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path d="M15 5l-7 7 7 7"/>
                      </motion.svg>
                    </a>
                  </motion.div>
                </div>

                {/* Forbidden Colors */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="text-center text-primary mb-8 text-base leading-relaxed">
                    Pedimos, com carinho, que as cores abaixo não sejam utilizadas pelos convidados:
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 md:gap-8">
                    {/* White */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-28 md:h-28 bg-white border-2 border-secondary-dark rounded-lg flex items-center justify-center shadow-md mb-3">
                        <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                          <svg className="w-6 h-6 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#C41E3A" strokeWidth="3" strokeLinecap="round">
                            <line x1="3" y1="3" x2="21" y2="21"></line>
                            <line x1="21" y1="3" x2="3" y2="21"></line>
                          </svg>
                        </div>
                      </div>
                      <p className="text-primary font-semibold text-sm md:text-base">Branco</p>
                    </div>

                    {/* Pink */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-28 md:h-28 bg-pink-500 rounded-lg flex items-center justify-center shadow-md mb-3">
                        <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                          <svg className="w-6 h-6 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#D4715C" strokeWidth="3" strokeLinecap="round">
                            <line x1="3" y1="3" x2="21" y2="21"></line>
                            <line x1="21" y1="3" x2="3" y2="21"></line>
                          </svg>
                        </div>
                      </div>
                      <p className="text-primary font-semibold text-sm md:text-base">Rosa Pink</p>
                    </div>

                    {/* Navy Blue */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-28 md:h-28 bg-blue-900 rounded-lg flex items-center justify-center shadow-md mb-3">
                        <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                          <svg className="w-6 h-6 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="#E57C5C" strokeWidth="3" strokeLinecap="round">
                            <line x1="3" y1="3" x2="21" y2="21"></line>
                            <line x1="21" y1="3" x2="3" y2="21"></line>
                          </svg>
                        </div>
                      </div>
                      <p className="text-primary font-semibold text-sm md:text-base">Azul Marinho</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
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
