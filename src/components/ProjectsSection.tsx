import React, { useEffect, useState } from 'react';
import { projects as fallbackProjects } from '@/lib/data';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projectService } from '@/lib/supabase/project-service';
import type { Project } from '@/lib/types';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.getProjects();
        
        if (response.success && response.data) {
          const sortedProjects = [...response.data].sort((a, b) => 
            a.title.localeCompare(b.title)
          );
          setProjects(sortedProjects);
        } else {
          console.error('Failed to fetch projects:', response.error);
          setError('Failed to load projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('An error occurred while loading projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Projects</h2>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dracula-purple"></div>
          </div>
        )}
        
        {error && (
          <div className="text-dracula-red text-center py-8">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="glass-card rounded-lg overflow-hidden hover:border-dracula-green/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-dracula-foreground group-hover:text-dracula-cyan transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <div className="bg-dracula-currentLine p-1 rounded">
                        <Star size={16} className="text-dracula-yellow" />
                      </div>
                    )}
                  </div>
                  
                  {project.role && (
                    <div className="mb-3">
                      <span className="text-sm px-2 py-1 rounded bg-dracula-currentLine text-dracula-pink">
                        {project.role}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-dracula-foreground/70 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded-full bg-dracula-currentLine text-dracula-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-dracula-foreground hover:text-dracula-green transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-dracula-foreground hover:text-dracula-green transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
