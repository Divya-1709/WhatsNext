import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Target, Lightbulb, TrendingUp } from "lucide-react";

const FeaturedProject = ({ project, reverse }) => {
  return (
    <section id={`project-${project.id}`} className="relative py-20">
      <motion.div 
        className="w-full bg-white rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-700 flex flex-col lg:flex-row group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Mockup / Image Area */}
        <div className={`w-full lg:w-1/2 relative overflow-hidden ${reverse ? 'lg:order-last' : ''}`}>
          <div className="absolute inset-0 bg-navy-950/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-[400px] lg:h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] relative z-20"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200";
            }}
          />
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative z-20">
          
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
              {project.category}
            </span>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="text-gray-500 font-medium text-sm">{project.client}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-navy-950 font-heading mb-6 leading-tight tracking-tight">
            {project.title}
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {project.overview}
          </p>

          {/* Case Study Mini Grid */}
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            {project.challenge && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-navy-950 font-bold">
                  <Target size={20} className="text-brand-orange" />
                  <h4>Challenge</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-navy-950 font-bold">
                  <Lightbulb size={20} className="text-brand-blue" />
                  <h4>Solution</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>
          
          {project.impact && (
              <div className="mb-10 p-5 bg-gradient-to-r from-blue-50/80 to-transparent rounded-r-2xl rounded-l-md border-l-4 border-blue-600">
                  <div className="flex items-center gap-2 text-navy-950 font-bold mb-2">
                      <TrendingUp size={20} className="text-blue-600" />
                      <h4>Impact</h4>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{project.impact}</p>
              </div>
          )}

          <div className="flex flex-wrap gap-2 mb-12">
            {(project.technologies || []).map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200/60 text-gray-700 text-xs font-medium cursor-default">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            {project.link?.startsWith("http") ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#0A101D] text-white font-semibold overflow-hidden relative shadow-md"
              >
                <div className="absolute inset-0 bg-brand-blue translate-y-[120%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" />
                <span className="relative z-10">Visit Project</span>
                <ArrowUpRight size={18} className="relative z-10 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </a>
            ) : (
              <Link
                to={project.link || "#"}
                className="group/btn inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#0A101D] text-white font-semibold overflow-hidden relative shadow-md"
              >
                <div className="absolute inset-0 bg-brand-blue translate-y-[120%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" />
                <span className="relative z-10">Visit Project</span>
                <ArrowUpRight size={18} className="relative z-10 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProject;
