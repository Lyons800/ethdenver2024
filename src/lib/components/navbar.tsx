'use client';

import {
  BellIcon,
  CompassIcon,
  HomeIcon, // Ensure correct import for HomeIcon
  MessagesSquareIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreateEventSheet } from './create-event-sheet';

const BottomNav = () => {
  const pathname = usePathname();

  // Split links into two groups for layout purposes
  const leftLinks = [
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon size={18} />,
    },
    {
      label: 'Discover',
      href: '/discover',
      icon: <CompassIcon size={18} />,
    },
  ];

  const rightLinks = [
    {
      label: 'Notifications',
      href: '/notifications',
      icon: <BellIcon size={18} />,
    },
    {
      label: 'Chats',
      href: '/xmtp-chat',
      icon: <MessagesSquareIcon size={18} />,
    },
  ];

  return (
    <div className="pb-4 sm:hidden">
      <nav className="pb-safe fixed bottom-0 w-full border-t bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex h-16 max-w-md items-center justify-between px-6">
          {/* Render left group of links */}
          <div className="flex items-center justify-around space-x-4">
            {leftLinks.map(({ href, label, icon }) => (
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
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </div>

          {/* CreateEventSheet or its trigger should go here */}
          <CreateEventSheet />

          {/* Render right group of links */}
          <div className="flex items-center justify-around space-x-4">
            {rightLinks.map(({ href, label, icon }) => (
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
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
