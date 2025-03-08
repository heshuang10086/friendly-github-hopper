import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PlusCircle, ClipboardList, Users, Building } from "lucide-react";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      if (session.user.user_metadata.role !== "recruiter") {
        navigate("/auth");
        return;
      }

      setUserName(session.user.user_metadata.full_name || "招聘者");
    };

    checkAuth();
  }, [navigate]);

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
              在这里管理你的招聘需求，找到最合适的人才
            </p>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-24 bg-surface px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-16">快速操作</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "发布职位",
                  description: "创建新的职位发布",
                  icon: <PlusCircle className="w-8 h-8" />,
                },
                {
                  title: "职位管理",
                  description: "管理已发布的职位",
                  icon: <ClipboardList className="w-8 h-8" />,
                },
                {
                  title: "申请管理",
                  description: "查看收到的申请",
                  icon: <Users className="w-8 h-8" />,
                },
                {
                  title: "公司信息",
                  description: "管理公司资料",
                  icon: <Building className="w-8 h-8" />,
                },
              ].map((action, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-accent transition-colors text-center"
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

export default RecruiterDashboard;
