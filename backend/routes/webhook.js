import express from 'express';
import axios from 'axios';
import { db } from '../services/database.js';

const router = express.Router();
const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// Mercado Pago Webhook
router.post('/mercadopago', async (req, res) => {
  try {
    // Mercado Pago sends topic (not type) and can use body OR query params
    const topic = req.body.topic || req.query.topic;
    const dataId = req.body.data?.id || req.query['data.id'] || req.query.id;

    // Process both payment and merchant_order notifications
    if ((topic === 'payment' || topic === 'merchant_order') && dataId) {
      // For merchant_order, we need to fetch the order to get the payment ID
      let paymentId = dataId;
      
      if (topic === 'merchant_order') {
        const orderResponse = await axios.get(
          `https://api.mercadopago.com/merchant_orders/${dataId}`,
          {
            headers: {
              'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
            }
          }
        );
        
        // Get the first payment from the order
        if (orderResponse.data.payments && orderResponse.data.payments.length > 0) {
          paymentId = orderResponse.data.payments[0].id;
        } else {
          return res.status(200).send('OK');
        }
      }

      // Get payment details from Mercado Pago
      try {
        const paymentResponse = await axios.get(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
            }
          }
        );

        const payment = paymentResponse.data;

        // Only process approved payments
        if (payment.status === 'approved') {
          const giftId = parseInt(payment.metadata?.gift_id);
          const paymentIdStr = paymentId.toString();
          
          // Check if payment already processed (idempotency)
          const existingPurchase = await db.getPurchaseByPaymentId(paymentIdStr);
          if (existingPurchase) {
            return res.status(200).send('OK');
          }
          
          const gift = await db.getGift(giftId);
          
          if (!gift) {
            return res.status(200).send('OK');
          }
          
          // Confirm purchase (move from reserved → purchased)
          try {
            const result = await db.confirmPurchase(giftId, {
              paymentId: paymentIdStr,
              giftName: gift.name,
              amount: payment.transaction_amount,
              buyerEmail: payment.payer.email,
              buyerName: payment.payer.first_name ? 
                `${payment.payer.first_name} ${payment.payer.last_name || ''}`.trim() : 
                'Guest'
            });
            
            if (result.success) {
              // If this was the special gift with an uploaded image, update it now
              const uploadedImageUrl = payment.metadata?.uploaded_image_url;
              
              if (uploadedImageUrl) {
                await db.updateGiftImage(giftId, uploadedImageUrl);
              }
            }
          } catch (error) {
            console.error('[Webhook] Failed to confirm purchase:', {
              paymentId: paymentIdStr,
              giftId,
              giftName: gift.name,
              error: error.message,
              stack: error.stack,
              timestamp: new Date().toISOString()
            });
            // Continue - webhook still responds 200 to prevent retries
          }
        }
      } catch (error) {
        console.error('[Webhook] Failed to fetch payment details from Mercado Pago:', {
          paymentId,
          topic,
          dataId,
          endpoint: `https://api.mercadopago.com/v1/payments/${paymentId}`,
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString()
        });
        // Acknowledge webhook but skip further processing to avoid retries
        return res.status(200).send('OK');
      }
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).send('OK');
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', {
      error: error.message,
      stack: error.stack,
      body: req.body,
      query: req.query,
      timestamp: new Date().toISOString()
    });
    // Still respond with 200 to prevent retries
    res.status(200).send('ERROR');
  }
});

export default router;
