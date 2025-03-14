import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dracula-background text-dracula-foreground p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl glass-card p-8 rounded-lg"
      >
        <h1 className="text-8xl font-bold text-dracula-pink mb-4">404</h1>
        <div className="mb-6">
          <h2 className="text-3xl font-space font-bold mb-2">Page Not Found</h2>
          <p className="text-dracula-comment text-lg">
            The page you're looking for has vanished into the darkness.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link 
            to="/" 
            className="px-6 py-3 bg-dracula-purple hover:bg-dracula-purple/80 text-white rounded-md transition-colors duration-300"
          >
            Return Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-3 bg-dracula-currentLine hover:bg-dracula-comment/30 rounded-md transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-12 text-dracula-cyan">
          <code className="font-fira text-sm">
            // Error: Page not in the DOM
          </code>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
