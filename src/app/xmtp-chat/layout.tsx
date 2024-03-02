'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('./app'), {
  ssr: false,
});
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <App>{children}</App>;
};

export default Layout;
