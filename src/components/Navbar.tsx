
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Tools', href: '#tools' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);

      // Determine active section based on scroll position
      const sections = navLinks
        .filter(link => link.href.startsWith('#'))
        .map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    if (href.startsWith('#')) {
      return activeSection === href.substring(1);
    }
    return window.location.pathname === href;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      // If we're not on the home page and trying to navigate to an anchor
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/' + href);
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 lg:px-24',
        scrolled 
          ? 'bg-dracula-background/90 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      )}
    >
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-dracula-green font-space text-xl font-bold">
          Siam Ahmed Olied
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.href.startsWith('#') ? (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'nav-link',
                  isActiveLink(link.href) && 'active-nav-link'
                )}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'nav-link',
                  isActiveLink(link.href) && 'active-nav-link'
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-dracula-foreground hover:text-dracula-cyan transition-colors"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-dracula-background/95 backdrop-blur-sm z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-dracula-foreground hover:text-dracula-cyan text-2xl transition-colors"
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-dracula-foreground hover:text-dracula-cyan text-2xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
