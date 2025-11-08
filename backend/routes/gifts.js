import express from 'express';
import axios from 'axios';
import { db } from '../services/database.js';

const router = express.Router();
const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// GET all gifts with availability
router.get('/', async (req, res) => {
  try {
    const gifts = await db.getGifts();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

// GET single gift
router.get('/:id', async (req, res) => {
  try {
    const giftId = parseInt(req.params.id);
    const gift = await db.getGift(giftId);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

// POST create preference for a gift
router.post('/:id/checkout', async (req, res) => {
  try {
    const giftId = parseInt(req.params.id);
    const gift = await db.getGift(giftId);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    if (gift.purchased >= gift.quantity) {
      return res.status(400).json({ error: 'Gift no longer available' });
    }

    // Get frontend URL for redirects
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174';
    const isLocalhost = frontendUrl.includes('localhost');
    
    // Create Mercado Pago preference
    const preference = {
      items: [
        {
          id: gift.id.toString(),
          title: gift.name,
          description: gift.description,
          unit_price: parseFloat(gift.price),
          quantity: 1,
          currency_id: "BRL"
        }
      ],
      back_urls: {
        success: `${frontendUrl}/obrigado`,
        failure: `${frontendUrl}/erro`,
        pending: `${frontendUrl}/pendente`
      },
      // Only use auto_return for production (Mercado Pago rejects localhost)
      ...(isLocalhost ? {} : { auto_return: "approved" }),
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

    console.log('  ✅ Preference created:', response.data.id);

    // Save preference ID to database
    await db.updateGiftPreference(gift.id, response.data.id);

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