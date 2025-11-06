'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Wand2, Zap } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 20 && Math.random() > 0.7) {
        setParticles(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100
        }]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [particles.length]);

  useEffect(() => {
    particles.forEach(particle => {
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 4000);
    });
  }, [particles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: 'float 4s ease-in-out forwards',
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <Wand2 className="w-8 h-8 text-purple-400 transition-transform group-hover:rotate-12 duration-300" />
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  NoCode Studio
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-purple-300 hover:text-purple-100 transition-colors duration-200">
                  Examples
                </button>
                <button className="px-4 py-2 text-purple-300 hover:text-purple-100 transition-colors duration-200">
                  Docs
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-purple-200">Build anything without code</span>
            </div>

            <h2 className="text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Create Amazing Apps
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                With Just Words
              </span>
            </h2>

            <p className="text-xl text-purple-200/80 max-w-2xl mx-auto mb-8">
              Describe what you want to build, and watch as your vision comes to life instantly.
            </p>
          </div>

          {/* Input Area */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 ${isHovered ? 'animate-gradient-rotate' : ''}`} />

            <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-purple-400/50">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse-subtle">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describe your app idea... (e.g., 'A todo app with dark mode and categories')"
                      className="w-full bg-transparent text-white placeholder-purple-300/50 outline-none resize-none text-lg min-h-[200px] leading-relaxed"
                      style={{ caretColor: '#c084fc' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-purple-300 hover:text-purple-100 transition-colors duration-200 text-sm">
                      Add context
                    </button>
                    <button className="px-4 py-2 text-purple-300 hover:text-purple-100 transition-colors duration-200 text-sm">
                      Upload design
                    </button>
                  </div>

                  <button
                    disabled={!input.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2 group"
                  >
                    <span>Generate</span>
                    <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 mt-16">
            {[
              { icon: '⚡', title: 'Instant Preview', desc: 'See your app in real-time' },
              { icon: '🎨', title: 'Smart Design', desc: 'AI-powered beautiful UIs' },
              { icon: '🚀', title: 'One-Click Deploy', desc: 'Go live in seconds' }
            ].map((feature, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-purple-200/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
