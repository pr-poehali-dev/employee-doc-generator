import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Generate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [generatedDocument, setGeneratedDocument] = useState("");

  const employees = [
    { id: "1", name: "Иванов Иван Иванович", position: "Менеджер" },
    { id: "2", name: "Петрова Анна Сергеевна", position: "Специалист" },
    { id: "3", name: "Сидоров Петр Алексеевич", position: "Директор" },
  ];

  const templates = [
    { id: "1", name: "Справка о работе", type: "Справка" },
    { id: "2", name: "Характеристика", type: "Характеристика" },
    { id: "3", name: "Приказ о поощрении", type: "Приказ" },
  ];

  const handleEmployeeSelect = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    }
  };

  const handleGenerate = () => {
    const templateText =
      "Справка выдана Иванову Ивану Ивановичу в том, что он работает в должности Менеджер с 15.01.2023 года. Справка выдана для предъявления по месту требования.";
    setGeneratedDocument(templateText);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Генерация документов
          </h2>
          <p className="text-gray-600">
            Создание документов на основе шаблонов и данных сотрудников
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="FileText" size={20} className="mr-2" />
                  Выбор шаблона
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedTemplate}
                  onValueChange={setSelectedTemplate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите шаблон документа" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} ({template.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Users" size={20} className="mr-2" />
                  Выбор сотрудников
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={employee.id}
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={(checked) =>
                          handleEmployeeSelect(employee.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={employee.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">
                          {employee.position}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Выбрано: {selectedEmployees.length} сотрудников
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedEmployees(employees.map((e) => e.id))
                    }
                  >
                    Выбрать всех
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button
                onClick={handleGenerate}
                disabled={!selectedTemplate || selectedEmployees.length === 0}
                className="flex-1"
              >
                <Icon name="Zap" size={16} className="mr-2" />
                Сгенерировать документ
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Icon name="Eye" size={20} className="mr-2" />
                  Предварительный просмотр
                </span>
                {generatedDocument && (
                  <Button onClick={handlePrint} variant="outline" size="sm">
                    <Icon name="Printer" size={16} className="mr-2" />
                    Печать
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedDocument ? (
                <div className="bg-white border rounded-lg p-6 min-h-96 print:shadow-none print:border-none">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold uppercase">СПРАВКА</h3>
                  </div>
                  <div className="space-y-4 text-justify leading-relaxed">
                    <p>{generatedDocument}</p>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <div>
                      <p className="mb-2">Директор</p>
                      <div className="border-b border-black w-32"></div>
                    </div>
                    <div>
                      <p className="mb-2">
                        Дата: {new Date().toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-400">
                  <div className="text-center">
                    <Icon name="FileText" size={48} className="mx-auto mb-4" />
                    <p>Выберите шаблон и сотрудников для генерации документа</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Generate;
