import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Главная", icon: "Home" },
    { path: "/employees", label: "Сотрудники", icon: "Users" },
    { path: "/templates", label: "Шаблоны", icon: "FileText" },
    { path: "/generate", label: "Генерация", icon: "Printer" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Icon name="FileText" className="text-primary mr-3" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">
                Система печати документов
              </h1>
            </div>
            <div className="flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors",
                    location.pathname === item.path
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  )}
                >
                  <Icon name={item.icon as any} size={16} className="mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
