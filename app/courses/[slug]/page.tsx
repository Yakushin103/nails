'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VideoComponent from 'next-video';
import {
  Play,
  Clock,
  Star,
  Users,
  Award,
  ChevronRight,
  CheckCircle,
  FileText,
  Video,
  Download,
  MessageCircle,
  ShoppingCart,
  Heart,
  Share2
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Временные данные (позже из БД)
const courseData = {
  id: '1',
  title: 'Комбинированный маникюр',
  description: 'Полный курс по комбинированной технике маникюра, который научит вас создавать идеальные ногти быстро и качественно',
  longDescription: `
    Комбинированный маникюр — это современная техника, сочетающая аппаратный и обрезной методы. 
    Вы научитесь работать с разными типами кутикулы, подбирать инструменты и создавать безупречный результат.
    
    Курс подойдет как новичкам, так и опытным мастерам, желающим расширить свои навыки.
  `,
  price: 1990,
  salePrice: 1290,
  duration: '5 часов',
  lessons: 24,
  students: 1247,
  rating: 4.9,
  level: 'Для начинающих и опытных',
  language: 'Русский',
  certificate: true,
  previewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Замените на ваше видео
  image: '/courses/manicure-1.jpg',
  whatYouWillLearn: [
    'Теория строения ногтей и кутикулы',
    'Выбор инструментов и оборудования',
    'Техника безопасности и санитарные нормы',
    'Пошаговый алгоритм комбинированного маникюра',
    'Работа с разными типами кутикулы',
    'Частые ошибки и как их избежать',
    'Практические советы от эксперта'
  ],
  program: [
    { title: 'Введение в курс', duration: '15 мин' },
    { title: 'Анатомия ногтевой пластины', duration: '30 мин' },
    { title: 'Выбор инструментов', duration: '25 мин' },
    { title: 'Подготовка к работе', duration: '20 мин' },
    { title: 'Техника комбинированного маникюра', duration: '2 часа' },
    { title: 'Работа с разными типами кутикулы', duration: '45 мин' },
    { title: 'Финальная отделка и покрытие', duration: '30 мин' },
    { title: 'Разбор ошибок и советы', duration: '25 мин' }
  ]
};

export default function CoursePage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, program, reviews
  const [isFavorite, setIsFavorite] = useState(false);

  const hasDiscount = courseData.salePrice && courseData.salePrice < courseData.price;
  const discountPercent = hasDiscount ? Math.round(((courseData.price - courseData.salePrice!) / courseData.price) * 100) : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Video */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-video bg-black">
                <VideoComponent
                  src={courseData.previewVideo}
                  controls
                  className="w-full"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            </motion.div>

            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-primary-500 px-3 py-1 rounded-full text-sm font-semibold">
                  ТОП курс
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{courseData.rating}</span>
                  <span className="text-gray-300">({courseData.students} учеников)</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold">{courseData.title}</h1>
              <p className="text-lg text-gray-200">{courseData.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>{courseData.lessons} уроков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Сертификат</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div>
                  {hasDiscount ? (
                    <>
                      <div className="text-4xl font-bold">
                        {courseData.salePrice?.toLocaleString()} ₽
                      </div>
                      <div className="text-lg text-gray-300 line-through">
                        {courseData.price.toLocaleString()} ₽
                      </div>
                      <div className="text-green-400 font-semibold mt-1">
                        Экономия {discountPercent}%
                      </div>
                    </>
                  ) : (
                    <div className="text-4xl font-bold">
                      {courseData.price.toLocaleString()} ₽
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button size="lg" className="flex-1">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Купить курс
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="!bg-white/20 !text-white !border-white/30"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="!bg-white/20 !text-white !border-white/30"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-sm text-gray-300 text-center">
                  Доступ к курсу открывается сразу после оплаты
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'О курсе' },
              { id: 'program', label: 'Программа' },
              { id: 'reviews', label: 'Отзывы' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-semibold transition-colors relative ${activeTab === tab.id
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* Description */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">О курсе</h2>
                    <div className="prose max-w-none text-gray-600">
                      {courseData.longDescription.split('\n').map((para, i) => (
                        <p key={i} className="mb-4">{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* What you'll learn */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Чему вы научитесь</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {courseData.whatYouWillLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gradient-to-r from-primary-50 to-pink-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Что входит в курс</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Video className="w-6 h-6 text-primary-600" />
                        <div>
                          <div className="font-semibold">{courseData.lessons} уроков</div>
                          <div className="text-sm text-gray-600">Видео материалы</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Download className="w-6 h-6 text-primary-600" />
                        <div>
                          <div className="font-semibold">Доп. материалы</div>
                          <div className="text-sm text-gray-600">PDF, схемы</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6 text-primary-600" />
                        <div>
                          <div className="font-semibold">Чат поддержки</div>
                          <div className="text-sm text-gray-600">Обратная связь</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-primary-600" />
                        <div>
                          <div className="font-semibold">Сертификат</div>
                          <div className="text-sm text-gray-600">По окончании</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'program' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold">Программа курса</h2>
                    <p className="text-gray-600 mt-1">{courseData.lessons} уроков • {courseData.duration}</p>
                  </div>
                  <div className="divide-y">
                    {courseData.program.map((lesson, i) => (
                      <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-primary-600 font-bold">#{i + 1}</span>
                            <span className="font-semibold">{lesson.title}</span>
                          </div>
                          <div className="text-sm text-gray-500">{lesson.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Teacher Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Преподаватель</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    АН
                  </div>
                  <div>
                    <div className="font-semibold">Анна Лесникова</div>
                    <div className="text-sm text-gray-600">Эксперт по маникюру, стаж 8 лет</div>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">В курс входит</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Доступ навсегда</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Видеоуроки в HD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Дополнительные материалы</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Чат с преподавателем</span>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Гарантия качества</h3>
                <p className="text-sm text-gray-600">
                  Если курс вам не подойдет, вернем деньги в течение 14 дней
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}