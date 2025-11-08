import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not found. Database features will not work.');
}

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

  // Get all purchases (optional - for admin view)
  async getPurchases() {
    if (!supabase) throw new Error('Database not configured');
    
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
