import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../store/useSimulationStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info, RotateCcw, Vote as VoteIcon, Sparkles } from 'lucide-react';
import { getElectionExplanation } from '../lib/gemini';

const VotingSimulator: React.FC = () => {
  const { system, candidates, totalVotes, addVote, resetSimulation } = useSimulationStore();
  const [explaining, setExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplain = async () => {
    setExplaining(true);
    const text = await getElectionExplanation(`How does ${system} (First Past The Post) work in an election?`);
    setExplanation(text);
    setExplaining(false);
  };

  const chartData = candidates.map(c => ({
    name: c.name,
    votes: c.votes,
    color: c.color,
    percentage: totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(1) : 0
  }));

  return (
    <div className="pt-24 pb-12 section-container">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Controls & Voting */}
        <div className="flex-1 space-y-6">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <VoteIcon className="text-blue-500" /> Cast Your Vote
            </h2>
            <p className="text-gray-400 mb-8">
              Simulate a real-time election using the <span className="text-white font-semibold">First Past The Post (FPTP)</span> system. 
              In this system, the candidate with the most votes wins, regardless of whether they have an absolute majority.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {candidates.map((candidate) => (
                <motion.button
                  key={candidate.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addVote(candidate.id)}
                  aria-label={`Vote for ${candidate.name} from ${candidate.party}`}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: candidate.color }}></div>
                  <h4 className="font-bold">{candidate.name}</h4>
                  <p className="text-xs text-gray-500">{candidate.party}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-mono" aria-live="polite">{candidate.votes} votes</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-xs bg-white/10 px-2 py-1 rounded">Vote +1</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <button 
                onClick={resetSimulation}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset Simulation
              </button>
              <button 
                onClick={handleExplain}
                disabled={explaining}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Sparkles className={`w-4 h-4 ${explaining ? 'animate-spin' : ''}`} /> 
                {explaining ? 'Asking Gemini...' : 'Explain this system'}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {explanation && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="glass-card p-6 bg-blue-500/5 border-blue-500/20"
              >
                <div className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-blue-400 flex items-center gap-2">
                     <Sparkles className="w-4 h-4" /> Gemini AI Insights
                   </h3>
                   <button onClick={() => setExplanation(null)} className="text-gray-500 hover:text-white">✕</button>
                </div>
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Visualization */}
        <div className="w-full lg:w-[450px] space-y-6">
          <div className="glass-card p-8 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info className="text-google-green w-5 h-5" /> Live Results
            </h3>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  />
                  <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 space-y-4">
               {chartData.sort((a, b) => b.votes - a.votes).map((entry, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-8 rounded-full" style={{ backgroundColor: entry.color }}></div>
                       <div>
                          <p className="text-sm font-bold">{entry.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{idx === 0 && totalVotes > 0 ? 'Leading' : ''}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-mono font-bold">{entry.percentage}%</p>
                       <p className="text-[10px] text-gray-400">{entry.votes} votes</p>
                    </div>
                 </div>
               ))}
            </div>
            
            {totalVotes === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/60 backdrop-blur-sm rounded-2xl">
                 <p className="text-gray-400 animate-pulse">Waiting for first vote...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingSimulator;
