'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Share2,
  Globe
} from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки (позже подключите реальный API)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      details: ['+7 (906) 637-83-91'],
      link: 'tel:+79066378391'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@lesnails.pro'],
      link: 'mailto:info@lesnails.pro'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      details: ['г. Ярославль, ул. Володарского 28', '5 этаж, офис 505'],
      link: 'https://yandex.ru/maps/-/CDxVkG7y'
    },
    {
      icon: Clock,
      title: 'Режим работы',
      details: ['Пн-Пт: 10:00 - 20:00', 'Сб-Вс: 11:00 - 18:00'],
      link: null
    }
  ];

  const socials = [
    {
      name: 'Instagram',
      icon: Share2,
      href: 'https://instagram.com/lesnails',
      color: 'hover:bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      name: 'Telegram',
      icon: Send,
      href: 'https://t.me/lesnails',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/79066378391',
      color: 'hover:bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Мы всегда на связи и готовы ответить на ваши вопросы
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Свяжитесь с нами</h2>
              <p className="text-gray-600 mb-8">
                Остались вопросы? Мы с удовольствием на них ответим.
                Выберите удобный способ связи и мы поможем вам с выбором курса,
                ответим на вопросы об обучении или запишем на пробный урок.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                  {item.link && (
                    <a
                      href={item.link}
                      target={item.title === 'Адрес' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-gold-600 hover:text-gold-700 text-sm font-semibold"
                    >
                      {item.title === 'Адрес' ? 'Открыть в картах →' : 'Связаться →'}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all ${social.color} hover:text-white hover:scale-110`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="h-64 bg-gray-200 relative">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A123456789&source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                  title="Карта"
                />
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Напишите нам</h2>
              <p className="text-gray-600">
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Сообщение *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                  placeholder="Ваш вопрос или сообщение..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Отправка...
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Отправлено!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Отправить сообщение
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary-50 rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                📍 Наш учебный центр находится в центре Ярославля.
                Мы работаем ежедневно и ждем вас на обучение!
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center text-primary-900 mb-8">
            Часто задаваемые вопросы
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'Как получить доступ к курсу после оплаты?',
                answer: 'Доступ открывается автоматически сразу после успешной оплаты. Вы получите письмо на email с инструкцией.'
              },
              {
                question: 'Сколько действует доступ к курсу?',
                answer: 'Доступ к курсу предоставляется навсегда. Вы можете пересматривать уроки в любое удобное время.'
              },
              {
                question: 'Выдаете ли вы сертификаты?',
                answer: 'Да, после успешного завершения курса вы получаете именной сертификат установленного образца.'
              },
              {
                question: 'Можно ли задать вопросы преподавателю?',
                answer: 'Да, у каждого курса есть чат с преподавателем, где вы можете задать любые вопросы по обучению.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-gold-500 to-primary-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Готовы начать обучение?</h2>
          <p className="mb-6 opacity-90">
            Присоединяйтесь к тысячам успешных учениц Юлии Калмыковой
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+79066378391" className="bg-white text-primary-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Позвонить сейчас
            </a>
            <a href="/courses" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Выбрать курс
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}