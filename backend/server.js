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

// Middleware
app.use(cors({
   // Allow requests from the frontend (live site) and local dev servers
   origin: [process.env.FRONTEND_URL || 'https://alanamatheus.site', 'http://localhost:5173', 'http://localhost:5174']
}));
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
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🎉 Wedding Registry API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
