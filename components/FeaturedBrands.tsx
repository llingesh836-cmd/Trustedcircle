'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const brands = [
  { id: 1, name: 'Amazon', label: 'A', color: 'from-amber-400 to-orange-500' },
  { id: 2, name: 'Flipkart', label: 'F', color: 'from-blue-400 to-blue-600' },
  { id: 3, name: 'Myntra', label: 'M', color: 'from-pink-400 to-pink-600' },
  { id: 4, name: 'Swiggy', label: 'S', color: 'from-red-400 to-orange-500' },
  { id: 5, name: 'Zomato', label: 'Z', color: 'from-red-500 to-red-600' },
  { id: 6, name: 'Steam', label: 'St', color: 'from-slate-600 to-slate-800' },
  { id: 7, name: 'Google Play', label: 'G', color: 'from-green-400 to-green-600' },
  { id: 8, name: 'Netflix', label: 'N', color: 'from-red-600 to-red-700' },
  { id: 9, name: 'Spotify', label: 'Sp', color: 'from-green-500 to-lime-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturedBrands() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 mb-4">
            Featured Brands
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Shop from Trusted Brands</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from premium gift cards and instantly redeem vouchers from top merchants.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {brands.map((brand) => (
            <motion.div key={brand.id} variants={itemVariants}>
              <Link href="#">
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 24px 50px rgba(15, 23, 42, 0.16)' }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative h-32 sm:h-40 rounded-[2rem] bg-gradient-to-br ${brand.color} overflow-hidden shadow-card cursor-pointer border border-white/20`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="rounded-3xl bg-white/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/90">
                      Brand
                    </div>
                    <div className="rounded-full bg-white/20 px-3 py-2 text-xs text-white/90">Fast</div>
                  </div>

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-xl font-bold text-white shadow-inner">
                      {brand.label}
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mt-4 tracking-tight">{brand.name}</h3>
                    <p className="text-white/80 text-xs mt-2">Instant digital vouchers</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition shadow-lg shadow-brand-200/50"
          >
            View All Brands
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
