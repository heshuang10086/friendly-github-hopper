
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getFirstAvatar, hasAvatars } from "../utils/resumeParser";

interface BasicInfoProps {
  data: {
    姓名?: string;
    手机号?: string;
    邮箱?: string;
    工作年限?: string;
    期望工作地?: string;
    期望职位?: string;
    自我介绍?: string;
    avatars?: string[];
    [key: string]: any;
  };
}

const BasicInfoTab = ({ data }: BasicInfoProps) => {
  const hasAvatar = hasAvatars(data);
  const avatarSrc = getFirstAvatar(data);
  const userName = data.姓名 || "未知姓名";
  
  return (
    <Card className="resume-card basic-info-card">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          {hasAvatar ? (
            <Avatar className="h-16 w-16 border border-[#EDF4FF]">
              <AvatarImage src={avatarSrc} alt={userName} />
              <AvatarFallback className="bg-[#EDF4FF] text-[#2B5BA9]">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : null}
          
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold text-[#2B5BA9]">{userName}</h3>
            
            <div className="flex flex-wrap gap-3 text-sm text-[#556789]">
              {data.手机号 && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-[#52A3FF]" />
                  <span>{data.手机号}</span>
                </div>
              )}
              
              {data.邮箱 && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-[#52A3FF]" />
                  <span>{data.邮箱}</span>
                </div>
              )}
              
              {data.工作年限 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-[#52A3FF]" />
                  <span>{data.工作年限}</span>
                </div>
              )}
              
              {data.期望工作地 && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-[#52A3FF]" />
                  <span>{data.期望工作地}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {data.期望职位 && (
          <div className="border-t border-[#EDF4FF] pt-4">
            <h4 className="font-medium mb-2 text-[#2B5BA9]">期望职位</h4>
            <p className="text-[#556789]">{data.期望职位}</p>
          </div>
        )}

        {data.自我介绍 && (
          <div className="border-t border-[#EDF4FF] pt-4">
            <h4 className="font-medium mb-2 text-[#2B5BA9]">自我介绍</h4>
            <p className="text-sm whitespace-pre-wrap text-[#556789]">{data.自我介绍}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab;
