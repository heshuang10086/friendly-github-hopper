
import { Button } from "@/components/ui/button";
import { Plus, Trash, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ChatSession } from "@/types/chat";

interface ChatControlsProps {
  onNewChat: () => void;
  onClearChat: () => void;
  onSelectSession: (sessionId: string) => void;
  chatSessions: ChatSession[];
  isLoading: boolean;
}

export const ChatControls = ({
  onNewChat,
  onClearChat,
  onSelectSession,
  chatSessions,
  isLoading,
}: ChatControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={onNewChat}
        disabled={isLoading}
        title="新建会话"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={onClearChat}
        disabled={isLoading}
        title="清除会话"
      >
        <Trash className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            disabled={isLoading}
            title="历史会话"
          >
            <History className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          {chatSessions.map((session) => (
            <DropdownMenuItem 
              key={session.id}
              onClick={() => onSelectSession(session.id)}
            >
              {format(new Date(session.created_at), 'yyyy-MM-dd HH:mm')}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
