
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Wrench, 
  Award 
} from "lucide-react";

const ResumeTabNav = () => {
  return (
    <TabsList className="grid grid-cols-6 mb-4 bg-gradient-to-r from-[#EDF4FF] to-[#F5F9FF] p-1 resume-tabs">
      <TabsTrigger value="basic" className="flex items-center gap-1 resume-tab-item">
        <User className="h-4 w-4" /> 基本信息
      </TabsTrigger>
      <TabsTrigger value="education" className="flex items-center gap-1 resume-tab-item">
        <GraduationCap className="h-4 w-4" /> 教育背景
      </TabsTrigger>
      <TabsTrigger value="work" className="flex items-center gap-1 resume-tab-item">
        <Briefcase className="h-4 w-4" /> 工作经历
      </TabsTrigger>
      <TabsTrigger value="project" className="flex items-center gap-1 resume-tab-item">
        <FileText className="h-4 w-4" /> 项目经历
      </TabsTrigger>
      <TabsTrigger value="skills" className="flex items-center gap-1 resume-tab-item">
        <Wrench className="h-4 w-4" /> 个人技能
      </TabsTrigger>
      <TabsTrigger value="awards" className="flex items-center gap-1 resume-tab-item">
        <Award className="h-4 w-4" /> 获得奖项
      </TabsTrigger>
    </TabsList>
  );
};

export default ResumeTabNav;
