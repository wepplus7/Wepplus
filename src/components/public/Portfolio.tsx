import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const categories = ['الكل', ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filtered = activeCategory === 'الكل'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">معرض الأعمال</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            مشاريعنا الأخيرة
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            مجموعة مختارة من المشاريع التي نفخر بتنفيذها لعملائنا
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block bg-cyan-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                    {project.category}
                  </span>
                  <p className="text-white/90 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{project.category}</p>
                </div>
                {project.url && project.url !== '#' && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
