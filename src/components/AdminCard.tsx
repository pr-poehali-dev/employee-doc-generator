import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface AdminCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  stats?: string;
  children?: ReactNode;
}

const AdminCard = ({
  title,
  description,
  icon,
  href,
  stats,
  children,
}: AdminCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <Link to={href} className="block">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={icon as any} className="text-primary" size={24} />
              </div>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </div>
            <Icon name="ChevronRight" className="text-gray-400" size={20} />
          </div>
        </CardHeader>
        {(stats || children) && (
          <CardContent className="pt-0">
            {stats && (
              <p className="text-2xl font-bold text-primary">{stats}</p>
            )}
            {children}
          </CardContent>
        )}
      </Link>
    </Card>
  );
};

export default AdminCard;
