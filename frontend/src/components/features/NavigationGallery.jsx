import { NavigationCard } from './NavigationCard';
import { NAVIGATION_CARDS } from '../../utils/constants';

export function NavigationGallery() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container-custom">
        <h2 className="text-3xl md:text-5xl font-serif font-light text-center uppercase mb-8 md:mb-12 text-primary">
          Explore Nossa Celebração
        </h2>
        
        {/* Horizontal Scroll Container */}
        <div className="relative -mx-4 md:mx-0">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-6 px-4 md:px-0">
            {NAVIGATION_CARDS.map((card) => (
              <NavigationCard key={card.id} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
