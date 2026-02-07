import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import giftsRouter from './routes/gifts.js';
import webhookRouter from './routes/webhook.js';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file explicitly
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - CORS
// Support configurable allowed origins via ALLOWED_ORIGINS (comma-separated)
// or a short-term debug flag ALLOW_ALL_ORIGINS=true to accept any origin.
const allowAll = String(process.env.ALLOW_ALL_ORIGINS).toLowerCase() === 'true';
const defaultOrigins = [
  process.env.FRONTEND_URL ||
  'https://alanamatheus.site',
  'http://localhost:5173',
  'http://localhost:5174'
];
const additional = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...additional]));

if (allowAll) {
  app.use(cors({ origin: true }));
} else {
  app.use(cors({
    origin: function(origin, callback) {
      // Allow non-browser requests (e.g., server-to-server) when origin is undefined
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Allow subpaths of GitHub Pages (endsWith .github.io) if present in allowedOrigins by wildcard
      const githubAllowed = allowedOrigins.some(a => a.includes('.github.io'));
      if (githubAllowed && origin.endsWith('.github.io')) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    }
  }));
}
app.use(express.json());

// Routes
app.use('/api/gifts', giftsRouter);
app.use('/api/webhook', webhookRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Wedding Gift Registry API Running',
    note: 'RSVP functionality handled by separate Vue.js application',
    timestamp: new Date().toISOString()
  });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  console.error('[Server] Failed to start:', err);
  process.exit(1);
});
