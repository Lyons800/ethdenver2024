/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from 'ai';
import type { ReactNode } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { ChatMessageActions } from '@/lib/components/chat-message-actions';
import { MemoizedReactMarkdown } from '@/lib/components/markdown';
import { CodeBlock } from '@/lib/components/ui/codeblock';
import { IconOpenAI, IconUser } from '@/lib/components/ui/icons';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  message: Message;
}

interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: ReactNode; // Use ReactNode for children
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({
              node,
              inline,
              className,
              children,
              ...props
            }: CodeComponentProps) {
              if (!children) return null;
              let processedChildren = children;

              // Check if children is a string and perform your operations
              if (typeof children === 'string') {
                // Now safe to check for specific string content
                if (children.startsWith('`▍`')) {
                  processedChildren = (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                } else {
                  // Replace '`▍`' with '▍' in the string
                  processedChildren = children.replace('`▍`', '▍');
                }
              }

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {processedChildren}
                  </code>
                );
              }

              const match = /language-(\w+)/.exec(className || '');

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
