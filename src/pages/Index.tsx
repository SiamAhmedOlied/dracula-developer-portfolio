
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ToolsSection from '@/components/ToolsSection';
import ContactSection from '@/components/ContactSection';
import { ArrowUp, Download } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        <ProjectsSection />
        <EducationSection />
        <ToolsSection />
        <ContactSection />
      </main>
      
      <footer className="py-8 px-6 md:px-12 lg:px-24 text-center border-t border-dracula-currentLine bg-dracula-background/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-dracula-foreground/70">
            © {new Date().getFullYear()} Siam Ahmed Olied. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Floating Resume Button */}
      <a 
        href="/resume.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-20 md:right-8 md:bottom-24 p-3 rounded-full bg-dracula-background border border-dracula-green hover:bg-dracula-currentLine transition-colors text-dracula-green shadow-lg shadow-black/20 z-40"
        aria-label="Download Resume"
      >
        <Download size={20} />
      </a>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 md:right-8 md:bottom-8 p-3 rounded-full bg-dracula-background border border-dracula-cyan hover:bg-dracula-currentLine transition-colors text-dracula-cyan shadow-lg shadow-black/20 z-40 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Index;
