
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, FileText } from "lucide-react";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        setUserRole(session.user.user_metadata.role);
        setUserName(session.user.user_metadata.full_name || session.user.email || "用户");
      }
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setUserRole(session.user.user_metadata.role);
        setUserName(session.user.user_metadata.full_name || session.user.email || "用户");
      } else {
        setUserRole(null);
        setUserName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const getDashboardLink = () => {
    if (userRole === "job_seeker") return "/seeker-dashboard";
    if (userRole === "recruiter") return "/recruiter-dashboard";
    return "/auth";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          AI招聘
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-secondary hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-secondary hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/chat" className="text-secondary hover:text-primary transition-colors">
            Chat
          </Link>
          <Link to="/about" className="text-secondary hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to={getDashboardLink()}>
                <Button variant="ghost" className="hidden md:inline-flex">
                  仪表板
                </Button>
              </Link>
              {userRole === 'job_seeker' && (
                <Link to="/my-resume" className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
                  <FileText className="h-4 w-4" />
                  <span className="hidden md:inline">我的简历</span>
                </Link>
              )}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">{userName}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <UserRound className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button onClick={handleSignOut} variant="default">
                退出登录
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="default">
                登录
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

