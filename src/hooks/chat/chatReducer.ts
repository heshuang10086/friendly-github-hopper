
import { ChatState, ChatAction } from "@/types/chatState";

export const initialChatState: ChatState = {
  messages: [],
  input: "",
  isLoading: false,
  model: "deepseek-chat",
  chatSessions: [],
  currentSessionId: null,
};

export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_MODEL':
      return { ...state, model: action.payload };
    case 'SET_CHAT_SESSIONS':
      return { ...state, chatSessions: action.payload };
    case 'SET_CURRENT_SESSION':
      return { ...state, currentSessionId: action.payload };
    default:
      return state;
  }
};
