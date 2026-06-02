'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Юлия Калмыкова
          </h1>
          <p className="text-xl text-center text-gold-300">
            Эксперт по маникюру, преподаватель, основатель школы
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Обо мне</h2>
              <div className="w-20 h-0.5 bg-gold-500" />
              <p className="text-gray-700 leading-relaxed">
                Более 10 лет я посвятила миру нейл-арта. Начинала как обычный мастер в салоне,
                прошла путь от новичка до топ-эксперта и основателя собственной школы.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Моя миссия — помочь каждой девушке обрести востребованную профессию,
                которая приносит не только доход, но и удовольствие от творчества.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Я обучила более 5000 учениц, многие из которых теперь успешно работают
                в лучших салонах или открыли свое дело.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-2xl font-bold mb-2">Юлия Калмыкова</h3>
              <p className="text-gray-600">Преподаватель школы маникюра</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, label: 'Лет опыта', value: '10+' },
              { icon: Users, label: 'Учениц', value: '5000+' },
              { icon: Clock, label: 'Часов обучения', value: '10000+' },
              { icon: Heart, label: 'Довольных отзывов', value: '98%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}