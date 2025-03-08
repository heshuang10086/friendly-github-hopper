
import { Card, CardContent } from "@/components/ui/card";

interface SkillsTabProps {
  data: {
    个人技能?: Array<{
      技能项名称: string;
      掌握程度: string;
      技能描述: string;
    }>;
    [key: string]: any;
  };
}

const SkillsTab = ({ data }: SkillsTabProps) => {
  if (!data.个人技能?.length) {
    return <p className="text-center text-[#8CA3C3]">暂无个人技能信息</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.个人技能.map((skill, index) => (
        <Card key={index} className="resume-card skill-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-[#2B5BA9]">{skill.技能项名称}</h4>
              {skill.掌握程度 && (
                <span className="text-xs bg-[#EDF4FF] text-[#2B5BA9] px-2 py-0.5 rounded-full">
                  {skill.掌握程度}
                </span>
              )}
            </div>
            <p className="text-sm text-[#556789]">{skill.技能描述}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkillsTab;
