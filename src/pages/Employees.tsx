import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";

interface Employee {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  position: string;
  hireDate: string;
  employeeNumber: string;
  // Паспортные данные
  passportSeries: string;
  passportNumber: string;
  passportIssuedBy: string;
  passportIssueDate: string;
  // Договор
  contractSignDate: string;
  contractEffectiveDate: string;
  probationPeriod: string;
  // Работа
  workplaceAddress: string;
  reportsTo: string;
  salary: string;
  employmentType: "main" | "part-time";
  positionCount: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      lastName: "Иванов",
      firstName: "Иван",
      middleName: "Иванович",
      position: "Менеджер",
      hireDate: "2023-01-15",
      employeeNumber: "001",
      passportSeries: "4509",
      passportNumber: "123456",
      passportIssuedBy: "ОУФМС по г. Москве",
      passportIssueDate: "2015-05-20",
      contractSignDate: "2023-01-10",
      contractEffectiveDate: "2023-01-15",
      probationPeriod: "3 месяца",
      workplaceAddress: "г. Москва, ул. Ленина, д. 1",
      reportsTo: "Директор",
      salary: "80000",
      employmentType: "main" as const,
      positionCount: "1.0",
    },
    {
      id: 2,
      lastName: "Петрова",
      firstName: "Анна",
      middleName: "Сергеевна",
      position: "Специалист",
      hireDate: "2023-03-22",
      employeeNumber: "002",
      passportSeries: "4510",
      passportNumber: "789012",
      passportIssuedBy: "ОУФМС по г. Москве",
      passportIssueDate: "2018-08-15",
      contractSignDate: "2023-03-20",
      contractEffectiveDate: "2023-03-22",
      probationPeriod: "2 месяца",
      workplaceAddress: "г. Москва, ул. Ленина, д. 1",
      reportsTo: "Иванов И.И.",
      salary: "60000",
      employmentType: "main" as const,
      positionCount: "1.0",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    position: "",
    hireDate: "",
    employeeNumber: "",
    passportSeries: "",
    passportNumber: "",
    passportIssuedBy: "",
    passportIssueDate: "",
    contractSignDate: "",
    contractEffectiveDate: "",
    probationPeriod: "",
    workplaceAddress: "",
    reportsTo: "",
    salary: "",
    employmentType: "main" as "main" | "part-time",
    positionCount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: Date.now(),
      ...formData,
    };
    setEmployees([...employees, newEmployee]);
    setFormData({
      lastName: "",
      firstName: "",
      middleName: "",
      position: "",
      hireDate: "",
      employeeNumber: "",
      passportSeries: "",
      passportNumber: "",
      passportIssuedBy: "",
      passportIssueDate: "",
      contractSignDate: "",
      contractEffectiveDate: "",
      probationPeriod: "",
      workplaceAddress: "",
      reportsTo: "",
      salary: "",
      employmentType: "main",
      positionCount: "",
    });
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Управление сотрудниками
            </h2>
            <p className="text-gray-600">Список всех сотрудников организации</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить сотрудника
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Новый сотрудник</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Персональные данные */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Персональные данные
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lastName">Фамилия *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="firstName">Имя *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="middleName">Отчество</Label>
                      <Input
                        id="middleName"
                        value={formData.middleName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            middleName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Паспортные данные */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Паспортные данные
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="passportSeries">Серия паспорта *</Label>
                        <Input
                          id="passportSeries"
                          value={formData.passportSeries}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              passportSeries: e.target.value,
                            })
                          }
                          placeholder="1234"
                          maxLength={4}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="passportNumber">Номер паспорта *</Label>
                        <Input
                          id="passportNumber"
                          value={formData.passportNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              passportNumber: e.target.value,
                            })
                          }
                          placeholder="123456"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="passportIssuedBy">Кем выдан *</Label>
                      <Input
                        id="passportIssuedBy"
                        value={formData.passportIssuedBy}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passportIssuedBy: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="passportIssueDate">Дата выдачи *</Label>
                      <Input
                        id="passportIssueDate"
                        type="date"
                        value={formData.passportIssueDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passportIssueDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Трудовой договор */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Трудовой договор
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contractSignDate">
                          Дата оформления договора *
                        </Label>
                        <Input
                          id="contractSignDate"
                          type="date"
                          value={formData.contractSignDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contractSignDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contractEffectiveDate">
                          Дата вступления в силу *
                        </Label>
                        <Input
                          id="contractEffectiveDate"
                          type="date"
                          value={formData.contractEffectiveDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contractEffectiveDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="probationPeriod">
                        Испытательный срок
                      </Label>
                      <Input
                        id="probationPeriod"
                        value={formData.probationPeriod}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            probationPeriod: e.target.value,
                          })
                        }
                        placeholder="3 месяца"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Рабочая информация */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Рабочая информация
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="position">Должность *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="workplaceAddress">
                        Адрес рабочего места *
                      </Label>
                      <Input
                        id="workplaceAddress"
                        value={formData.workplaceAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workplaceAddress: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportsTo">Кому подчиняется</Label>
                      <Input
                        id="reportsTo"
                        value={formData.reportsTo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reportsTo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="salary">Оклад (руб.) *</Label>
                        <Input
                          id="salary"
                          type="number"
                          value={formData.salary}
                          onChange={(e) =>
                            setFormData({ ...formData, salary: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="positionCount">
                          Количество ставок *
                        </Label>
                        <Input
                          id="positionCount"
                          type="number"
                          step="0.1"
                          value={formData.positionCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              positionCount: e.target.value,
                            })
                          }
                          placeholder="1.0"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employmentType">Тип занятости *</Label>
                        <Select
                          value={formData.employmentType}
                          onValueChange={(value: "main" | "part-time") =>
                            setFormData({ ...formData, employmentType: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">
                              Основное место работы
                            </SelectItem>
                            <SelectItem value="part-time">
                              По совместительству
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="employeeNumber">
                          Табельный номер *
                        </Label>
                        <Input
                          id="employeeNumber"
                          value={formData.employeeNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employeeNumber: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Добавить сотрудника
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Паспорт</TableHead>
                <TableHead>Оклад</TableHead>
                <TableHead>Тип занятости</TableHead>
                <TableHead>Ставки</TableHead>
                <TableHead>Подчиняется</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.lastName} {employee.firstName}{" "}
                    {employee.middleName}
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    {employee.passportSeries} {employee.passportNumber}
                  </TableCell>
                  <TableCell>
                    {parseInt(employee.salary).toLocaleString()} ₽
                  </TableCell>
                  <TableCell>
                    {employee.employmentType === "main"
                      ? "Основное"
                      : "Совместительство"}
                  </TableCell>
                  <TableCell>{employee.positionCount}</TableCell>
                  <TableCell>{employee.reportsTo || "—"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employees;
