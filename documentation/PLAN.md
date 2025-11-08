# Wedding Website - Implementation Plan

## Project Overview
Full-stack wedding website for Alana & Matheus with gift registry integration via Mercado Pago.

**Wedding Date**: June 4th, 2026  
**Domain**: alanamatheus.shop  
**RSVP Domain**: alanamatheus.online (Vue 3 - Already deployed ✅)  
**Stack**: React + Node.js + Mercado Pago

**RSVP Integration**: External Vue 3 app  
**RSVP Repository**: https://github.com/Matheus-Macedo-Dev/rsvp-site  
**RSVP URL**: https://alanamatheus.online ✅

---

## Phase 1: Project Setup & Architecture (Day 1-2)

### 1.1 Initialize Frontend
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install react-router-dom framer-motion axios zustand react-intersection-observer
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
npm install -D eslint prettier eslint-config-prettier
```

### 1.2 Initialize Backend
```bash
mkdir backend
cd backend
npm init -y
npm install express cors axios dotenv
npm install -D nodemon
```

### 1.3 Folder Structure
```
wedding-site/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── hero/           # Hero slideshow images
│   │   │   ├── timeline/       # Timeline photos
│   │   │   ├── gallery/        # Photo album
│   │   │   └── gifts/          # Gift images
│   │   └── CNAME
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Card, Input, Modal, Loader
│   │   │   ├── layout/         # Header, Footer, Navigation
│   │   │   └── features/       # Hero, Countdown, Timeline, Gallery, Gifts
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Gifts/
│   │   │   ├── Gallery/
│   │   │   └── OurStory/
│   │   ├── hooks/              # useCountdown, useGifts
│   │   ├── services/           # api.js
│   │   ├── store/              # Zustand store
│   │   ├── utils/              # constants, helpers, validators
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   ├── gifts.js            # Gift registry API
│   │   └── webhook.js          # Mercado Pago webhook
│   ├── database.json           # Gifts & purchases only
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── documentation/
│   ├── PLAN.md                 # This file - implementation plan
│   ├── INSTRUCTIONS.md         # Step-by-step setup guide
│   ├── SUMMARY.md              # Project overview
│   └── CONTEXT.md              # Development history
│
├── .gitignore
└── README.md

Note: RSVP functionality is separate
- Repository: https://github.com/Matheus-Macedo-Dev/rsvp-site
- Live at: https://alanamatheus.online
- Tech: Vue 3 + TypeScript + Vite
```

---

## Phase 2: Core Components Development (Day 3-5)

### 2.1 Layout Components
- **Header/Navigation**
  - Logo: Wedding image logo (logo.png or logo-black.png based on background)
  - **Dynamic logo switching**: White logo (logo.png) for dark/transparent backgrounds, Black logo (logo-black.png) for white backgrounds
  - Sticky navigation with smooth scroll
  - Mobile hamburger menu (slide-in animation from right)
  - **Mobile menu z-index**: z-[60] (above header z-50)
  - **Hamburger behavior**: Fades out (opacity-0) when menu opens, always shows Bars3Icon
  - Active section highlighting
  - Transparent → solid white background on scroll or non-home pages
  - Menu items: Início, Confirme sua Presença (external), Presentes, Álbum de Fotos, Nossa História
  - **Handle external links**: RSVP link opens https://alanamatheus.online in new tab

- **Footer**
  - **Current layout**: 2-column grid (Brand + Social Media)
  - **Quick links removed**: No longer displays navigation links
  - Social media links (Instagram, Facebook)
  - Copyright: © {year} Alana & Matheus
  - **Mobile centered**: Bottom bar centered on all screen sizes
  - Developed by Matheus Macedo and Alana Alves
  - **Z-index**: relative z-10

- **Layout Wrapper**
  - Consistent padding/margins
  - Max-width container (1280px) via .container-custom class
  - Responsive breakpoints

### 2.2 Common Components
- **Button**: Primary, Secondary, Outline variants with hover effects
- **Card**: Shadow, hover lift effect, responsive
- **Input**: Text, Email, Select, Textarea with real-time validation
- **Modal**: Overlay with blur, close animation, click-outside to close
- **Loader**: Spinner for page transitions, skeleton for content loading

---

## Phase 3: Home Page - "Início" (Day 6-8)

### 3.1 Hero Section (Full Screen)
```jsx
Features:
- Photo slideshow with 8 couple photos
- Fade transition every 5 seconds
- **Fixed background**: height h-screen, position fixed, extends to countdown
- **Radial vignette overlay**: rgba(0,0,0,0.1) center → rgba(0,0,0,0.6) edges
- Centered text: "ALANA & MATHEUS" (Rameau font with 0.2em letter spacing)
- **Text styling**: Responsive sizing (text-4xl → text-7xl)
- **& symbol**: Italicized between names (font-sans italic)
- **Divider line**: White horizontal line (w-16 h-px) between names and date
- Wedding date: "04 de Junho de 2026" (below divider)
- **Date placement**: Positioned near couple names (not separate section)
- No scroll indicator
- No slide indicator dots (clean design)
- **Image positioning**: object-center on all screen sizes
- **Content positioning**: pt-20 (below header), -mt-48 md:-mt-32 (centered vertically)

Implementation notes:
- Fixed background container with z-0
- Vignette overlay as separate fixed div with radial gradient
- Content layer with z-10 relative positioning
- Slideshow images load with priority (first image eager, rest lazy)
```

### 3.2 Countdown Timer
```jsx
Features:
- **Background**: Transparent (bg-transparent) - floats on hero fixed background
- Calculate time until June 4th, 2026 (18:00 BRT)
- Before wedding: Display Days | Hours | Minutes | Seconds (4-column grid, 2 cols on mobile)
- After wedding: Display "Casados há X meses Y dias" (2-column grid)
- **Number styling**: White text with heavy drop-shadow (drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)])
- **No card backgrounds**: Numbers and labels float directly over photo
- Animated number flip/slide transitions (Framer Motion)
- Custom styling: large serif numbers (text-4xl md:text-6xl), uppercase labels
- Auto-update every second
- Dynamic title: "Contagem Regressiva" before / "Casados Há" after
- **Title styling**: White with drop-shadow, uppercase, font-serif font-light
- **No duplicate date**: Date only appears once in Hero section
- **Layout**: Centered max-w-4xl container with py-16 md:py-24 spacing
```

**Implementation**:
```javascript
// useCountdown.js hook
const targetDate = new Date('2026-06-04T18:00:00-03:00');
const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

function calculateTimeLeft() {
  const difference = +new Date(targetDate) - +new Date();
  
  // Before wedding - countdown
  if (difference > 0) {
    return {
      isMarried: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  
  // After wedding - count up (months and days)
  const daysSinceWedding = Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24));
  const months = Math.floor(daysSinceWedding / 30);
  const days = daysSinceWedding % 30;
  
  return {
    isMarried: true,
    months,
    days
  };
}

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

### 3.3 Save the Date Timeline
```jsx
Story Milestones:
1. O Início (Jun 6, 2021)
   - Photo of first meeting/date
   - Short description
   - Location tag

2. O Pedido (Jan 1, 2025)
   - Proposal photo
   - Proposal story
   - Location tag

3. O Casamento (Jun 4, 2026)
   - Wedding venue photo
   - Event details
   - Time & location

Design:
- **White background with gradient fade**: Gradient from transparent to white at top
- **Portrait card layout**: aspect-[9/16] for vertical photos
- **Card structure**: Image on top, text content below
- **Image positioning**: Customizable per card via imagePosition prop (object-center or object-[center_65%])
- **Vertical timeline line**: Hidden on mobile, shown on desktop (left-1/2, inside events container)
- **Timeline dots**: bg-secondary (light gray), no animation, w-4 h-4 with border
- **Alternating layout**: Left/right cards on desktop, stacked on mobile
- **Text styling**: 
  - Title: text-xl font-serif font-normal uppercase text-primary
  - Date: text-primary-light (#6A6A6A) font-light text-sm
  - Description: text-text-muted text-sm
- **Card hover**: shadow-lg → shadow-xl transition
- Scroll-triggered fade-in animations (Framer Motion with intersection observer)
- **Spacing**: mb-16 md:mb-24 between cards
- **Section padding**: py-16 md:py-24
- Responsive: stacked vertically on mobile, alternating on desktop

Timeline Configuration (constants.js):
- 3 events with id, title, date, dateFormatted, description, image, imagePosition
- Photos located in /images/timeline/ (beginning.jpg, proposal.jpg, wedding.jpg)
```

### 3.4 Photo Grid (Home Page)
```jsx
Status: ✅ REMOVED - Photos now only in dedicated Gallery page

Note: Photo Grid component removed from home page to keep it focused.
All pre-wedding photos are now displayed in the Gallery page only.
```

---

## Phase 4: RSVP Integration - "Confirme sua Presença" (0.5 days)

**✅ RSVP Already Deployed**

**Repository**: https://github.com/Matheus-Macedo-Dev/rsvp-site  
**Live URL**: https://alanamatheus.online  
**Tech Stack**: Vue 3 + TypeScript + Vite  
**Status**: ✅ Production ready and functional

### 4.1 Integration Approach: External Link

The RSVP functionality is maintained as a separate application. Users click "Confirme sua Presença" and are redirected to the Vue 3 RSVP site.

**Architecture**:
```
Main Site (React)              RSVP Site (Vue 3)
alanamatheus.shop       →      alanamatheus.online
├── Home                       ├── Independent deployment
├── Gifts                      ├── Own backend/database  
├── Gallery                    ├── Complete Vue 3 app
└── Our Story                  └── All RSVP logic maintained
```

### 4.2 Implementation (Already Complete ✅)

**Frontend Configuration**:
```javascript
// src/utils/constants.js
export const NAV_ITEMS = [
  { id: 'inicio', label: 'Início', path: '/' },
  { 
    id: 'rsvp', 
    label: 'Confirme sua Presença', 
    path: 'https://alanamatheus.online', // ✅ External URL
    external: true 
  },
  { id: 'presentes', label: 'Presentes', path: '/presentes' },
  { id: 'album', label: 'Álbum de Fotos', path: '/album' },
  { id: 'historia', label: 'Nossa História', path: '/historia' }
];
```

**Header Component**:
```jsx
// components/layout/Header.jsx
// Logo: Image logo instead of text
<Link to="/">
  <img 
    src="/images/logo.png" 
    alt="Alana & Matheus" 
    className="h-12 md:h-14 w-auto"
  />
</Link>

// Navigation with external link handling
{NAV_ITEMS.map(item => (
  item.external ? (
    <a 
      key={item.id}
      href={item.path}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-link"
    >
      {item.label}
    </a>
  ) : (
    <Link key={item.id} to={item.path} className="nav-link">
      {item.label}
    </Link>
  )
))}
```

### 4.3 Benefits of This Approach

✅ **No Vue.js code changes** - RSVP app works as-is  
✅ **Technology independence** - React and Vue 3 coexist  
✅ **Separate deployments** - Update each app independently  
✅ **Faster development** - Skip building RSVP form  
✅ **Clean separation** - Each app has its own domain  

### 4.4 What Was Removed

- ❌ `backend/routes/rsvp.js` - Deleted
- ❌ RSVP routes from `server.js` - Removed
- ❌ `rsvps` array from `database.json` - Removed
- ❌ RSVP API calls from `frontend/src/services/api.js` - Removed

**Backend now only handles**: Gifts API + Mercado Pago webhook

---

## Phase 5: Gift Registry Page - "Presentes" (Day 11-13)

### 5.1 Gift List Display
```jsx
Features:
- Grid layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Each gift card:
  ├── Image (300x200px)
  ├── Name (h3)
  ├── Description (p, 2 lines max, ellipsis)
  ├── Price (R$ XXX,XX)
  ├── Quantity badge: "X disponível(is)" or "Esgotado"
  └── Button: "Presentear 🎁" (disabled if sold out)

Filtering:
- Tabs: Todos | Disponíveis | Comprados
- Sort dropdown: Preço (menor) | Preço (maior) | Nome A-Z

States:
- Loading: skeleton cards
- Empty: "Todos os presentes foram comprados! 🎉"
- Error: retry button
```

### 5.2 Gift Purchase Flow
```javascript
1. User clicks "Presentear" button
2. Frontend: POST /api/gifts/:id/checkout
3. Backend:
   - Check gift availability (purchased < quantity)
   - Create Mercado Pago preference
   - Return { preferenceId, initPoint }
4. Frontend: Redirect to initPoint (Mercado Pago checkout)
5. User completes payment on Mercado Pago
6. Mercado Pago sends webhook to backend
7. Backend updates database (increment purchased count)
8. User redirected to success page
```

### 5.3 Success/Error Pages
```jsx
Success Page (obrigado.html):
- Large checkmark icon
- "Obrigado pelo presente! 💝"
- "Você receberá a confirmação por email"
- Confetti animation (canvas-confetti)
- Button: "Voltar para lista de presentes"

Error Page (erro.html):
- Error icon
- "Ops! Algo deu errado no pagamento"
- "Tente novamente ou escolha outro presente"
- Button: "Tentar novamente"

Pending Page (pendente.html):
- Clock icon
- "Pagamento em processamento"
- "Você será notificado quando confirmar"
- Button: "Voltar ao site"
```

### 5.4 Backend - Gifts API
```javascript
// routes/gifts.js

// GET /api/gifts - List all gifts with availability
router.get('/', async (req, res) => {
  const db = await readDB();
  const gifts = db.gifts.map(gift => ({
    ...gift,
    available: gift.quantity - gift.purchased,
    isAvailable: gift.purchased < gift.quantity
  }));
  res.json(gifts);
});

// POST /api/gifts/:id/checkout - Create Mercado Pago preference
router.post('/:id/checkout', async (req, res) => {
  const gift = findGiftById(req.params.id);
  
  if (!gift || gift.purchased >= gift.quantity) {
    return res.status(400).json({ error: 'Gift unavailable' });
  }

  const preference = {
    items: [{
      id: gift.id.toString(),
      title: gift.name,
      description: gift.description,
      unit_price: gift.price,
      quantity: 1,
      currency_id: "BRL"
    }],
    back_urls: {
      success: "https://alanamatheus.shop/obrigado.html",
      failure: "https://alanamatheus.shop/erro.html",
      pending: "https://alanamatheus.shop/pendente.html"
    },
    auto_return: "approved",
    notification_url: `${process.env.BACKEND_URL}/api/webhook/mercadopago`,
    metadata: { gift_id: gift.id }
  };

  const response = await axios.post(
    'https://api.mercadopago.com/checkout/preferences',
    preference,
    { headers: { 'Authorization': `Bearer ${MP_TOKEN}` } }
  );

  res.json({
    preferenceId: response.data.id,
    initPoint: response.data.init_point
  });
});
```

### 5.5 Backend - Webhook Handler
```javascript
// routes/webhook.js

// POST /api/webhook/mercadopago
router.post('/mercadopago', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'payment') {
    const payment = await fetchPaymentDetails(data.id);

    if (payment.status === 'approved') {
      const giftId = payment.metadata.gift_id;
      await incrementGiftPurchaseCount(giftId);
      
      await recordPurchase({
        giftId,
        paymentId: payment.id,
        amount: payment.transaction_amount,
        buyerEmail: payment.payer.email,
        date: new Date().toISOString()
      });

      console.log(`✅ Gift ${giftId} purchased!`);
    }
  }

  res.status(200).send('OK');
});
```

---

## Phase 6: Photo Album Page - "Álbum de Fotos" (Day 14-15)

### 🎯 Hybrid Image Approach
**Strategy**: Local images for performance-critical assets, external URLs for gallery

- **Local Images** (stored in `frontend/public/images/`):
  - Logo files (logo.png, logo-black.png)
  - Hero slideshow (8 photos in /hero/)
  - Timeline photos (3 photos in /timeline/)
  - Gift product images (in /gifts/)
  - **Reason**: Fast loading, reliable, browser-cached, critical for page performance

- **External URLs** (Google Drive or CDN):
  - Gallery photos (30-50 photos)
  - **Reason**: Avoids repository bloat, easy updates without redeployment
  - **Configuration**: Update `GALLERY_PHOTOS` array in Gallery.jsx

### 6.1 Gallery Grid
```jsx
Features:
- Masonry layout with react-masonry-css or similar
- 4 columns (desktop), 3 (tablet), 2 (mobile), 1 (mobile small)
- Lazy loading with react-lazy-load-image-component
- Hover effect: zoom + overlay with caption and date
- Click to open lightbox with full-screen view
- ✅ NO CATEGORIES - All pre-wedding photos in single album
- Simple, clean display of all engagement/pre-wedding photos
- **Uses external URLs** - Google Drive or CDN (no local files needed)
- Photos configured in `GALLERY_PHOTOS` array in Gallery.jsx

Configuration:
- Location: frontend/src/pages/Gallery/Gallery.jsx
- Update GALLERY_PHOTOS array with Google Drive URLs or CDN links
- Format: { id, src (URL), alt, caption, date }

Google Drive Setup:
1. Upload photos to Google Drive
2. Share with "Anyone with the link can view"
3. Get file ID from sharing link
4. Use: https://drive.google.com/uc?export=view&id=FILE_ID

Note: Gallery is a dedicated page (route: /album), not shown on home page
```

### 6.2 Lightbox Component
```jsx
Features:
- Full-screen overlay (dark background with blur)
- Current image centered, scaled to fit
- Navigation arrows: Previous / Next
- Close button (top-right)
- Keyboard shortcuts:
  ├── ESC: Close
  ├── Arrow Left: Previous
  └── Arrow Right: Next
- Swipe gestures on mobile (react-swipeable)
- Image counter: "3 / 50"
- Download button (optional)
- Share buttons: WhatsApp, Facebook, Instagram (optional)
```

---

## Phase 7: Our Story Page - "Nossa História" (Day 16-17)

### 7.1 Detailed Story Timeline
```jsx
Content Sections:

1. Como Nos Conhecemos (Jun 6, 2021)
   - Large photo (full-width or 50/50 split with text)
   - Story paragraph (200-300 words)
   - Location: "São Paulo, SP"
   - Emoji: 💕

2. O Pedido (Jan 1, 2025)
   - Proposal photo
   - Proposal story (200-300 words)
   - Location: "Praia de [Nome], [Estado]"
   - Emoji: 💍

3. O Grande Dia (Jun 4, 2026)
   - Venue photo
   - Event details:
     ├── Data: 04 de Junho de 2026
     ├── Horário: 18:00
     ├── Local: [Venue Name & Address]
     ├── Dress Code: Traje Esporte Fino
     └── Mapa (Google Maps embed or link)
   - Emoji: 🎉

Design:
- Alternating image-left / image-right layout
- Scroll-triggered animations (fade + slide)
- Divider between sections (decorative line or icon)
- Background: subtle texture or pattern
```

---

## Phase 8: Styling & Animations (Day 18-20)

### 8.1 Design System (Tailwind Config)
```javascript
// tailwind.config.js
// ✅ CURRENT IMPLEMENTATION - Using Tailwind CSS v4 with @theme directive
// Note: Traditional tailwind.config.js still exists for compatibility
// Actual theme defined in src/index.css using @theme

// index.css @theme block:
@theme {
  --color-primary: #3A3A3A;           // Dark gray (updated)
  --color-primary-light: #6A6A6A;     // Medium gray
  --color-primary-dark: #1A1A1A;      // Almost black
  --color-secondary: #E5E5E5;         // Light gray (updated)
  --color-secondary-light: #F5F5F5;   // Very light gray
  --color-secondary-dark: #D0D0D0;    // Medium light gray
  --color-accent: #D4AF77;            // Gold (unchanged)
  --color-accent-light: #E5C89A;
  --color-accent-dark: #B8935E;
  --color-background: #FFFFFF;        // Pure white (updated)
  --color-text-dark: #1A1A1A;
  --color-text-light: #FFFFFF;
  --color-text-muted: #6B7280;
  
  --font-family-sans: 'Montserrat', sans-serif;
  --font-family-serif: 'Playfair Display', serif;
  --font-family-rameau: 'Rameau Light', 'Rameau', serif;  // Added for couple names
}

// Font weights used:
// Montserrat: 200, 300, 400, 500, 600 (thinner weights)
// Playfair Display: 300, 400, 500, 600
// Rameau: normal (default weight, with 0.2em letter spacing)
```

### 8.2 Typography Scale
```css
// ✅ CURRENT IMPLEMENTATION - Thinner font weights

h1: 3.5rem (56px) / 4rem (64px) desktop - serif (weight 300-400)
h2: 2.5rem (40px) / 3rem (48px) desktop - serif (weight 300-400)
h3: 1.75rem (28px) / 2rem (32px) desktop - sans (weight 300-400)
p:  1rem (16px) / 1.125rem (18px) desktop - sans (weight 200-400)

Couple Names (Hero): 
- Font: Rameau (custom serif)
- Weight: normal
- Letter spacing: 0.2em
- Size: 4xl (2.25rem) mobile, 6xl (3.75rem) tablet, 7xl (4.5rem) desktop
- Class: .font-couple-names

Mobile: scale down by 0.75x

Font weights in use:
- Montserrat: 200 (extralight), 300 (light), 400 (normal), 500 (medium), 600 (semibold)
- Playfair Display: 300 (light), 400 (normal), 500 (medium), 600 (semibold)
- Rameau: normal (with 0.2em letter spacing) - couple names only
```

### 8.3 Animation Variants (Framer Motion)
```javascript
// utils/animations.js
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
```

### 8.4 Responsive Breakpoints
```javascript
sm: '640px',   // Mobile landscape
md: '768px',   // Tablet
lg: '1024px',  // Desktop
xl: '1280px',  // Large desktop
'2xl': '1536px' // Extra large

Mobile-first approach: design for mobile, enhance for desktop
```

---

## Phase 9: Backend Development (Day 21-22)

### 9.1 Database Schema (database.json)
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
    },
    {
      "id": 2,
      "name": "Micro-ondas 30L",
      "description": "Micro-ondas branco com painel digital",
      "price": 500.00,
      "image": "/images/gifts/microondas.jpg",
      "quantity": 1,
      "purchased": 0,
      "preferenceId": null,
      "category": "Eletrodomésticos"
    },
    {
      "id": 3,
      "name": "Jogo de Toalhas",
      "description": "Kit com 4 toalhas de banho 100% algodão",
      "price": 150.00,
      "image": "/images/gifts/toalhas.jpg",
      "quantity": 3,
      "purchased": 0,
      "preferenceId": null,
      "category": "Banho"
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

**Note**: RSVP data is managed by the separate Vue.js application and its own backend/database.

### 9.2 Server Setup (server.js)
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import giftsRouter from './routes/gifts.js';
import webhookRouter from './routes/webhook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['https://alanamatheus.shop', 'http://localhost:5173']
}));
app.use(express.json());

// Routes
app.use('/api/gifts', giftsRouter);
app.use('/api/webhook', webhookRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Wedding Gift Registry API Running' });
});

app.listen(PORT, () => {
  console.log(`🎉 Server running on port ${PORT}`);
});
```

**Note**: RSVP routes removed as RSVP functionality is handled by separate Vue.js application.

### 9.3 Environment Variables (.env)
```bash
MERCADO_PAGO_ACCESS_TOKEN=your_access_token_here
BACKEND_URL=https://your-app.railway.app
PORT=3000
NODE_ENV=production
```

---

## Phase 10: Testing & Optimization (Day 23-25)

### 10.1 Testing Checklist

#### Functional Testing
- [ ] All pages load correctly
- [ ] Navigation works (smooth scroll, active states)
- [ ] Countdown timer updates every second
- [ ] RSVP link opens https://alanamatheus.online correctly
- [ ] Gift list loads from API
- [ ] Gift purchase flow redirects to Mercado Pago
- [ ] Webhook updates gift availability
- [ ] Photo gallery lazy loads images
- [ ] Lightbox navigation works
- [ ] Mobile menu opens/closes

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Android
- [ ] iOS Safari

#### Responsive Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1920px

#### Performance Testing (Lighthouse)
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### 10.2 Optimization Tasks

#### Images
- [ ] Compress all images (TinyPNG or Squoosh)
- [ ] Convert to WebP format (with JPG fallback)
- [ ] Use responsive images (srcset)
- [ ] Lazy load below-the-fold images
- [ ] Add alt text to all images

#### Code
- [ ] Remove unused CSS (PurgeCSS)
- [ ] Code splitting (React.lazy + Suspense)
- [ ] Minify JS and CSS
- [ ] Tree-shake dependencies
- [ ] Bundle size < 500KB (check with webpack-bundle-analyzer)

#### Caching
- [ ] Set cache headers for static assets
- [ ] Service worker for offline support (optional)
- [ ] CDN for images (optional: Cloudinary, Imgix)

#### SEO
```html
<!-- index.html -->
<head>
  <title>Casamento Alana & Matheus - 04 de Junho, 2026</title>
  <meta name="description" content="Celebre conosco o casamento de Alana e Matheus. Confirme sua presença, veja fotos e escolha um presente!">
  <meta name="keywords" content="casamento, wedding, Alana, Matheus, junho 2026">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Casamento Alana & Matheus">
  <meta property="og:description" content="04 de Junho, 2026 - Celebre conosco!">
  <meta property="og:image" content="https://alanamatheus.shop/og-image.jpg">
  <meta property="og:url" content="https://alanamatheus.shop">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Casamento Alana & Matheus">
  <meta name="twitter:description" content="04 de Junho, 2026">
  <meta name="twitter:image" content="https://alanamatheus.shop/og-image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
```

---

## Phase 11: Deployment (Day 26-28)

### 11.1 Backend Deployment (Railway)

#### Step 1: Prepare Backend
```json
// package.json
{
  "name": "wedding-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Step 2: Deploy to Railway
1. Push code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select `ansel` repository
5. Configure:
   - Root Directory: `/backend`
   - Start Command: `npm start`
6. Add environment variables:
   ```
   MERCADO_PAGO_ACCESS_TOKEN=your_token
   BACKEND_URL=https://ansel-production.up.railway.app
   PORT=3000
   ```
7. Generate domain: Settings → Generate Domain
8. Deploy!

#### Step 3: Test Backend
```bash
curl https://your-app.railway.app/api/health
# Should return: {"status":"ok","message":"Wedding API Running"}

curl https://your-app.railway.app/api/gifts
# Should return gift list
```

### 11.2 Frontend Deployment (GitHub Pages)

#### Step 1: Configure Vite
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // For custom domain
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
});
```

#### Step 2: Update API URL
```javascript
// src/services/api.js
const API_URL = import.meta.env.PROD 
  ? 'https://your-app.railway.app/api'
  : 'http://localhost:3000/api';

export default API_URL;
```

#### Step 3: Build & Deploy
```bash
cd frontend
npm run build

# Option A: Use gh-pages package
npm install -D gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
npm run deploy

# Option B: Manual deployment
# 1. Go to GitHub repo Settings → Pages
# 2. Source: Deploy from branch
# 3. Branch: gh-pages / root
# 4. Save
```

#### Step 4: Configure Custom Domain
```bash
# Create CNAME file in /public
echo "alanamatheus.shop" > frontend/public/CNAME

# Configure DNS (at your domain provider)
Type: CNAME
Name: @ (or alanamatheus.shop)
Value: your-username.github.io
TTL: 3600

# Wait 10-30 minutes for DNS propagation
```

#### Step 5: Enable HTTPS
- GitHub Pages automatically provisions SSL certificate
- Check: Settings → Pages → "Enforce HTTPS" (should be enabled)

### 11.3 Post-Deployment Verification
- [ ] Visit https://alanamatheus.shop
- [ ] Test all pages load
- [ ] Test RSVP link opens https://alanamatheus.online
- [ ] Verify RSVP site is accessible and functional
- [ ] Test gift purchase flow (use Mercado Pago test mode)
- [ ] Test on mobile device
- [ ] Check webhook logs in Railway
- [ ] Monitor for errors

---

## Phase 12: Mercado Pago Setup

### 12.1 Get Credentials
1. Go to https://www.mercadopago.com.br
2. Login → Seu negócio → Configurações → Credenciais
3. Copy **Access Token** (Production)
4. Save to Railway environment variables

### 12.2 Test Mode (Optional)
- Use **Test Access Token** for development
- Test cards: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

### 12.3 Webhook Configuration
- Automatic: Webhook URL set in preference creation
- Manual (backup): Seu negócio → Webhooks → Add URL
  - URL: `https://your-app.railway.app/api/webhook/mercadopago`
  - Events: `payment`

---

## Technology Stack Summary

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 7
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4 (with @theme in index.css, config file for compatibility)
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Yup (if implemented)
- **Images**: react-lazy-load-image-component

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4
- **HTTP Client**: Axios
- **Validation**: Express Validator
- **CORS**: cors middleware
- **Environment**: dotenv

### DevOps
- **Version Control**: Git + GitHub
- **Frontend Hosting**: GitHub Pages
- **Backend Hosting**: Railway
- **CI/CD**: Railway auto-deploy on push
- **Domain**: Custom DNS (alanamatheus.shop)

### Third-Party
- **Payment Gateway**: Mercado Pago API
- **Analytics**: Google Analytics 4 (optional)

---

## Current Implementation Status (Updated)

### ✅ Completed Features

#### Frontend
- [x] Header with dynamic logo switching (white/black based on background)
- [x] Mobile menu (z-[60], slide-in animation, proper hamburger behavior)
- [x] Hero section with fixed background and 8-photo slideshow
- [x] Radial vignette overlay on hero
- [x] Couple names with Rameau font and 0.2em letter spacing
- [x] Countdown timer with transparent background
- [x] Timeline with portrait (9:16) cards
- [x] Timeline with white background and gradient fade
- [x] Footer with simplified 2-column layout
- [x] Thinner font weights (200/300/400)
- [x] Tailwind CSS v4 with @theme configuration
- [x] Custom .font-couple-names class
- [x] RSVP external link integration
- [x] Responsive design (mobile/tablet/desktop)

#### Pages Created
- [x] Home (Hero + Countdown + Timeline)
- [x] Gifts page structure
- [x] Gallery page structure
- [x] Our Story page structure
- [x] Payment success/error/pending pages

#### Backend
- [x] Express server setup
- [x] Gifts API routes
- [x] Webhook handler for Mercado Pago
- [x] Database.json structure (gifts + purchases only)
- [x] CORS configuration

### 🚧 Pending Tasks

#### Content
- [ ] Add 8 hero slideshow photos (slide1-slide8.jpg)
- [ ] Add 3 timeline photos (beginning.jpg, proposal.jpg, wedding.jpg)
- [ ] Add 2 logo files (logo.png white, logo-black.png black)
- [ ] Add gallery photos (30-50 photos)
- [ ] Populate gift list in database.json
- [ ] Add gift product images

#### Features
- [ ] Complete Gallery page implementation
- [ ] Complete Our Story page implementation
- [ ] Complete Gifts page functionality
- [ ] Test Mercado Pago integration
- [ ] Add image lazy loading throughout
- [ ] Optimize images (WebP conversion optional)

#### Testing & Deployment
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization (Lighthouse > 90)
- [ ] Deploy backend to Railway
- [ ] Deploy frontend to GitHub Pages
- [ ] Configure custom domain DNS
- [ ] Set up Mercado Pago production credentials
- [ ] Test webhook functionality

---

## Timeline Summary

| Phase | Duration | Tasks |
|-------|----------|-------|
| 1. Setup | 2 days | Project initialization, folder structure |
| 2. Core Components | 3 days | Layout, common components |
| 3. Home Page | 3 days | Hero, countdown, timeline (photo grid removed) |
| 4. RSVP Integration | 0.5 days | External link/subdomain setup (Vue.js app already exists) |
| 5. Gifts | 3 days | Gift list, Mercado Pago, webhook |
| 6. Gallery | 2 days | Masonry grid, lightbox (pre-wedding photos only) |
| 7. Story | 2 days | Timeline, story sections |
| 8. Styling | 3 days | Design system, animations |
| 9. Backend | 2 days | API routes, database (Gifts only) |
| 10. Testing | 3 days | Cross-browser, responsive, performance |
| 11. Deployment | 3 days | Railway, GitHub Pages, DNS |
| **Total** | **26.5 days** | **Full MVP** |

---

## Next Steps

1. **Get Mercado Pago Access Token**
   - Create account if needed
   - Get production credentials

2. **Prepare Content**
   - [ ] Collect 30-50 high-quality photos
   - [ ] Write story text (3 sections)
   - [ ] Define gift list (10-20 items)
   - [ ] Get venue details

3. **Start Development**
   - Follow phases 1-11
   - Test each component before moving on
   - Deploy backend first, then frontend

4. **Launch Checklist**
   - [ ] Test payment flow end-to-end
   - [ ] Verify RSVP link works (https://alanamatheus.online)
   - [ ] Test RSVP functionality on Vue 3 app
   - [ ] Check mobile responsiveness
   - [ ] Verify custom domain works
   - [ ] Share with close friends for feedback

---

**Ready to start? Begin with Phase 1! 🚀**
