# Wedding Website - Development Guide

## Project Overview
**Project**: Wedding website for Alana & Matheus  
**Wedding Date**: June 4, 2026 at 18:00  
**Main Domain**: alanamatheus.shop (React - to be deployed)  
**RSVP Domain**: alanamatheus.online (Vue 3 - ✅ deployed separately)  
**Repository**: c:\Users\Matheus\wedding-site\

---

## Current Implementation Status

### ✅ Completed
- Frontend initialized with Vite + React 18.2
- Backend initialized with Express
- Tailwind CSS v4 configured with @theme
- Core components created (Header, Footer, Hero, Countdown, Timeline)
- Dynamic logo switching implemented (white/black based on background)
- Mobile menu functional (z-[60], slide-in animation, proper hamburger behavior)
- RSVP external link configured
- Fixed background hero with radial vignette overlay
- Portrait timeline cards (9:16 aspect ratio)
- Thinner font weights (200/300/400 for Montserrat/Playfair)
- Rameau font for couple names with 0.2em letter spacing

### 🚧 Required Actions
1. Add image files (logos, hero slides, timeline photos)
2. Complete Gallery page implementation
3. Complete Our Story page implementation
4. Populate gift list in database.json
5. Test and deploy

---

## Technology Stack

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 7
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4 (with @theme in index.css)
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Images**: react-lazy-load-image-component

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4
- **HTTP Client**: Axios
- **Validation**: Express Validator
- **CORS**: cors middleware
- **Environment**: dotenv
- **Scope**: Gifts API + Mercado Pago webhook only (no RSVP)

### DevOps
- **Frontend Hosting**: GitHub Pages
- **Backend Hosting**: Railway
- **Domain**: alanamatheus.shop

### Third-Party
- **Payment Gateway**: Mercado Pago API
- **RSVP**: External Vue 3 app (https://alanamatheus.online)

---

## Design System

### Color Palette (Tailwind CSS v4 @theme)
```css
@theme {
  --color-primary: #3A3A3A;           // Dark gray
  --color-primary-light: #6A6A6A;     // Medium gray
  --color-primary-dark: #1A1A1A;      // Almost black
  --color-secondary: #E5E5E5;         // Light gray
  --color-secondary-light: #F5F5F5;   // Very light gray
  --color-secondary-dark: #D0D0D0;    // Medium light gray
  --color-accent: #D4AF77;            // Gold
  --color-accent-light: #E5C89A;
  --color-accent-dark: #B8935E;
  --color-background: #FFFFFF;        // Pure white
  --color-text-dark: #1A1A1A;
  --color-text-light: #FFFFFF;
  --color-text-muted: #6B7280;
}
```

### Typography
- **Headings**: Playfair Display (weights: 300, 400, 500, 600)
- **Body**: Montserrat (weights: 200, 300, 400, 500, 600)
- **Couple Names**: Rameau (custom serif font)
- **Rule**: All headings on home page are UPPERCASE

### Font Classes
```css
.font-couple-names {
  font-family: 'Rameau Light', 'Rameau', serif;
  font-weight: normal;
  letter-spacing: 0.2em;
}
```

### Responsive Breakpoints
- sm: 640px (Mobile landscape)
- md: 768px (Tablet)
- lg: 1024px (Desktop)
- xl: 1280px (Large desktop)

---

## Component Implementation Details

### Header Component (✅ Completed)
**Location**: `frontend/src/components/layout/Header.jsx`

**Key Features**:
- Dynamic logo switching: white (logo.png) for dark backgrounds, black (logo-black.png) for white backgrounds
- Logic: `useBlackLogo = isScrolled || hasWhiteBackground` where `hasWhiteBackground = pathname !== '/'`
- Mobile menu z-index: z-[60] (above header z-50)
- Hamburger fades out when menu opens: `opacity-0 pointer-events-none` when `isMobileMenuOpen`
- Always shows Bars3Icon (no XMarkIcon toggle)
- External link handling for RSVP (`target="_blank"`, `rel="noopener noreferrer"`)
- Transparent background at top, white background after scroll or on non-home pages
- Scroll threshold: `window.scrollY > window.innerHeight - 100`

### Hero Component (✅ Completed)
**Location**: `frontend/src/components/features/Hero.jsx`

**Key Features**:
- Fixed background: `position: fixed`, `h-screen`, extends to countdown
- 8-photo slideshow with fade transitions (5-second intervals)
- Radial vignette overlay: `rgba(0,0,0,0.1)` center → `rgba(0,0,0,0.6)` edges
- Couple names: Rameau font, 0.2em letter spacing, responsive sizing (text-4xl → text-7xl)
- Names separated by italicized `&` symbol (font-sans italic)
- White divider line (w-16 h-px) between names and date
- Wedding date below divider: "04 de Junho de 2026"
- Image positioning: `object-center` on all screen sizes
- Content positioned with pt-20 and -mt-48 md:-mt-32 for vertical centering
- No scroll indicator, no slide dots

### Countdown Component (✅ Completed)
**Location**: `frontend/src/components/features/Countdown.jsx`

**Key Features**:
- Transparent background (`bg-transparent`)
- Floats on top of hero fixed background
- White text with heavy drop-shadow: `drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`
- No card backgrounds - just floating numbers and labels
- No duplicate date (date only in Hero)
- Dynamic layout: 4 columns before wedding (Days|Hours|Minutes|Seconds), 2 columns after (Months|Days)
- Title changes: "Contagem Regressiva" before wedding, "Casados Há" after
- Numbers: text-4xl md:text-6xl font-serif font-normal
- Labels: uppercase, tracking-wider, text-sm md:text-base
- Updates every second via useCountdown hook

### Timeline Component (✅ Completed)
**Location**: `frontend/src/components/features/Timeline.jsx`

**Key Features**:
- Portrait cards: `aspect-[9/16]`
- White background with gradient fade from transparent at top (-mt-32 gradient)
- Vertical line inside events container (desktop only): `left-1/2 top-0 bottom-0`
- Dates: `text-primary-light` (#6A6A6A), `font-light`, `text-sm`
- Dots: `bg-secondary`, no animation, w-4 h-4 with border-4 border-white
- Alternating left/right layout on desktop, stacked on mobile
- Card titles: `text-xl font-serif font-normal uppercase text-primary`
- Custom image positioning per card via `imagePosition` prop (object-center or object-[center_65%])
- Hover effect: shadow-lg → shadow-xl transition
- Spacing: mb-16 md:mb-24 between cards
- Section padding: py-16 md:py-24
- 3 events: O Início, O Pedido, O Casamento

### Footer Component (✅ Completed)
**Location**: `frontend/src/components/layout/Footer.jsx`

**Key Features**:
- 2-column grid layout (Brand + Social Media)
- Quick links section removed
- Centered bottom bar on all screen sizes
- Relative z-10 positioning
- Brand section: Couple names, wedding date
- Social links: Instagram, Facebook
- Copyright: © {year} Alana & Matheus
- Credit: "Desenvolvido com ❤️ por Matheus Macedo e Alana Alves"

---

## File Structure

```
wedding-site/
├── .github/
│   └── copilot-instructions.md    # This file
├── documentation/
│   └── PLAN.md                    # Complete implementation plan
├── backend/
│   ├── routes/
│   │   ├── gifts.js               # Gift registry API
│   │   └── webhook.js             # Mercado Pago webhook
│   ├── database.json              # Gifts & purchases only
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── images/
│   │       ├── logo.png           # White logo for dark backgrounds
│   │       ├── logo-black.png     # Black logo for white backgrounds
│   │       ├── hero/              # 8 slideshow images (slide1-8.jpg)
│   │       ├── timeline/          # 3 images (beginning.jpg, proposal.jpg, wedding.jpg)
│   │       ├── gallery/           # Pre-wedding photos
│   │       └── gifts/             # Gift product images
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/            # Header, Footer
│   │   │   └── features/          # Hero, Countdown, Timeline
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Gifts/
│   │   │   ├── Gallery/
│   │   │   └── OurStory/
│   │   ├── hooks/                 # useCountdown
│   │   ├── services/              # api.js
│   │   ├── store/
│   │   └── utils/                 # constants.js, helpers.js
│   ├── index.css                  # Tailwind v4 @theme configuration
│   ├── tailwind.config.js         # Fallback config
│   └── package.json
└── README.md
```

---

## RSVP Integration (External Vue 3 App)

**Important**: RSVP is a completely separate application.

- **Repository**: https://github.com/Matheus-Macedo-Dev/rsvp-site
- **Tech Stack**: Vue 3 + TypeScript + Vite
- **Live URL**: ✅ https://alanamatheus.online
- **Status**: Deployed and functional
- **Integration**: External link from main site navigation

**Main Site Configuration**:
```javascript
// src/utils/constants.js
export const NAV_ITEMS = [
  { id: 'inicio', name: 'Início', path: '/' },
  { 
    id: 'rsvp', 
    name: 'Confirme sua Presença', 
    path: 'https://alanamatheus.online',
    external: true 
  },
  // ... other items
];
```

**Backend Scope**:
- ❌ No RSVP routes in this backend
- ❌ No RSVP data in database.json
- ✅ Only Gifts API + Mercado Pago webhook

---

## Image Requirements

### 🎯 Hybrid Approach
**Strategy**: Local images for performance-critical assets, external URLs for gallery

- **Local Images** (in `frontend/public/images/`):
  - Logo files (logo.png, logo-black.png)
  - Hero slideshow (8 photos)
  - Timeline photos (3 photos)
  - Gift images
  - **Why**: Fast loading, reliable, cached by browser

- **External URLs** (Google Drive or CDN):
  - Gallery photos (30-50 photos)
  - **Why**: No repository bloat, easy to update without redeploying

### Logo Files (Required)
**Location**: `frontend/public/images/`
- `logo.png` - White/light version for dark/transparent backgrounds
- `logo-black.png` - Black/dark version for white backgrounds
- Format: PNG with transparent background preferred
- Size: 200x200px minimum (displays at ~56px height)

### Hero Slideshow (Required)
**Location**: `frontend/public/images/hero/`
- 8 photos: `slide1.jpg` through `slide8.jpg`
- Size: 1920x1080px recommended
- Format: JPG (WebP optional for optimization)
- Compression: < 300KB each

### Timeline (Required)
**Location**: `frontend/public/images/timeline/`
- `beginning.jpg` - First meeting photo (object-center positioning)
- `proposal.jpg` - Engagement photo (object-center positioning)
- `wedding.jpg` - Wedding venue photo (object-[center_65%] custom positioning)
- Size: 800x600px recommended
- Format: JPG
- Compression: < 200KB each

### Gallery (External URLs - Google Drive or CDN)
**Location**: `frontend/src/pages/Gallery/Gallery.jsx` (configured in code)
- 30-50 pre-wedding photos
- **Uses external URLs** - Google Drive or CDN (Cloudinary, ImgBB, etc.)
- No need to add files to repository
- Simply update the `GALLERY_PHOTOS` array with URLs

**How to use Google Drive:**
1. Upload photos to Google Drive
2. Right-click → Share → Anyone with the link can view
3. Get file ID from sharing link
4. Format: `https://drive.google.com/uc?export=view&id=FILE_ID`

**Example:**
```javascript
{
  id: 1,
  src: 'https://drive.google.com/uc?export=view&id=1ABC123xyz',
  alt: 'Pre-wedding photo',
  caption: 'Beach photoshoot',
  date: 'January 2024'
}
```

### Gifts (Required)
**Location**: `frontend/public/images/gifts/`
- Gift product images
- Naming: match image paths in database.json
- Size: 400x300px recommended
- Format: JPG
- Compression: < 100KB each

---

## Constants Configuration

**Location**: `frontend/src/utils/constants.js`

```javascript
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
```

---

## Database Schema

**Location**: `backend/database.json`

```json
{
  "gifts": [
    {
      "id": 1,
      "name": "Jogo de Panelas Antiaderente",
      "description": "Conjunto completo com 5 panelas de alta qualidade",
      "price": 350.00,
      "image": "/images/gifts/panelas.jpg",
      "quantity": 1,
      "purchased": 0,
      "preferenceId": null,
      "category": "Cozinha"
    }
  ],
  "purchases": [
    {
      "giftId": 1,
      "giftName": "Jogo de Panelas Antiaderente",
      "paymentId": "123456789",
      "amount": 350.00,
      "buyerEmail": "guest@example.com",
      "buyerName": "João Silva",
      "date": "2025-11-07T12:00:00Z",
      "status": "approved"
    }
  ]
}
```

**Note**: No RSVP data in this database. RSVP managed by separate Vue 3 app.

---

## API Endpoints

### Gifts
```
GET  /api/gifts              # List all gifts with availability
POST /api/gifts/:id/checkout # Create Mercado Pago preference
```

### Webhook
```
POST /api/webhook/mercadopago # Mercado Pago payment notifications
```

### Health Check
```
GET /api/health              # Server status
```

**Note**: No RSVP endpoints. RSVP handled by external Vue 3 application.

---

## Development Commands

### Backend
```bash
cd backend
npm run dev          # Start dev server with nodemon
npm start            # Start production server
```

### Frontend
```bash
cd frontend
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages (after setup)
```

---

## Deployment Strategy

### Backend (Railway)
1. Push code to GitHub
2. Connect Railway to repository
3. Set root directory: `/backend`
4. Add environment variables:
   - `MERCADO_PAGO_ACCESS_TOKEN`
   - `BACKEND_URL`
   - `PORT`
5. Railway auto-deploys on push to main

### Frontend (GitHub Pages)
1. Update API URL in `frontend/src/services/api.js`
2. Build: `npm run build`
3. Create CNAME file: `echo "alanamatheus.shop" > public/CNAME`
4. Deploy: `npm run deploy` (using gh-pages package)
5. Configure GitHub Pages settings
6. Configure custom domain DNS

---

## Design Patterns

### Typography Rules
1. **All headings on home page**: UPPERCASE
2. **Couple names**: Always use `.font-couple-names` class (Rameau font with 0.2em letter spacing)
3. **Section titles**: `text-3xl md:text-5xl font-serif font-light uppercase`
4. **Card titles**: `text-xl font-serif font-normal uppercase`
5. **Dates**: `text-sm font-light`
6. **Body text**: `text-base` with appropriate font-weight (200-400)

### Component Patterns
1. **Section spacing**: `py-16 md:py-24`
2. **Container**: Use `.container-custom` class
3. **Cards**: White background, shadow-lg, rounded-lg, hover:shadow-xl
4. **Animations**: Framer Motion with `whileInView` for scroll effects
5. **Z-index hierarchy**: Footer z-10, Header z-50, Mobile menu z-[60]

### Color Usage
- **Primary**: Main text, headings, dark elements
- **Secondary**: Backgrounds, cards, light elements
- **Accent**: Buttons, highlights, active states, special elements

---

## Important Notes

### Mercado Pago Integration
- **Access Token**: Required in backend .env file
- **Webhook**: Automatically configured in preference creation
- **Payment Flow**: User → Frontend → Backend creates preference → Redirect to Mercado Pago → Webhook updates database → User returns to success page

### Fixed Background Hero
- Hero section has fixed background (`position: fixed`, `h-screen`)
- Countdown section sits on top with transparent background
- Creates visual effect of continuous photo background
- Vignette overlay provides text readability

### Mobile Menu Behavior
- Z-index hierarchy prevents overlap issues
- Hamburger icon fades out when menu opens
- Close button always visible in menu panel
- No icon toggle (always shows Bars3Icon in header)

### Timeline Cards
- Portrait orientation (9:16 aspect ratio)
- Custom image positioning per card
- Alternating left/right on desktop
- Stacked on mobile

---

## Testing Checklist

### Functional
- [ ] All pages load correctly
- [ ] Navigation works (smooth scroll, active states)
- [ ] Countdown timer updates every second
- [ ] RSVP link opens https://alanamatheus.online correctly
- [ ] Gift list loads from API
- [ ] Mobile menu opens/closes properly
- [ ] Logo switches between white and black correctly
- [ ] Hero slideshow advances every 5 seconds

### Visual
- [ ] Header transparent at top, white after scroll
- [ ] Couple names display in Rameau font with 0.2em letter spacing
- [ ] All headings are UPPERCASE on home page
- [ ] Timeline cards in portrait orientation
- [ ] Fixed background extends through countdown

### Responsive
- [ ] iPhone SE (375px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)
- [ ] Mobile menu functional
- [ ] Images load properly

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Images optimized
- [ ] Load time < 3 seconds

---

## Common Issues & Solutions

### Issue: Images Not Loading
**Solution**: 
- Check image paths start with `/images/...`
- Verify images are in `frontend/public/images/`
- Check browser console for 404 errors

### Issue: Logo Not Switching
**Solution**:
- Ensure both logo.png and logo-black.png exist
- Check `useBlackLogo` logic in Header.jsx
- Verify scroll threshold: `window.scrollY > window.innerHeight - 100`

### Issue: Countdown Not Updating
**Solution**: 
- Check browser console for JavaScript errors
- Ensure target date format is correct: `new Date('2026-06-04T18:00:00-03:00')`
- Verify useCountdown hook is properly imported

### Issue: Mobile Menu Not Working
**Solution**:
- Check z-index hierarchy (menu z-[60], header z-50)
- Verify hamburger opacity-0 when menu open
- Check mobile menu state management

---

## Resources

### Documentation
- Full Implementation Plan: `documentation/PLAN.md`
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Mercado Pago API: https://www.mercadopago.com.br/developers/pt/docs

### Tools
- Image Optimization: https://tinypng.com
- Color Palette Generator: https://coolors.co
- Google Fonts: https://fonts.google.com
- Favicon Generator: https://favicon.io

### Deployment
- Railway: https://railway.app
- GitHub Pages: https://pages.github.com
- DNS Checker: https://dnschecker.org

---

**Last Updated**: November 8, 2025  
**Current Phase**: Core components completed, ready for content and remaining pages  
**Next Steps**: Add images, complete Gallery/OurStory pages, populate gift list, deploy

---

For detailed implementation phases and specifications, refer to `documentation/PLAN.md`.
