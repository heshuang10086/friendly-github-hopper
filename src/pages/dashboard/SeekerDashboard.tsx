
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { UserRound, BookOpenText, FileSpreadsheet, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      if (session.user.user_metadata.role !== "job_seeker") {
        navigate("/auth");
        return;
      }

      setUserName(session.user.user_metadata.full_name || "求职者");
      setUserId(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("请上传 PDF 或 Word 格式的文件");
      return;
    }

    setIsUploading(true);
    setShowProgress(true);
    setUploadProgress(0);
    
    try {
      // 处理文件名，移除非 ASCII 字符
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const sanitizedFileName = `${userId}/${timestamp}_resume.${fileExt}`;

      // 设置一个模拟的上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // 直接上传到存储桶
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(sanitizedFileName, file);

      clearInterval(progressInterval);

      if (error) {
        throw error;
      }

      setUploadProgress(100);

      // 保存简历记录到数据库
      const { error: dbError } = await supabase
        .from('resumes')
        .insert({
          file_name: file.name,
          file_path: sanitizedFileName,
          user_id: userId
        });

      if (dbError) {
        throw dbError;
      }

      toast.success("简历上传成功！");

      // 3秒后隐藏进度条
      setTimeout(() => {
        setShowProgress(false);
        setUploadProgress(0);
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("上传失败，请重试");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-6">
              欢迎回来，
              <span className="bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-secondary mb-8">
              在这里开启你的求职之旅，探索更多职业机会
            </p>
            {showProgress && (
              <div className="max-w-md mx-auto">
                <Progress value={uploadProgress} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {uploadProgress === 100 ? "上传完成" : "正在上传..."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-24 bg-surface px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-16">快速操作</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "浏览职位",
                  description: "查看最新的职位机会",
                  icon: <UserRound className="w-8 h-8" />,
                  action: () => {},
                },
                {
                  title: "上传简历",
                  description: "更新你的个人简历",
                  icon: <FileSpreadsheet className="w-8 h-8" />,
                  action: () => {
                    if (isUploading) return;
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.doc,.docx';
                    input.onchange = (e) => handleFileUpload(e as any);
                    input.click();
                  },
                },
                {
                  title: "申请记录",
                  description: "查看你的申请状态",
                  icon: <BookOpenText className="w-8 h-8" />,
                  action: () => {},
                },
                {
                  title: "个人设置",
                  description: "管理你的个人信息",
                  icon: <Settings className="w-8 h-8" />,
                  action: () => navigate("/settings"),
                },
              ].map((action, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-accent transition-colors text-center cursor-pointer"
                  onClick={action.action}
                >
                  <div className="flex justify-center mb-4 text-primary">
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-secondary">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeekerDashboard;

