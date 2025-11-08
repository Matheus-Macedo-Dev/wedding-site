import express from 'express';
import axios from 'axios';
import { db } from '../services/database.js';

const router = express.Router();
const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

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
        const gift = await db.getGift(giftId);
        
        if (gift && gift.purchased < gift.quantity) {
          // Increment purchased count atomically
          await db.incrementPurchased(giftId);

          // Record purchase
          await db.createPurchase({
            giftId: giftId,
            giftName: gift.name,
            paymentId: paymentId.toString(),
            amount: payment.transaction_amount,
            buyerEmail: payment.payer.email,
            buyerName: payment.payer.first_name ? 
              `${payment.payer.first_name} ${payment.payer.last_name || ''}`.trim() : 
              'Guest',
            status: payment.status
          });

          console.log(`✅ Gift "${gift.name}" purchased! (${gift.purchased + 1}/${gift.quantity})`);
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
