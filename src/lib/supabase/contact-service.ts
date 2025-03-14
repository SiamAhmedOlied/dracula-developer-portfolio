import { supabase } from '@/integrations/supabase/client';
import type { ApiResponse } from '@/lib/api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Helper function to sanitize input
const sanitizeInput = (input: string): string => {
  // Basic sanitization - trim and escape special characters
  return input.trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Fallback storage when Supabase is not available
const saveToLocalStorage = (data: ContactFormData): string => {
  const id = `local-${Date.now()}`;
  const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
  messages.push({
    id,
    ...data,
    created_at: new Date().toISOString()
  });
  localStorage.setItem('contact_messages', JSON.stringify(messages));
  return id;
};

export const contactService = {
  submitContactForm: async (formData: ContactFormData): Promise<ApiResponse<{ messageId: string }>> => {
    try {
      console.log('Submitting contact form:', formData);
      
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message)
      };
      
      console.log('Sanitized data:', sanitizedData);
      
      try {
        // Try to insert into Supabase
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([sanitizedData])
          .select('id')
          .single();

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local storage
          const localId = saveToLocalStorage(sanitizedData);
          console.log('Saved to local storage with ID:', localId);
          
          return {
            success: true,
            data: { messageId: localId }
          };
        }

        if (!data) {
          console.error('No data returned from Supabase');
          // Fall back to local storage
          const localId = saveToLocalStorage(sanitizedData);
          console.log('Saved to local storage with ID:', localId);
          
          return {
            success: true,
            data: { messageId: localId }
          };
        }

        console.log('Message sent successfully to Supabase:', data);
        return {
          success: true,
          data: { messageId: data.id }
        };
      } catch (supabaseError) {
        console.error('Error with Supabase:', supabaseError);
        // Fall back to local storage
        const localId = saveToLocalStorage(sanitizedData);
        console.log('Saved to local storage with ID:', localId);
        
        return {
          success: true,
          data: { messageId: localId }
        };
      }
    } catch (error) {
      console.error('Error in submitContactForm:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
};
