'use client';

import { useEffect, type ReactNode } from 'react';

import BottomNav from '../components/navbar';
import { ThemeProvider } from '@/lib/components/theme-provider';

// import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const useDisablePinchZoom = () => {
  useEffect(() => {
    const preventZoom = (e) => {
      e.preventDefault();
      document.body.style.zoom = 0.99;
    };

    const resetZoom = (e) => {
      e.preventDefault();
      document.body.style.zoom = 1;
    };

    document.addEventListener('gesturestart', preventZoom);
    document.addEventListener('gesturechange', preventZoom);
    document.addEventListener('gestureend', resetZoom);

    return () => {
      document.removeEventListener('gesturestart', preventZoom);
      document.removeEventListener('gesturechange', preventZoom);
      document.removeEventListener('gestureend', resetZoom);
    };
  }, []);
};

const Layout = ({ children }: LayoutProps) => {
  useDisablePinchZoom();
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
