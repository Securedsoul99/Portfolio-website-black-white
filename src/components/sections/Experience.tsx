import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, TrendingUp, Target, Shield } from "lucide-react";
import CollapsibleAchievements from "./CollapsibleAchievements";
import { experienceData } from "@/data/experience";

// Simple custom hook for intersection observer
import { useRef, useEffect, useState } from "react";

function useIntersectionObserver({
  threshold = 0.1,
  triggerOnce = true
}: { threshold?: number; triggerOnce?: boolean }) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { elementRef, isIntersecting };
}

const Experience = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const getMetricIcon = (label: string) => {
    if (label.includes("Threat") || label.includes("Reduction")) return <TrendingUp className="h-4 w-4" />;
    if (label.includes("Coverage") || label.includes("Protection")) return <Shield className="h-4 w-4" />;
    return <Target className="h-4 w-4" />;
  };

  return (
    <section 
      id="experience" 
      ref={elementRef}
      className="section-padding unified-section-bg"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-none tracking-tight transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Professional Experience
          </h2>
          <p className={`text-base md:text-lg text-white/70 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            4+ years of hands-on cybersecurity experience protecting enterprise infrastructures, 
            leading incident response, and implementing security solutions across diverse environments.
          </p>
        </div>
        
        <div className="timeline relative max-w-6xl mx-auto">
          {/* Enhanced Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 hidden md:block z-0">
            <svg width="100%" height="100%" aria-hidden="true">
              <defs>
                <linearGradient id="experience-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15ff67" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="url(#experience-gradient)"
                strokeWidth="6"
                strokeDasharray="20 15"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {experienceData.map((item, index) => (
            <div 
              key={index} 
              className={`timeline-item relative mb-16 md:mb-20 transition-all duration-700 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 300}ms` }}
            >
              {/* Enhanced Timeline Marker */}
              <div className="timeline-marker absolute left-1/2 -translate-x-1/2 top-8 w-6 h-6 rounded-full bg-gradient-to-r from-[#10ff67] to-[#00ff85] border-4 border-card z-10 shadow-lg hidden md:block animate-pulse" />
              
              {/* Timeline Content */}
              <div className="timeline-content">
                <Card className="unified-card transition-all duration-300 group hover:scale-[1.02] relative shadow-xl z-10">
                  <CardContent className="pt-6 md:pt-8 pb-6 md:pb-8 px-4 md:px-6">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                      <div className="flex-1">
                        {/* Job Title with Level Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{item.role}</h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 w-fit text-xs md:text-sm">
                            {item.level}
                          </Badge>
                        </div>
                        
                        {/* Company and Deployment */}
                        <div className="space-y-2">
                          <div className="text-base md:text-lg font-medium text-primary">
                            {item.company}
                            {item.deployment && (
                              <span className="text-white/60 font-normal"> • {item.deployment}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Date and Location Info */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:text-right">
                        <div className="flex items-center gap-2 text-white/80">
                          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <div className="font-medium">{item.date}</div>
                            <div className="text-sm text-white/60">({item.duration})</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <div className="font-medium text-sm md:text-base">{item.location}</div>
                            <div className="text-xs md:text-sm text-white/60">{item.type}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6 md:my-8 bg-white/10" />

                    {/* Impact Metrics Section */}
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center gap-2 mb-4 md:mb-6">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h4 className="text-lg md:text-xl font-semibold text-white">{item.impact.title}</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {item.impact.metrics.map((metric, i) => (
                          <div key={i} className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-3 md:p-4 hover:border-primary/40 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              {getMetricIcon(metric.label)}
                              <div className="text-xl md:text-2xl font-bold text-primary">{metric.value}</div>
                            </div>
                            <div className="text-xs md:text-sm font-medium text-white mb-1">{metric.label}</div>
                            <div className="text-xs text-white/60 leading-relaxed">{metric.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-6 md:my-8 bg-white/10" />

                    {/* Responsibilities Section with Collapsible */}
                    <div className="mb-6 md:mb-8">
                      <h4 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Key Responsibilities & Achievements
                      </h4>
                      <CollapsibleAchievements achievements={item.responsibilities} maxVisible={4} />
                    </div>

                    <Separator className="my-6 md:my-8 bg-white/10" />

                    {/* Technology Stack */}
                    <div className="mb-6">
                      <h4 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Security Technologies & Platforms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map(tech => (
                          <span
                            key={tech}
                            className="tech-tag inline-block border border-white bg-white text-black rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs font-semibold uppercase tracking-wide transition-all shadow hover:bg-gray-100 hover:scale-105 cursor-pointer"
                            style={{
                              letterSpacing: ".04em",
                              fontFamily: "Rajdhani, sans-serif",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Additional Information */}
                    {(item.certifications || item.keyProjects) && (
                      <>
                        <Separator className="my-6 bg-white/10" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {item.certifications && (
                            <div>
                              <h5 className="font-semibold text-white mb-2 text-sm md:text-base">Certifications</h5>
                              <ul className="text-sm text-white/80 space-y-1">
                                {item.certifications.map((cert, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30 text-xs">
                                      {cert}
                                    </Badge>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {item.keyProjects && (
                            <div>
                              <h5 className="font-semibold text-white mb-2 text-sm md:text-base">Key Projects</h5>
                              <ul className="text-sm text-white/80 space-y-1">
                                {item.keyProjects.map((project, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <span>{project}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;