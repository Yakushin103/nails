'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Button from './Button';

interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number | null;  // Исправлено: добавлен null
  image?: string | null;       // Исправлено: добавлен null
  category: string;
  rating?: number | null;      // Исправлено: добавлен null
}

export default function CourseCard({
  slug,
  title,
  description,
  price,
  salePrice,
  image,
  category,
  rating = 4.8
}: CourseCardProps) {
  const [isClient, setIsClient] = useState(false);
  const hasDiscount = salePrice && salePrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - salePrice!) / price) * 100) : 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatPrice = (value: number) => {
    return Math.round(value).toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-pink-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/fallback-course.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">💅</span>
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
            -{discountPercent}%
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-primary-600">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{rating || 4.8}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(salePrice!)} ₽
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formatPrice(price)} ₽
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(price)} ₽
              </span>
            )}
          </div>
        </div>

        <Link href={`/courses/${slug}`}>
          <Button variant="outline" className="w-full">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Подробнее
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}