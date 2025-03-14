import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define valid paths in your application
const validPaths = [
  '/',
  '/#projects',
  '/#education',
  '/#tools',
  '/#contact'
];

export const useUrlFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.hash;
    
    // Check if the current path is valid
    if (!validPaths.includes(currentPath)) {
      // Redirect to 404 page
      navigate('/404');
    }
  }, [location, navigate]);
}; 