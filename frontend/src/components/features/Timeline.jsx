import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE_EVENTS } from '@/utils/constants.js';

function TimelineCard({ event, index }) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-start mb-16 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
    >
      {/* Card */}
      <div className="w-full md:w-5/12 relative z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-[9/16] overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className={`w-full h-full object-cover ${event.imagePosition || 'object-center'}`}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-serif font-normal text-primary mb-2 uppercase">
              {event.title}
            </h3>
            <p className="text-primary-light font-light mb-2 text-sm">
              {event.dateFormatted}
            </p>
            <p className="text-text-muted leading-relaxed text-sm">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Dot */}
      <div className="flex items-center justify-center w-full md:w-2/12 my-4 md:my-0 relative z-10">
        <div className="relative">
          <div className="w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-lg" />
        </div>
      </div>

      {/* Spacer for alignment */}
      <div className="w-full md:w-5/12 hidden md:block" />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="relative py-16 md:py-24 bg-white z-10">
      {/* Torn paper / wrapped page effect - fade from photo background to white */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 md:h-48 pointer-events-none -mt-32 md:-mt-48 z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.7) 60%, rgb(255,255,255) 100%)'
        }}
      />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-light text-primary mb-4 uppercase">
            Nossa História
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Cada momento especial que nos trouxe até aqui
          </p>
        </motion.div>

        {/* Timeline Events */}
        <div className="relative">
          {/* Vertical Line (all screen sizes, behind cards) */}
          <div className="absolute left-1/2 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary-dark transform -translate-x-1/2 -z-10" />
          
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
