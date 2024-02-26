'use client';

import {
  BellIcon,
  CompassIcon,
  Home,
  MessagesSquareIcon,
  PlusCircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav = () => {
  const pathname = usePathname();

  const links = [
    {
      label: 'Home',
      href: '/',
      icon: <Home size={18} />,
    },
    {
      label: 'Discover',
      href: '/discover',
      icon: <CompassIcon size={18} />,
    },
    {
      label: 'Create',
      href: '/create-event',
      icon: <PlusCircleIcon size={18} />,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: <BellIcon size={18} />,
    },
    {
      label: 'Chats',
      href: '/chats',
      icon: <MessagesSquareIcon size={18} />,
    },
  ];

  return (
    <div className="sm:hidden">
      <nav className="pb-safe fixed bottom-0 w-full border-t bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
          {links.map(({ href, label, icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${
                pathname === href
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
              }`}
            >
              {icon}
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
