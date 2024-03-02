import { type Message } from 'ai';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Event {
  id: string;
  name: string;
  dateTime: string; // Changed from 'date' to 'dateTime'
  image: string;
  location: string;
  description?: string; // Add this if you want to include descriptions, make it optional if it's not always present
}
