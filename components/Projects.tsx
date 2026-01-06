import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionId, Project } from '../types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const MotionH2 = motion.h2;
const MotionDiv = motion.div;

interface ProjectsProps {
  id: SectionId;
}

// const projects: Project[] = [
//   {
//     id: 'grossy',
//     title: 'GROSSY',
//     description: 'Grossy – Full-stack Next.js + Stripe e-commerce store for organic groceries. Features dynamic cart, wishlist, Paystack/Stripe payments, and admin dashboard. Deployed on Vercel with Supabase backend.',
//     tech: ['Next.js', 'Stripe', 'Supabase'],
//     image: 'https://picsum.photos/id/1080/600/400',
//     liveUrl: 'https://example.com',
//     githubUrl: 'https://github.com',
//   },
//   {
//     id: 'tuf',
//     title: 'TUF GAMING',
//     description: 'TUF Gaming Hub – A responsive React + Node.js platform for ASUS TUF Gaming fans. Features live match tracking, custom profile builder, and community tournaments. Integrated Steam API and WebSocket leaderboards. 8k+ monthly users.',
//     tech: ['React', 'Node.js', 'Steam API'],
//     image: 'https://picsum.photos/id/1033/600/400',
//     liveUrl: 'https://google.com',
//     githubUrl: 'https://github.com',
//   },
//   {
//     id: 'tuf-2',
//     title: 'TUF GAMING',
//     description: 'TUF Gaming Hub – A responsive React + Node.js platform for ASUS TUF Gaming fans. Features live match tracking, custom profile builder, and community tournaments. Integrated Steam API and WebSocket leaderboards. 8k+ monthly users.',
//     tech: ['React', 'Node.js', 'Steam API'],
//     image: 'https://picsum.photos/id/1033/600/400',
//     liveUrl: 'https://google.com',
//     githubUrl: 'https://github.com',
//   }
// ];

const Projects: React.FC<ProjectsProps> = ({ id }) => {
  const getProjects = useQuery(api.projects.getProject);

  // Show loading state if data hasn't loaded yet
  // Show loading state if data hasn't loaded yet
  // Refactored to keep the root section stable for IntersectionObserver
  const isLoading = !getProjects;
  
  // Uncomment below if you want to automatically add a project on component mount
  // useEffect(() => {
  //   const createProject = async () => {
  //     await create({
  //       id: "grossy",
  //       title: "GROSSY",
  //       description:
  //         "Grossy – Full-stack Next.js + Stripe e-commerce store for organic groceries. Features dynamic cart, wishlist, Paystack/Stripe payments, and admin dashboard. Deployed on Vercel with Supabase backend.",
  //       tech: ["Next.js", "Stripe", "Supabase"],
  //       image: "https://picsum.photos/id/1080/600/400",
  //       liveUrl: "https://example.com",
  //       githubUrl: "https://github.com",
  //     });
  //   };
  //   createProject();
  // }, [create]);
  
  return (
    <section id={id} className="relative min-h-screen w-full bg-black py-24 2xl:py-48 flex items-center overflow-hidden">

      {/* Decorative Background Blob */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] 2xl:w-[900px] 2xl:h-[900px] bg-blue-800/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] 2xl:w-[800px] 2xl:h-[800px] bg-pink-900/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 2xl:px-24 relative z-10">
        <MotionH2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-4xl 2xl:text-6xl font-bold text-white mb-20 2xl:mb-32"
        >
          PROJECTS
        </MotionH2>

        <div className="relative">
          {/* The Line Connector - Visualized as a white border on the left with radius */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

          <div className="flex flex-col gap-24 md:gap-32 2xl:gap-56">
            {isLoading ? (
               <div className="text-white text-xl text-center">Loading projects...</div>
            ) : getProjects && getProjects.filter(project => project.isActive).length > 0 ? (
              getProjects.filter(project => project.isActive).map((project, index) => (
                <MotionDiv
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ margin: "-100px" }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 2xl:gap-24`}
                >
                  {/* Image Card */}
                  <div className="w-full md:w-1/2 group">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 aspect-video shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                      {/* Video on Hover */}
                      {project.video && (
                        <video
                          src={project.video}
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      )}
                      
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay for Tech Stack */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 2xl:p-10 z-20 pointer-events-none">
                        <span className="text-white font-mono text-sm 2xl:text-xl">{project.tech.join(' • ')}</span>
                      </div>
                    </div>
                  </a>
                  </div>
                  {/* Text Content */}
                  <div className="w-full md:w-1/2 space-y-4 2xl:space-y-8 relative">
                    {/* Dot for Timeline */}
                    {/* <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-6 2xl:h-6 bg-white rounded-full border-4 2xl:border-8 border-black z-20 ${index % 2 === 0 ? '-right-[3.25rem] 2xl:-right-[3.5rem]' : '-left-[3.25rem] 2xl:-left-[3.5rem]'}`} /> */}

                    {/* Project Type */}
                    {project.type && (
                      <span className="text-purple-500 font-mono text-sm 2xl:text-lg tracking-widest uppercase mb-2 block">
                        {project.type}
                      </span>
                    )}
                    <h3 className="text-2xl 2xl:text-4xl font-bold text-white uppercase tracking-wide">{project.title}</h3>
                    <p className="text-md 2xl:text-xl text-gray-400 leading-relaxed 2xl:leading-loose max-w-lg 2xl:max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex gap-4 pt-4 justify-center md:justify-start">
                      {project.liveUrl && (
                        <Button asChild className="gap-2 2xl:gap-3 px-4 py-2 2xl:px-8 2xl:py-6 text-base 2xl:text-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/50 hover:scale-105 transition-all rounded-full shadow-lg shadow-purple-500/30 border-none">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 2xl:w-6 2xl:h-6" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button asChild className="gap-2 2xl:gap-3 px-4 py-2 2xl:px-8 2xl:py-6 text-base 2xl:text-xl bg-[#24292e] text-white hover:bg-[#24292e]/90 hover:scale-105 transition-all rounded-full shadow-lg border border-white/10">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 2xl:w-6 2xl:h-6" />
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No active projects to display at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;