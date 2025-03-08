
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useChat } from "@/hooks/useChat";
import { ChatControls } from "./chat/ChatControls";
import { MessageList } from "./chat/MessageList";

const FloatingChat = () => {
  const { 
    messages,
    input,
    setInput,
    isLoading,
    model,
    setModel,
    chatSessions,
    loadChatSessions,
    selectSession,
    newChat,
    clearChat,
    sendMessage
  } = useChat();

  useEffect(() => {
    loadChatSessions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    await sendMessage(userMessage);
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("请上传 PDF 或 Word 文档");
      return;
    }

    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      toast.error("请先登录");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', session.data.session.user.id);

    try {
      const { data, error } = await supabase.functions.invoke('parse-resume', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast.success("简历上传成功！");
      
      const assistantMessage = {
        role: "assistant" as const,
        content: "您的简历已成功上传！我可以帮您分析内容并提供改进建议。"
      };
      sendMessage(assistantMessage);
    } catch (error) {
      console.error('上传失败:', error);
      toast.error(error.message || "上传失败，请重试");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            size="lg" 
            className="rounded-full w-12 h-12 bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] hover:opacity-90"
          >
            <Bot className="h-6 w-6 text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <ChatControls 
              onNewChat={newChat}
              onClearChat={clearChat}
              onSelectSession={selectSession}
              chatSessions={chatSessions}
              isLoading={isLoading}
            />
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择模型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepseek-chat">DeepSeek 聊天</SelectItem>
                <SelectItem value="deepseek-r1">DeepSeek R1 精简版</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon"
              disabled={isLoading}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx';
                input.onchange = (e) => handleResumeUpload(e as any);
                input.click();
              }}
              title="上传简历"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>

          <MessageList messages={messages} />
          
          <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入您的问题..."
                disabled={isLoading}
                className="bg-background border-border"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] text-primary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FloatingChat;
