'use client';

import { useChat, type Message } from 'ai/react';

import { cn } from '@/lib/utils';
import { ChatList } from '@/lib/components/chat-list';
import { ChatPanel } from '@/lib/components/chat-panel';
import { EmptyScreen } from '@/lib/components/empty-screen';
import { ChatScrollAnchor } from '@/lib/components/chat-scroll-anchor';
import { useLocalStorage } from '@/hooks/use-local-storage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
// export interface ChatProps extends React.ComponentProps<'div'> {
//   initialMessages?: Message[];
//   id?: string;
// }

export default function Chat() {
  const router = useRouter();
  const path = usePathname();
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  );
  const [previewTokenDialog, setPreviewTokenDialog] = useState(true);
  const [previewTokenInput, setPreviewTokenInput] = useState(
    previewToken ?? ''
  );

  const id = '1';
  const className = '';

  const initialMessages: Message[] = [
    {
      id: '1',
      content: 'Hello, how can I help you today?',
      role: 'user',
    },
  ];
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
      onFinish() {
        if (!path.includes('chat')) {
          window.history.pushState({}, '', `/chat/${id}`);
        }
      },
    });

  // const messages: Message[] = [
  //   {
  //     id: '1',
  //     content: 'Hello, how can I help you today?',
  //     role: 'user',
  //   },
  // ];
  // const isLoading = false;
  // const setInput = () => {};
  // const stop = () => {};
  // const append = () => {};
  // const reload = () => {};
  // const input = '';

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      {/* <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your OpenAI Key</DialogTitle>
          <DialogDescription>
            If you have not obtained your OpenAI API key, you can do so by{' '}
            <a
              href="https://platform.openai.com/signup/"
              className="underline"
            >
              signing up
            </a>{' '}
            on the OpenAI website. This is only necessary for preview
            environments so that the open source community can test the app.
            The token will be saved to your browser&apos;s local storage under
            the name <code className="font-mono">ai-token</code>.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={previewTokenInput}
          placeholder="OpenAI API key"
          onChange={e => setPreviewTokenInput(e.target.value)}
        />
        <DialogFooter className="items-center">
          <Button
            onClick={() => {
              setPreviewToken(previewTokenInput)
              setPreviewTokenDialog(false)
            }}
          >
            Save Token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> */}
    </>
  );
}
