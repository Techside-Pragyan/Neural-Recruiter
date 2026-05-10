"use client";

import { motion } from "framer-motion";
import { Plus, History, TrendingUp, Target, Award, User } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 82 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 94 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Pragyan</h1>
            <p className="text-gray-400">Track your progress and start new interview sessions.</p>
          </div>
          <Link href="/interview/setup">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Interview
            </button>
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<History />} label="Total Interviews" value="12" />
          <StatCard icon={<TrendingUp />} label="Average Score" value="84%" />
          <StatCard icon={<Target />} label="Top Skill" value="React.js" />
          <StatCard icon={<Award />} label="Current Streak" value="5 Days" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Performance Trend</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#374151', opacity: 0.4}}
                    contentStyle={{backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px'}}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent History */}
          <div className="glass-card p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Sessions</h2>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm">View All</button>
            </div>
            
            <div className="space-y-4 flex-grow">
              <HistoryItem role="Frontend Engineer" date="2 days ago" score={92} />
              <HistoryItem role="Full Stack Developer" date="4 days ago" score={78} />
              <HistoryItem role="System Design" date="1 week ago" score={85} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-panel p-6 rounded-2xl border border-white/5"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function HistoryItem({ role, date, score }: { role: string, date: string, score: number }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-white">{role}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg font-bold ${score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
          {score}%
        </div>
      </div>
    </div>
  );
}
