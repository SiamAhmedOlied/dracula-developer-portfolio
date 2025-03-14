
import React from 'react';
import { tools, getToolIcon } from '@/lib/data';
import { Wrench } from 'lucide-react';

const ToolsSection = () => {
  return (
    <section id="tools" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">My Security Arsenal</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = getToolIcon(tool.icon);
            
            return (
              <div 
                key={tool.id}
                className="group opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center hover:border-dracula-cyan/50 transition-all h-full">
                  <div className="w-16 h-16 rounded-full bg-dracula-currentLine flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent 
                      size={32} 
                      className="text-dracula-foreground group-hover:text-dracula-cyan transition-colors duration-300" 
                    />
                  </div>
                  
                  <h3 className="font-bold text-dracula-foreground group-hover:text-dracula-cyan transition-colors">
                    {tool.name}
                  </h3>
                  
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tool.category === 'security' 
                        ? 'bg-dracula-red/20 text-dracula-red' 
                        : 'bg-dracula-green/20 text-dracula-green'
                    }`}>
                      {tool.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
