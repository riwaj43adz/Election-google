import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ArrowRight, PlayCircle, HelpCircle } from 'lucide-react';

const Learn: React.FC = () => {
  const modules = [
    {
      title: "Foundations of Voting",
      duration: "10 mins",
      topics: ["What is a ballot?", "Registration process", "Voter eligibility"],
      status: "Available"
    },
    {
      title: "Counting Systems",
      duration: "15 mins",
      topics: ["First Past The Post", "Ranked Choice Voting", "Proportional Representation"],
      status: "Available"
    },
    {
      title: "Digital Integrity",
      duration: "12 mins",
      topics: ["EVM Security", "Blockchain in voting", "VVPAT systems"],
      status: "Coming Soon"
    }
  ];

  return (
    <div className="pt-24 pb-12 section-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Election Academy</h2>
        <p className="text-gray-400 text-lg mb-12">Master the mechanics of democracy through structured learning modules.</p>

        <div className="space-y-6">
          {modules.map((module, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-white/5 hover:border-white/20 transition-all ${module.status === 'Coming Soon' ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Module {idx + 1}</span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><BookOpen className="w-3 h-3" /> {module.duration}</span>
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                 <div className="flex flex-wrap gap-4">
                    {module.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-1.5 text-sm text-gray-400">
                         <CheckCircle className="w-4 h-4 text-google-green" /> {topic}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex shrink-0 gap-3">
                 {module.status === 'Available' ? (
                   <button className="px-6 py-3 bg-white text-brand-dark rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                      Start <PlayCircle className="w-4 h-4" />
                   </button>
                 ) : (
                   <span className="text-xs font-bold text-gray-500 border border-white/10 px-4 py-2 rounded-xl">Coming Soon</span>
                 )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 relative overflow-hidden group">
           <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><HelpCircle className="text-blue-400" /> Have a specific question?</h3>
              <p className="text-gray-300 mb-6 max-w-lg">Our AI educator powered by Google Gemini can explain any election concept in seconds.</p>
              <button className="glass-button text-sm font-bold flex items-center gap-2 group">
                 Ask Gemini AI <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
