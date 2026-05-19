'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function LandingNav() {
  const router = useRouter();
  const { login, authenticated, ready } = usePrivy();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleLaunch = () => {
    if (!ready) return; // SDK not ready yet — ignore the click

    if (authenticated) {
      router.push('/build');
    } else {
      localStorage.setItem('postLoginRedirect', '/build');
      login();
    }
  };

  useEffect(() => {
    if (ready && authenticated) {
      const redirect = localStorage.getItem('postLoginRedirect');
      if (redirect) {
        localStorage.removeItem('postLoginRedirect');
        router.push(redirect);
      }
    }
  }, [ready, authenticated, router]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pb-2 transition-all duration-300">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex items-center justify-between gap-8 px-6 py-4 w-full md:w-4/5 lg:w-3/4 rounded-2xl border transition-all duration-300 ${isScrolled ? 'bg-bg-card/80 backdrop-blur-xl border-border-subtle shadow-xl shadow-bg-primary/50' : 'bg-transparent border-transparent'}`}
      >
        {/* Branding */}
        <div className="flex items-center cursor-pointer group" onClick={() => router.push('/')}>
          <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform">
            <span className="font-sans font-black text-bg-primary text-xl">S</span>
          </div>
          <span className="font-sans text-2xl font-black text-text-primary tracking-tighter uppercase group-hover:text-accent-primary transition-colors">
            Samsonite
          </span>
        </div>

        {/* Action */}
        <div className="flex items-center gap-4">
          <button
            className="group relative px-6 py-2.5 bg-bg-card border border-border-subtle text-text-primary rounded-xl font-sans font-bold text-sm tracking-widest transition-all duration-300 hover:border-accent-primary/50 hover:bg-bg-card/80 overflow-hidden"
            onClick={handleLaunch}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/0 via-accent-primary/10 to-accent-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              LAUNCH APP
            </span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
}