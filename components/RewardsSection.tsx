'use client';

import { motion } from 'framer-motion';
import { Gift, RotateCcw, Users } from 'lucide-react';

const rewards = [
  {
    id: 1,
    icon: Gift,
    title: 'Cashback Rewards',
    description: 'Get up to 5% cashback on every purchase and earn rewards instantly',
    amount: 'Earn 5%',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 2,
    icon: RotateCcw,
    title: 'Loyalty Points',
    description: 'Collect points with every transaction and redeem them later',
    amount: '1 Point',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 3,
    icon: Users,
    title: 'Referral Bonus',
    description: 'Invite friends and earn rewards for each successful referral',
    amount: '₹500',
    color: 'from-green-400 to-emerald-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function RewardsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
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
            Rewards Program
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Earn While You Shop</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Unlock exclusive rewards and earn money back with every purchase
          </p>
        </motion.div>

        {/* Rewards Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {rewards.map((reward) => {
            const Icon = reward.icon;
            return (
              <motion.div
                key={reward.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-full rounded-2xl overflow-hidden group">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${reward.color}`} />

                  {/* Animated Background Elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        className="w-12 h-12 mb-4 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">{reward.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{reward.description}</p>
                    </div>
                    <motion.div
                      className="text-3xl font-black text-white mt-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {reward.amount}
                    </motion.div>
                  </div>

                  {/* Hover Shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    style={{ transform: 'translateX(-100%)' }}
                    animate={{ x: ['200%', '-200%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Active Members', value: '500K+' },
            { label: 'Rewards Earned', value: '₹50Cr+' },
            { label: 'Redemption Rate', value: '98%' },
            { label: 'Avg Savings', value: '₹2,500' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileInView={{ scale: 1.05 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <p className="text-3xl md:text-4xl font-black text-brand-400 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-300 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
