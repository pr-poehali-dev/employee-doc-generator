import AdminLayout from "@/components/AdminLayout";
import AdminCard from "@/components/AdminCard";

const Index = () => {
  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Административная панель
          </h2>
          <p className="text-gray-600">
            Управление системой печати кадровых документов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AdminCard
            title="Управление сотрудниками"
            description="Добавление, редактирование и управление данными сотрудников"
            icon="Users"
            href="/employees"
            stats="24 сотрудника"
          />

          <AdminCard
            title="Шаблоны документов"
            description="Создание и редактирование шаблонов для печати документов"
            icon="FileText"
            href="/templates"
            stats="8 шаблонов"
          />

          <AdminCard
            title="Генерация документов"
            description="Создание документов на основе шаблонов и данных сотрудников"
            icon="Printer"
            href="/generate"
          />

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Icon name="TrendingUp" className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Статистика
                </h3>
                <p className="text-gray-600">За последние 30 дней</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">156</p>
                <p className="text-sm text-gray-600">Документов создано</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">89%</p>
                <p className="text-sm text-gray-600">Успешных печатей</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
