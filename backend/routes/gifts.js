import express from 'express';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'database.json');
const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// Helper: Read database
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper: Write database
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// GET all gifts with availability
router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    const availableGifts = db.gifts.map(gift => ({
      ...gift,
      available: gift.quantity - gift.purchased,
      isAvailable: gift.purchased < gift.quantity
    }));
    res.json(availableGifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

// GET single gift
router.get('/:id', async (req, res) => {
  try {
    const giftId = parseInt(req.params.id);
    const db = await readDB();
    const gift = db.gifts.find(g => g.id === giftId);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json({
      ...gift,
      available: gift.quantity - gift.purchased,
      isAvailable: gift.purchased < gift.quantity
    });
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

// POST create preference for a gift
router.post('/:id/checkout', async (req, res) => {
  try {
    const giftId = parseInt(req.params.id);
    const db = await readDB();
    const gift = db.gifts.find(g => g.id === giftId);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    if (gift.purchased >= gift.quantity) {
      return res.status(400).json({ error: 'Gift no longer available' });
    }

    // Create Mercado Pago preference
    const preference = {
      items: [
        {
          id: gift.id.toString(),
          title: gift.name,
          description: gift.description,
          unit_price: gift.price,
          quantity: 1,
          currency_id: "BRL"
        }
      ],
      back_urls: {
        success: "https://alanamatheus.shop/obrigado.html",
        failure: "https://alanamatheus.shop/erro.html",
        pending: "https://alanamatheus.shop/pendente.html"
      },
      auto_return: "approved",
      notification_url: `${process.env.BACKEND_URL}/api/webhook/mercadopago`,
      metadata: {
        gift_id: gift.id
      }
    };

    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Save preference ID
    gift.preferenceId = response.data.id;
    await writeDB(db);

    res.json({
      preferenceId: response.data.id,
      initPoint: response.data.init_point
    });

  } catch (error) {
    console.error('Checkout error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

export default router;
