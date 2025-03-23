
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
    featured: true,
    slug: "getting-started-with-react" // Add slug to fallback data
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    description: "Why TypeScript is essential for modern web development",
    content: "TypeScript adds static typing to JavaScript, enabling developers to catch errors early in the development process...",
    author: "Siam Ahmed Olied",
    date: "2024-01-20",
    tags: ["TypeScript", "JavaScript", "Development"],
    featured: false,
    slug: "understanding-typescript" // Add slug to fallback data
  },
  {
    id: 3,
    title: "Supabase vs Firebase",
    description: "Comparing two popular backend-as-a-service platforms",
    content: "Supabase and Firebase are both powerful backend-as-a-service (BaaS) platforms that provide developers with tools to build applications without managing server infrastructure...",
    author: "Siam Ahmed Olied",
    date: "2024-02-10",
    tags: ["Supabase", "Firebase", "Backend"],
    featured: true,
    slug: "supabase-vs-firebase" // Add slug to fallback data
  }
];

// Fallback to local data when Supabase is not available
const getLocalBlogs = (): Blog[] => {
  console.log('Using local blogs data');
  return fallbackBlogs;
};

export const blogService = {
  getBlogs: async (): Promise<ApiResponse<Blog[]>> => {
    try {
      console.log('Fetching blogs from Supabase');
      
      try {
        // Try to fetch from Supabase
        console.log('Attempting Supabase query');
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        console.log('Supabase query result:', { data, error });

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local data
          const localBlogs = getLocalBlogs();
          console.log('Using local blogs data as fallback due to error');
          
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
        console.log('Transforming Supabase data to Blog type');
        const blogs: Blog[] = data.map(item => ({
          id: item.id,
          title: item.title || 'Untitled',
          description: item.excerpt || item.title || 'No description',
          content: item.content || '',
          author: item.author || 'Unknown Author',
          date: item.published_at || new Date().toISOString(),
          image: item.image_url || undefined,
          tags: Array.isArray(item.tags) ? item.tags : [],
          featured: Boolean(item.is_published),
          slug: item.slug || `post-${item.id}`
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

  getBlogById: async (id: string): Promise<ApiResponse<Blog>> => {
    try {
      console.log(`Fetching blog with ID ${id} from Supabase`);
      
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local data
          const localBlog = fallbackBlogs.find(blog => blog.id.toString() === id.toString());
          
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
          const localBlog = fallbackBlogs.find(blog => blog.id.toString() === id.toString());
          
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
          title: data.title || 'Untitled',
          description: data.excerpt || data.title || 'No description',
          content: data.content || '',
          author: data.author || 'Unknown Author',
          date: data.published_at || new Date().toISOString(),
          image: data.image_url || undefined,
          tags: Array.isArray(data.tags) ? data.tags : [],
          featured: Boolean(data.is_published),
          slug: data.slug || `post-${data.id}`
        };

        console.log('Blog fetched successfully from Supabase:', blog);
        return {
          success: true,
          data: blog
        };
      } catch (supabaseError) {
        console.error('Error with Supabase:', supabaseError);
        // Fall back to local data
        const localBlog = fallbackBlogs.find(blog => blog.id.toString() === id.toString());
        
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
  },
  
  getBlogBySlug: async (slug: string): Promise<ApiResponse<Blog>> => {
    try {
      console.log(`Fetching blog with slug ${slug} from Supabase`);
      
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        console.log('Supabase getBlogBySlug result:', { data, error });

        if (error) {
          console.error('Supabase error:', error);
          // If there's an error with Supabase, fall back to local data
          const localBlog = fallbackBlogs.find(blog => blog.slug === slug);
          
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
          const localBlog = fallbackBlogs.find(blog => blog.slug === slug);
          
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
          title: data.title || 'Untitled',
          description: data.excerpt || data.title || 'No description',
          content: data.content || '',
          author: data.author || 'Unknown Author',
          date: data.published_at || new Date().toISOString(),
          image: data.image_url || undefined,
          tags: Array.isArray(data.tags) ? data.tags : [],
          featured: Boolean(data.is_published),
          slug: data.slug || `post-${data.id}`
        };

        console.log('Blog fetched successfully from Supabase:', blog);
        return {
          success: true,
          data: blog
        };
      } catch (supabaseError) {
        console.error('Error with Supabase:', supabaseError);
        // Fall back to local data
        const localBlog = fallbackBlogs.find(blog => blog.slug === slug);
        
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
      console.error('Error in getBlogBySlug:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
};
