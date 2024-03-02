import type React from 'react';

import Layout from '@/lib/layout';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
};

export default ApplicationLayout;
