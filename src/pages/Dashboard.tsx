import React from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { candidates, totalVotes } = useSimulationStore();

  const stats = [
    { label: "Total Votes Cast", value: totalVotes, icon: <Users className="text-blue-400" />, trend: "+12%" },
    { label: "Leading Candidate", value: totalVotes > 0 ? candidates.sort((a, b) => b.votes - a.votes)[0].name : "N/A", icon: <Award className="text-yellow-400" />, trend: "Steady" },
    { label: "Uptime", value: "99.9%", icon: <Clock className="text-green-400" />, trend: "Optimal" },
  ];

  const trendData = [
    { time: '10:00', votes: 120 },
    { time: '11:00', votes: 450 },
    { time: '12:00', votes: 890 },
    { time: '13:00', votes: 1200 },
    { time: '14:00', votes: totalVotes + 1500 },
  ];

  return (
    <div className="pt-24 pb-12 section-container">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-3xl font-bold">Election Insights</h2>
           <p className="text-gray-400">Real-time data powered by Google Firestore.</p>
        </div>
        <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Live Stream</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 border-white/5">
             <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/5 rounded-lg">{stat.icon}</div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{stat.trend}</span>
             </div>
             <p className="text-sm text-gray-400">{stat.label}</p>
             <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Voting Trend */}
        <div className="glass-card p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-400" /> Participation Trend</h3>
              <select className="bg-transparent border-none text-xs text-gray-500 focus:outline-none">
                 <option>Last 24 Hours</option>
                 <option>Last 7 Days</option>
              </select>
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={trendData}>
                 <defs>
                   <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12 }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12 }} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                   itemStyle={{ color: '#4285F4' }}
                 />
                 <Area type="monotone" dataKey="votes" stroke="#4285F4" strokeWidth={3} fillOpacity={1} fill="url(#colorVotes)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Candidate Distribution */}
        <div className="glass-card p-8">
           <h3 className="font-bold mb-8 flex items-center gap-2"><Users className="w-4 h-4 text-google-red" /> Vote Distribution</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={candidates}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12 }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12 }} />
                 <Tooltip 
                   cursor={{ fill: '#ffffff05' }}
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                 />
                 <Bar dataKey="votes" radius={[6, 6, 0, 0]}>
                   {candidates.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
