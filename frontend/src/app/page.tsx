"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, Target, Activity, ChevronRight, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <main className="container mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-8 border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-gray-300">
              AI-Powered Interview Preparation
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Master Your Next Interview with <br className="hidden md:block" />
            <span className="text-gradient">AI Intelligence</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Practice real-world interviews with our advanced AI. Get instant, personalized feedback, detailed performance analytics, and boost your confidence before the big day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center gap-2">
                Start Practicing
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="#how-it-works">
              <button className="px-8 py-4 glass-panel hover:bg-white/5 text-white rounded-full font-semibold text-lg transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                See How It Works
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mt-32"
        >
          <FeatureCard 
            icon={<Bot className="w-8 h-8 text-indigo-400" />}
            title="Smart AI Interviewer"
            description="Our AI adapts to your responses, asking intelligent follow-up questions just like a real human interviewer."
          />
          <FeatureCard 
            icon={<Target className="w-8 h-8 text-purple-400" />}
            title="Role-Specific Practice"
            description="Choose from dozens of roles including Software Engineering, Data Science, HR, and custom domains."
          />
          <FeatureCard 
            icon={<Activity className="w-8 h-8 text-blue-400" />}
            title="Real-Time Analytics"
            description="Get detailed insights on your communication skills, technical accuracy, confidence, and areas to improve."
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
