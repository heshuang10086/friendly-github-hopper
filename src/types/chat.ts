
export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  created_at: string;
  messages: Message[];
}
