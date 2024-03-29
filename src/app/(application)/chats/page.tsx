'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Input } from '@/lib/components/ui/input';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

const chatsData = [
  { id: 1, title: 'Chat 1', lastMessage: 'Hello there!' },
  { id: 2, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 3, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 4, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 5, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 6, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 3, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 4, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 5, title: 'Chat 2', lastMessage: 'How are you?' },
  { id: 6, title: 'Chat 2', lastMessage: 'How are you?' },
  // Add more chat objects here
];

export default function ChatPage() {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [chats, setChats] = useState(chatsData);

  // const handleSearch = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   setSearchTerm(value);
  //   const filteredChats = chatsData.filter((chat) =>
  //     chat.title.toLowerCase().includes(value)
  //   );
  //   setChats(filteredChats);
  // };

  return (
    <div className="overflow-none mx-4 flex h-full min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Chats</h1>
      <Input
        type="text"
        placeholder="Search chats..."
        // value={searchTerm}
        // onChange={handleSearch}
        className="mb-4 p-2"
      />
      <div className="h-full w-full">
        <ScrollArea className="h-full">
          {chatsData.map((chat) => (
            <Link
              href={`/chats/${chat.id}`}
              key={chat.id}
              className="cursor-pointer p-4"
            >
              <h2 className="text-xl font-semibold">{chat.title}</h2>
              <p>{chat.lastMessage}</p>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
