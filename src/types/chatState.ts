
import { Message, ChatSession } from "./chat";

export interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
  model: string;
  chatSessions: ChatSession[];
  currentSessionId: string | null;
}

export type ChatAction = 
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_MODEL'; payload: string }
  | { type: 'SET_CHAT_SESSIONS'; payload: ChatSession[] }
  | { type: 'SET_CURRENT_SESSION'; payload: string | null };

