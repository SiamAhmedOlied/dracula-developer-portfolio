
import React, { useState } from 'react';
import { Github, Linkedin, Mail, Key, Send } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { submitContactForm } from '@/lib/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to our API service
      const response = await submitContactForm(formData);
      
      if (response.success) {
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
        
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          variant: "default",
        });
      } else {
        // Display error message
        toast({
          title: "Failed to send message",
          description: response.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "An error occurred",
        description: "Unable to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="opacity-0 animate-fade-in-up">
            <div className="glass-card rounded-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-dracula-foreground">Let's Connect</h3>
              
              <p className="text-dracula-foreground/80 mb-8">
                I'm currently open to new opportunities and collaborations. Feel free to reach out!
              </p>
              
              <div className="space-y-6">
                <a 
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center text-dracula-foreground hover:text-dracula-cyan transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-dracula-currentLine flex items-center justify-center mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-dracula-foreground/70">Email</div>
                    <div className="font-medium">{socialLinks.email}</div>
                  </div>
                </a>
                
                <a 
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-dracula-foreground hover:text-dracula-cyan transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-dracula-currentLine flex items-center justify-center mr-4">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-dracula-foreground/70">GitHub</div>
                    <div className="font-medium">github.com/SiamAhmedOlied</div>
                  </div>
                </a>
                
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-dracula-foreground hover:text-dracula-cyan transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-dracula-currentLine flex items-center justify-center mr-4">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-dracula-foreground/70">LinkedIn</div>
                    <div className="font-medium">linkedin.com/in/programmersiamolied/</div>
                  </div>
                </a>
                
                {socialLinks.pgpKey && (
                  <a 
                    href={socialLinks.pgpKey}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-dracula-foreground hover:text-dracula-cyan transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-dracula-currentLine flex items-center justify-center mr-4">
                      <Key size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-dracula-foreground/70">PGP Key</div>
                      <div className="font-medium">Secure Communication</div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="opacity-0 animate-fade-in-up animate-delay-200">
            <div className="glass-card rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-dracula-foreground">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dracula-foreground/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-dracula-currentLine/50 border ${errors.name ? 'border-dracula-red' : 'border-dracula-currentLine'} rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-cyan/50 focus:border-transparent text-dracula-foreground placeholder-dracula-foreground/50`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-dracula-red mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dracula-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-dracula-currentLine/50 border ${errors.email ? 'border-dracula-red' : 'border-dracula-currentLine'} rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-cyan/50 focus:border-transparent text-dracula-foreground placeholder-dracula-foreground/50`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-dracula-red mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dracula-foreground/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 bg-dracula-currentLine/50 border ${errors.message ? 'border-dracula-red' : 'border-dracula-currentLine'} rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-cyan/50 focus:border-transparent text-dracula-foreground placeholder-dracula-foreground/50 resize-none`}
                    placeholder="Your message..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-sm text-dracula-red mt-1">{errors.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-dracula-cyan to-dracula-cyan/80 hover:from-dracula-cyan/80 hover:to-dracula-cyan text-dracula-background font-medium rounded transition-all duration-300 hover:shadow-lg hover:shadow-dracula-cyan/20 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-dracula-background border-t-transparent rounded-full"></div>
                  ) : (
                    <Send size={18} className="mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
