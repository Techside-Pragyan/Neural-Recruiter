"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, StopCircle, Send, Video, MicOff, Maximize2, Bot } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function InterviewSession() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'Software Engineer';
  
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([
    { role: 'system', content: `Hello! I'm your AI interviewer today. We'll be conducting a technical interview for the ${role} position. Are you ready to begin?` }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize webcam
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Could not access camera: ", err));
    }
  }, []);

  const handleSend = () => {
    if (!transcript.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: transcript }]);
    setTranscript("");
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: "That's an interesting approach. Can you elaborate on the time complexity of the solution you just described?" 
      }]);
      setIsAiTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">{role} Interview</h1>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono bg-gray-800 px-3 py-1 rounded-md">24:59</span>
          <button className="bg-red-500/10 text-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white transition-colors">
            End Session
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main AI Avatar / Presentation Area */}
        <div className="flex-1 relative flex flex-col items-center justify-center bg-gray-900 border-r border-gray-800 p-8">
          {/* Pulsing AI Avatar */}
          <div className="relative">
            <motion.div 
              animate={{ 
                scale: isAiTyping ? [1, 1.1, 1] : 1,
                opacity: isAiTyping ? [0.5, 0.8, 0.5] : 0.5
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-indigo-500 rounded-full blur-[60px]"
            ></motion.div>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-gray-700 bg-gray-950 shadow-2xl relative z-10 flex items-center justify-center overflow-hidden">
              <Bot className="w-24 h-24 text-indigo-400" />
            </div>
          </div>
          
          <div className="mt-12 max-w-2xl text-center">
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-200 min-h-[80px]">
              {messages[messages.length - 1]?.role === 'system' 
                ? messages[messages.length - 1].content 
                : (isAiTyping ? "..." : messages[messages.length - 2]?.content)}
            </p>
          </div>

          {/* User Webcam View (PIP) */}
          <div className="absolute bottom-6 right-6 w-48 h-32 md:w-64 md:h-44 bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <div className="p-1.5 bg-black/50 rounded-md backdrop-blur"><MicOff className="w-4 h-4" /></div>
              <div className="p-1.5 bg-black/50 rounded-md backdrop-blur"><Video className="w-4 h-4" /></div>
            </div>
            <button className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-md backdrop-blur"><Maximize2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Chat & Controls Area */}
        <div className="w-full lg:w-96 bg-gray-950 flex flex-col h-[50vh] lg:h-auto">
          {/* Chat History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-gray-800 text-gray-200 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isAiTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-gray-950">
            <div className="relative flex items-center">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`absolute left-2 p-2 rounded-full transition-colors ${
                  isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <input 
                type="text" 
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isRecording ? "Listening..." : "Type your answer..."}
                className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              
              <button 
                onClick={handleSend}
                disabled={!transcript.trim()}
                className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 rounded-full text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
