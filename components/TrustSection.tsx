'use client';

import { motion } from 'framer-motion';
import { Check, Lock, Zap, Headphones } from 'lucide-react';

const trustPoints = [
  {
    id: 1,
    icon: Lock,
    title: 'Secure Payments',
    description: 'Your transactions are protected with bank-level security and encryption',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Get your gift card codes in seconds, not hours or days',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 3,
    icon: Check,
    title: 'Trusted Brands',
    description: 'We partner with 1000+ verified and authentic brands you love',
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 4,
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated team is here to help you anytime, anywhere',
    color: 'from-purple-400 to-pink-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function TrustSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 mb-4">
            Why Trust Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Built on Trust and Reliability
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by thousands of users for safe, fast, and secure gift card shopping
          </p>
        </motion.div>

        {/* Trust Points Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{point.description}</p>

                  {/* Accent Line */}
                  <motion.div
                    className={`h-1 w-8 bg-gradient-to-r ${point.color} rounded-full mt-4`}
                    animate={{ width: ['8px', '24px', '8px'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certification/Badge Section */}
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-brand-50 to-orange-50 border border-brand-200 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🏆', text: 'ISO Certified' },
              { icon: '🔒', text: 'SSL Encrypted' },
              { icon: '✅', text: 'RBI Compliant' },
              { icon: '⭐', text: '4.9/5 Rated' },
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="text-4xl md:text-5xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {cert.icon}
                </motion.span>
                <p className="font-semibold text-slate-700 text-sm">{cert.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
