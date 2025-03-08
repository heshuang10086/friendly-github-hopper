
import { Message } from "@/types/chat";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] flex items-center justify-center">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-primary">AI 助手</h1>
          <p className="text-secondary max-w-[280px]">
            您好！我可以帮您回答问题并提供指导。
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-[#9EE755] hover:bg-[#9EE755]/10">
            职业规划
          </Button>
          <Button variant="outline" className="border-[#9EE755] hover:bg-[#9EE755]/10">
            简历建议
          </Button>
          <Button variant="outline" className="border-[#9EE755] hover:bg-[#9EE755]/10">
            面试技巧
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.role === "user"
                ? "bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] text-primary"
                : "bg-background border border-border"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};
