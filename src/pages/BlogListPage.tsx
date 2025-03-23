
import React, { useEffect, useState } from 'react';
import { blogService } from '@/lib/supabase/blog-service';
import type { Blog } from '@/lib/types';
import { Calendar, Tag, Star, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from '@/components/ui/use-toast';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTags, setAllTags] = useState<string[]>([]);
  const { toast } = useToast();
  
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogs();
        
        if (response.success && response.data) {
          // Sort blogs by date (newest first)
          const sortedBlogs = [...response.data].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          
          setBlogs(sortedBlogs);
          setFilteredBlogs(sortedBlogs);
          
          // Extract unique tags
          const tags = sortedBlogs
            .flatMap(blog => blog.tags)
            .filter((tag, index, self) => self.indexOf(tag) === index);
          
          setAllTags(tags);
        } else {
          console.error('Failed to fetch blogs:', response.error);
          setError('Failed to load blog posts');
          toast({
            title: "Error",
            description: "Failed to load blog posts",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An error occurred while loading blog posts');
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

  useEffect(() => {
    // Filter blogs based on search term and selected tag
    let filtered = [...blogs];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        blog => 
          blog.title.toLowerCase().includes(search) || 
          blog.description.toLowerCase().includes(search) ||
          blog.content.toLowerCase().includes(search) ||
          blog.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }
    
    if (selectedTag) {
      filtered = filtered.filter(
        blog => blog.tags.includes(selectedTag)
      );
    }
    
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedTag, blogs]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dracula-background text-dracula-foreground pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Link 
                to="/#blog" 
                className="inline-flex items-center text-dracula-cyan hover:text-dracula-green mb-2 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-dracula-purple">Blog</h1>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-dracula-currentLine border-dracula-currentLine text-dracula-foreground placeholder:text-dracula-foreground/50 pr-10 w-full md:w-64"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dracula-foreground/50" size={16} />
              </div>
            </div>
          </div>
          
          {/* Tags filter */}
          {allTags.length > 0 && (
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    selectedTag === null
                      ? 'bg-dracula-purple text-white'
                      : 'bg-dracula-currentLine text-dracula-foreground/70 hover:bg-dracula-currentLine/80'
                  }`}
                >
                  All Posts
                </button>
                
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center whitespace-nowrap ${
                      selectedTag === tag
                        ? 'bg-dracula-cyan/30 text-dracula-cyan'
                        : 'bg-dracula-currentLine text-dracula-foreground/70 hover:bg-dracula-currentLine/80'
                    }`}
                  >
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
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
              {currentBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentBlogs.map((blog, index) => (
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
                              className={`text-xs px-2 py-1 rounded-full flex items-center ${
                                tag === selectedTag 
                                  ? 'bg-dracula-cyan/30 text-dracula-cyan' 
                                  : 'bg-dracula-currentLine text-dracula-cyan'
                              }`}
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
                  ))}
                </div>
              ) : (
                <div className="glass-card rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold mb-4 text-dracula-purple">No posts found</h3>
                  <p className="text-dracula-foreground/70 mb-6">
                    {searchTerm || selectedTag 
                      ? "Try adjusting your search or filter criteria." 
                      : "Check back later for new content."}
                  </p>
                  {(searchTerm || selectedTag) && (
                    <Button 
                      variant="outline" 
                      className="border-dracula-purple text-dracula-purple hover:bg-dracula-purple/10"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedTag(null);
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogListPage;
