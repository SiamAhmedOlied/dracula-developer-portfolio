import React, { useEffect, useState } from 'react';
import { fallbackBlogs } from '@/lib/data';
import { ExternalLink, Calendar, Tag, Star } from 'lucide-react';
import { blogService } from '@/lib/supabase/blog-service';
import type { Blog } from '@/lib/types';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogs();
        
        if (response.success && response.data) {
          const sortedBlogs = [...response.data].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setBlogs(sortedBlogs);
        } else {
          console.error('Failed to fetch blogs:', response.error);
          setError('Failed to load blogs');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An error occurred while loading blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="blogs" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Blog</h2>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dracula-purple"></div>
          </div>
        )}
        
        {error && (
          <div className="text-dracula-red text-center py-8">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div 
                key={blog.id}
                className="glass-card rounded-lg overflow-hidden hover:border-dracula-green/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
                      className="text-sm px-3 py-1 bg-dracula-purple/20 hover:bg-dracula-purple/40 text-dracula-purple rounded transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection; 