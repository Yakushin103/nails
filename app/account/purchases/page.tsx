'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

// Временные данные
const purchases = [
  {
    id: 'ORDER-001',
    date: '2024-06-01',
    items: ['Комбинированный маникюр', 'Секреты френча'],
    total: 2280,
    status: 'completed',
    paymentMethod: 'Банковская карта'
  },
  {
    id: 'ORDER-002',
    date: '2024-05-15',
    items: ['Аппаратный маникюр'],
    total: 1690,
    status: 'completed',
    paymentMethod: 'SberPay'
  },
  {
    id: 'ORDER-003',
    date: '2024-05-20',
    items: ['Быстрый старт (пакет из 5 курсов)'],
    total: 1890,
    status: 'completed',
    paymentMethod: 'Банковская карта'
  }
];

export default function PurchasesPage() {
  const [filter, setFilter] = useState('all');
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Оплачен' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'В обработке' };
      case 'failed':
        return { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Ошибка' };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: Clock, text: status };
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">История покупок</h1>
        
        <div className="space-y-4">
          {purchases.map((purchase, index) => {
            const StatusBadge = getStatusBadge(purchase.status);
            
            return (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{purchase.id}</h3>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${StatusBadge.color}`}>
                        <StatusBadge.icon className="w-3 h-3" />
                        <span>{StatusBadge.text}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(purchase.date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      {purchase.total.toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-gray-500">{purchase.paymentMethod}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Приобретенные курсы:</h4>
                  <div className="space-y-1">
                    {purchase.items.map((item, i) => (
                      <div key={i} className="text-gray-600 text-sm">{item}</div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t mt-4 pt-4 flex gap-3">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Детали заказа
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать чек
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}