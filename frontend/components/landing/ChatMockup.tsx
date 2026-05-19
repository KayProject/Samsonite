'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const SCENARIOS = [
  {
    command: "Bridge 100 USDC from Base to Stellar and swap to XLM",
    reply: "Found the best route via Circle CCTP V2. Transfer fee: $0.42",
    plan: ["Burn USDC on Base", "Attest via Circle", "Mint on Stellar", "Swap to XLM via Horizon"]
  },
  {
    command: "Stake 5 ETH on Lido and wrap to wstETH",
    reply: "Current Lido APY is 3.8%. Preparing staking transaction.",
    plan: ["Route to Ethereum Mainnet", "Deposit ETH to Lido", "Receive stETH", "Wrap to wstETH"]
  },
  {
    command: "Send 500 cUSD to 0x4a... on Celo",
    reply: "Recipient verified on Celo network. Gas fee: <$0.01",
    plan: ["Verify recipient address", "Check cUSD balance", "Approve transfer", "Execute send"]
  }
];

export function ChatMockup() {
  const [messages, setMessages] = useState<any[]>([]);
  const [typedText, setTypedText] = useState("");
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;
    
    const runScenario = async () => {
      const s = SCENARIOS[scenarioIdx];
      setTypedText("");
      
      // 1. Type command
      for (let i = 0; i <= s.command.length; i++) {
        if (isCancelled) return;
        setTypedText(s.command.substring(0, i));
        await new Promise(r => setTimeout(r, 30));
      }
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled) return;

      // 2. Send User Message
      setTypedText("");
      const userMsgId = Date.now();
      setMessages(prev => [...prev, { id: userMsgId, type: 'user', text: s.command }]);
      
      // 3. Agent Reply
      await new Promise(r => setTimeout(r, 600));
      if (isCancelled) return;
      const agentMsgId = Date.now() + 1;
      setMessages(prev => [...prev, { id: agentMsgId, type: 'agent', text: s.reply, plan: s.plan, status: 'pending' }]);

      // 4. Confirm
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled) return;
      setMessages(prev => prev.map(m => m.id === agentMsgId ? { ...m, status: 'confirmed' } : m));
      const confirmMsgId = Date.now() + 2;
      setMessages(prev => [...prev, { id: confirmMsgId, type: 'user', text: "Confirmed. Executing..." }]);

      // 5. Wait before next scenario
      await new Promise(r => setTimeout(r, 2000));
      if (isCancelled) return;
      setScenarioIdx(prev => (prev + 1) % SCENARIOS.length);
    };

    runScenario();
    return () => { isCancelled = true; };
  }, [scenarioIdx]);

  // Keep chat scrolled to bottom safely
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-bg-card/40 backdrop-blur-2xl rounded-2xl relative overflow-hidden flex flex-col h-[600px] border border-border-subtle shadow-[0_0_40px_rgba(245,158,11,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent pointer-events-none" />
      
      <div className="h-14 border-b border-border-subtle flex items-center px-6 font-mono text-xs text-text-muted tracking-widest bg-bg-primary/50 backdrop-blur-md z-10 w-full shadow-sm">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-error/50"></div>
          <div className="w-3 h-3 rounded-full bg-warning/50"></div>
          <div className="w-3 h-3 rounded-full bg-success/50"></div>
        </div>
        SAMSONITE_AGENT_PROTOCOL
      </div>

      <div 
        ref={containerRef}
        className="flex-1 p-6 flex flex-col gap-6 overflow-hidden pt-6 pb-24 relative z-0 scroll-smooth"
      >
        <div className="flex flex-col justify-end min-h-full gap-6">
          <AnimatePresence initial={false}>
            {messages.slice(-6).map((msg) => (
              <motion.div 
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[90%] rounded-2xl ${msg.type === 'user' ? 'self-end bg-accent-primary text-bg-primary p-4 shadow-lg shadow-accent-primary/20 rounded-br-sm' : 'self-start bg-bg-secondary/80 backdrop-blur-md p-5 border border-border-subtle rounded-bl-sm'}`}
              >
                {msg.type === 'user' ? (
                  <span className="font-mono text-sm leading-relaxed font-semibold">{msg.text}</span>
                ) : (
                  <>
                    <div className="font-sans text-sm text-text-primary leading-relaxed mb-4">
                      {msg.text}
                    </div>
                    <div className="bg-bg-primary/80 rounded-xl border border-border-subtle p-4 mb-4 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-primary to-accent-secondary"></div>
                      <div className="font-mono text-[10px] text-accent-secondary mb-3 tracking-widest uppercase flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse-slow"></div>
                        Transaction Plan
                      </div>
                      <ul className="font-mono text-sm text-text-muted space-y-2">
                        {msg.plan.map((step: string, i: number) => (
                          <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
                            <span className="text-accent-primary opacity-70">[{i + 1}]</span> {step}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" className={`font-mono text-xs tracking-wider transition-all duration-300 ${msg.status === 'confirmed' ? 'bg-success/20 text-success border-success/30' : 'bg-transparent text-text-primary border-border-subtle hover:bg-accent-primary/10 hover:text-accent-primary hover:border-accent-primary/30'}`}>
                        {msg.status === 'confirmed' ? '✓ SIGNED' : 'CONFIRM & SIGN'}
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-bg-primary via-bg-primary/90 to-transparent">
        <div className="h-14 border border-border-subtle bg-bg-secondary/90 backdrop-blur-xl rounded-xl px-4 flex items-center shadow-lg">
          <div className="flex-1 font-mono text-sm text-text-primary truncate pr-4">
            {typedText}
            <motion.span className="text-accent-primary" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center text-accent-primary">
            ↑
          </div>
        </div>
      </div>
    </div>
  );
}