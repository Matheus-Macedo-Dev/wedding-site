import express from 'express';
import axios from 'axios';
import { db } from '../services/database.js';

const router = express.Router();
const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// Mercado Pago Webhook
router.post('/mercadopago', async (req, res) => {
  console.log('\n🔔 [Webhook] Received notification:', {
    body: req.body,
    query: req.query,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
  
  try {
    // Mercado Pago sends topic (not type) and can use body OR query params
    const topic = req.body.topic || req.query.topic;
    const dataId = req.body.data?.id || req.query['data.id'] || req.query.id;
    
    console.log('📬 [Webhook] Parsed:', { topic, dataId });

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
        
        console.log('💳 [Webhook] Payment details:', {
          id: payment.id,
          status: payment.status,
          amount: payment.transaction_amount,
          giftId: payment.metadata?.gift_id,
          payer: payment.payer?.email
        });

        // Log explicit payment status
        if (payment.status === 'approved') {
          console.log(`✅ [Webhook] Payment APPROVED: paymentId=${payment.id}`);
        } else if (payment.status === 'rejected') {
          console.log(`❌ [Webhook] Payment REJECTED: paymentId=${payment.id}`);
        } else if (payment.status === 'pending') {
          console.log(`⏳ [Webhook] Payment PENDING: paymentId=${payment.id}`);
        } else {
          console.log(`[Webhook] Payment status '${payment.status}': paymentId=${payment.id}`);
        }

        // Only process approved payments
        if (payment.status === 'approved') {
          // Already logged above
          console.log('✅ [Webhook] Payment approved, processing...');
          const giftId = parseInt(payment.metadata?.gift_id);
          const paymentIdStr = paymentId.toString();
          
          // Check if payment already processed (idempotency)
          const existingPurchase = await db.getPurchaseByPaymentId(paymentIdStr);
          if (existingPurchase) {
            console.log('⚠️ [Webhook] Payment already processed, skipping');
            return res.status(200).send('OK');
          }
          
          console.log('🎁 [Webhook] Processing new purchase for gift:', giftId);
          
          const gift = await db.getGift(giftId);
          
          if (!gift) {
            console.log('❌ [Webhook] Gift not found:', giftId);
            return res.status(200).send('OK');
          }
          
          // Check if gift is still available
          if (gift.purchased >= gift.quantity) {
            console.log('⚠️ [Webhook] Gift already sold out, payment needs refund:', giftId);
            // In production, you would trigger a refund here
            return res.status(200).send('OK');
          }
          
          // Process purchase directly (increment purchased count)
          try {
            // Create purchase record FIRST (will fail if duplicate due to unique constraint)
            await db.createPurchase({
              giftId,
              giftName: gift.name,
              paymentId: paymentIdStr,
              amount: payment.transaction_amount,
              buyerEmail: payment.payer.email,
              buyerName: payment.payer.first_name ? 
                `${payment.payer.first_name} ${payment.payer.last_name || ''}`.trim() : 
                'Guest',
              status: 'approved'
            });
            
            // Only increment if purchase record was created successfully
            await db.incrementPurchased(giftId);
            
            console.log('🎉 [Webhook] Purchase completed successfully!', {
              giftId,
              paymentId: paymentIdStr,
              amount: payment.transaction_amount
            });
            
            // If this was the special gift with an uploaded image, update it now
            const uploadedImageUrl = payment.metadata?.uploaded_image_url;
            
            if (uploadedImageUrl) {
              console.log('📸 [Webhook] Updating gift image:', uploadedImageUrl);
              await db.updateGiftImage(giftId, uploadedImageUrl);
            }
          } catch (error) {
            // Check if this is a duplicate payment error (idempotency)
            if (error.message && error.message.includes('duplicate key')) {
              console.log('⚠️ [Webhook] Duplicate payment detected, ignoring:', {
                paymentId: paymentIdStr,
                giftId
              });
              return res.status(200).send('OK');
            }
            
            console.error('[Webhook] Failed to process purchase:', {
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
    console.log('✓ [Webhook] Responding with 200 OK');
    // Log paymentId if available in query/body
    const paymentIdLog = req.body.data?.id || req.query['data.id'] || req.query.id;
    if (paymentIdLog) {
      console.log(`[Webhook] Final response for paymentId=${paymentIdLog}`);
    }
    res.status(200).send('OK');
  } catch (error) {
    // Log paymentId if available in query/body
    const paymentIdLog = req.body.data?.id || req.query['data.id'] || req.query.id;
    console.error('[Webhook] Error processing webhook:', {
      error: error.message,
      stack: error.stack,
      body: req.body,
      query: req.query,
      paymentId: paymentIdLog,
      timestamp: new Date().toISOString()
    });
    // Still respond with 200 to prevent retries
    res.status(200).send('ERROR');
  }
});

export default router;
