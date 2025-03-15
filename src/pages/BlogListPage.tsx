
import React from 'react';
import Navbar from '@/components/Navbar';
import BlogSection from '@/components/BlogSection';

const BlogListPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dracula-background text-dracula-foreground pt-24 pb-12">
        <BlogSection />
      </div>
    </>
  );
};

export default BlogListPage;
