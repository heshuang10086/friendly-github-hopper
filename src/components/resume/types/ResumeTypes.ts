
export interface ParsedData {
  姓名?: string;
  手机号?: string;
  邮箱?: string;
  工作年限?: string;
  期望工作地?: string;
  期望职位?: string;
  自我介绍?: string;
  教育背景?: Array<{
    毕业院校: string;
    所学专业: string;
    求学起止时间: string;
    学术水平: string;
  }>;
  获得奖项?: Array<{
    奖项名称: string;
    获奖时间: string;
  }>;
  个人技能?: Array<{
    技能项名称: string;
    掌握程度: string;
    技能描述: string;
  }>;
  工作经历?: Array<{
    工作起止时间: string;
    公司名称: string;
    工作部门: string;
    职位描述: string;
  }>;
  项目经历?: Array<{
    起止时间: string;
    项目名称: string;
    担任角色: string;
    项目描述: string;
    负责主要工作描述: string;
  }>;
  avatars?: string[];
  [key: string]: any;
}

export interface ParsedResumeContentProps {
  parsedContent: string;
}
