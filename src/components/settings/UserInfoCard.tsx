
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserInfoProps {
  userName: string;
  userRole: string;
  userEmail: string;
  createdAt: string;
}

const UserInfoCard = ({ userName, userRole, userEmail, createdAt }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
        <CardDescription>查看和管理您的个人信息</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">姓名</label>
            <p className="mt-1">{userName}</p>
          </div>
          <div>
            <label className="text-sm font-medium">角色</label>
            <p className="mt-1">{userRole}</p>
          </div>
          <div>
            <label className="text-sm font-medium">邮箱</label>
            <p className="mt-1">{userEmail}</p>
          </div>
          <div>
            <label className="text-sm font-medium">注册时间</label>
            <p className="mt-1">{createdAt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
