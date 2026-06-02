'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, User, ThumbsUp, Flag } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Review {
  id: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

const demoReviews: Review[] = [
  {
    id: '1',
    userName: 'Анна',
    rating: 5,
    text: 'Отличный курс! Всё очень понятно и доступно. Юлия прекрасный преподаватель, объясняет всё до мельчайших деталей.',
    date: '2024-05-15',
    helpful: 12
  },
  {
    id: '2',
    userName: 'Мария',
    rating: 5,
    text: 'Очень понравился курс! Много практических советов. Уже применяю на практике и вижу результат.',
    date: '2024-05-10',
    helpful: 8
  },
  {
    id: '3',
    userName: 'Екатерина',
    rating: 4,
    text: 'Хороший курс, но хотелось бы больше примеров. В целом всё понравилось.',
    date: '2024-05-05',
    helpful: 3
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(demoReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleSubmit = () => {
    if (!newReview.text.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: 'Гость',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString(),
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, text: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-5xl font-bold text-primary-900">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= averageRating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600 mt-1">{reviews.length} отзывов</div>
          </div>

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Отмена' : 'Написать отзыв'}
          </Button>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-200">
          <h3 className="text-xl font-bold mb-4">Ваш отзыв</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Оценка</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= newReview.rating
                          ? 'fill-gold-500 text-gold-500'
                          : 'text-gray-300'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
              <textarea
                rows={4}
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
                placeholder="Поделитесь впечатлениями о курсе..."
              />
            </div>
            <Button onClick={handleSubmit}>Отправить отзыв</Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center text-white font-bold">
                  {review.userName[0]}
                </div>
                <div>
                  <div className="font-semibold">{review.userName}</div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('ru-RU')}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.text}</p>

            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gold-500">
                <ThumbsUp className="w-4 h-4" />
                Полезно ({review.helpful})
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
                <Flag className="w-4 h-4" />
                Пожаловаться
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}