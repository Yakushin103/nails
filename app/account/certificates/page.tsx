'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Calendar, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const certificates = [
  {
    id: 'CERT-001',
    course: 'Комбинированный маникюр',
    date: '2024-06-01',
    grade: 'Отлично',
    hours: 24
  },
  {
    id: 'CERT-002',
    course: 'Секреты френча',
    date: '2024-05-15',
    grade: 'Отлично',
    hours: 12
  }
];

export default function CertificatesPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async (certificate: any) => {
    setIsGenerating(true);
    // Здесь будет генерация PDF
    setTimeout(() => {
      alert(`Сертификат ${certificate.id} будет сгенерирован`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Мои сертификаты</h1>
          <p className="text-gray-600">Подтверждение ваших профессиональных навыков</p>
        </div>

        <div className="grid gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-6 border border-gold-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{cert.course}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(cert.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Оценка: {cert.grade}</span>
                      </div>
                      <div>Объем: {cert.hours} часов</div>
                    </div>
                  </div>
                </div>

                <Button onClick={() => generatePDF(cert)} disabled={isGenerating}>
                  <Download className="w-4 h-4 mr-2" />
                  Скачать PDF
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl p-6 text-center">
          <h3 className="font-bold mb-2">Что дает сертификат?</h3>
          <p className="text-gray-600 text-sm">
            Сертификат подтверждает вашу квалификацию и может быть использован при трудоустройстве.
            Каждый сертификат имеет уникальный номер, который можно проверить на нашем сайте.
          </p>
        </div>
      </div>
    </div>
  );
}