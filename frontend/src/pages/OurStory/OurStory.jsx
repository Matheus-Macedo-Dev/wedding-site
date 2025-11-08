import { motion } from 'framer-motion';
import StorySection from '@/components/features/StorySection';

export default function OurStory() {
  // Sample story data - replace with actual content
  const stories = [
    {
      id: 1,
      title: 'Como Nos Conhecemos',
      date: '06 de Junho, 2021',
      location: 'São Paulo, SP',
      story: `Foi um dia comum que se transformou em extraordinário. O destino nos uniu de uma forma inesquecível, e desde o primeiro momento, soubemos que havia algo especial entre nós.

Nossos olhares se cruzaram e o tempo pareceu parar. Cada conversa, cada riso compartilhado, nos aproximava mais. Era como se nos conhecêssemos há uma eternidade, mesmo sendo o nosso primeiro encontro.

Aquele foi o início de uma jornada maravilhosa que nos trouxe até aqui, e mal podemos esperar para continuar escrevendo nossa história juntos.`,
      image: `${import.meta.env.BASE_URL}images/timeline/meeting.jpg`,
      imageAlt: 'Como nos conhecemos',
      imageLeft: false
    },
    {
      id: 2,
      title: 'O Pedido',
      date: '01 de Janeiro, 2025',
      location: 'Praia de Copacabana, Rio de Janeiro',
      story: `O momento mais mágico de nossas vidas chegou em um dia perfeito à beira-mar. Com o pôr do sol pintando o céu de dourado e rosa, o cenário não poderia ser mais perfeito para este momento especial.

Com o coração acelerado e as palavras cuidadosamente preparadas, o pedido foi feito. As lágrimas de alegria, o sim apaixonado, e o abraço que pareceu durar uma eternidade - cada segundo daquele momento ficará para sempre gravado em nossos corações.

Foi o início oficial da nossa jornada rumo ao altar, e mal podemos esperar para celebrar nosso amor com todos que amamos.`,
      image: `${import.meta.env.BASE_URL}images/timeline/proposal.jpg`,
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
        <p className="text-lg text-primary-light max-w-2xl mx-auto">
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
            story={story.story}
            image={story.image}
            imageAlt={story.imageAlt}
            imageLeft={story.imageLeft}
          />
          
          {/* Divider */}
          {index < stories.length - 1 && (
            <div className="flex justify-center py-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            </div>
          )}
        </div>
      ))}

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 text-center px-4"
      >
        <p className="text-xl md:text-2xl text-primary-light italic max-w-3xl mx-auto">
          "E agora, chegou o momento de celebrar nosso amor com todos que fazem parte da nossa história. 
          Mal podemos esperar para compartilhar este dia especial com vocês!"
        </p>
      </motion.div>
    </div>
  );
}
