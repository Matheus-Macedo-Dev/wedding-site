export const WEDDING_DATE = '2026-06-04T18:00:00-03:00';
export const WEDDING_VENUE = 'A definir';
export const COUPLE_NAMES = 'Alana & Matheus';

const BASE_URL = import.meta.env.BASE_URL;

export const TIMELINE_EVENTS = [
  {
    id: 1,
    title: 'O Início',
    date: '2021-06-06',
    dateFormatted: '06 de Junho, 2021',
    description: 'O dia em que nossa história começou.',
    image: `${BASE_URL}images/timeline/beginning.jpg`,
    imagePosition: 'object-center'
  },
  {
    id: 2,
    title: 'O Pedido',
    date: '2025-01-01',
    dateFormatted: '01 de Janeiro, 2025',
    description: 'O momento mágico em que decidimos passar nossas vidas juntos.',
    image: `${BASE_URL}images/timeline/proposal.jpg`,
    imagePosition: 'object-center'
  },
  {
    id: 3,
    title: 'O Casamento',
    date: '2026-06-04',
    dateFormatted: '04 de Junho, 2026',
    description: 'O dia em que celebraremos nosso amor com familiares e amigos.',
    image: `${BASE_URL}images/timeline/wedding.jpg`,
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
  { id: 'informacoes', name: 'Informações', path: '/informacoes' },
  { id: 'presentes', name: 'Presentes', path: '/presentes' },
  { id: 'album', name: 'Álbum de Fotos', path: '/album' },
  { id: 'historia', name: 'Nossa História', path: '/historia' }
];

// Navigation Gallery Cards with elegant gradient placeholders
// Replace gradient with image path when photos are ready
export const NAVIGATION_CARDS = [
  {
    id: 'presentes',
    title: 'Lista de Presentes',
    description: 'Escolha um presente especial para nos ajudar a começar nossa vida juntos',
    image: null, // Add: `${BASE_URL}images/navigation/presentes.jpg` when ready
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink gradient
    path: '/presentes',
    external: false
  },
  {
    id: 'rsvp',
    title: 'Confirme sua Presença',
    description: 'Confirme sua presença e nos ajude a planejar nosso dia especial',
    image: null, // Add: `${BASE_URL}images/navigation/rsvp.jpg` when ready
    gradient: 'linear-gradient(135deg, #D4AF77 0%, #B8935E 100%)', // Gold accent gradient
    path: 'https://alanamatheus.online',
    external: true
  },
  {
    id: 'informacoes',
    title: 'Informações',
    description: 'Todos os detalhes sobre data, local e programação do evento',
    image: null, // Add: `${BASE_URL}images/navigation/informacoes.jpg` when ready
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
    path: '/informacoes',
    external: false
  },
  {
    id: 'album',
    title: 'Álbum de Fotos',
    description: 'Confira nossos momentos especiais e fotos do pre-wedding',
    image: null, // Add: `${BASE_URL}images/navigation/album.jpg` when ready
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue gradient
    path: '/album',
    external: false
  },
  {
    id: 'historia',
    title: 'Nossa História',
    description: 'Conheça a história do nosso amor desde o primeiro encontro',
    image: null, // Add: `${BASE_URL}images/navigation/historia.jpg` when ready
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green gradient
    path: '/historia',
    external: false
  }
];

