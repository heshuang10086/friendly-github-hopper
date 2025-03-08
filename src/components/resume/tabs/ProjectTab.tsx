
import { Card, CardContent } from "@/components/ui/card";

interface ProjectTabProps {
  data: {
    项目经历?: Array<{
      起止时间: string;
      项目名称: string;
      担任角色: string;
      项目描述: string;
      负责主要工作描述: string;
    }>;
    [key: string]: any;
  };
}

const ProjectTab = ({ data }: ProjectTabProps) => {
  if (!data.项目经历?.length) {
    return <p className="text-center text-[#8CA3C3]">暂无项目经历信息</p>;
  }

  return (
    <div className="space-y-4">
      {data.项目经历.map((project, index) => (
        <Card key={index} className="resume-card project-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-semibold text-[#2B5BA9]">{project.项目名称}</h4>
                <p className="text-[#556789]">{project.担任角色}</p>
              </div>
              <span className="text-sm bg-[#EDF4FF] text-[#2B5BA9] px-2 py-1 rounded">
                {project.起止时间}
              </span>
            </div>
            <div className="space-y-2 mt-2">
              <p className="text-sm font-medium text-[#2B5BA9]">项目描述</p>
              <p className="text-sm whitespace-pre-wrap text-[#556789]">{project.项目描述}</p>
              {project.负责主要工作描述 && (
                <>
                  <p className="text-sm font-medium text-[#2B5BA9]">负责工作</p>
                  <p className="text-sm whitespace-pre-wrap text-[#556789]">{project.负责主要工作描述}</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectTab;
