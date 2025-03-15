
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '@/lib/supabase/blog-service';
import type { Blog } from '@/lib/types';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        navigate('/404');
        return;
      }

      try {
        setLoading(true);
        
        const response = await blogService.getBlogById(id);
        
        if (response.success && response.data) {
          setBlog(response.data);
        } else {
          console.error('Failed to fetch blog:', response.error);
          setError('Failed to load blog');
          if (response.error === 'Blog not found') {
            navigate('/404');
          }
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('An error occurred while loading the blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dracula-background text-dracula-foreground pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-dracula-cyan hover:text-dracula-green mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blogs
          </Link>
          
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dracula-purple"></div>
            </div>
          )}
          
          {error && !loading && (
            <div className="text-dracula-red text-center py-8">
              {error}
            </div>
          )}
          
          {blog && !loading && (
            <article className="glass-card p-6 md:p-8 rounded-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-dracula-purple mb-4">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-dracula-foreground/70">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  <span>{blog.author}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDate(blog.date)}</span>
                </div>
              </div>
              
              {blog.image && (
                <div className="mb-6">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
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
              
              <div className="prose prose-invert prose-dracula max-w-none">
                {/* Render content as markdown or HTML if needed */}
                <p className="text-dracula-foreground/90 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </p>
              </div>
            </article>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
