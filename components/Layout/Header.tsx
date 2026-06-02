'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/userSlice';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import CartDrawer from '@/components/Cart/CartDrawer';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);
  const user = useSelector((state: RootState) => state.user.user);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Главная' },
    { href: '/courses', label: 'Курсы' },
    { href: '/about', label: 'О Юлии' },
    { href: '/contact', label: 'Контакты' },
  ];

  useEffect(() => {
    console.log('Header - User state changed:', user);
    console.log('Header - Token state:', localStorage.getItem('token'));
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <>
      <header className="bg-primary-900 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-playfair font-bold text-gold-500">
                Юлия Калмыкова
              </span>
              <span className="text-xs text-gold-300">Школа маникюра</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gold-100 hover:text-gold-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {/* User menu item for desktop */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gold-100 hover:text-gold-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-gold-100 hover:text-gold-500 transition-colors"
                >
                  Войти
                </Link>
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-primary-800 rounded-full transition text-gold-100"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-primary-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <Link href="/account">
                <button className="p-2 hover:bg-primary-800 rounded-full transition text-gold-100">
                  <User className="w-5 h-5" />
                </button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-primary-800 rounded-full transition text-gold-100"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary-800 border-t border-primary-700 py-4">
            <nav className="flex flex-col gap-3 px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-100 hover:text-gold-500 transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              {/* User menu item for mobile */}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gold-100 hover:text-gold-500 transition-colors py-2 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-100 hover:text-gold-500 transition-colors py-2"
                >
                  Войти
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}