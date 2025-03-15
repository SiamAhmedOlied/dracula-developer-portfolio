
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Award, BarChart3, ExternalLink, ChevronRight } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { educationService } from '@/lib/supabase/education-service';
import type { Education, Certificate, Skill } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const EducationSection = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch education data
        const educationResponse = await educationService.getEducation();
        if (educationResponse.success && educationResponse.data) {
          setEducation(educationResponse.data);
        } else {
          console.error('Failed to fetch education data:', educationResponse.error);
          setError('Failed to load education data');
        }
        
        // Fetch certificates data
        const certificatesResponse = await educationService.getCertificates();
        if (certificatesResponse.success && certificatesResponse.data) {
          setCertificates(certificatesResponse.data);
        } else {
          console.error('Failed to fetch certificates data:', certificatesResponse.error);
          setError('Failed to load certificates data');
        }
        
        // Fetch skills data
        const skillsResponse = await educationService.getSkills();
        if (skillsResponse.success && skillsResponse.data) {
          setSkills(skillsResponse.data);
        } else {
          console.error('Failed to fetch skills data:', skillsResponse.error);
          setError('Failed to load skills data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Education & Skills</h2>
        
        {error && (
          <div className="text-dracula-red text-center py-8">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Education Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-dracula-foreground flex items-center">
              <Award className="mr-2 text-dracula-green" size={24} />
              Education Timeline
            </h3>
            
            <div className="space-y-12 relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-2 bottom-10 w-0.5 bg-dracula-currentLine"></div>
              
              {loading ? (
                // Loading skeletons for education
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-dracula-background border-2 border-dracula-purple flex items-center justify-center">
                      <div className="w-3 h-3 bg-dracula-purple rounded-full"></div>
                    </div>
                    <div className="glass-card rounded-lg p-6">
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))
              ) : (
                education.map((edu, index) => (
                  <div 
                    key={edu.id}
                    className="relative pl-12 opacity-0 animate-fade-in-up group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Circle on timeline */}
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-dracula-background border-2 border-dracula-green flex items-center justify-center group-hover:border-dracula-cyan transition-colors">
                      <div className="w-3 h-3 bg-dracula-green rounded-full group-hover:bg-dracula-cyan transition-colors"></div>
                    </div>
                    
                    <div className="glass-card rounded-lg p-6 group hover:border-dracula-green hover:shadow-lg hover:shadow-dracula-green/10 transition-all duration-300 transform hover:-translate-y-1">
                      <h4 className="text-xl font-bold text-dracula-foreground mb-2 group-hover:text-dracula-green transition-colors">
                        {edu.degree}
                      </h4>
                      
                      <div className="flex flex-wrap items-center text-sm text-dracula-foreground/70 mb-3">
                        <span className="flex items-center mr-4 mb-2 group-hover:text-dracula-yellow transition-colors">
                          <Calendar size={14} className="mr-1 text-dracula-yellow" />
                          {edu.startDate} - {edu.endDate}
                        </span>
                        
                        <span className="flex items-center mb-2 group-hover:text-dracula-yellow transition-colors">
                          <MapPin size={14} className="mr-1 text-dracula-yellow" />
                          {edu.institution}, {edu.location}
                        </span>
                      </div>
                      
                      {edu.description && (
                        <p className="text-dracula-foreground/80 text-sm group-hover:text-dracula-foreground transition-colors">
                          {edu.description}
                        </p>
                      )}
                      
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                        <ChevronRight size={18} className="text-dracula-green animate-pulse-slow" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Certificates and Skills */}
          <div className="space-y-10">
            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-dracula-foreground flex items-center">
                <Award className="mr-2 text-dracula-purple" size={24} />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {loading ? (
                  // Loading skeletons for certificates
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="glass-card rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-dracula-purple/20 mr-4"></div>
                        <div className="flex-grow">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  certificates.map((cert, index) => (
                    <a
                      key={cert.id}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card rounded-lg p-4 flex items-center hover:border-dracula-purple/50 transition-all block opacity-0 animate-fade-in group transform hover:-translate-y-1 hover:shadow-lg hover:shadow-dracula-purple/10"
                      style={{ animationDelay: `${index * 100 + 200}ms` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-dracula-purple/20 flex items-center justify-center mr-4 group-hover:bg-dracula-purple/30 transition-colors">
                        <Award size={20} className="text-dracula-purple" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-dracula-foreground group-hover:text-dracula-purple transition-colors">
                          {cert.name}
                        </h4>
                        <div className="text-xs text-dracula-foreground/70 group-hover:text-dracula-foreground/90 transition-colors">
                          {cert.issuer} | {cert.date}
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-dracula-foreground/50 group-hover:text-dracula-purple transition-colors ml-2" />
                    </a>
                  ))
                )}
              </div>
            </div>
            
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-dracula-foreground flex items-center">
                <BarChart3 className="mr-2 text-dracula-cyan" size={24} />
                Skills
              </h3>
              
              {loading ? (
                <div className="glass-card rounded-lg p-6">
                  <div className="space-y-6">
                    {Array(3).fill(0).map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-4 w-24 mb-3" />
                        <div className="flex flex-wrap gap-2">
                          {Array(3).fill(0).map((_, i) => (
                            <Skeleton key={i} className="h-8 w-20 rounded-full" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-lg p-6 hover:border-dracula-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-dracula-cyan/10">
                  <div className="space-y-6">
                    {/* Languages */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-dracula-yellow mb-3">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter(skill => skill.category === 'language')
                          .map(skill => (
                            <HoverCard key={skill.id}>
                              <HoverCardTrigger asChild>
                                <span 
                                  className="px-3 py-1 rounded-full bg-dracula-currentLine/80 text-dracula-foreground text-sm hover:bg-dracula-yellow/20 hover:text-dracula-yellow transition-all cursor-pointer transform hover:scale-105"
                                >
                                  {skill.name}
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-48 bg-dracula-background border border-dracula-currentLine">
                                <div className="flex flex-col space-y-1">
                                  <p className="text-sm font-bold text-dracula-yellow">{skill.name}</p>
                                  <p className="text-xs capitalize">{skill.level}</p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          ))
                        }
                      </div>
                    </div>
                    
                    {/* Frameworks */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-dracula-green mb-3">Frameworks</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter(skill => skill.category === 'framework')
                          .map(skill => (
                            <HoverCard key={skill.id}>
                              <HoverCardTrigger asChild>
                                <span 
                                  className="px-3 py-1 rounded-full bg-dracula-currentLine/80 text-dracula-foreground text-sm hover:bg-dracula-green/20 hover:text-dracula-green transition-all cursor-pointer transform hover:scale-105"
                                >
                                  {skill.name}
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-48 bg-dracula-background border border-dracula-currentLine">
                                <div className="flex flex-col space-y-1">
                                  <p className="text-sm font-bold text-dracula-green">{skill.name}</p>
                                  <p className="text-xs capitalize">{skill.level}</p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          ))
                        }
                      </div>
                    </div>
                    
                    {/* Security Skills */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-dracula-pink mb-3">Security</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter(skill => skill.category === 'tool')
                          .map(skill => (
                            <HoverCard key={skill.id}>
                              <HoverCardTrigger asChild>
                                <span 
                                  className="px-3 py-1 rounded-full bg-dracula-currentLine/80 text-dracula-foreground text-sm hover:bg-dracula-pink/20 hover:text-dracula-pink transition-all cursor-pointer transform hover:scale-105"
                                >
                                  {skill.name}
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-48 bg-dracula-background border border-dracula-currentLine">
                                <div className="flex flex-col space-y-1">
                                  <p className="text-sm font-bold text-dracula-pink">{skill.name}</p>
                                  <p className="text-xs capitalize">{skill.level}</p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificates Section */}
      <div id="certificates" className="pt-20">
        {/* This is just an anchor for navigation */}
      </div>
    </section>
  );
};

export default EducationSection;
