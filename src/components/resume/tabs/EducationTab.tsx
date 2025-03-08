
import { Card, CardContent } from "@/components/ui/card";

interface EducationTabProps {
  data: {
    教育背景?: Array<{
      毕业院校: string;
      所学专业: string;
      求学起止时间: string;
      学术水平: string;
    }>;
    [key: string]: any;
  };
}

const EducationTab = ({ data }: EducationTabProps) => {
  if (!data.教育背景?.length) {
    return <p className="text-center text-[#8CA3C3]">暂无教育背景信息</p>;
  }

  return (
    <div className="space-y-4">
      {data.教育背景.map((edu, index) => (
        <Card key={index} className="resume-card education-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-[#2B5BA9]">{edu.毕业院校}</h4>
                <p className="text-[#556789]">{edu.所学专业} | {edu.学术水平}</p>
              </div>
              <span className="text-sm bg-[#EDF4FF] text-[#2B5BA9] px-2 py-1 rounded">
                {edu.求学起止时间}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EducationTab;
