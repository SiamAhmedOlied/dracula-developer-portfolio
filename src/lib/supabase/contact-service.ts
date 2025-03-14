
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export const contactService = {
  /**
   * Submit a new contact message to the Supabase database
   */
  async submitContactForm(formData: Omit<ContactMessage, 'id' | 'created_at'>): Promise<{
    success: boolean;
    data?: { messageId: string };
    error?: string;
  }> {
    try {
      // Validate email format
      if (!formData.email.includes('@')) {
        return {
          success: false,
          error: 'Please enter a valid email address.'
        };
      }
      
      // Validate message length
      if (formData.message.length < 10) {
        return {
          success: false,
          error: 'Your message must be at least 10 characters long.'
        };
      }

      // Insert the message into Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ])
        .select('id');

      if (error) {
        console.error('Error submitting to Supabase:', error);
        return {
          success: false,
          error: 'Failed to send message. Please try again later.'
        };
      }

      // Return success response with the message ID
      return {
        success: true,
        data: { messageId: data[0]?.id || 'unknown' }
      };
    } catch (error) {
      console.error('Unexpected error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  },

  /**
   * Get all contact messages (could be used in an admin panel)
   */
  async getContactMessages(): Promise<{
    success: boolean;
    data?: ContactMessage[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return {
        success: false,
        error: 'Failed to fetch contact messages'
      };
    }
  }
};
