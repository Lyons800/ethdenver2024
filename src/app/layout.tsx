import type { Metadata, Viewport } from 'next';

import { WalletProvider } from '@/context/wallet-context'; // Adjust the import path as needed
import { Providers } from '@/lib/components/providers';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/styles/utils';
import '@/lib/styles/globals.css';

const APP_NAME = 'nextarter-tailwind';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Next.js + TailwindCSS v3 + TypeScript template',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://nextarter-tailwind.sznm.dev',
    title: 'nextarter-tailwind',
    description: 'Next.js + TailwindCSS v3 + TypeScript template',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-tailwind**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-tailwind.sznm.dev og-image',
    },
  },
  twitter: {
    creator: '@sozonome',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <WalletProvider>
            <div className="flex-1">{children}</div>
          </WalletProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
