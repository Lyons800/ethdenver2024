'use client';

import {
  Building,
  Coins,
  Link2Icon,
  MenuIcon,
  TicketIcon,
  SettingsIcon,
  HelpCircleIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useWallet } from '@/context/wallet-context';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

export function SideMenu() {
  const { wallet } = useWallet();

  const router = useRouter();

  const topLinks = [
    {
      label: 'My Tickets',
      href: '/my-tickets',
      icon: <TicketIcon size={28} />,
    },
    {
      label: 'Network',
      href: '/network',
      icon: <Link2Icon size={28} />,
    },
    {
      label: 'Book a Venue',
      href: '/create-event',
      icon: <Building size={28} />,
    },
    {
      label: 'Sponsor an Event',
      href: '/notifications',
      icon: <Coins size={28} />,
    },
  ];

  const bottomLinks = [
    {
      label: 'Settings',
      href: '/settings',
      icon: <SettingsIcon size={28} />,
    },
    {
      label: 'Support',
      href: '/support',
      icon: <HelpCircleIcon size={28} />,
    },
    {
      label: 'Join Our Community',
      href: '/community',
      icon: <UsersIcon size={28} />,
    },
  ];

  const handleSignOut = () => {
    // Sign out logic
    wallet.signOut();
    router.push('/connect-account');
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-[20px] mr-[20px] flex h-screen w-[250px] flex-col rounded-none">
        <div className="p-4">
          <Avatar className="mb-4">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          Lyons800
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <div className="flex flex-col gap-2">
            {topLinks.map(({ href, label, icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {icon}
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {label}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pb-4">
            {bottomLinks.map(({ href, label, icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {icon}
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {label}
                </span>
              </Link>
            ))}
            <button
              type="button"
              aria-label="Sign Out"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Link2Icon size={28} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
