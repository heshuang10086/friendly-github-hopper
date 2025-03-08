
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Github } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"job_seeker" | "recruiter">("job_seeker");
  const [loading, setLoading] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const redirectToDashboard = (userRole: string) => {
    if (userRole === "job_seeker") {
      navigate("/seeker-dashboard");
    } else if (userRole === "recruiter") {
      navigate("/recruiter-dashboard");
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Check if user has metadata with role
        const userRole = session.user.user_metadata.role;
        if (userRole) {
          redirectToDashboard(userRole);
        } else {
          // If no role is set, show role selection dialog
          setShowRoleDialog(true);
        }
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Check if user has metadata with role
        const userRole = session.user.user_metadata.role;
        if (userRole) {
          redirectToDashboard(userRole);
        } else {
          // If no role is set, show role selection dialog
          setShowRoleDialog(true);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin + "/auth"
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: error.message,
      });
    }
  };

  const handleRoleSubmit = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.updateUser({
        data: { role }
      });

      if (error) throw error;

      if (user) {
        toast({
          title: "角色设置成功",
          description: "正在跳转到仪表板...",
        });
        setShowRoleDialog(false);
        redirectToDashboard(role);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: error.message,
      });
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message === "Invalid login credentials") {
            throw new Error("邮箱或密码错误");
          } else if (error.message.includes("Email not confirmed")) {
            throw new Error("请先验证邮箱后再登录");
          }
          throw error;
        }

        if (data.user) {
          const userRole = data.user.user_metadata.role;
          if (userRole) {
            toast({
              title: "登录成功",
              description: "正在跳转到仪表板...",
            });
            redirectToDashboard(userRole);
          } else {
            setShowRoleDialog(true);
          }
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            },
          },
        });
        
        if (signUpError) throw signUpError;

        toast({
          title: "注册成功!",
          description: "请查收邮箱并点击验证链接完成注册。验证后即可登录。",
        });
        setIsLogin(true); // Switch to login view
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "错误",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {isLogin ? "登录" : "注册"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGitHubLogin}
              >
                <Github className="mr-2 h-4 w-4" />
                使用 GitHub 登录
              </Button>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  或者使用邮箱{isLogin ? "登录" : "注册"}
                </span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="fullName">姓名</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>角色</Label>
                    <RadioGroup
                      value={role}
                      onValueChange={(value: "job_seeker" | "recruiter") =>
                        setRole(value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="job_seeker" id="job_seeker" />
                        <Label htmlFor="job_seeker">求职者</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recruiter" id="recruiter" />
                        <Label htmlFor="recruiter">招聘者</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "处理中..." : (isLogin ? "登录" : "注册")}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={loading}
              >
                {isLogin ? "没有账号? 注册" : "已有账号? 登录"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>选择你的角色</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <RadioGroup
              value={role}
              onValueChange={(value: "job_seeker" | "recruiter") => setRole(value)}
              className="flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="job_seeker" id="role_job_seeker" />
                <Label htmlFor="role_job_seeker">求职者</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="role_recruiter" />
                <Label htmlFor="role_recruiter">招聘者</Label>
              </div>
            </RadioGroup>
          </div>
          <Button onClick={handleRoleSubmit}>确认</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthPage;
