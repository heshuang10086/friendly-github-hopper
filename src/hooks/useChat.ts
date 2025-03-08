
import { useReducer, useCallback } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { chatReducer, initialChatState } from "./chat/chatReducer";
import { saveChatMessage, loadChatHistory, clearChatHistory } from "@/services/chatService";

export const useChat = () => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const loadChatSessions = useCallback(async () => {
    const data = await loadChatHistory();
    if (data) {
      const sessions = data.reduce((acc: any[], curr: any) => {
        const date = format(new Date(curr.created_at), 'yyyy-MM-dd HH:mm');
        const existingSession = acc.find(s => format(new Date(s.created_at), 'yyyy-MM-dd HH:mm') === date);
        
        if (existingSession) {
          existingSession.messages.push({
            role: curr.role as "user" | "assistant",
            content: curr.message
          });
        } else {
          acc.push({
            id: curr.id,
            created_at: curr.created_at,
            messages: [{
              role: curr.role as "user" | "assistant",
              content: curr.message
            }]
          });
        }
        return acc;
      }, []);

      dispatch({ type: 'SET_CHAT_SESSIONS', payload: sessions });
    }
  }, []);

  const selectSession = useCallback((sessionId: string) => {
    const session = state.chatSessions.find(s => s.id === sessionId);
    if (session) {
      dispatch({ type: 'SET_MESSAGES', payload: session.messages });
      dispatch({ type: 'SET_CURRENT_SESSION', payload: sessionId });
    }
  }, [state.chatSessions]);

  const newChat = useCallback(() => {
    dispatch({ type: 'SET_MESSAGES', payload: [] });
    dispatch({ type: 'SET_CURRENT_SESSION', payload: null });
    toast.success("已创建新会话");
  }, []);

  const clearChat = useCallback(async () => {
    if (state.currentSessionId) {
      const success = await clearChatHistory(state.currentSessionId);
      if (success) {
        dispatch({ type: 'SET_MESSAGES', payload: [] });
        await loadChatSessions();
        toast.success("已清除聊天记录");
      }
    }
  }, [state.currentSessionId, loadChatSessions]);

  const sendMessage = useCallback(async (userMessage: Message) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        toast.error("请先登录");
        return;
      }

      // 更新本地消息状态以立即显示用户消息
      const updatedMessages = [...state.messages, userMessage];
      dispatch({ type: 'SET_MESSAGES', payload: updatedMessages });
      
      const saved = await saveChatMessage(userMessage);
      if (!saved) {
        // 如果保存失败，回滚消息状态
        dispatch({ type: 'SET_MESSAGES', payload: state.messages });
        return;
      }

      dispatch({ type: 'SET_INPUT', payload: "" });
      dispatch({ type: 'SET_LOADING', payload: true });

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: updatedMessages,
          model: state.model,
        },
      });

      if (error) {
        throw error;
      }

      const aiMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      
      // 更新本地消息状态以包含 AI 回复
      const finalMessages = [...updatedMessages, aiMessage];
      dispatch({ type: 'SET_MESSAGES', payload: finalMessages });
      await saveChatMessage(aiMessage);
      
      // 更新会话列表
      await loadChatSessions();
    } catch (error) {
      console.error('调用聊天功能失败:', error);
      toast.error("发送消息失败");
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.messages, state.model, loadChatSessions]);

  return {
    messages: state.messages,
    input: state.input,
    setInput: (input: string) => dispatch({ type: 'SET_INPUT', payload: input }),
    isLoading: state.isLoading,
    model: state.model,
    setModel: (model: string) => dispatch({ type: 'SET_MODEL', payload: model }),
    chatSessions: state.chatSessions,
    currentSessionId: state.currentSessionId,
    loadChatSessions,
    selectSession,
    newChat,
    clearChat,
    sendMessage
  };
};

