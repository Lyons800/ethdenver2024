'use client';

import type React from 'react';
import { useEffect } from 'react';

import { useWallet } from '@/context/wallet-context';
import Layout from '@/lib/layout';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const { isSignedIn } = useWallet();
  // const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = 'http://localhost:3000/connect-account';
    }
  }, [isSignedIn]);

  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
};

export default ApplicationLayout;
