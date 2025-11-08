import Hero from '@/components/features/Hero';
import Countdown from '@/components/features/Countdown';
import Timeline from '@/components/features/Timeline';
import { NavigationGallery } from '@/components/features/NavigationGallery';

export default function Home() {
  return (
    <div>
      <Hero />
      <Countdown />
      <Timeline />
      <NavigationGallery />
    </div>
  );
}
