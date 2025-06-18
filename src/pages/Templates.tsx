
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Template {
  id: number;
  name: string;
  type: string;
  content: string;
  createdAt: string;
}

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: 'Справка о работе',
      type: 'Справка',
      content: 'Справка выдана {{lastName}} {{firstName}} {{middleName}} в том, что он(а) работает в должности {{position}} с {{hireDate}}.',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Характеристика',
      type: 'Характеристика',
      content: 'Характеристика на {{lastName}} {{firstName}} {{middleName}}, табельный номер {{employeeNumber}}, работающего в должности {{position}}.',
      createdAt: '2024-01-20'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTemplate: Template = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
    setFormData({ name: '', type: '', content: '' });
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Шаблоны документов</h2>
            <p className="text-gray-600">Управление шаблонами для генерации документов</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать шаблон
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Новый шаблон документа</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название шаблона</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Например: Справка о работе"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Тип документа</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип документа" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Справка">Справка</SelectItem>
                      <SelectItem value="Характеристика">Характеристика</SelectItem>
                      <SelectItem value="Приказ">Приказ</SelectItem>
                      <SelectItem value="Уведомление">Уведомление</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Содержание шаблона</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Используйте переменные: {{lastName}}, {{firstName}}, {{middleName}}, {{position}}, {{hireDate}}, {{employeeNumber}}"
                    rows={8}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Доступные переменные: {{`{lastName}`}}, {{`{firstName}`}}, {{`{middleName}`}}, {{`{position}`}}, {{`{hireDate}`}}, {{`{employeeNumber}`}}
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Создать шаблон
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.type}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {template.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Создан: {new Date(template.createdAt).toLocaleDateString('ru-RU')}</span>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Просмотр
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Templates;
