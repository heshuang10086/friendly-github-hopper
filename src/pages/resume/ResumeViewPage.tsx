
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import type { Resume } from "@/types/resume";
import ParsedResumeContent from "@/components/resume/ParsedResumeContent";
import EditableResumeContent from "@/components/resume/EditableResumeContent";
import { toast } from "sonner";

const ResumeViewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const resumeFromState = location.state?.resume as Resume | undefined;
  const [resume, setResume] = useState<Resume | null>(resumeFromState || null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [parsedContent, setParsedContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<any>(null);

  useEffect(() => {
    const fetchResume = async () => {
      setIsLoading(true);
      try {
        // If we have a resume ID from URL params but no resume data
        if (params.id && !resumeFromState) {
          const { data: resumeData, error } = await supabase
            .from("resumes")
            .select("*")
            .eq("id", params.id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (resumeData) {
            setResume(resumeData);
          } else {
            // No resume found with this ID
            navigate("/my-resume");
            return;
          }
        } else if (!resumeFromState && !params.id) {
          // No resume in state and no ID in URL
          navigate("/my-resume");
          return;
        }
        
        const currentResume = params.id && !resumeFromState 
          ? resume 
          : resumeFromState;
          
        if (!currentResume) return;

        // Get PDF URL
        const { data: urlData } = await supabase.storage
          .from("resumes")
          .createSignedUrl(currentResume.file_path, 3600);

        if (urlData) {
          setPdfUrl(urlData.signedUrl);
        }

        // Get latest resume data with parsed content
        const { data: resumeData } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", currentResume.id)
          .single();

        if (resumeData?.parsed_content) {
          setParsedContent(resumeData.parsed_content);
          
          // Initialize the edited content with the parsed content
          try {
            setEditedContent(JSON.parse(resumeData.parsed_content));
          } catch (e) {
            console.error("Failed to parse resume content", e);
          }
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [params.id, resumeFromState, resume, navigate]);

  const handleSaveChanges = async () => {
    if (!resume || !editedContent) return;
    
    setIsSaving(true);
    try {
      // Update the main resume fields
      const resumeUpdate: Partial<Resume> = {
        parsed_content: JSON.stringify(editedContent),
        candidate_name: editedContent.姓名 || null,
        phone_number: editedContent.手机号 || null,
        email: editedContent.邮箱 || null,
        work_years: editedContent.工作年限 || null,
        preferred_location: editedContent.期望工作地 || null,
        preferred_position: editedContent.期望职位 || null,
        self_introduction: editedContent.自我介绍 || null,
      };
      
      const { error: updateError } = await supabase
        .from("resumes")
        .update(resumeUpdate)
        .eq("id", resume.id);
        
      if (updateError) throw updateError;
      
      // Success - update the UI state
      setParsedContent(JSON.stringify(editedContent));
      setIsEditing(false);
      toast.success("简历信息更新成功");
    } catch (error) {
      console.error("Error saving resume changes:", error);
      toast.error("保存失败，请重试");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9FF] to-[#EDF8FF]">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-16">
        <div className="mb-6 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/my-resume")}
            className="gap-2 bg-white text-[#2B5BA9] border-[#D6E4FF] hover:bg-[#EDF4FF] hover:text-[#1A4897]"
          >
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="gap-2 bg-white text-[#2B5BA9] border-[#D6E4FF]"
                >
                  取消
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="gap-2 bg-[#2B5BA9] text-white hover:bg-[#1A4897]"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1"></div>
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      保存更改
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="gap-2 bg-[#2B5BA9] text-white hover:bg-[#1A4897]"
              >
                <Edit className="h-4 w-4" />
                编辑信息
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="h-[800px] flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#52A3FF] border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-[800px] rounded-lg border border-[#D6E4FF] bg-white shadow-sm overflow-hidden">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-full rounded-lg"
                  title="Resume PDF"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[#8CA3C3]">无法加载PDF</p>
                </div>
              )}
            </div>
            <div className="h-[800px] rounded-lg border border-[#D6E4FF] bg-white shadow-sm p-4 overflow-hidden">
              {isEditing ? (
                <EditableResumeContent 
                  parsedContent={editedContent} 
                  onChange={setEditedContent} 
                />
              ) : (
                <ParsedResumeContent parsedContent={parsedContent} />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ResumeViewPage;
