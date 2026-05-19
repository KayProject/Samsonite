import type { Metadata, Viewport } from 'next';
import { Exo_2, Orbitron } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo-2',
  weight: ['300', '400', '500', '600', '700'],
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Samsonite — Cross-Chain AI Agent',
  description: 'Swap, bridge, and stake across any chain. In plain English.',
  icons: {
    icon: [
      { url: '/Samsonite.png', type: 'image/png' },
      { url: '/Samsonite.ico', type: 'image/x-icon' }
    ],
    shortcut: '/Samsonite.ico',
    apple: '/Samsonite.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#8B5CF6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable} dark`}>
      <body className="antialiased min-h-screen bg-background text-foreground tracking-tight select-none font-sans">
        <Providers>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          {/* Clean global Toaster call */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}