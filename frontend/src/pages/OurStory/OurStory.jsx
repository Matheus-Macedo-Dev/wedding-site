import { motion } from 'framer-motion';
import StorySection from '@/components/features/StorySection';

export default function OurStory() {
  const stories = [
    {
      id: 1,
      title: 'Nossa História',
      date: '06 de Junho, 2021',
      location: 'Cratéus, CE',
      story: `Dizem que certas almas nascem ligadas por um fio vermelho invisível,
amarrado ao dedo mindinho.

Um laço que o tempo pode esticar, enrolar, adiar...
mas jamais romper.

Talvez por isso, mesmo antes de nos conhecermos,
nossas famílias já se cruzavam
como se o destino, paciente, estivesse costurando aos poucos o nosso encontro.

Crescemos próximos,
caminhando por estradas que quase se tocavam,
sem imaginar que havia um fio discreto nos guiando um ao encontro do outro.
E então, no final de 2020,
o destino deu um nó firme naquele fio.
E tudo passou a fazer sentido.

Desde então, nossas linhas seguem entrelaçadas,
num amor leve, certo, e cheio de vida
vivendo o melhor que poderíamos viver.

Porque o que é pra ser...
o fio do destino sempre encontra um jeito de unir.`,
      imageLeft: false,
      children: (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16 md:py-24 text-center px-4 bg-cover bg-center bg-no-repeat"
        >
          <p className="text-xl md:text-2xl text-primary-light italic max-w-3xl mx-auto">
            "E agora, chegou o momento de celebrar nosso amor com todos que fazem parte da nossa história. 
            Mal podemos esperar para compartilhar este dia especial com vocês!"
          </p>
        </motion.div>
      )
    },
  ];

  return (
    <div className="min-h-screen pt-20 relative bg-transparent">
      
      {/* Content */}
      <div className="relative z-20">
        {/* Story Sections */}
        {stories.map((story, index) => (
          <div key={story.id}>
            <StorySection
              title={story.title}
              date={story.date}
              location={story.location}
              story={story.story}
              imageLeft={story.imageLeft}
              children={story.children}
            />
            
            {/* Divider */}
            {index < stories.length - 1 && (
              <div className="flex justify-center py-8">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
