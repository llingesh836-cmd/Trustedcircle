'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Zap, TrendingUp, Clock } from 'lucide-react';

const deals = [
  { id: 1, brand: 'Amazon', amount: 5000, discount: 15, delivery: 'Instant', badge: 'Hot Deal' },
  { id: 2, brand: 'Flipkart', amount: 2000, discount: 12, delivery: 'Instant', badge: 'Trending' },
  { id: 3, brand: 'Swiggy', amount: 1000, discount: 20, delivery: 'Instant', badge: 'Exclusive' },
  { id: 4, brand: 'Netflix', amount: 999, discount: 10, delivery: 'Instant', badge: 'Limited' },
  { id: 5, brand: 'Spotify', amount: 799, discount: 8, delivery: 'Instant', badge: 'Popular' },
  { id: 6, brand: 'Steam', amount: 2500, discount: 18, delivery: 'Instant', badge: 'Gaming' },
  { id: 7, brand: 'Google Play', amount: 500, discount: 5, delivery: 'Instant', badge: 'App Store' },
  { id: 8, brand: 'Myntra', amount: 3000, discount: 25, delivery: 'Instant', badge: 'Fashion' },
];

const badgeColors = {
  'Hot Deal': 'from-red-500 to-pink-500',
  'Trending': 'from-orange-500 to-red-500',
  'Exclusive': 'from-purple-500 to-pink-500',
  'Limited': 'from-blue-500 to-purple-500',
  'Popular': 'from-green-500 to-emerald-500',
  'Gaming': 'from-indigo-500 to-purple-500',
  'App Store': 'from-slate-600 to-slate-800',
  'Fashion': 'from-pink-500 to-rose-500',
};

export default function TrendingDeals() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-brand-500" />
            <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              Trending Right Now
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Hot Deals & Exclusive Offers
          </h2>
          <p className="text-lg text-slate-600">
            Don't miss out on our most popular gift cards with incredible discounts
          </p>
        </motion.div>

        {/* Deals Carousel */}
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={16}
          className="py-4"
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {deals.map((deal, idx) => (
            <SwiperSlide key={deal.id} style={{ width: 'auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  className="min-w-72 h-64 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  {/* Header */}
                  <div className="relative h-32 bg-gradient-to-br from-brand-400 to-brand-600 p-4 overflow-hidden">
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Gift Card</p>
                        <h3 className="text-white text-2xl font-bold">{deal.brand}</h3>
                      </div>
                      <motion.div
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${badgeColors[deal.badge as keyof typeof badgeColors]} text-white text-xs font-bold`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {deal.badge}
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Amount</p>
                        <p className="text-2xl font-bold text-slate-900">₹{deal.amount.toLocaleString()}</p>
                      </div>
                      <motion.div
                        className="px-3 py-2 rounded-lg bg-red-100"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <p className="text-red-600 font-bold text-lg">{deal.discount}%</p>
                        <p className="text-red-600 text-xs font-semibold">OFF</p>
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-2 text-brand-600 text-sm font-semibold pt-2">
                      <Clock className="w-4 h-4" />
                      {deal.delivery}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-bold hover:from-brand-600 hover:to-brand-700 transition flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Get Now
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
