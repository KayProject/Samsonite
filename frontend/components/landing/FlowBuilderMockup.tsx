'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link2, ArrowRightLeft, Coins, Send } from "lucide-react";

const ALL_NODES = {
    bridge: { id: 'bridge', type: 'BRIDGE', label: 'Base → Celo', color: 'var(--accent-secondary)', icon: Link2 },
    swap: { id: 'swap', type: 'SWAP', label: 'USDC → cUSD', color: 'var(--accent-primary)', icon: ArrowRightLeft },
    stake: { id: 'stake', type: 'STAKE', label: 'cUSD → Aave', color: 'var(--success)', icon: Coins },
    transfer: { id: 'transfer', type: 'SEND', label: 'ETH → 0x8a...', color: 'var(--accent-primary)', icon: Send }
};

const FLOWS = [
    [ALL_NODES.bridge, ALL_NODES.swap, ALL_NODES.stake],     // Standard
    [ALL_NODES.swap, ALL_NODES.bridge, ALL_NODES.stake],     // Swap translates to front
    [ALL_NODES.transfer, ALL_NODES.swap, ALL_NODES.bridge],  // New transfer node rotates in
];

export function FlowBuilderMockup() {
    const [flowIdx, setFlowIdx] = useState(0);
    const [activeNodeIdx, setActiveNodeIdx] = useState(0);

    useEffect(() => {
        // Cycle the execution highlight rapidly
        const nodeInterval = setInterval(() => {
            setActiveNodeIdx((prev) => (prev >= FLOWS[flowIdx].length ? 0 : prev + 1));
        }, 1200);

        // Physically swap the flow nodes every 5 seconds
        const flowInterval = setInterval(() => {
            setFlowIdx((prev) => (prev + 1) % FLOWS.length);
            setActiveNodeIdx(0); // Reset highlight on flow change
        }, 5000);

        return () => {
            clearInterval(nodeInterval);
            clearInterval(flowInterval);
        };
    }, [flowIdx]);

    const currentNodes = FLOWS[flowIdx];

    return (
        <div className="bg-bg-card/40 backdrop-blur-2xl rounded-2xl relative overflow-hidden flex flex-col h-[600px] border border-border-subtle shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-t from-accent-secondary/5 to-transparent pointer-events-none" />

            <div className="h-14 border-b border-border-subtle flex items-center px-6 font-mono text-xs text-text-muted tracking-widest bg-bg-primary/50 backdrop-blur-md z-10 shadow-sm">
                <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-error/50"></div>
                    <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                    <div className="w-3 h-3 rounded-full bg-success/50"></div>
                </div>
                FLOW_BUILDER_WORKSPACE
            </div>

            <div className="flex-1 bg-dot-grid p-8 flex items-center justify-center relative overflow-hidden bg-bg-primary/20">

                {/* Animated execution line under the nodes */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0 overflow-hidden opacity-40">
                    <div className="w-full h-full border-t border-dashed border-text-muted/30" />
                    <motion.div
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-accent-primary to-transparent"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Nodes Container */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-2xl relative z-10 justify-center">
                    <AnimatePresence mode="popLayout">
                        {currentNodes.map((node, idx) => {
                            const Icon = node.icon;
                            const isActive = activeNodeIdx === idx;
                            const isPast = activeNodeIdx > idx;
                            return (
                                <motion.div
                                    key={node.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{
                                        opacity: isActive ? 1 : isPast ? 0.7 : 0.4,
                                        scale: isActive ? 1.05 : 1,
                                        y: isActive ? -10 : 0,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="flex-1 bg-bg-secondary/90 backdrop-blur-md border border-border-subtle p-5 rounded-2xl relative min-w-[140px] shadow-xl overflow-hidden"
                                >
                                    {/* Top colored accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: node.color }} />
                                    
                                    {/* Active glow */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className="absolute inset-0 blur-2xl opacity-20 -z-10"
                                            style={{ backgroundColor: node.color }}
                                        />
                                    )}

                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center border border-border-subtle" style={{ color: node.color }}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase">{node.type}</div>
                                    </div>
                                    <div className="font-sans text-sm text-text-primary font-bold">{node.label}</div>

                                    {/* Processing indicator */}
                                    {isActive && (
                                        <div className="mt-4 h-1 w-full bg-bg-primary rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full" 
                                                style={{ backgroundColor: node.color }}
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.2, ease: "linear" }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <div className="h-20 border-t border-border-subtle bg-bg-secondary/80 backdrop-blur-xl px-6 flex items-center justify-between z-10">
                <div className="font-mono text-xs text-text-muted flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-text-primary">Auto-Routing Active</span>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="text-text-primary border-border-subtle bg-transparent hover:bg-bg-primary rounded-lg">
                        Simulate
                    </Button>
                    <Button className="text-bg-primary bg-accent-secondary hover:bg-accent-secondary/90 w-32 relative overflow-hidden rounded-lg font-bold">
                        <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="relative z-10">Executing</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}