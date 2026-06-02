'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/ui/CourseCard';
import Button from '@/components/ui/Button';
import { Play, Gift, Award, Clock, Headphones, ChevronRight } from 'lucide-react';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import ClientOnly from '@/components/ClientOnly';

// Данные курсов (временно статичные, потом из БД)
const courses = [
  {
    id: '1',
    slug: 'kombinirovanniy-manikyur',
    title: 'Комбинированный маникюр',
    description: 'Курс по комбинированной технике маникюра (аппарат + ножницы), которой должен владеть каждый мастер',
    price: 1990,
    salePrice: 1290,
    category: 'Маникюр',
    image: '/courses/manicure-1.jpg'
  },
  {
    id: '2',
    slug: 'apparatniy-manikyur',
    title: 'Аппаратный маникюр',
    description: 'Освой технику аппаратного маникюра без использования режущих инструментов',
    price: 2690,
    salePrice: 1690,
    category: 'Маникюр',
    image: '/courses/manicure-2.jpg'
  },
  // Добавьте остальные курсы из lesnails.pro
];

export default function Home() {
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 12,
    minutes: 2,
    seconds: 28
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBuy = (course: any) => {
    dispatch(addToCart({
      id: course.id,
      type: 'course',
      title: course.title,
      price: course.salePrice || course.price,
      originalPrice: course.price,
      slug: course.slug,
    }));
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-gold-500/10 backdrop-blur-sm rounded-full px-4 py-1 mb-6 border border-gold-500/30">
              <span className="text-gold-500 font-semibold">👑 Школа Юлии Калмыковой</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Станьте мастером
              <span className="text-gold-500 block">маникюра с нуля</span>
            </h1>

            <p className="text-xl text-gold-100 mb-8 max-w-2xl mx-auto">
              Обучающие курсы от практикующего мастера с 10-летним опытом.
              Получите профессию и начните зарабатывать уже через месяц.
            </p>

            <Button variant="gold" size="lg" className="shadow-lg">
              Выбрать курс
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💅', title: 'Маникюр', count: '12 курсов', color: 'from-pink-500 to-rose-500' },
              { icon: '✨', title: 'Наращивание', count: '8 курсов', color: 'from-purple-500 to-indigo-500' },
              { icon: '🎨', title: 'Дизайн', count: '24 курса', color: 'from-blue-500 to-cyan-500' }
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-r ${cat.color} rounded-2xl p-8 text-white cursor-pointer group hover:scale-105 transition-transform`}
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                <p className="opacity-90">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Популярные курсы</h2>
            <p className="text-gray-600 text-lg">Выберите направление, которое вас интересует</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <ClientOnly key={course.id}>
                <CourseCard {...course} />
              </ClientOnly>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, title: 'Аккредитованная школа', desc: 'Выдаем документы гособразца' },
              { icon: <Headphones className="w-8 h-8" />, title: 'Поддержка 24/7', desc: 'Всегда на связи и готовы помочь' },
              { icon: <Clock className="w-8 h-8" />, title: 'Доступ навсегда', desc: 'Учитесь в удобное время' },
              { icon: <Play className="w-8 h-8" />, title: 'Видеоуроки HD', desc: 'Качественный контент' }
            ].map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 group-hover:scale-110 transition-transform">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{adv.title}</h3>
                <p className="text-gray-600">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}