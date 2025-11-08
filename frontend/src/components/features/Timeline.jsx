import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE_EVENTS } from '@/utils/constants.js';

function TimelineCard({ event, index, isFirst, isLast }) {
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
      } flex-col-reverse md:flex-row`}
    >
      {/* Card */}
      <div className="w-full md:w-5/12 relative z-10">
        <div className="bg-white rounded-full shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-[9/16] overflow-hidden relative">
            <img
              src={event.image}
              alt={event.title}
              className={`w-full h-full object-cover ${event.imagePosition || 'object-center'}`}
            />
          </div>
        </div>
      </div>

      {/* Timeline Dot with Title and Date */}
      <div className="flex flex-col items-center justify-start w-full md:w-2/12 mb-4 md:my-0 relative">
        {/* Line segment before title - starts lower for first item */}
        {isFirst ? (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0.5 bg-accent h-8 md:h-12 z-0" />
        ) : (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0.5 bg-accent h-16 md:h-24 z-0" />
        )}
        
        <div className="text-center mb-3 relative z-10">
          <h3 className="text-xl md:text-2xl font-serif font-normal text-primary uppercase mb-1">
            {event.title}
          </h3>
          <p className="text-sm text-primary-light font-light">
            {event.dateFormatted}
          </p>
        </div>
        
        <div className="relative z-10">
          <div className="w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg" />
        </div>
        
        {/* Line segment after dot - always show, even for last item */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 bg-accent h-16 md:h-24 z-0" />
      </div>

      {/* Spacer for alignment */}
      <div className="w-full md:w-5/12 hidden md:block" />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="relative py-16 md:py-24 bg-white z-10">
      {/* Torn paper / wrapped page effect - starts below countdown */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none -mt-48 md:-mt-64 z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.7) 85%, rgb(255,255,255) 100%)'
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
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineCard 
              key={event.id} 
              event={event} 
              index={index}
              isFirst={index === 0}
              isLast={index === TIMELINE_EVENTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
