'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base, celo, mainnet } from 'viem/chains';
import { StellarProvider } from './StellarProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StellarProvider>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'ycmnru1r3d00bn0cjv75nxjs1h'}
          config={{
            loginMethods: ['email', 'google', 'wallet'],
            appearance: {
              theme: 'dark',
              accentColor: '#E91E8C',
            },
            embeddedWallets: {
              ethereum: { createOnLogin: 'all-users' },
            },
            supportedChains: [base, celo, mainnet],
          }}
        >
          {children}
        </PrivyProvider>
      </StellarProvider>
    </QueryClientProvider>
  );
}
