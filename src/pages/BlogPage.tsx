
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '@/lib/supabase/blog-service';
import type { Blog } from '@/lib/types';
import { ArrowLeft, Calendar, Tag, User, ArrowRight, MessageSquare, Share, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import DOMPurify from 'dompurify';
import { useToast } from '@/components/ui/use-toast';

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
          
          // Fetch related posts with similar tags
          const allBlogsResponse = await blogService.getBlogs();
          if (allBlogsResponse.success && allBlogsResponse.data) {
            const allBlogs = allBlogsResponse.data;
            
            // Filter out the current blog and find ones with similar tags
            const related = allBlogs
              .filter(b => b.id !== id)
              .filter(b => b.tags.some(tag => response.data.tags.includes(tag)))
              .sort((a, b) => {
                // Sort by the number of matching tags
                const aMatchCount = a.tags.filter(tag => response.data.tags.includes(tag)).length;
                const bMatchCount = b.tags.filter(tag => response.data.tags.includes(tag)).length;
                return bMatchCount - aMatchCount;
              })
              .slice(0, 3);
            
            setRelatedPosts(related);
          }
        } else {
          console.error('Failed to fetch blog:', response.error);
          setError('Failed to load blog post');
          if (response.error === 'Blog not found') {
            navigate('/404');
          }
          toast({
            title: "Error",
            description: "Failed to load blog post",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('An error occurred while loading the blog post');
        toast({
          title: "Error",
          description: "An error occurred while loading the blog post",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, navigate, toast]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Add this function for sanitizing HTML content
  const createMarkup = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return { __html: sanitizedContent };
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || 'Blog post',
        text: blog?.description || 'Check out this blog post',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Blog post link copied to clipboard",
      });
    }
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
            <div className="glass-card p-6 md:p-8 rounded-lg">
              <Skeleton className="h-10 w-3/4 mb-6" />
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-64 w-full mb-6" />
              <div className="space-y-4 mb-6">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <div className="flex gap-2 mb-6">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          )}
          
          {error && !loading && (
            <div className="glass-card p-6 md:p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-dracula-red">Something went wrong</h3>
              <p className="mb-6">{error}</p>
              <Button 
                variant="outline" 
                className="border-dracula-red text-dracula-red hover:bg-dracula-red/10"
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            </div>
          )}
          
          {blog && !loading && (
            <>
              <article className="glass-card p-6 md:p-8 rounded-lg mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-dracula-purple mb-4">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-dracula-foreground/70">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <User size={14} className="mr-1" />
                        <span>{blog.author}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-60 bg-dracula-background border border-dracula-currentLine">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm text-dracula-foreground">
                          Author: <span className="font-bold">{blog.author}</span>
                        </p>
                        <p className="text-xs text-dracula-foreground/70">
                          Expert in cybersecurity and software development.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                </div>
                
                {blog.image && (
                  <div className="mb-6 group relative overflow-hidden rounded-lg">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-dracula-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-dracula-background/80 p-2 rounded">
                        <span className="text-dracula-cyan font-medium text-sm">Featured Image</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, i) => (
                    <Link 
                      key={i}
                      to={`/blog?tag=${tag}`}
                      className="text-xs px-2 py-1 rounded-full bg-dracula-currentLine text-dracula-cyan flex items-center hover:bg-dracula-cyan/20 transition-colors"
                    >
                      <Tag size={10} className="mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
                
                <div 
                  className="prose prose-invert prose-dracula max-w-none allow-select mb-8"
                  dangerouslySetInnerHTML={createMarkup(blog.content)}
                />
                
                <div className="border-t border-dracula-currentLine pt-6 mt-8 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className="text-dracula-cyan hover:text-dracula-green hover:bg-dracula-currentLine/50"
                    onClick={handleShare}
                  >
                    <Share size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
              </article>
              
              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 text-dracula-foreground">Related Posts</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((post) => (
                      <Link 
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="glass-card p-4 rounded-lg hover:border-dracula-cyan/50 transition-colors group"
                      >
                        {post.image && (
                          <div className="h-32 mb-3 overflow-hidden rounded-md">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                          </div>
                        )}
                        
                        <h4 className="font-bold text-dracula-foreground group-hover:text-dracula-cyan transition-colors mb-2">
                          {post.title}
                        </h4>
                        
                        <div className="flex items-center text-xs text-dracula-foreground/70 mb-3">
                          <Calendar size={12} className="mr-1" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        
                        <div className="flex mt-2 justify-end">
                          <span className="text-xs text-dracula-purple flex items-center">
                            Read Article
                            <ArrowRight size={12} className="ml-1" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
