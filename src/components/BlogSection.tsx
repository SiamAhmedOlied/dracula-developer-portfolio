
import React, { useEffect, useState } from 'react';
import { blogService } from '@/lib/supabase/blog-service';
import type { Blog } from '@/lib/types';
import { ExternalLink, Calendar, Tag, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useToast } from './ui/use-toast';

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogs();
        
        if (response.success && response.data) {
          // Get only the 3 most recent blogs for the homepage
          const sortedBlogs = [...response.data]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
          setBlogs(sortedBlogs);
        } else {
          console.error('Failed to fetch blogs:', response.error);
          setError('Failed to load blogs');
          toast({
            title: "Error",
            description: "Failed to load blog posts",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An error occurred while loading blogs');
        toast({
          title: "Error",
          description: "An error occurred while loading blog posts",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [toast]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Latest Blog Posts</h2>
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card rounded-lg overflow-hidden p-6">
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/4 mb-3" />
                <Skeleton className="h-16 w-full mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {error && !loading && (
          <div className="text-dracula-red text-center py-8 glass-card rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-dracula-red text-dracula-red hover:bg-dracula-red/10"
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length > 0 ? blogs.map((blog, index) => (
                <div 
                  key={blog.id}
                  className="glass-card rounded-lg overflow-hidden hover:border-dracula-green/50 group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {blog.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-dracula-foreground group-hover:text-dracula-cyan transition-colors">
                        {blog.title}
                      </h3>
                      {blog.featured && (
                        <div className="bg-dracula-currentLine p-1 rounded">
                          <Star size={16} className="text-dracula-yellow" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-3 text-sm text-dracula-foreground/70">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                    
                    <p className="text-dracula-foreground/70 mb-4 text-sm">
                      {blog.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-1 rounded-full bg-dracula-currentLine text-dracula-cyan flex items-center"
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Link 
                        to={`/blog/${blog.id}`}
                        className="text-sm px-3 py-1 bg-dracula-purple/20 hover:bg-dracula-purple/40 text-dracula-purple rounded transition-colors flex items-center"
                      >
                        Read More
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-dracula-foreground/70">No blog posts found.</p>
                </div>
              )}
            </div>
            
            {blogs.length > 0 && (
              <div className="flex justify-center mt-10">
                <Link to="/blog">
                  <Button variant="outline" className="border-dracula-purple text-dracula-purple hover:bg-dracula-purple/10">
                    View All Posts
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
