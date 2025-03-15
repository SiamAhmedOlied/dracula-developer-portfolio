
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define valid paths in your application
const validPaths = [
  '/',
  '/#projects',
  '/#education',
  '/#tools',
  '/#blog',
  '/#contact',
  '/blog',
  '/blog/'
];

export const useUrlFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.hash;
    
    // Check if the current path is valid
    if (!validPaths.includes(currentPath)) {
      // If it starts with /blog/, it's a blog post page, so it's valid
      if (location.pathname.startsWith('/blog/')) {
        return;
      }
      
      // If we're on a valid base path but with an anchor, it's okay
      // This allows navigation to anchors from other pages
      if (location.hash && validPaths.includes(location.pathname)) {
        return;
      }
      
      // If we're trying to access an anchor that only exists on the home page,
      // redirect to the home page with that anchor
      if (location.hash && ['/blog', '/blog/'].includes(location.pathname)) {
        const homeAnchors = ['#projects', '#education', '#tools', '#blog', '#contact'];
        if (homeAnchors.includes(location.hash)) {
          navigate('/' + location.hash);
          return;
        }
      }
      
      // Redirect to 404 page
      navigate('/404');
    }
  }, [location, navigate]);
};
