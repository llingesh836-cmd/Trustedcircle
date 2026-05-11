'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import {
  ShoppingBag,
  Utensils,
  Gamepad2,
  Shirt,
  Plane,
  Popcorn,
  Zap,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = [
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'from-blue-400 to-blue-600' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'from-red-400 to-red-600' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'from-purple-400 to-purple-600' },
  { id: 'fashion', label: 'Fashion', icon: Shirt, color: 'from-pink-400 to-pink-600' },
  { id: 'travel', label: 'Travel', icon: Plane, color: 'from-green-400 to-green-600' },
  { id: 'entertainment', label: 'Entertainment', icon: Popcorn, color: 'from-orange-400 to-orange-600' },
  { id: 'electronics', label: 'Electronics', icon: Zap, color: 'from-yellow-400 to-yellow-600' },
  { id: 'wellness', label: 'Wellness', icon: Heart, color: 'from-rose-400 to-rose-600' },
];

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState('shopping');

  return (
    <div className="sticky top-[73px] z-30 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={8}
          className="py-3"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <SwiperSlide key={category.id} style={{ width: 'auto' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-3 transition-all ${
                    activeCategory === category.id
                      ? 'bg-brand-100 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeCategory === category.id
                        ? `bg-gradient-to-br ${category.color} text-white`
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold whitespace-nowrap">{category.label}</span>
                  {activeCategory === category.id && (
                    <motion.div className="h-0.5 w-6 bg-brand-500" layoutId="underline" />
                  )}
                </motion.button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
