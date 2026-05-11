'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Up to 20% OFF on Gift Cards',
    subtitle: 'Explore our exclusive collection of discounted gift vouchers',
    cta: 'Shop Now',
    gradient: 'from-brand-500 via-orange-400 to-brand-600',
  },
  {
    id: 2,
    title: 'Instant Voucher Delivery',
    subtitle: 'Get your gift card codes in seconds, not hours',
    cta: 'Browse Brands',
    gradient: 'from-purple-500 via-pink-400 to-purple-600',
  },
  {
    id: 3,
    title: 'Trusted Brand Deals',
    subtitle: 'Shop from 1000+ verified and trusted brands',
    cta: 'Explore Now',
    gradient: 'from-blue-500 via-cyan-400 to-blue-600',
  },
  {
    id: 4,
    title: 'Festival Offers',
    subtitle: 'Special seasonal discounts up to 25% this month',
    cta: 'Claim Offer',
    gradient: 'from-green-500 via-emerald-400 to-green-600',
  },
];

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <motion.div
              className={`h-full w-full bg-gradient-to-br ${banner.gradient} flex items-center justify-between px-6 sm:px-10 md:px-16 relative overflow-hidden group`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 360] }}
                transition={{ duration: 20, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                transition={{ duration: 25, repeat: Infinity }}
              />

              <motion.div
                className="relative z-10 flex flex-col justify-center max-w-2xl space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white/90 shadow-sm backdrop-blur">
                  <Zap className="w-4 h-4 text-white" /> Exclusive Offer
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
                  {banner.title}
                </h2>
                <p className="max-w-xl text-base sm:text-lg text-white/90 leading-relaxed">
                  {banner.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-brand-600 shadow-lg shadow-black/10 transition"
                  >
                    {banner.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm text-white/90 border border-white/20">
                    Instant delivery • Premium brands
                  </div>
                </div>
              </motion.div>

              <div className="hidden lg:flex relative h-full w-[420px] items-center justify-center">
                <motion.div
                  className="absolute right-0 top-1/2 w-72 -translate-y-1/2 rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  <motion.div
                    className="h-44 rounded-[1.6rem] bg-gradient-to-br from-white/90 to-slate-100 p-5 shadow-xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Gift Card</span>
                      <span className="text-xs font-semibold text-brand-600">Instant</span>
                    </div>
                    <div className="mt-8 flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl font-extrabold text-slate-900">Amazon</h3>
                        <p className="mt-1 text-sm text-slate-500">Digital voucher code</p>
                      </div>
                      <span className="text-4xl font-black text-brand-600">₹5,000</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute left-0 bottom-10 w-56 -translate-x-10 rounded-[1.8rem] bg-slate-950/90 p-4 shadow-2xl text-white"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Limited time</p>
                  <h4 className="mt-3 text-lg font-bold">Festival Rewards</h4>
                  <p className="mt-2 text-sm text-slate-300">Grab premium vouchers with extra cashback and fast delivery.</p>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          background: rgba(255, 255, 255, 0.92);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #f97316;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #f97316;
          color: white;
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.25);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.6);
          width: 10px;
          height: 10px;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: white;
          width: 28px;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
