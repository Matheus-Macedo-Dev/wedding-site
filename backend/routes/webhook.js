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

// Mercado Pago Webhook
router.post('/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log('📨 Webhook received:', type, data);

    // Only process payment notifications
    if (type === 'payment') {
      const paymentId = data.id;

      // Get payment details from Mercado Pago
      const paymentResponse = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
          }
        }
      );

      const payment = paymentResponse.data;
      console.log('💳 Payment status:', payment.status);

      // Only process approved payments
      if (payment.status === 'approved') {
        const giftId = parseInt(payment.metadata.gift_id);
        const db = await readDB();
        
        const gift = db.gifts.find(g => g.id === giftId);
        
        if (gift && gift.purchased < gift.quantity) {
          // Increment purchased count
          gift.purchased += 1;

          // Record purchase
          db.purchases.push({
            giftId: giftId,
            giftName: gift.name,
            paymentId: paymentId.toString(),
            amount: payment.transaction_amount,
            buyerEmail: payment.payer.email,
            buyerName: payment.payer.first_name ? 
              `${payment.payer.first_name} ${payment.payer.last_name || ''}`.trim() : 
              'Guest',
            date: new Date().toISOString(),
            status: payment.status
          });

          await writeDB(db);
          console.log(`✅ Gift "${gift.name}" purchased! (${gift.purchased}/${gift.quantity})`);
        } else if (gift) {
          console.log(`⚠️ Gift "${gift.name}" already at max quantity`);
        } else {
          console.log(`⚠️ Gift ID ${giftId} not found`);
        }
      }
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Webhook error:', error.message);
    // Still respond with 200 to prevent retries
    res.status(200).send('ERROR');
  }
});

export default router;
