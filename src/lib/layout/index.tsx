import type { ReactNode } from 'react';

import BottomNav from '../components/navbar';
import { ThemeProvider } from '@/lib/components/theme-provider';

// import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="wrapper">{children}</main>
        {/* <Footer /> */}
        <BottomNav />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
