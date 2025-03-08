
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  FileText,
  User,
  Plus,
  Trash,
} from "lucide-react";

interface EditableResumeContentProps {
  parsedContent: any;
  onChange: (content: any) => void;
}

const EditableResumeContent = ({ parsedContent, onChange }: EditableResumeContentProps) => {
  const [activeTab, setActiveTab] = useState("basic");

  // Handle changes to basic information
  const handleBasicInfoChange = (field: string, value: string) => {
    onChange({
      ...parsedContent,
      [field]: value
    });
  };

  // Handle array field changes (education, work, projects, skills, awards)
  const handleArrayFieldChange = (arrayName: string, index: number, field: string, value: string) => {
    const updatedArray = [...(parsedContent[arrayName] || [])];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    
    onChange({
      ...parsedContent,
      [arrayName]: updatedArray
    });
  };

  // Add a new item to an array field
  const handleAddArrayItem = (arrayName: string, template: any) => {
    const updatedArray = [...(parsedContent[arrayName] || []), template];
    onChange({
      ...parsedContent,
      [arrayName]: updatedArray
    });
  };

  // Remove an item from an array field
  const handleRemoveArrayItem = (arrayName: string, index: number) => {
    const updatedArray = [...(parsedContent[arrayName] || [])];
    updatedArray.splice(index, 1);
    onChange({
      ...parsedContent,
      [arrayName]: updatedArray
    });
  };

  if (!parsedContent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center">暂无解析结果</p>
      </div>
    );
  }

  return (
    <div className="h-full resume-content">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
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
        
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Basic Information Tab */}
          <TabsContent value="basic" className="h-full space-y-4">
            <Card className="resume-card basic-info-card">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">姓名</Label>
                    <Input 
                      id="name" 
                      value={parsedContent.姓名 || ''} 
                      onChange={(e) => handleBasicInfoChange('姓名', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">手机号</Label>
                    <Input 
                      id="phone" 
                      value={parsedContent.手机号 || ''} 
                      onChange={(e) => handleBasicInfoChange('手机号', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">邮箱</Label>
                    <Input 
                      id="email" 
                      value={parsedContent.邮箱 || ''} 
                      onChange={(e) => handleBasicInfoChange('邮箱', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="years">工作年限</Label>
                    <Input 
                      id="years" 
                      value={parsedContent.工作年限 || ''} 
                      onChange={(e) => handleBasicInfoChange('工作年限', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">期望工作地</Label>
                    <Input 
                      id="location" 
                      value={parsedContent.期望工作地 || ''} 
                      onChange={(e) => handleBasicInfoChange('期望工作地', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">期望职位</Label>
                    <Input 
                      id="position" 
                      value={parsedContent.期望职位 || ''} 
                      onChange={(e) => handleBasicInfoChange('期望职位', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Label htmlFor="introduction">自我介绍</Label>
                  <Textarea 
                    id="introduction" 
                    value={parsedContent.自我介绍 || ''} 
                    onChange={(e) => handleBasicInfoChange('自我介绍', e.target.value)}
                    className="mt-1 h-32"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            {parsedContent.教育背景?.map((edu: any, index: number) => (
              <Card key={index} className="resume-card education-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <h4 className="text-lg font-semibold text-[#2B5BA9]">教育经历 #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#E55A71]"
                      onClick={() => handleRemoveArrayItem('教育背景', index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>院校名称</Label>
                      <Input 
                        value={edu.毕业院校 || ''} 
                        onChange={(e) => handleArrayFieldChange('教育背景', index, '毕业院校', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>起止时间</Label>
                      <Input 
                        value={edu.求学起止时间 || ''} 
                        onChange={(e) => handleArrayFieldChange('教育背景', index, '求学起止时间', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>专业</Label>
                      <Input 
                        value={edu.所学专业 || ''} 
                        onChange={(e) => handleArrayFieldChange('教育背景', index, '所学专业', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>学历</Label>
                      <Input 
                        value={edu.学术水平 || ''} 
                        onChange={(e) => handleArrayFieldChange('教育背景', index, '学术水平', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full gap-2 text-[#2B5BA9] border-dashed border-[#D6E4FF]"
              onClick={() => handleAddArrayItem('教育背景', {
                毕业院校: '',
                所学专业: '',
                求学起止时间: '',
                学术水平: ''
              })}
            >
              <Plus className="h-4 w-4" /> 添加教育经历
            </Button>
          </TabsContent>

          {/* Work Experience Tab */}
          <TabsContent value="work" className="space-y-4">
            {parsedContent.工作经历?.map((work: any, index: number) => (
              <Card key={index} className="resume-card work-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <h4 className="text-lg font-semibold text-[#2B5BA9]">工作经历 #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#E55A71]"
                      onClick={() => handleRemoveArrayItem('工作经历', index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>公司名称</Label>
                      <Input 
                        value={work.公司名称 || ''} 
                        onChange={(e) => handleArrayFieldChange('工作经历', index, '公司名称', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>起止时间</Label>
                      <Input 
                        value={work.工作起止时间 || ''} 
                        onChange={(e) => handleArrayFieldChange('工作经历', index, '工作起止时间', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>部门</Label>
                      <Input 
                        value={work.工作部门 || ''} 
                        onChange={(e) => handleArrayFieldChange('工作经历', index, '工作部门', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>职位描述</Label>
                    <Textarea 
                      value={work.职位描述 || ''} 
                      onChange={(e) => handleArrayFieldChange('工作经历', index, '职位描述', e.target.value)}
                      className="mt-1 h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full gap-2 text-[#2B5BA9] border-dashed border-[#D6E4FF]"
              onClick={() => handleAddArrayItem('工作经历', {
                公司名称: '',
                工作部门: '',
                工作起止时间: '',
                职位描述: ''
              })}
            >
              <Plus className="h-4 w-4" /> 添加工作经历
            </Button>
          </TabsContent>

          {/* Project Experience Tab */}
          <TabsContent value="project" className="space-y-4">
            {parsedContent.项目经历?.map((project: any, index: number) => (
              <Card key={index} className="resume-card project-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <h4 className="text-lg font-semibold text-[#2B5BA9]">项目经历 #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#E55A71]"
                      onClick={() => handleRemoveArrayItem('项目经历', index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>项目名称</Label>
                      <Input 
                        value={project.项目名称 || ''} 
                        onChange={(e) => handleArrayFieldChange('项目经历', index, '项目名称', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>起止时间</Label>
                      <Input 
                        value={project.起止时间 || ''} 
                        onChange={(e) => handleArrayFieldChange('项目经历', index, '起止时间', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>担任角色</Label>
                      <Input 
                        value={project.担任角色 || ''} 
                        onChange={(e) => handleArrayFieldChange('项目经历', index, '担任角色', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>项目描述</Label>
                    <Textarea 
                      value={project.项目描述 || ''} 
                      onChange={(e) => handleArrayFieldChange('项目经历', index, '项目描述', e.target.value)}
                      className="mt-1 h-20"
                    />
                  </div>
                  
                  <div>
                    <Label>负责工作</Label>
                    <Textarea 
                      value={project.负责主要工作描述 || ''} 
                      onChange={(e) => handleArrayFieldChange('项目经历', index, '负责主要工作描述', e.target.value)}
                      className="mt-1 h-20"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full gap-2 text-[#2B5BA9] border-dashed border-[#D6E4FF]"
              onClick={() => handleAddArrayItem('项目经历', {
                项目名称: '',
                起止时间: '',
                担任角色: '',
                项目描述: '',
                负责主要工作描述: ''
              })}
            >
              <Plus className="h-4 w-4" /> 添加项目经历
            </Button>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {parsedContent.个人技能?.map((skill: any, index: number) => (
                <Card key={index} className="resume-card skill-card">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-[#2B5BA9]">技能 #{index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#E55A71] h-7 w-7 p-0"
                        onClick={() => handleRemoveArrayItem('个人技能', index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>技能名称</Label>
                        <Input 
                          value={skill.技能项名称 || ''} 
                          onChange={(e) => handleArrayFieldChange('个人技能', index, '技能项名称', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>熟练程度</Label>
                        <Input 
                          value={skill.掌握程度 || ''} 
                          onChange={(e) => handleArrayFieldChange('个人技能', index, '掌握程度', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>技能描述</Label>
                      <Textarea 
                        value={skill.技能描述 || ''} 
                        onChange={(e) => handleArrayFieldChange('个人技能', index, '技能描述', e.target.value)}
                        className="mt-1 h-16"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full gap-2 text-[#2B5BA9] border-dashed border-[#D6E4FF]"
              onClick={() => handleAddArrayItem('个人技能', {
                技能项名称: '',
                掌握程度: '',
                技能描述: ''
              })}
            >
              <Plus className="h-4 w-4" /> 添加技能
            </Button>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {parsedContent.获得奖项?.map((award: any, index: number) => (
                <Card key={index} className="resume-card award-card">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-[#2B5BA9]">奖项 #{index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#E55A71] h-7 w-7 p-0"
                        onClick={() => handleRemoveArrayItem('获得奖项', index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>奖项名称</Label>
                        <Input 
                          value={award.奖项名称 || ''} 
                          onChange={(e) => handleArrayFieldChange('获得奖项', index, '奖项名称', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>获奖时间</Label>
                        <Input 
                          value={award.获奖时间 || ''} 
                          onChange={(e) => handleArrayFieldChange('获得奖项', index, '获奖时间', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full gap-2 text-[#2B5BA9] border-dashed border-[#D6E4FF]"
              onClick={() => handleAddArrayItem('获得奖项', {
                奖项名称: '',
                获奖时间: ''
              })}
            >
              <Plus className="h-4 w-4" /> 添加奖项
            </Button>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EditableResumeContent;
