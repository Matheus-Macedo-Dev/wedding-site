export const WEDDING_DATE = '2026-06-04T18:00:00-03:00';
export const WEDDING_VENUE = 'A definir';
export const COUPLE_NAMES = 'Alana & Matheus';

export const TIMELINE_EVENTS = [
  {
    id: 1,
    title: 'O Início',
    date: '2021-06-06',
    dateFormatted: '06 de Junho, 2021',
    description: 'O dia em que nossa história começou.',
    image: '/images/timeline/beginning.jpg',
    imagePosition: 'object-center'
  },
  {
    id: 2,
    title: 'O Pedido',
    date: '2025-01-01',
    dateFormatted: '01 de Janeiro, 2025',
    description: 'O momento mágico em que decidimos passar nossas vidas juntos.',
    image: '/images/timeline/proposal.jpg',
    imagePosition: 'object-center'
  },
  {
    id: 3,
    title: 'O Casamento',
    date: '2026-06-04',
    dateFormatted: '04 de Junho, 2026',
    description: 'O dia em que celebraremos nosso amor com familiares e amigos.',
    image: '/images/timeline/wedding.jpg',
    imagePosition: 'object-[center_65%]'
  }
];

export const NAV_ITEMS = [
  { id: 'inicio', name: 'Início', path: '/' },
  { 
    id: 'rsvp', 
    name: 'Confirme sua Presença', 
    path: 'https://alanamatheus.online',
    external: true 
  },
  { id: 'presentes', name: 'Presentes', path: '/presentes' },
  { id: 'album', name: 'Álbum de Fotos', path: '/album' },
  { id: 'historia', name: 'Nossa História', path: '/historia' }
];
