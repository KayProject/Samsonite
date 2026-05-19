'use client';

import { motion } from 'framer-motion';
import DarkVeil from '../DarkVeil';
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { Sparkles, ArrowRight, Network } from 'lucide-react';

export function Hero() {
  const router = useRouter();
  const { login, authenticated, ready } = usePrivy();

  const handleAction = (destination: string) => {
    if (!ready) return;
    if (authenticated) {
      router.push(destination);
    } else {
      localStorage.setItem('postLoginRedirect', destination);
      login();
    }
  };

  return (
    <section className="relative min-h-[95vh] w-full bg-bg-primary overflow-hidden flex flex-col justify-center">

      {/* --- BACKGROUND LAYERS --- */}

      {/* 1. Dot Grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none z-0" />

      {/* 2. Deep Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />

      {/* 3. DarkVeil Aurora */}
      <div className="absolute bottom-0 left-0 w-full h-[70vh] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)'
          }}
        >
          <DarkVeil
            hueShift={291}
            noiseIntensity={0.05}
            scanlineIntensity={0.3}
            speed={0.5}
            scanlineFrequency={0.02}
            warpAmount={1.2}
          />
        </div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}

      <div className="relative z-10 px-6 pt-32 pb-24 text-center max-w-7xl mx-auto w-full flex flex-col items-center">

        {/* Minimalist Proprietary Badge Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center justify-center gap-3 font-mono text-xs md:text-sm tracking-[0.2em] text-accent-primary uppercase bg-bg-card/40 backdrop-blur-md px-6 py-2 rounded-full border border-accent-primary/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Samsonite v2.0 Protocol Active</span>
          <Sparkles className="w-4 h-4" />
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-[3rem] sm:text-[6rem] md:text-[8rem] font-black leading-[0.9] tracking-tighter mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 drop-shadow-2xl">
            One Prompt. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-yellow-300 to-accent-secondary">
              Infinite Chains.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-[700px] mb-12 font-medium leading-relaxed"
        >
          Deploy intent-based AI agents that bridge, swap, and stake across EVM and non-EVM ecosystems instantly.
        </motion.p>

        {/* CTAs with Premium Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4 items-center justify-center"
        >
          <button 
            onClick={() => handleAction('/chat')} 
            className="group relative px-8 py-4 bg-accent-primary text-bg-primary rounded-xl font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:-translate-y-1 overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              Launch Agent <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button 
            onClick={() => handleAction('/build')} 
            className="group relative px-8 py-4 bg-bg-card/50 backdrop-blur-xl border border-border-subtle text-text-primary rounded-xl font-bold text-lg tracking-wide transition-all duration-300 hover:bg-bg-card hover:border-accent-primary/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Network className="w-5 h-5 group-hover:text-accent-secondary transition-colors" />
            <span>Build Workflow</span>
          </button>
        </motion.div>

        {/* Floating Data Nodes to replace the orb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute hidden md:block top-1/4 right-[10%] w-32 h-32"
        >
          <div className="w-full h-full border border-accent-secondary/30 rounded-2xl rotate-12 animate-slow-bob backdrop-blur-sm bg-bg-card/20 flex items-center justify-center">
            <span className="font-mono text-xs text-accent-secondary">EVM_SYNC</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
          className="absolute hidden md:block bottom-1/4 left-[10%] w-24 h-24"
        >
          <div className="w-full h-full border border-accent-primary/30 rounded-full -rotate-12 animate-slow-bob [animation-delay:1s] backdrop-blur-sm bg-bg-card/20 flex items-center justify-center">
            <span className="font-mono text-xs text-accent-primary">SOL_NODE</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}