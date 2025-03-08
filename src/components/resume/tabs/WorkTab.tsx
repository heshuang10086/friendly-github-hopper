
import { Card, CardContent } from "@/components/ui/card";

interface WorkTabProps {
  data: {
    工作经历?: Array<{
      工作起止时间: string;
      公司名称: string;
      工作部门: string;
      职位描述: string;
    }>;
    [key: string]: any;
  };
}

const WorkTab = ({ data }: WorkTabProps) => {
  if (!data.工作经历?.length) {
    return <p className="text-center text-[#8CA3C3]">暂无工作经历信息</p>;
  }

  return (
    <div className="space-y-4">
      {data.工作经历.map((work, index) => (
        <Card key={index} className="resume-card work-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-semibold text-[#2B5BA9]">{work.公司名称}</h4>
                <p className="text-[#556789]">{work.工作部门}</p>
              </div>
              <span className="text-sm bg-[#EDF4FF] text-[#2B5BA9] px-2 py-1 rounded">
                {work.工作起止时间}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm whitespace-pre-wrap text-[#556789]">{work.职位描述}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkTab;
