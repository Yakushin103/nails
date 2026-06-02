'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Award,
  ShoppingBag,
  Settings,
  Heart,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Временные данные (позже из БД)
const userStats = {
  totalCourses: 5,
  totalHours: 24,
  certificates: 3,
  completedLessons: 42
};

const recentCourses = [
  {
    id: '1',
    title: 'Комбинированный маникюр',
    progress: 75,
    lastWatched: '2 дня назад',
    image: '/courses/manicure-1.jpg'
  },
  {
    id: '2',
    title: 'Аппаратный маникюр',
    progress: 40,
    lastWatched: '5 дней назад',
    image: '/courses/manicure-2.jpg'
  },
  {
    id: '3',
    title: 'Секреты френча',
    progress: 100,
    lastWatched: '1 неделю назад',
    image: '/courses/french.jpg'
  }
];

export default function AccountPage() {
  const router = useRouter();

  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!token || !user) {
      router.push('/login');
    }
  }, [token, user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
          <p className="text-gray-600">
            Добро пожаловать, {user?.name || 'Ученик'}! Рады видеть вас снова
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                  {user?.name?.[0] || 'П'}
                </div>
                <h3 className="font-semibold">{user?.name || 'Пользователь'}</h3>
                <p className="text-sm text-gray-500">{user?.email || 'email@example.com'}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { href: '/account', icon: BookOpen, label: 'Мои курсы', active: true },
                  { href: '/account/progress', icon: TrendingUp, label: 'Прогресс' },
                  { href: '/account/certificates', icon: Award, label: 'Сертификаты' },
                  { href: '/account/purchases', icon: ShoppingBag, label: 'История покупок' },
                  { href: '/account/favorites', icon: Heart, label: 'Избранное' },
                  { href: '/account/settings', icon: Settings, label: 'Настройки' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: 'Курсов куплено', value: userStats.totalCourses, color: 'blue' },
                { icon: Clock, label: 'Часов обучения', value: userStats.totalHours, color: 'green' },
                { icon: Award, label: 'Сертификатов', value: userStats.certificates, color: 'purple' },
                { icon: TrendingUp, label: 'Уроков пройдено', value: userStats.completedLessons, color: 'orange' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500 mb-3`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Courses */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Продолжить обучение</h2>
                <Link href="/account/courses" className="text-primary-600 hover:underline text-sm">
                  Все курсы →
                </Link>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span>Прогресс: {course.progress}%</span>
                        <span>Последний просмотр: {course.lastWatched}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          className="bg-primary-600 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <Link href={`/courses/${course.id}/watch`}>
                      <Button size="sm">
                        {course.progress === 100 ? 'Повторить' : 'Продолжить'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-primary-50 to-pink-50 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Продолжайте развиваться!</h3>
                  <p className="text-gray-600 mb-4">
                    На основе ваших интересов мы подобрали курсы, которые могут вам понравиться
                  </p>
                  <Link href="/courses">
                    <Button>Смотреть рекомендации</Button>
                  </Link>
                </div>
                <Award className="w-16 h-16 text-primary-600 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}