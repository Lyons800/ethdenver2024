// import { ThemeToggle } from '@/lib/components/theme-toggle';
// import { MenuIcon } from 'lucide-react';

// import { Button } from '../components/ui/button';
import { SideMenu } from '../components/side-menu';

const Header = () => {
  return (
    <header className="bg-base-100/80 sticky top-0 z-10 w-full backdrop-blur-md">
      <section className="wrapper mx-auto flex items-center justify-between py-2">
        <div className="ml-auto">
          {/* <ThemeToggle /> */}

          <SideMenu />
        </div>
      </section>
    </header>
  );
};

export default Header;
