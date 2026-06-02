'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Smartphone, Building } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
          <Link href="/">
            <Button>Вернуться к покупкам</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Продолжить покупки
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Форма заказа */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Контактная информация</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Имя</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Телефон</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="+7 (___)"
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" defaultChecked />
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-semibold">Банковская карта</div>
                    <div className="text-sm text-gray-500">Visa, Mastercard, МИР</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" />
                  <Smartphone className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-semibold">SberPay</div>
                    <div className="text-sm text-gray-500">Быстрая оплата через Сбербанк Онлайн</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Сводка заказа */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold mb-4">Ваш заказ</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title}</span>
                    <span className="font-semibold">{item.price.toLocaleString()} ₽</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span className="text-primary-600">{totalAmount.toLocaleString()} ₽</span>
                </div>
              </div>

              <Button className="w-full py-3">
                Оплатить {totalAmount.toLocaleString()} ₽
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая «Оплатить», вы соглашаетесь с условиями оферты
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}