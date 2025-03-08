
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Resume } from "@/types/resume";
import { useNavigate } from "react-router-dom";

export const usePdfParser = () => {
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [parsingResumeId, setParsingResumeId] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveStructuredData = async (resumeId: string, data: any) => {
    try {
      // Update basic resume information and parse status
      await supabase
        .from('resumes')
        .update({
          candidate_name: data.姓名,
          phone_number: data.手机号,
          email: data.邮箱,
          work_years: data.工作年限,
          preferred_location: data.期望工作地,
          preferred_position: data.期望职位,
          self_introduction: data.自我介绍,
          parse_status: 'completed',
          parsed_content: JSON.stringify(data, null, 2)  // 保存完整的解析结果
        })
        .eq('id', resumeId);

      // Save education data
      if (data.教育背景?.length > 0) {
        const educationData = data.教育背景.map((edu: any) => ({
          resume_id: resumeId,
          school: edu.毕业院校,
          major: edu.所学专业,
          study_period: edu.求学起止时间,
          education_level: edu.学术水平,
        }));
        await supabase.from('resume_education').insert(educationData);
      }

      // Save awards data
      if (data.获得奖项?.length > 0) {
        const awardsData = data.获得奖项.map((award: any) => ({
          resume_id: resumeId,
          award_name: award.奖项名称,
          award_year: award.获奖时间,
        }));
        await supabase.from('resume_awards').insert(awardsData);
      }

      // Save skills data
      if (data.个人技能?.length > 0) {
        const skillsData = data.个人技能.map((skill: any) => ({
          resume_id: resumeId,
          skill_name: skill.技能项名称,
          proficiency: skill.掌握程度,
          description: skill.技能描述,
        }));
        await supabase.from('resume_skills').insert(skillsData);
      }

      // Save work experience data
      if (data.工作经历?.length > 0) {
        const workData = data.工作经历.map((work: any) => ({
          resume_id: resumeId,
          work_period: work.工作起止时间,
          company_name: work.公司名称,
          department: work.工作部门,
          job_description: work.职位描述,
        }));
        await supabase.from('resume_work_experience').insert(workData);
      }

      // Save project experience data
      if (data.项目经历?.length > 0) {
        const projectData = data.项目经历.map((project: any) => ({
          resume_id: resumeId,
          project_period: project.起止时间,
          project_name: project.项目名称,
          role: project.担任角色,
          project_description: project.项目描述,
          responsibilities: project.负责主要工作描述,
        }));
        await supabase.from('resume_projects').insert(projectData);
      }
    } catch (error) {
      console.error('Error saving structured data:', error);
      throw error;
    }
  };

  const handleResumeParse = async (resume: Resume) => {
    setIsParsingResume(true);
    setParsingResumeId(resume.id);
    try {
      // Update resume status to processing
      await supabase
        .from('resumes')
        .update({ parse_status: 'processing' })
        .eq('id', resume.id);

      // Get file's signed URL
      const { data: urlData } = await supabase.storage
        .from("resumes")
        .createSignedUrl(resume.file_path, 3600);
  
      if (!urlData) {
        throw new Error("无法获取文件 URL");
      }
  
      // Call backend parsing API
      const response = await fetch('http://localhost:5000/parse-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_url: urlData.signedUrl
        }),
      });
  
      if (!response.ok) {
        throw new Error('解析失败');
      }
  
      const result = await response.json();
      
      // Structure the data with avatars if they exist
      const parsedData = result.parsed_text;
      if (result.avatars && Array.isArray(result.avatars)) {
        parsedData.avatars = result.avatars;
      }
      
      await saveStructuredData(resume.id, parsedData);
      
      // 获取最新的简历数据
      const { data: updatedResume } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resume.id)
        .single();
      
      // 成功提示并显示查看按钮
      toast.success("简历解析成功", {
        description: "点击下方按钮查看详细解析结果",
        action: {
          label: "查看解析结果",
          onClick: () => navigate(`/resume-view/${resume.id}`, { 
            state: { resume: updatedResume } 
          })
        },
        duration: 5000
      });

    } catch (error) {
      console.error('Parse error:', error);
      // Update resume status to failed
      await supabase
        .from('resumes')
        .update({ parse_status: 'failed' })
        .eq('id', resume.id);
      toast.error("简历解析失败，请重试");
    } finally {
      setIsParsingResume(false);
      setParsingResumeId(null);
    }
  };

  return {
    isParsingResume,
    parsingResumeId,
    handleResumeParse,
  };
};
