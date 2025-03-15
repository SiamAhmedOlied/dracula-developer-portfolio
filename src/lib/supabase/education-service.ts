
import { supabase } from '@/integrations/supabase/client';
import type { Education, Certificate, Skill } from '@/lib/types';
import { ApiResponse } from '@/lib/api';

export const educationService = {
  // Fetch all education entries
  getEducation: async (): Promise<ApiResponse<Education[]>> => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Error fetching education:', error);
        return { success: false, error: error.message };
      }

      const formattedEducation: Education[] = data.map(item => ({
        id: item.id,
        degree: item.degree,
        institution: item.institution,
        location: item.location,
        startDate: item.start_date,
        endDate: item.end_date,
        description: item.description || undefined
      }));

      return { success: true, data: formattedEducation };
    } catch (err) {
      console.error('Exception fetching education:', err);
      return { success: false, error: 'Failed to fetch education data' };
    }
  },

  // Fetch all certificates
  getCertificates: async (): Promise<ApiResponse<Certificate[]>> => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching certificates:', error);
        return { success: false, error: error.message };
      }

      const formattedCertificates: Certificate[] = data.map(item => ({
        id: item.id,
        name: item.name,
        issuer: item.issuer,
        date: item.date,
        url: item.url || undefined
      }));

      return { success: true, data: formattedCertificates };
    } catch (err) {
      console.error('Exception fetching certificates:', err);
      return { success: false, error: 'Failed to fetch certificate data' };
    }
  },

  // Fetch all skills
  getSkills: async (): Promise<ApiResponse<Skill[]>> => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
        return { success: false, error: error.message };
      }

      const formattedSkills: Skill[] = data.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as 'language' | 'framework' | 'tool' | 'soft',
        level: item.level as 'beginner' | 'intermediate' | 'advanced' | 'expert'
      }));

      return { success: true, data: formattedSkills };
    } catch (err) {
      console.error('Exception fetching skills:', err);
      return { success: false, error: 'Failed to fetch skill data' };
    }
  }
};
