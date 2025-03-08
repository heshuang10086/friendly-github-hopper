
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import { format } from "date-fns";

export const saveChatMessage = async (message: Message) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      console.error('未登录用户');
      toast.error("请先登录");
      return false;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', session.session.user.id)
      .single();

    if (profileError || !profile) {
      console.error('未找到用户档案:', profileError);
      toast.error("保存聊天消息失败：未找到用户档案");
      return false;
    }

    const { error: saveError } = await supabase
      .from('chat_history')
      .insert([{
        user_id: profile.id,
        role: message.role,
        message: message.content,
        created_at: new Date().toISOString()
      }]);

    if (saveError) {
      console.error('保存聊天消息失败:', saveError);
      toast.error("保存聊天消息失败");
      return false;
    }

    return true;
  } catch (error) {
    console.error('保存聊天消息时发生错误:', error);
    toast.error("保存聊天消息失败");
    return false;
  }
};

export const loadChatHistory = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      console.error('未登录用户');
      toast.error("请先登录");
      return [];
    }

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('加载聊天历史出错:', error);
      toast.error("加载聊天历史失败");
      return [];
    }

    return data;
  } catch (error) {
    console.error('加载聊天历史时发生错误:', error);
    toast.error("加载聊天历史失败");
    return [];
  }
};

export const clearChatHistory = async (sessionId: string) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      toast.error("请先登录");
      return false;
    }

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('id', sessionId)
      .eq('user_id', session.session.user.id);

    if (error) {
      console.error('清除聊天记录失败:', error);
      toast.error("清除聊天记录失败");
      return false;
    }

    return true;
  } catch (error) {
    console.error('清除聊天记录时发生错误:', error);
    toast.error("清除聊天记录失败");
    return false;
  }
};
