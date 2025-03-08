
import { useState, useMemo } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { parseResumeContent } from "./utils/resumeParser";
import { ParsedResumeContentProps } from "./types/ResumeTypes";
import ResumeTabNav from "./tabs/ResumeTabNav";
import BasicInfoTab from "./tabs/BasicInfoTab";
import EducationTab from "./tabs/EducationTab";
import WorkTab from "./tabs/WorkTab";
import ProjectTab from "./tabs/ProjectTab";
import SkillsTab from "./tabs/SkillsTab";
import AwardsTab from "./tabs/AwardsTab";

/**
 * Component for displaying parsed resume content in a tabbed interface
 */
const ParsedResumeContent = ({ parsedContent }: ParsedResumeContentProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  // Parse content once and memoize the result
  const data = useMemo(() => {
    if (!parsedContent) return {};
    return parseResumeContent(parsedContent);
  }, [parsedContent]);
  
  // Show empty state if no parsed content
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
        <ResumeTabNav />
        
        <div className="flex-1 overflow-y-auto pr-2">
          <TabsContent value="basic" className="h-full space-y-4">
            <BasicInfoTab data={data} />
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <EducationTab data={data} />
          </TabsContent>

          <TabsContent value="work" className="space-y-4">
            <WorkTab data={data} />
          </TabsContent>

          <TabsContent value="project" className="space-y-4">
            <ProjectTab data={data} />
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <SkillsTab data={data} />
          </TabsContent>

          <TabsContent value="awards" className="space-y-4">
            <AwardsTab data={data} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ParsedResumeContent;
