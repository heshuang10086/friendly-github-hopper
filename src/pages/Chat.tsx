
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: "This is a simulated AI response. Please implement actual API integration.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col">
      <Navigation />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 mt-16">
        <Card className="min-h-[600px] flex flex-col bg-[#242424] border-[#333333]">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8">
                <h1 className="text-4xl font-semibold text-white">What can I help with?</h1>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="outline" className="bg-[#333333] text-white border-[#444444] hover:bg-[#444444]">
                    Create image
                  </Button>
                  <Button variant="outline" className="bg-[#333333] text-white border-[#444444] hover:bg-[#444444]">
                    Summarize text
                  </Button>
                  <Button variant="outline" className="bg-[#333333] text-white border-[#444444] hover:bg-[#444444]">
                    Analyze data
                  </Button>
                  <Button variant="outline" className="bg-[#333333] text-white border-[#444444] hover:bg-[#444444]">
                    Code
                  </Button>
                  <Button variant="outline" className="bg-[#333333] text-white border-[#444444] hover:bg-[#444444]">
                    Get advice
                  </Button>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-[#333333]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </CardContent>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#333333]">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="bg-[#333333] border-[#444444] text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#333333] hover:bg-[#444444] text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
