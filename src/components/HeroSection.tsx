import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, FileText, Terminal } from 'lucide-react';
import { socialLinks } from '@/lib/data';

const HeroSection = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const typeText = async () => {
      if (!terminalRef.current) return;
      
      const lines = [
        '$ whoami --security',
        'Siam Ahmed Olied',
        'Developer & Security Specialist',
        '',
        '$ cat about.txt',
        'Building secure systems with precision.',
        'Specializing in web development and cybersecurity.',
        '',
        '$ ls skills/',
        'python   javascript   react   penetration-testing   network-security'
      ];
      
      const terminal = terminalRef.current;
      terminal.textContent = '';
      
      for (const line of lines) {
        const p = document.createElement('p');
        terminal.appendChild(p);
        
        if (line.startsWith('$')) {
          p.className = 'text-dracula-green';
        } else if (line === 'Siam Ahmed Olied') {
          p.className = 'text-dracula-purple font-bold';
        } else if (line === 'Developer & Security Specialist') {
          p.className = 'text-dracula-pink italic';
        } else if (line.startsWith('python') || line.startsWith('ls')) {
          p.className = 'text-dracula-yellow';
        }
        
        // Type each character with a delay
        for (let i = 0; i < line.length; i++) {
          setTimeout(() => {
            p.textContent = line.substring(0, i + 1);
          }, i * 30);
          
          // Wait for typing to complete
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Add delay between lines
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    };
    
    typeText();
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-20 section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:order-1 order-2">
          <div className="space-y-4 opacity-0 animate-fade-in-up animate-delay-100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-gradient">Developer &</span><br />
              <span className="text-gradient">Security Specialist</span>
            </h1>
            <p className="text-xl md:text-2xl text-dracula-foreground/80 italic">
              Building secure systems with precision.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 opacity-0 animate-fade-in-up animate-delay-300">
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-dracula-currentLine/50 hover:bg-dracula-currentLine transition-colors text-dracula-foreground hover:text-dracula-cyan"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-dracula-currentLine/50 hover:bg-dracula-currentLine transition-colors text-dracula-foreground hover:text-dracula-cyan"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-dracula-currentLine/50 hover:bg-dracula-currentLine transition-colors text-dracula-foreground hover:text-dracula-cyan"
              aria-label="Resume"
            >
              <FileText size={20} />
            </a>
          </div>
          
          <div className="opacity-0 animate-fade-in-up animate-delay-500">
            <a 
              href="#projects"
              className="inline-block px-8 py-3 bg-gradient-to-r from-dracula-green/80 to-dracula-green hover:from-dracula-green hover:to-dracula-green/80 text-dracula-background font-medium rounded transition-all duration-300 hover:shadow-lg hover:shadow-dracula-green/20"
            >
              View My Work
            </a>
          </div>
        </div>
        
        <div className="md:order-2 order-1 opacity-0 animate-fade-in-up animate-delay-200">
          <div className="glass-card rounded-lg p-4 font-fira text-sm max-h-[400px] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Terminal size={16} className="text-dracula-green" />
                <span className="text-dracula-foreground/90">terminal</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-dracula-red rounded-full"></div>
                <div className="w-3 h-3 bg-dracula-yellow rounded-full"></div>
                <div className="w-3 h-3 bg-dracula-green rounded-full"></div>
              </div>
            </div>
            <div ref={terminalRef} className="space-y-1">
              {/* Terminal content will be typed here */}
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-dracula-green mr-2">$</span>
              <div className="w-2 h-4 bg-dracula-cyan/70 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-dracula-green/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-dracula-purple/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
