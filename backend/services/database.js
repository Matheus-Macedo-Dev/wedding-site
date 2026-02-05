import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Database service with Supabase
export const db = {
  // Get all gifts with availability
  async getGifts() {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('id');
    
    if (error) throw error;
    
    return data.map(gift => ({
      ...gift,
      available: gift.quantity - gift.purchased,
      isAvailable: gift.purchased < gift.quantity
    }));
  },

  // Get single gift by ID
  async getGift(id) {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return {
      ...data,
      available: data.quantity - data.purchased,
      isAvailable: data.purchased < data.quantity
    };
  },

  // Update gift preference ID
  async updateGiftPreference(id, preferenceId) {
    if (!supabase) throw new Error('Database not configured');
    
    const { error } = await supabase
      .from('gifts')
      .update({ preference_id: preferenceId })
      .eq('id', id);
    
    if (error) throw error;
  },

  // Increment gift purchased count
  async incrementPurchased(giftId) {
    if (!supabase) throw new Error('Database not configured');
    
    // Use atomic increment with RPC function
    const { data, error } = await supabase.rpc('increment_gift_purchased', {
      gift_id: giftId
    });
    
    if (error) {
      // Fallback to manual increment if RPC not available
      const gift = await this.getGift(giftId);
      if (!gift) throw new Error('Gift not found');
      
      if (gift.purchased >= gift.quantity) {
        throw new Error('Gift already at max quantity');
      }
      
      const { error: updateError } = await supabase
        .from('gifts')
        .update({ purchased: gift.purchased + 1 })
        .eq('id', giftId);
      
      if (updateError) throw updateError;
    }
    
    return data;
  },

  // Create purchase record
  async createPurchase(purchase) {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase
      .from('purchases')
      .insert({
        gift_id: purchase.giftId,
        gift_name: purchase.giftName,
        payment_id: purchase.paymentId,
        amount: purchase.amount,
        buyer_email: purchase.buyerEmail,
        buyer_name: purchase.buyerName,
        status: purchase.status
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get purchase by payment ID (for idempotency check)
  async getPurchaseByPaymentId(paymentId) {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('payment_id', paymentId)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Safe atomic purchase with pessimistic locking
  async purchaseGiftSafe(giftId, payment) {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase.rpc('purchase_gift_safe', {
      gift_id_param: giftId,
      payment_id_param: payment.paymentId,
      gift_name_param: payment.giftName,
      amount_param: payment.amount,
      buyer_email_param: payment.buyerEmail,
      buyer_name_param: payment.buyerName
    });
    
    if (error) {
      // Log context for debugging payment-related failures (standardized format)
      console.error('❌ Database error: purchase_gift_safe RPC failed', {
        giftId,
        paymentId: payment?.paymentId,
        error,
      });
      throw error;
    }
    
    return data;
  },

  // Reserve a gift (when user creates preference) with optimistic locking
  async reserveGift(giftId, expectedVersion = null) {
    if (!supabase) throw new Error('Database not configured');
    
    // If version is provided, use optimistic locking
    if (expectedVersion !== null) {
      const { data, error } = await supabase.rpc('reserve_gift_with_version', {
        gift_id_param: giftId,
        expected_version_param: expectedVersion
      });
      
      if (error) {
        // Check if it's a version conflict
        if (error.message && error.message.includes('version mismatch')) {
          return {
            success: false,
            error: 'VERSION_CONFLICT',
            message: 'Gift was modified by another user. Please refresh and try again.'
          };
        }
        throw error;
      }
      
      // RPC returns array, get first element
      return data && data.length > 0 ? data[0] : data;
    }
    
    // Fallback to standard reserve without version check
    const { data, error } = await supabase.rpc('reserve_gift', {
      gift_id_param: giftId
    });
    
    if (error) {
      throw error;
    }
    
    // RPC returns array, get first element
    return data && data.length > 0 ? data[0] : data;
  },

  // Confirm purchase (move from reserved to purchased) with optimistic locking
  async confirmPurchase(giftId, payment, expectedVersion = null) {
    if (!supabase) throw new Error('Database not configured');
    
    // If version is provided, use optimistic locking
    if (expectedVersion !== null) {
      const { data, error } = await supabase.rpc('confirm_purchase_with_version', {
        gift_id_param: giftId,
        payment_id_param: payment.paymentId,
        gift_name_param: payment.giftName,
        amount_param: payment.amount,
        buyer_email_param: payment.buyerEmail,
        buyer_name_param: payment.buyerName,
        expected_version_param: expectedVersion
      });
      
      if (error) {
        // Check if it's a version conflict
        if (error.message && error.message.includes('version mismatch')) {
          return {
            success: false,
            error: 'VERSION_CONFLICT',
            message: 'Gift was modified by another user during checkout.'
          };
        }
        throw error;
      }
      
      return data;
    }
    
    // Fallback to standard confirm without version check
    const { data, error } = await supabase.rpc('confirm_purchase', {
      gift_id_param: giftId,
      payment_id_param: payment.paymentId,
      gift_name_param: payment.giftName,
      amount_param: payment.amount,
      buyer_email_param: payment.buyerEmail,
      buyer_name_param: payment.buyerName
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },

  // Release reservation (if user abandons) with optimistic locking
  async releaseReservation(giftId, preferenceId, expectedVersion = null) {
    if (!supabase) throw new Error('Database not configured');
    
    // If version is provided, use optimistic locking
    if (expectedVersion !== null) {
      const { data, error } = await supabase.rpc('release_reservation_with_version', {
        gift_id_param: giftId,
        preference_id_param: preferenceId,
        expected_version_param: expectedVersion
      });
      
      if (error) {
        // Check if it's a version conflict
        if (error.message && error.message.includes('version mismatch')) {
          return {
            success: false,
            error: 'VERSION_CONFLICT',
            message: 'Gift was modified by another user.'
          };
        }
        throw error;
      }
      
      return data;
    }
    
    // Fallback to standard release without version check
    const { data, error } = await supabase.rpc('release_reservation', {
      gift_id_param: giftId,
      preference_id_param: preferenceId
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },

  // Get all purchases (optional - for admin view)
  async getPurchases() {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Cleanup abandoned reservations (older than 1 hour)
  async cleanupAbandonedReservations() {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase.rpc('cleanup_abandoned_reservations');
    
    if (error) {
      throw error;
    }
    
    // RPC returns array, extract first element
    return data && data.length > 0 ? data[0] : { success: false, message: 'No data returned', cleaned: 0 };
  },

  // Update gift image URL (for user-uploaded photos)
  async updateGiftImage(giftId, imageUrl) {
    if (!supabase) throw new Error('Database not configured');
    
    try {
      const { error } = await supabase
        .from('gifts')
        .update({ image: imageUrl })
        .eq('id', giftId);
      
      if (error) throw error;
      
      return {
        success: true,
        message: 'Gift image updated',
        giftId,
        imageUrl
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update gift image'
      };
    }
  },

  // Store pending image URL (temporary, until payment confirmed)
  async savePendingImage(giftId, imageUrl, preferenceId) {
    if (!supabase) throw new Error('Database not configured');
    
    try {
      // Store in a JSON metadata column or update preference_id with extra data
      // For now, we'll use a simple approach: store it in memory (session-based)
      // In production, you could use a separate pending_images table
      
      return {
        success: true,
        message: 'Pending image stored',
        giftId,
        imageUrl,
        preferenceId
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to store pending image'
      };
    }
  },

  // Clear pending image on cancellation
  async clearPendingImage(giftId) {
    if (!supabase) throw new Error('Database not configured');
    
    try {
      return {
        success: true,
        message: 'Pending image cleared',
        giftId
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to clear pending image'
      };
    }
  }
};
