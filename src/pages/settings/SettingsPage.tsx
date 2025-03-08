
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UserInfoCard from "@/components/settings/UserInfoCard";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserName(session.user.user_metadata.full_name || "用户");
      setUserRole(session.user.user_metadata.role || "未知角色");
      setUserEmail(session.user.email || "");
      setCreatedAt(new Date(session.user.created_at).toLocaleDateString('zh-CN'));
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">个人设置</h1>
        
        <UserInfoCard 
          userName={userName}
          userRole={userRole}
          userEmail={userEmail}
          createdAt={createdAt}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
