
import { Resume } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Code, Trash2, FileSearch, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ResumeListProps {
  resumes: Resume[];
  isParsingResume: boolean;
  parsingResumeId?: string | null;
  isDeletingResume: boolean;
  onView: (resume: Resume) => void;
  onParse: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
}

const ResumeList = ({
  resumes,
  isParsingResume,
  parsingResumeId,
  isDeletingResume,
  onView,
  onParse,
  onDelete,
}: ResumeListProps) => {
  const navigate = useNavigate();

  const handleViewParsedResult = (resume: Resume) => {
    navigate(`/resume-view/${resume.id}`, { state: { resume } });
  };

  const getParseStatus = (resume: Resume) => {
    // If this resume is currently being parsed
    if (parsingResumeId === resume.id) {
      return {
        icon: <Loader2 className="w-4 h-4 animate-spin text-blue-500" />,
        label: '正在解析',
        color: 'bg-blue-100 text-blue-800',
      };
    } else if (resume.parse_status === 'processing') {
      return {
        icon: <Loader2 className="w-4 h-4 animate-spin text-blue-500" />,
        label: '正在解析',
        color: 'bg-blue-100 text-blue-800',
      };
    } else if (resume.parse_status === 'completed' || resume.parsed_content) {
      return {
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        label: '已解析',
        color: 'bg-green-100 text-green-800',
      };
    } else if (resume.parse_status === 'failed') {
      return {
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        label: '解析失败',
        color: 'bg-red-100 text-red-800',
      };
    }
    return {
      icon: <Code className="w-4 h-4 text-gray-500" />,
      label: '未解析',
      color: 'bg-gray-100 text-gray-800',
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>简历列表</CardTitle>
        <CardDescription>管理您上传的简历</CardDescription>
      </CardHeader>
      <CardContent>
        {resumes.length > 0 ? (
          <div className="space-y-4">
            {resumes.map((resume) => {
              const status = getParseStatus(resume);
              const isCurrentlyParsing = parsingResumeId === resume.id;
              return (
                <div
                  key={resume.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{resume.file_name}</span>
                    <Badge 
                      variant="secondary" 
                      className={`flex items-center gap-1 ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(resume)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      查看
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewParsedResult(resume)}
                      disabled={!resume.parsed_content && resume.parse_status !== 'completed'}
                    >
                      <FileSearch className="w-4 h-4 mr-1" />
                      解析结果
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onParse(resume)}
                      disabled={isParsingResume || resume.parse_status === 'processing' || isCurrentlyParsing}
                    >
                      <Code className="w-4 h-4 mr-1" />
                      解析
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(resume)}
                      disabled={isDeletingResume}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      删除
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">暂无上传的简历</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeList;
