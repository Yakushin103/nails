'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';

// Данные курсов
const allCourses = [
  {
    id: '1',
    slug: 'kombinirovanniy-manikyur',
    title: 'Комбинированный маникюр',
    description: 'Курс по комбинированной технике маникюра, которой должен владеть каждый мастер',
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
  {
    id: '3',
    slug: 'pilochiy-manikyur',
    title: 'Пилочный маникюр',
    description: 'Научись выполнять чистый, долговечный и безопасный маникюр без использования режущего инструмента и фрез',
    price: 3890,
    salePrice: 2990,
    category: 'Маникюр',
    image: '/courses/pilochiy.jpg'
  },
  {
    id: '4',
    slug: 'ukreplenie-nogtey',
    title: 'Укрепление ногтей',
    description: 'Научись укреплению ногтей гелем для создания прочного и эстетичного покрытия',
    price: 2190,
    salePrice: 1590,
    category: 'Маникюр',
    image: '/courses/ukreplenie.jpg'
  },
  {
    id: '5',
    slug: 'sekreti-frencha',
    title: 'Секреты френча',
    description: 'Научись рисовать идеальный френч за 20 минут',
    price: 1390,
    salePrice: 990,
    category: 'Дизайн',
    image: '/courses/french.jpg'
  },
  {
    id: '6',
    slug: 'narashivanie-na-verhnih-formah',
    title: 'Моделирование на верхних формах',
    description: 'Сократи время процедуры наращивания ногтей, работай меньше - зарабатывай больше',
    price: 1890,
    salePrice: 1190,
    category: 'Наращивание',
    image: '/courses/narashivanie.jpg'
  },
  {
    id: '7',
    slug: 'aerografiya',
    title: 'Аэрография',
    description: 'Самый полный курс по аэрографии на ногтях. Научись выполнять яркие и интересные дизайны без навыков рисования',
    price: 2990,
    salePrice: 1990,
    category: 'Дизайн',
    image: '/courses/aerografiya.jpg'
  },
  {
    id: '8',
    slug: 'flower-art',
    title: 'Flower Art',
    description: 'Научись флористике гель-лаками и делай роспись фактурной и насыщенной',
    price: 1590,
    salePrice: 890,
    category: 'Дизайн',
    image: '/courses/flower-art.jpg'
  },
  {
    id: '9',
    slug: 'plenki',
    title: 'Пленки',
    description: 'Научись создавать красивые и яркие дизайны, не тратя на это много времени',
    price: 890,
    salePrice: 490,
    category: 'Дизайн',
    image: '/courses/plenki.jpg'
  },
  {
    id: '10',
    slug: 'stemping',
    title: 'Стемпинг',
    description: 'Создавай красивые рисунки за 1-3 минуты без особенных техник и навыков рисования',
    price: 990,
    salePrice: 590,
    category: 'Дизайн',
    image: '/courses/stemping.jpg'
  },
  {
    id: '11',
    slug: 'geometriya',
    title: 'Геометрия',
    description: 'Рисуй геометрию симметрично, быстро и четко',
    price: 1590,
    salePrice: 990,
    category: 'Дизайн',
    image: '/courses/geometriya.jpg'
  },
  {
    id: '12',
    slug: 'salonnie-designy',
    title: 'Салонные дизайны',
    description: 'Узнай секреты 100% носибельности материалов',
    price: 1190,
    salePrice: 790,
    category: 'Дизайн',
    image: '/courses/salon-design.jpg'
  },
  {
    id: '13',
    slug: 'lepka-plastilinom',
    title: 'Лепка пластилином',
    description: 'Изучи технику плоскостной лепки и создавай объемный декор на ногтях',
    price: 1490,
    salePrice: 890,
    category: 'Дизайн',
    image: '/courses/lepka.jpg'
  },
  {
    id: '14',
    slug: 'nasekomie',
    title: 'Насекомые',
    description: 'Научись выстраивать композицию и придавать реалистичность рисунку',
    price: 1090,
    salePrice: 690,
    category: 'Дизайн',
    image: '/courses/nasekomie.jpg'
  },
  {
    id: '15',
    slug: 'teksturnie-designy',
    title: 'Текстурные дизайны',
    description: 'Создавай красивые и оригинальные текстуры легко и быстро',
    price: 1090,
    salePrice: 690,
    category: 'Дизайн',
    image: '/courses/tekstura.jpg'
  },
  {
    id: '16',
    slug: 'kapli',
    title: 'Капли',
    description: 'Научись рисовать суперскоростные дизайны, не требующие навыков рисования',
    price: 699,
    salePrice: 390,
    category: 'Дизайн',
    image: '/courses/kapli.jpg'
  },
  {
    id: '17',
    slug: 'peyzazhi',
    title: 'Пейзажи',
    description: 'Научись рисовать реалистичные, живописные пейзажи',
    price: 999,
    salePrice: 590,
    category: 'Дизайн',
    image: '/courses/peyzazhi.jpg'
  },
  {
    id: '18',
    slug: 'tropicheskie-frukty',
    title: 'Тропические фрукты',
    description: 'Научись гармонично сочетать пропорции рисунка и делать роспись гель-лаками',
    price: 1190,
    salePrice: 690,
    category: 'Дизайн',
    image: '/courses/frukty.jpg'
  },
  {
    id: '19',
    slug: 'gradient',
    title: 'Градиент',
    description: 'Создавай красивые и идеально плавные градиенты',
    price: 790,
    salePrice: 490,
    category: 'Дизайн',
    image: '/courses/gradient.jpg'
  },
  {
    id: '20',
    slug: 'express-designy',
    title: '25 экспресс дизайнов',
    description: 'Научись создавать скоростные, яркие и стильные дизайны',
    price: 989,
    salePrice: 490,
    category: 'Дизайн',
    image: '/courses/express.jpg'
  }
];

const categories = ['Все', 'Маникюр', 'Наращивание', 'Дизайн'];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  useEffect(() => {
    let filtered = allCourses;

    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Все курсы</h1>
          <p className="text-gray-600 text-lg">Выберите направление и начните обучение уже сегодня</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск курсов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              Фильтры
            </button>
          </div>

          {/* Categories */}
          <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-3 mt-4`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category
                    ? 'bg-gold-500 text-primary-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-gray-600">
          Найдено курсов: {filteredCourses.length}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Курсы не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}