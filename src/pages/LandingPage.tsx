import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Globe, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-google-blue" />,
      title: "Secure & Transparent",
      description: "Powered by Firebase for immutable data and secure Google authentication."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-google-red" />,
      title: "Real-time Insights",
      description: "Visualize counting methods with high-performance Google Charts and Recharts."
    },
    {
      icon: <Globe className="w-6 h-6 text-google-green" />,
      title: "Interactive Maps",
      description: "Explore polling station accessibility using the Google Maps JavaScript API."
    },
    {
      icon: <Zap className="w-6 h-6 text-google-yellow" />,
      title: "AI-Powered Learning",
      description: "Understand complex election logic instantly via our Google Gemini AI explainer."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-container relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        
        <div className="text-center space-y-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              The Future of Civic Education
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight">
              Empowering <span className="text-gradient">Democracy</span> <br />
              Through Technology.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
              ElectiVate is an advanced educational platform designed to demystify election processes using Google's world-class cloud infrastructure.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/simulator" className="px-8 py-4 bg-white text-brand-dark rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 group shadow-xl shadow-white/5">
              Launch Simulator <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/learn" className="px-8 py-4 glass-button font-bold flex items-center gap-2">
              How it Works
            </Link>
          </motion.div>
        </div>

        {/* Visual Demo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 glass-card p-4 md:p-8 max-w-5xl mx-auto border-white/20 relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-1000"></div>
          <div className="relative bg-brand-dark rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-white/5">
             <div className="text-center p-8">
                <div className="flex justify-center gap-4 mb-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-12 h-32 rounded-lg bg-gradient-to-t from-blue-500 to-transparent opacity-${i * 20} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <p className="text-sm font-mono text-gray-500">REAL-TIME VOTING ANALYTICS ENGINE RUNNING...</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 glass-card border-white/5 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-container text-center py-24">
        <h2 className="text-3xl font-bold mb-12">Built on the World's Most Trusted Stack</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_color_92x30dp.svg" alt="Google" className="h-8" />
           <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <img src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-standard.svg" alt="Firebase" className="h-8" />
              <span>Firebase</span>
           </div>
           <div className="text-xl font-bold tracking-tight">GEMINI AI</div>
           <div className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Globe className="w-6 h-6" /> Google Maps
           </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
