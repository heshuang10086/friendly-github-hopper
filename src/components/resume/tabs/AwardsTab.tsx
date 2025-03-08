
import { Card, CardContent } from "@/components/ui/card";

interface AwardsTabProps {
  data: {
    获得奖项?: Array<{
      奖项名称: string;
      获奖时间: string;
    }>;
    [key: string]: any;
  };
}

const AwardsTab = ({ data }: AwardsTabProps) => {
  if (!data.获得奖项?.length) {
    return <p className="text-center text-[#8CA3C3]">暂无获奖信息</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.获得奖项.map((award, index) => (
        <Card key={index} className="resume-card award-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-[#2B5BA9]">{award.奖项名称}</h4>
              {award.获奖时间 && (
                <span className="text-xs bg-[#EDF4FF] text-[#2B5BA9] px-2 py-0.5 rounded-full">
                  {award.获奖时间}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AwardsTab;
