import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
  {
    slug: "kombinirovanniy-manikyur",
    title: "Комбинированный маникюр",
    description:
      "Курс по комбинированной технике маникюра, которой должен владеть каждый мастер",
    longDescription: `Комбинированный маникюр — это современная техника, сочетающая аппаратный и обрезной методы. 
Вы научитесь работать с разными типами кутикулы, подбирать инструменты и создавать безупречный результат.
    
Курс подойдет как новичкам, так и опытным мастерам, желающим расширить свои навыки.`,
    price: 1990,
    salePrice: 1290,
    image: "/courses/manicure-1.jpg",
    previewVideo: "/videos/preview.mp4",
    duration: "5 часов",
    lessons: 24,
    students: 1247,
    rating: 4.9,
    level: "Для начинающих и опытных",
    language: "Русский",
    certificate: true,
    category: "Маникюр",
    sortOrder: 1,
    whatYouWillLearn: JSON.stringify([
      "Теория строения ногтей и кутикулы",
      "Выбор инструментов и оборудования",
      "Техника безопасности и санитарные нормы",
      "Пошаговый алгоритм комбинированного маникюра",
      "Работа с разными типами кутикулы",
      "Частые ошибки и как их избежать",
      "Практические советы от эксперта",
    ]),
    program: JSON.stringify([
      { title: "Введение в курс", duration: "15 мин" },
      { title: "Анатомия ногтевой пластины", duration: "30 мин" },
      { title: "Выбор инструментов", duration: "25 мин" },
      { title: "Подготовка к работе", duration: "20 мин" },
      { title: "Техника комбинированного маникюра", duration: "2 часа" },
      { title: "Работа с разными типами кутикулы", duration: "45 мин" },
      { title: "Финальная отделка и покрытие", duration: "30 мин" },
      { title: "Разбор ошибок и советы", duration: "25 мин" },
    ]),
  },
  {
    slug: "apparatniy-manikyur",
    title: "Аппаратный маникюр",
    description:
      "Освой технику аппаратного маникюра без использования режущих инструментов",
    longDescription: `Аппаратный маникюр — современный и безопасный метод обработки ногтей. 
Вы научитесь работать с фрезой, подбирать насадки и создавать идеальный результат без порезов и травм.`,
    price: 2690,
    salePrice: 1690,
    image: "/courses/manicure-2.jpg",
    previewVideo: "/videos/preview.mp4",
    duration: "4 часа",
    lessons: 20,
    students: 856,
    rating: 4.8,
    level: "Для начинающих",
    language: "Русский",
    certificate: true,
    category: "Маникюр",
    sortOrder: 2,
    whatYouWillLearn: JSON.stringify([
      "Основы аппаратного маникюра",
      "Выбор и работа с фрезой",
      "Типы насадок и их применение",
      "Техника безопасности",
      "Обработка разных типов кутикулы",
      "Частые ошибки и их исправление",
    ]),
    program: JSON.stringify([
      { title: "Введение в аппаратный маникюр", duration: "20 мин" },
      { title: "Выбор фрезы и насадок", duration: "30 мин" },
      { title: "Техника работы", duration: "2 часа" },
      { title: "Практические советы", duration: "30 мин" },
    ]),
  },
  {
    slug: "pilochiy-manikyur",
    title: "Пилочный маникюр",
    description:
      "Научись выполнять чистый, долговечный и безопасный маникюр без использования режущего инструмента и фрез",
    price: 3890,
    salePrice: 2990,
    image: "/courses/pilochiy.jpg",
    category: "Маникюр",
    duration: "3 часа",
    lessons: 15,
    students: 234,
    rating: 4.7,
    certificate: true,
    sortOrder: 3,
  },
  {
    slug: "ukreplenie-nogtey",
    title: "Укрепление ногтей",
    description:
      "Научись укреплению ногтей гелем для создания прочного и эстетичного покрытия",
    price: 2190,
    salePrice: 1590,
    image: "/courses/ukreplenie.jpg",
    category: "Маникюр",
    duration: "2 часа",
    lessons: 12,
    students: 567,
    rating: 4.8,
    certificate: true,
    sortOrder: 4,
  },
  {
    slug: "sekreti-frencha",
    title: "Секреты френча",
    description: "Научись рисовать идеальный френч за 20 минут",
    price: 1390,
    salePrice: 990,
    image: "/courses/french.jpg",
    category: "Дизайн",
    duration: "1.5 часа",
    lessons: 8,
    students: 1234,
    rating: 4.9,
    certificate: true,
    sortOrder: 5,
  },
  {
    slug: "narashivanie-na-verhnih-formah",
    title: "Моделирование на верхних формах",
    description:
      "Сократи время процедуры наращивания ногтей, работай меньше - зарабатывай больше",
    price: 1890,
    salePrice: 1190,
    image: "/courses/narashivanie.jpg",
    category: "Наращивание",
    duration: "3 часа",
    lessons: 14,
    students: 789,
    rating: 4.8,
    certificate: true,
    sortOrder: 6,
  },
  {
    slug: "aerografiya",
    title: "Аэрография",
    description:
      "Самый полный курс по аэрографии на ногтях. Научись выполнять яркие и интересные дизайны без навыков рисования",
    price: 2990,
    salePrice: 1990,
    image: "/courses/aerografiya.jpg",
    category: "Дизайн",
    duration: "4 часа",
    lessons: 18,
    students: 456,
    rating: 4.7,
    certificate: true,
    sortOrder: 7,
  },
  {
    slug: "flower-art",
    title: "Flower Art",
    description:
      "Научись флористике гель-лаками и делай роспись фактурной и насыщенной",
    price: 1590,
    salePrice: 890,
    image: "/courses/flower-art.jpg",
    category: "Дизайн",
    duration: "2.5 часа",
    lessons: 10,
    students: 678,
    rating: 4.8,
    certificate: true,
    sortOrder: 8,
  },
  {
    slug: "plenki",
    title: "Пленки",
    description:
      "Научись создавать красивые и яркие дизайны, не тратя на это много времени",
    price: 890,
    salePrice: 490,
    image: "/courses/plenki.jpg",
    category: "Дизайн",
    duration: "1 час",
    lessons: 6,
    students: 892,
    rating: 4.6,
    certificate: true,
    sortOrder: 9,
  },
  {
    slug: "stemping",
    title: "Стемпинг",
    description:
      "Создавай красивые рисунки за 1-3 минуты без особенных техник и навыков рисования",
    price: 990,
    salePrice: 590,
    image: "/courses/stemping.jpg",
    category: "Дизайн",
    duration: "1.5 часа",
    lessons: 7,
    students: 1123,
    rating: 4.7,
    certificate: true,
    sortOrder: 10,
  },
  {
    slug: "geometriya",
    title: "Геометрия",
    description: "Рисуй геометрию симметрично, быстро и четко",
    price: 1590,
    salePrice: 990,
    image: "/courses/geometriya.jpg",
    category: "Дизайн",
    duration: "2 часа",
    lessons: 9,
    students: 567,
    rating: 4.8,
    certificate: true,
    sortOrder: 11,
  },
  {
    slug: "salonnie-designy",
    title: "Салонные дизайны",
    description: "Узнай секреты 100% носибельности материалов",
    price: 1190,
    salePrice: 790,
    image: "/courses/salon-design.jpg",
    category: "Дизайн",
    duration: "2 часа",
    lessons: 11,
    students: 678,
    rating: 4.9,
    certificate: true,
    sortOrder: 12,
  },
];

async function main() {
  console.log("Start seeding...");

  try {
    for (const course of courses) {
      const result = await prisma.course.upsert({
        where: { slug: course.slug },
        update: {},
        create: course,
      });
      console.log(`✅ Created course: ${result.title}`);
    }
    console.log("✅ Seeding finished successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
