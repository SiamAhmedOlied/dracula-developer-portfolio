
import { supabase } from '@/integrations/supabase/client';
import type { ApiResponse } from '@/lib/api';
import type { Project } from '@/lib/types';
import { projects as fallbackProjects } from '@/lib/data';

// Fallback to local data when Supabase is not available
const getLocalProjects = (): Project[] => {
  return fallbackProjects;
};

export const projectService = {
  getProjects: async (): Promise<ApiResponse<Project[]>> => {
    try {
      console.log('Fetching projects from Supabase');
      
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local data
          const localProjects = getLocalProjects();
          console.log('Using local projects data as fallback');
          
          return {
            success: true,
            data: localProjects
          };
        }

        if (!data || data.length === 0) {
          console.log('No projects found in Supabase, using fallback data');
          // Fall back to local data
          const localProjects = getLocalProjects();
          
          return {
            success: true,
            data: localProjects
          };
        }

        // Transform the data to match the Project type
        const projects: Project[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          technologies: item.technologies, // This is already an array in Supabase
          featured: false, // Default value since it's not in the database
          githubUrl: item.github_url || null,
          demoUrl: item.live_url || null, // Map live_url to demoUrl
          role: null // Default value since it's not in the database
        }));

        console.log('Projects fetched successfully from Supabase:', projects);
        return {
          success: true,
          data: projects
        };
      } catch (supabaseError) {
        console.error('Error with Supabase:', supabaseError);
        // Fall back to local data
        const localProjects = getLocalProjects();
        console.log('Using local projects data as fallback due to error');
        
        return {
          success: true,
          data: localProjects
        };
      }
    } catch (error) {
      console.error('Error in getProjects:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
}; 
