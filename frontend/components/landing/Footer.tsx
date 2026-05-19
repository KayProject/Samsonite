export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary py-16 px-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <span className="font-sans font-black text-bg-primary text-xl">S</span>
            </div>
            <div className="font-sans text-2xl font-black text-text-primary tracking-tighter uppercase">SAMSONITE</div>
          </div>
          <p className="text-sm text-text-muted mb-6 leading-relaxed">
            The cross-chain agent operating system. Deploy intelligent agents to bridge, swap, and stake across any network.
          </p>
          <div className="font-mono text-xs text-success flex items-center gap-2 bg-success/10 w-fit px-3 py-1.5 rounded-full border border-success/20">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
            V2.0 · MAINNET ACTIVE
          </div>
        </div>

        <div className="flex flex-wrap gap-16 font-sans text-sm">
          <div className="flex flex-col gap-4">
            <div className="text-text-primary font-bold mb-2 uppercase tracking-wider text-xs">Protocol</div>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Agents</a>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Supported Chains</a>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Security</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-text-primary font-bold mb-2 uppercase tracking-wider text-xs">Developers</div>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Documentation</a>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">GitHub</a>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Smart Contracts</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-text-primary font-bold mb-2 uppercase tracking-wider text-xs">Legal</div>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-accent-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-text-muted tracking-widest uppercase">
        <div>© 2026 SAMSONITE. ALL RIGHTS RESERVED.</div>
        <div className="flex flex-wrap gap-6 bg-bg-card px-4 py-2 rounded-lg border border-border-subtle">
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-success"></span>SYSTEM: ONLINE</span>
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent-primary"></span>LATENCY: 42MS</span>
        </div>
      </div>
    </footer>
  );
}
