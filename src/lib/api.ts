
import { contactService } from './supabase/contact-service';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Contact form submission API - now using Supabase
export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse<{ messageId: string }>> => {
  return contactService.submitContactForm(formData);
};
