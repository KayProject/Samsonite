'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon, ArrowsRightLeftIcon, GlobeAltIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export function Capabilities() {
  // SWAP Card Live Ticker State
  const [swapState, setSwapState] = useState(0);
  const swaps = [
    { from: "USDC", to: "XLM", fromVal: "1,000.00", toVal: "8,420.50", color: "var(--success)" },
    { from: "ETH", to: "cUSD", fromVal: "0.50", toVal: "1,450.20", color: "var(--accent-primary)" },
    { from: "USDC", to: "SOL", fromVal: "500.00", toVal: "3.42", color: "var(--accent-secondary)" }
  ];

  useEffect(() => {
    const swapInterval = setInterval(() => {
      setSwapState((prev) => (prev + 1) % swaps.length);
    }, 3000);
    return () => clearInterval(swapInterval);
  }, []);

  return (
    <section id="capabilities" className="py-32 px-4 max-w-7xl mx-auto border-t border-border-subtle relative z-10">
      <div className="mb-20 text-center md:text-left relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="font-mono text-accent-primary text-xs tracking-widest mb-6 uppercase font-semibold">
          02 —— CAPABILITIES
        </div>
        <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-bold text-text-primary leading-none uppercase tracking-tighter">
          Everything your<br />money needs.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* CARD 1: SEND (Gold) */}
        <div className="p-8 relative overflow-hidden group transition-all duration-500 rounded-3xl border border-border-subtle bg-bg-card/40 backdrop-blur-xl hover:bg-bg-card hover:border-accent-primary/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
          {/* Filled Heroicon Watermark */}
          <PaperAirplaneIcon
            className="absolute -bottom-8 -right-8 w-64 h-64 text-accent-primary opacity-5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10 group-hover:-rotate-6 pointer-events-none z-0"
          />

          <div className="relative z-10">
            <h3 className="font-sans text-2xl font-bold text-accent-primary mb-4 uppercase tracking-wider drop-shadow-sm">SEND</h3>
            <p className="font-mono text-sm text-text-muted mb-8 max-w-sm leading-relaxed">
              Transfer USDC to any wallet on any network. Pay network costs directly in USDC.
            </p>

            <div className="bg-bg-primary/50 p-5 border border-border-subtle flex flex-col gap-4 backdrop-blur-md rounded-2xl">
              <div className="h-12 bg-bg-secondary/50 border border-border-subtle px-4 flex items-center font-mono text-sm text-text-muted overflow-hidden relative rounded-xl">
                <motion.span
                  animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 10] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1] }}
                >
                  0x71C...976F
                </motion.span>
              </div>
              <div className="flex gap-3">
                <div className="h-12 bg-bg-secondary/50 border border-border-subtle px-4 flex items-center font-mono text-sm text-text-primary flex-1 relative overflow-hidden rounded-xl">
                  <span className="text-text-muted mr-2">$</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.8, 1] }}
                  >
                    1,000.00
                  </motion.span>
                </div>
                <motion.button
                  animate={{
                    backgroundColor: ['rgba(245, 158, 11, 0.1)', 'rgba(245, 158, 11, 1)', 'rgba(30, 41, 59, 1)', 'rgba(245, 158, 11, 0.1)'],
                    color: ['#F59E0B', '#FFF', '#94A3B8', '#F59E0B']
                  }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 1] }}
                  className="px-6 h-12 border border-accent-primary/50 font-sans font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: SWAP (Purple) */}
        <div className="p-8 relative overflow-hidden group transition-all duration-500 rounded-3xl border border-border-subtle bg-bg-card/40 backdrop-blur-xl hover:bg-bg-card hover:border-accent-secondary/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]">
          {/* Filled Heroicon Watermark */}
          <ArrowsRightLeftIcon
            className="absolute -bottom-8 -right-8 w-64 h-64 text-accent-secondary opacity-5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10 pointer-events-none z-0"
          />

          <div className="relative z-10">
            <h3 className="font-sans text-2xl font-bold text-accent-secondary mb-4 uppercase tracking-wider drop-shadow-sm">SWAP</h3>
            <p className="font-mono text-sm text-text-muted mb-8 max-w-sm leading-relaxed">
              Exchange tokens at the best rate, automatically. Liquidity sourced across all markets.
            </p>

            <div className="bg-bg-primary/50 p-5 border border-border-subtle flex flex-col gap-2 relative h-[120px] backdrop-blur-md rounded-2xl overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`swap-${swapState}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-5 flex flex-col gap-1 justify-center"
                >
                  <div className="flex justify-between items-center py-2 border-b border-border-subtle font-mono text-sm">
                    <span className="text-text-primary font-bold">{swaps[swapState].from}</span>
                    <span className="text-text-muted">{swaps[swapState].fromVal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-mono text-sm pt-3">
                    <span className="text-text-primary font-bold">{swaps[swapState].to}</span>
                    <span style={{ color: swaps[swapState].color }} className="font-bold">{swaps[swapState].toVal}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-secondary text-sm bg-bg-card w-8 h-8 rounded-full flex items-center justify-center border border-accent-secondary/50 z-20 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                ↓
              </motion.div>
            </div>
          </div>
        </div>

        {/* CARD 3: BRIDGE (Orange/Gold) */}
        <div className="p-8 relative overflow-hidden group transition-all duration-500 rounded-3xl border border-border-subtle bg-bg-card/40 backdrop-blur-xl hover:bg-bg-card hover:border-accent-primary/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
          {/* Filled Heroicon Watermark */}
          <GlobeAltIcon
            className="absolute -bottom-8 -right-8 w-64 h-64 text-accent-primary opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10 pointer-events-none z-0"
          />

          <div className="relative z-10">
            <h3 className="font-sans text-2xl font-bold text-accent-primary mb-4 uppercase tracking-wider drop-shadow-sm">BRIDGE</h3>
            <p className="font-mono text-sm text-text-muted mb-8 max-w-sm leading-relaxed">
              Move assets across Base, Celo, Ethereum, Stellar. Powered by automated routing.
            </p>

            <div className="bg-bg-primary/50 p-6 border border-border-subtle flex items-center justify-between backdrop-blur-md rounded-2xl">
              <div className="bg-bg-secondary border border-border-subtle px-4 py-2 font-mono text-xs text-text-primary z-10 rounded-lg shadow-inner">BASE</div>

              <div className="flex-1 h-[2px] border-t border-dashed border-text-muted/40 mx-4 relative flex items-center">
                <motion.div
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>

              <div className="bg-bg-secondary border border-border-subtle px-4 py-2 font-mono text-xs text-text-primary z-10 rounded-lg shadow-inner">STELLAR</div>
            </div>
          </div>
        </div>

        {/* CARD 4: EARN (Green) */}
        <div className="p-8 relative overflow-hidden group transition-all duration-500 rounded-3xl border border-border-subtle bg-bg-card/40 backdrop-blur-xl hover:bg-bg-card hover:border-success/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]">
          {/* Filled Heroicon Watermark */}
          <ChartBarIcon
            className="absolute -bottom-8 -right-8 w-64 h-64 text-success opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10 pointer-events-none z-0"
          />

          <div className="relative z-10">
            <h3 className="font-sans text-2xl font-bold text-success mb-4 uppercase tracking-wider drop-shadow-sm">EARN</h3>
            <p className="font-mono text-sm text-text-muted mb-8 max-w-sm leading-relaxed">
              Deposit into yield protocols. Your money works for you while you sleep.
            </p>

            <div className="bg-bg-primary/50 p-6 border border-border-subtle flex items-end justify-between h-28 backdrop-blur-md rounded-2xl">
              <div className="font-mono text-sm h-full flex flex-col justify-end">
                <div className="text-text-muted text-[10px] tracking-widest mb-2 uppercase font-semibold">USDC on Aave</div>
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8], textShadow: ["0px 0px 0px transparent", "0px 0px 20px rgba(34,197,94,0.5)", "0px 0px 0px transparent"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-success font-bold text-xl"
                >
                  APY 4.2%
                </motion.div>
              </div>
              <div className="flex items-end gap-2 h-full pt-4">
                {[0.3, 0.5, 0.7, 0.9].map((baseHeight, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${baseHeight * 100}%`, `${(baseHeight + 0.15) * 100}%`, `${baseHeight * 100}%`] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="w-5 bg-success rounded-t-sm shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    style={{ opacity: baseHeight + 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}