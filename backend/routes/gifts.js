import express from 'express';
import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { db } from '../services/database.js';

const router = express.Router();
const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// Setup multer for file uploads (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET all gifts with availability
router.get('/', async (req, res) => {
  try {
    const gifts = await db.getGifts();
    // Calculate available (quantity - purchased - reserved)
    const giftsWithAvailability = gifts.map(gift => ({
      ...gift,
      available: Math.max(0, gift.quantity - gift.purchased - (gift.reserved || 0)),
      isAvailable: gift.quantity - gift.purchased - (gift.reserved || 0) > 0
    }));
    res.json(giftsWithAvailability);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

// POST create preference for a gift
router.post('/:id/checkout', async (req, res) => {
  try {
    const giftId = parseInt(req.params.id);
    const { uploadedImageUrl } = req.body;
    
    console.log('[Checkout] Request:', { giftId, uploadedImageUrl });
    
    const gift = await db.getGift(giftId);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    // Check if gift is still available
    if (gift.purchased >= gift.quantity) {
      return res.status(400).json({ 
        error: 'GIFT_UNAVAILABLE',
        message: 'Este presente já foi comprado. Por favor, escolha outro.'
      });
    }
    
    // Get frontend URL for redirects
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const isLocalhost = frontendUrl.includes('localhost');
    console.log(process.env.BACKEND_URL);
    // Create Mercado Pago preference
    const preference = {
      items: [
        {
          id: gift.id.toString(),
          title: gift.name,
          description: gift.name,
          unit_price: parseFloat(gift.price),
          quantity: 1,
          currency_id: "BRL"
        }
      ],
      back_urls: {
        "success": `https://alanamatheus.site/obrigado`,
        "failure": `https://alanamatheus.site/erro`,
        "pending": `https://alanamatheus.site/pendente`
      },
      auto_return: "approved",
      external_reference: gift.id.toString(),
      notification_url: `${process.env.BACKEND_URL}/api/webhook/mercadopago`,
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

    // Save preference ID for reference
    await db.updateGiftPreference(gift.id, response.data.id);

    console.log('✅ [Checkout] Preference created successfully:', {
      preferenceId: response.data.id,
      giftId: gift.id,
      giftName: gift.name,
      webhookUrl: `${process.env.BACKEND_URL}/api/webhook/mercadopago`
    });

    res.json({
      preferenceId: response.data.id,
      initPoint: response.data.init_point
    });

  } catch (error) {
    console.error('[Checkout] Error:', error);
    res.status(500).json({ error: 'Failed to create checkout', message: error.message });
  }
});

// POST upload photo for special gift "Apresentou? Virou destaque"
// Stores image URL but doesn't update gift image until payment confirms
router.post('/upload-photo', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const giftId = parseInt(req.body.giftId);
    const preferenceId = req.body.preferenceId;

    if (!giftId) {
      return res.status(400).json({ error: 'Gift ID required' });
    }

    // Upload to ImgBB (simpler than Imgur, no OAuth needed)
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', req.file.buffer, {
      filename: `gift-photo-${giftId}-${Date.now()}.${req.file.mimetype.split('/')[1]}`
    });
    imgbbFormData.append('key', process.env.IMGBB_API_KEY); // ImgBB uses 'key' param for API key

    const imgbbResponse = await axios.post(
      'https://api.imgbb.com/1/upload',
      imgbbFormData,
      {
        headers: imgbbFormData.getHeaders()
      }
    );

    if (!imgbbResponse.data.success) {
      throw new Error('ImgBB upload failed: ' + (imgbbResponse.data.error?.message || 'Unknown error'));
    }

    const imageUrl = imgbbResponse.data.data.url;

    // Store the image URL temporarily (return it to frontend)
    // Don't update the database yet - wait for payment confirmation
    // The frontend will send this URL to the preference metadata
    
    res.json({
      success: true,
      message: 'Photo uploaded successfully',
      imageUrl,
      giftId,
      preferenceId
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to upload photo',
      message: error.message
    });
  }
});

export default router;