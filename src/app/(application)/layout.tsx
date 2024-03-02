'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';

import { useWallet } from '@/context/wallet-context';
import Layout from '@/lib/layout';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const { isSignedIn } = useWallet();
  const router = useRouter();

  if (!isSignedIn) {
    router.push('/connect-account');
  }

  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
};

export default ApplicationLayout;
