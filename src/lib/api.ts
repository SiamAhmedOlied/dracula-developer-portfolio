
// Mock API service for handling backend functionality
// This can be replaced with a real API integration later

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

// Simulated database for storing messages
const mockDatabase: {
  messages: ContactFormData[];
} = {
  messages: []
};

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Contact form submission API
export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse<{ messageId: string }>> => {
  try {
    // Simulate API call delay
    await delay(1500);
    
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
    
    // Store the message in our mock database
    const messageId = `msg_${Date.now()}`;
    mockDatabase.messages.push(formData);
    
    console.log('Message stored in mock database:', mockDatabase.messages);
    
    return {
      success: true,
      data: { messageId }
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    };
  }
};
