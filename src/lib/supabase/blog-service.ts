import { supabase } from '@/integrations/supabase/client';
import type { ApiResponse } from '@/lib/api';
import type { Blog } from '@/lib/types';

// Fallback blog data when Supabase is not available
const fallbackBlogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "A beginner's guide to React development",
    content: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently...",
    author: "Siam Ahmed Olied",
    date: "2023-12-15",
    tags: ["React", "JavaScript", "Frontend"],
    featured: true
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    description: "Why TypeScript is essential for modern web development",
    content: "TypeScript adds static typing to JavaScript, enabling developers to catch errors early in the development process...",
    author: "Siam Ahmed Olied",
    date: "2024-01-20",
    tags: ["TypeScript", "JavaScript", "Development"],
    featured: false
  },
  {
    id: 3,
    title: "Supabase vs Firebase",
    description: "Comparing two popular backend-as-a-service platforms",
    content: "Supabase and Firebase are both powerful backend-as-a-service (BaaS) platforms that provide developers with tools to build applications without managing server infrastructure...",
    author: "Siam Ahmed Olied",
    date: "2024-02-10",
    tags: ["Supabase", "Firebase", "Backend"],
    featured: true
  }
];

// Fallback to local data when Supabase is not available
const getLocalBlogs = (): Blog[] => {
  return fallbackBlogs;
};

export const blogService = {
  getBlogs: async (): Promise<ApiResponse<Blog[]>> => {
    try {
      console.log('Fetching blogs from Supabase');
      
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local data
          const localBlogs = getLocalBlogs();
          console.log('Using local blogs data as fallback');
          
          return {
            success: true,
            data: localBlogs
          };
        }

        if (!data || data.length === 0) {
          console.log('No blogs found in Supabase, using fallback data');
          // Fall back to local data
          const localBlogs = getLocalBlogs();
          
          return {
            success: true,
            data: localBlogs
          };
        }

        // Transform the data to match the Blog type
        const blogs: Blog[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          content: item.content,
          author: item.author,
          date: item.date,
          image: item.image || undefined,
          tags: Array.isArray(item.tags) 
            ? item.tags 
            : (typeof item.tags === 'string' ? item.tags.split(',') : []),
          featured: item.featured || false
        }));

        console.log('Blogs fetched successfully from Supabase:', blogs);
        return {
          success: true,
          data: blogs
        };
      } catch (supabaseError) {
        console.error('Error with Supabase:', supabaseError);
        // Fall back to local data
        const localBlogs = getLocalBlogs();
        console.log('Using local blogs data as fallback due to error');
        
        return {
          success: true,
          data: localBlogs
        };
      }
    } catch (error) {
      console.error('Error in getBlogs:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  },

  getBlogById: async (id: number): Promise<ApiResponse<Blog>> => {
    try {
      console.log(`Fetching blog with ID ${id} from Supabase`);
      
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local data
          const localBlog = fallbackBlogs.find(blog => blog.id === id);
          
          if (!localBlog) {
            return {
              success: false,
              error: 'Blog not found'
            };
          }
          
          console.log('Using local blog data as fallback');
          return {
            success: true,
            data: localBlog
          };
        }

        if (!data) {
          console.log('Blog not found in Supabase, checking fallback data');
          // Check if blog exists in fallback data
          const localBlog = fallbackBlogs.find(blog => blog.id === id);
          
          if (!localBlog) {
            return {
              success: false,
              error: 'Blog not found'
            };
          }
          
          return {
            success: true,
            data: localBlog
          };
        }

        // Transform the data to match the Blog type
        const blog: Blog = {
          id: data.id,
          title: data.title,
          description: data.description,
          content: data.content,
          author: data.author,
          date: data.date,
          image: data.image || undefined,
          tags: Array.isArray(data.tags) 
            ? data.tags 
            : (typeof data.tags === 'string' ? data.tags.split(',') : []),
          featured: data.featured || false
        };

        console.log('Blog fetched successfully from Supabase:', blog);
        return {
          success: true,
          data: blog
        };
      } catch (supabaseError) {
        console.error('Error with Supabase:', supabaseError);
        // Fall back to local data
        const localBlog = fallbackBlogs.find(blog => blog.id === id);
        
        if (!localBlog) {
          return {
            success: false,
            error: 'Blog not found'
          };
        }
        
        console.log('Using local blog data as fallback due to error');
        return {
          success: true,
          data: localBlog
        };
      }
    } catch (error) {
      console.error('Error in getBlogById:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
}; 