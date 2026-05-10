"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Settings, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const roles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "AI/ML Engineer",
  "Product Manager",
];

const difficulties = ["Easy", "Medium", "Hard"];
const types = ["Technical", "Behavioral", "System Design"];

export default function SetupInterview() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[1]);
  const [selectedType, setSelectedType] = useState(types[0]);

  const handleStart = () => {
    // Navigate to session with params (in a real app, you'd create the session via API first)
    router.push(`/interview/session?role=${selectedRole}&diff=${selectedDifficulty}&type=${selectedType}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl glass-card p-8 md:p-12 rounded-3xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Configure Your Interview</h1>
          <p className="text-gray-400">Tailor the AI session to match your target job profile.</p>
        </div>

        <div className="space-y-8">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Target Role
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    selectedRole === role 
                      ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border-indigo-500' 
                      : 'glass-panel text-gray-300 hover:bg-white/10'
                  } border border-transparent`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Type & Difficulty Row */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Interview Type</label>
              <div className="flex flex-col gap-3">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-3 rounded-xl text-sm text-left font-medium transition-all ${
                      selectedType === type 
                        ? 'bg-purple-600/80 text-white border-purple-500' 
                        : 'glass-panel text-gray-300 hover:bg-white/10 border-white/5'
                    } border`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Difficulty Level</label>
              <div className="flex flex-col gap-3">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`p-3 rounded-xl text-sm text-left font-medium transition-all ${
                      selectedDifficulty === diff 
                        ? 'bg-blue-600/80 text-white border-blue-500' 
                        : 'glass-panel text-gray-300 hover:bg-white/10 border-white/5'
                    } border`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10">
            <button 
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex justify-center items-center gap-2"
            >
              Start Interview Session
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
