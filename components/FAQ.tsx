'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do gift cards work on Trusted Circle?',
    answer:
      'Gift cards on Trusted Circle are digital vouchers that you can purchase and send instantly. After payment verification, you receive the unique gift card code which can be redeemed on the respective brand website or app.',
  },
  {
    id: 2,
    question: 'How fast is the delivery?',
    answer:
      'Delivery is instantaneous! Once your payment is verified (usually within seconds), you will receive your gift card code via email and SMS. You can start using it immediately.',
  },
  {
    id: 3,
    question: 'Are the payments secure?',
    answer:
      'Absolutely! We use industry-leading security with bank-level encryption (SSL). All payments are processed through Razorpay, one of India\'s most trusted payment gateways with full PCI compliance.',
  },
  {
    id: 4,
    question: 'Can gift vouchers expire?',
    answer:
      'Gift card validity depends on the brand policies. Typically, most brands keep vouchers valid for 1-3 years. We always display the validity period clearly before purchase so you know exactly when your card expires.',
  },
  {
    id: 5,
    question: 'What if I face issues with my gift card?',
    answer:
      'Our 24/7 customer support team is ready to help! You can reach us via email, chat, or phone. We have a 98% issue resolution rate within 24 hours.',
  },
  {
    id: 6,
    question: 'Can I get a refund after purchase?',
    answer:
      'Yes, we have a flexible refund policy. If you haven\'t redeemed your gift card, we can process a refund within 7 days of purchase. Please contact our support team for assistance.',
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Find answers to common questions about Trusted Circle gift cards
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                whileHover={{ borderColor: '#f97316' }}
              >
                {/* Question */}
                <motion.div
                  className="flex items-center justify-between gap-4 p-5 md:p-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(expanded === faq.id ? null : faq.id);
                  }}
                >
                  <h3 className="text-lg font-semibold text-slate-900 flex-1 text-left">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expanded === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-brand-500 flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </motion.div>

                {/* Answer */}
                <AnimatePresence>
                  {expanded === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-slate-200 bg-slate-50/50"
                    >
                      <motion.p
                        className="p-5 md:p-6 text-slate-700 leading-relaxed"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition shadow-lg hover:shadow-xl"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
