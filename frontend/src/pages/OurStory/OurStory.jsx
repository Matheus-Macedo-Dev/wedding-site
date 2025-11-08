import { motion } from 'framer-motion';
import StorySection from '@/components/features/StorySection';
import { MapPinIcon, ClockIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function OurStory() {
  // Sample story data - replace with actual content
  const stories = [
    {
      id: 1,
      title: 'Como Nos Conhecemos',
      date: '06 de Junho, 2021',
      location: 'São Paulo, SP',
      emoji: '💕',
      story: `Foi um dia comum que se transformou em extraordinário. O destino nos uniu de uma forma inesquecível, e desde o primeiro momento, soubemos que havia algo especial entre nós.

Nossos olhares se cruzaram e o tempo pareceu parar. Cada conversa, cada riso compartilhado, nos aproximava mais. Era como se nos conhecêssemos há uma eternidade, mesmo sendo o nosso primeiro encontro.

Aquele foi o início de uma jornada maravilhosa que nos trouxe até aqui, e mal podemos esperar para continuar escrevendo nossa história juntos.`,
      image: '/images/timeline/meeting.jpg',
      imageAlt: 'Como nos conhecemos',
      imageLeft: false
    },
    {
      id: 2,
      title: 'O Pedido',
      date: '01 de Janeiro, 2025',
      location: 'Praia de Copacabana, Rio de Janeiro',
      emoji: '💍',
      story: `O momento mais mágico de nossas vidas chegou em um dia perfeito à beira-mar. Com o pôr do sol pintando o céu de dourado e rosa, o cenário não poderia ser mais perfeito para este momento especial.

Com o coração acelerado e as palavras cuidadosamente preparadas, o pedido foi feito. As lágrimas de alegria, o sim apaixonado, e o abraço que pareceu durar uma eternidade - cada segundo daquele momento ficará para sempre gravado em nossos corações.

Foi o início oficial da nossa jornada rumo ao altar, e mal podemos esperar para celebrar nosso amor com todos que amamos.`,
      image: '/images/timeline/proposal.jpg',
      imageAlt: 'O pedido de casamento',
      imageLeft: true
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-secondary-light to-background"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
          Nossa História
        </h1>
        <p className="text-lg text-text-light max-w-2xl mx-auto">
          A jornada do nosso amor, desde o primeiro encontro até o grande dia
        </p>
      </motion.div>

      {/* Story Sections */}
      {stories.map((story, index) => (
        <div key={story.id}>
          <StorySection
            title={story.title}
            date={story.date}
            location={story.location}
            emoji={story.emoji}
            story={story.story}
            image={story.image}
            imageAlt={story.imageAlt}
            imageLeft={story.imageLeft}
          />
          
          {/* Divider */}
          {index < stories.length && (
            <div className="flex justify-center py-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            </div>
          )}
        </div>
      ))}

      {/* Wedding Day Section */}
      <StorySection
        title="O Grande Dia"
        date="04 de Junho, 2026"
        emoji="🎉"
        image="/images/timeline/venue.jpg"
        imageAlt="Local do casamento"
        imageLeft={false}
      >
        <div className="mt-8 space-y-6">
          {/* Event Details */}
          <div className="bg-secondary-light rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <CalendarIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Data</h3>
                <p className="text-text-light">Quarta-feira, 04 de Junho de 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClockIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Horário</h3>
                <p className="text-text-light">Cerimônia às 18:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPinIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Local</h3>
                <p className="text-text-light">
                  Espaço de Eventos Villa Garden<br />
                  Rua das Flores, 123 - Jardins<br />
                  São Paulo, SP - 01234-567
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <SparklesIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Dress Code</h3>
                <p className="text-text-light">Traje Esporte Fino</p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975624174826!2d-46.66183648502207!3d-23.56138098468212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do evento"
            ></iframe>
          </div>
        </div>
      </StorySection>
    </div>
  );
}
