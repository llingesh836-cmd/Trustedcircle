'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: '👩‍💼',
    rating: 5,
    text: 'Amazing experience! Got my gift card instantly. The process was so smooth and the customer support was super helpful.',
    badge: 'Verified Buyer',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    avatar: '👨‍💻',
    rating: 5,
    text: 'Best gift card platform I have used. The discounts are real and the delivery is literally instant. Highly recommend!',
    badge: 'Verified Buyer',
  },
  {
    id: 3,
    name: 'Anjali Patel',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'I purchased multiple gift cards for my corporate team. The bulk ordering feature saved us so much time. Thank you!',
    badge: 'Corporate Client',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    avatar: '👨‍🏫',
    rating: 5,
    text: 'Safe and secure. I was worried about online payments but Trusted Circle made it super easy with Razorpay.',
    badge: 'Verified Buyer',
  },
  {
    id: 5,
    name: 'Neha Gupta',
    avatar: '👩‍🏥',
    rating: 4,
    text: 'Great selection of brands and excellent pricing. Will definitely use again for all my gifting needs.',
    badge: 'Verified Buyer',
  },
];

export default function Testimonials() {
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
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Loved by Thousands
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what our happy customers have to say about Trusted Circle
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <Swiper
          modules={[FreeMode, Navigation]}
          freeMode
          slidesPerView="auto"
          spaceBetween={24}
          navigation
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-6"
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={testimonial.id} style={{ width: 'auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  className="min-w-96 h-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{testimonial.avatar}</div>
                      <div>
                        <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                        <motion.span
                          className="inline-flex text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full mt-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonial.badge}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: i < testimonial.rating ? 1 : 0.8 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star
                          className="w-4 h-4"
                          fill={i < testimonial.rating ? '#f97316' : '#e2e8f0'}
                          stroke="none"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className={`text-slate-700 text-sm leading-relaxed italic before:content-['"'] after:content-['"']`}>
                    "{testimonial.text}"
                  </blockquote>

                  {/* Accent */}
                  <motion.div
                    className="h-1 w-12 bg-gradient-to-r from-brand-500 to-orange-500 rounded-full mt-4"
                    animate={{ width: ['12px', '32px', '12px'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Styling */}
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            background: #f97316;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: white;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: #ea580c;
            box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px;
          }
        `}</style>
      </div>
    </section>
  );
}
