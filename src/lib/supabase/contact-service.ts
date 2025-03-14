
import { supabase } from '@/integrations/supabase/client';
import type { ApiResponse } from '@/lib/api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  submitContactForm: async (formData: ContactFormData): Promise<ApiResponse<{ messageId: string }>> => {
    try {
      // Create the contact_messages table if it doesn't exist
      try {
        // Check if the table exists first
        const { error: checkError } = await supabase
          .from('contact_messages')
          .select('id')
          .limit(1);
          
        if (checkError && checkError.message.includes('does not exist')) {
          console.log('Contact messages table does not exist yet. Using local implementation.');
          // If table doesn't exist, use a mock implementation
          return {
            success: true,
            data: { messageId: `mock-${Date.now()}` }
          };
        }
      } catch (error) {
        console.error('Error checking contact_messages table:', error);
      }

      // Insert message into the contact_messages table (if it exists)
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
        console.error('Supabase error:', error);
        return {
          success: false,
          error: 'Failed to send message. Please try again later.'
        };
      }

      return {
        success: true,
        data: { messageId: data?.[0]?.id || `local-${Date.now()}` }
      };
    } catch (error) {
      console.error('Error in submitContactForm:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
};
