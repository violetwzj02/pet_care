"use client";

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  name: string;
  pet: string;
  service: string;
  quote: string;
  detail: string;
};

const testimonials: Testimonial[] = [
  {
    name: "林女士",
    pet: "比熊「奶盖」",
    service: "精致美容",
    quote: "修完脸型特别自然，护理师还把耳朵泛红的问题单独提醒了我们。",
    detail: "以前美容后总会紧张，这次回家一路都很放松，照片记录也很清楚。",
  },
  {
    name: "周先生",
    pet: "英短「豆包」",
    service: "猫咪安静洗护",
    quote: "第一次带猫洗护，最惊喜的是全程没有硬来，吹风也按它能接受的节奏慢慢做。",
    detail: "到店前会确认性格和禁忌，接走时毛蓬松干净，没有香味过重的问题。",
  },
  {
    name: "陈女士",
    pet: "金毛「阿橘」",
    service: "深层护理",
    quote: "掉毛季做完深层护理后家里明显好打扫，底毛梳理得很彻底。",
    detail: "护理师把皮肤干燥、梳毛频率和洗护间隔都讲得很具体，挺安心。",
  },
  {
    name: "何先生",
    pet: "雪纳瑞「黑米」",
    service: "造型修剪",
    quote: "造型没有剪成模板感，会根据脸型和毛量调整，精神很多。",
    detail: "预约、到店、交付都很顺，结束后还发了护理前后对比照片。",
  },
  {
    name: "许女士",
    pet: "老年泰迪「可可」",
    service: "温和洗护",
    quote: "高龄狗狗站久了会累，店里安排了休息间隔，整个过程很有耐心。",
    detail: "没有强推项目，只建议了适合它目前皮肤状态的护理方式。",
  },
  {
    name: "赵先生",
    pet: "柯基「饭团」",
    service: "基础洗护",
    quote: "脚底毛、肚皮和卫生区处理得干净，抱回家就是清爽的手感。",
    detail: "价格和加项都提前确认，接送范围内预约也方便。",
  },
];

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];
  const nextTestimonials = useMemo(
    () => [
      testimonials[(activeIndex + 1) % testimonials.length],
      testimonials[(activeIndex + 2) % testimonials.length],
    ],
    [activeIndex],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }

  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <article
        className="testimonial-card min-h-[360px] rounded-lg border border-[var(--line)] bg-white p-7 shadow-soft md:p-9"
        key={activeTestimonial.name}
      >
        <div className="mb-7 flex items-start justify-between gap-5">
          <div>
            <p className="mb-3 w-fit rounded-full bg-mint px-3 py-1 text-sm font-bold text-[#416b5c]">
              {activeTestimonial.service}
            </p>
            <h3 className="text-[clamp(26px,3.5vw,42px)] font-extrabold leading-tight">
              “{activeTestimonial.quote}”
            </h3>
          </div>
          <span className="hidden text-6xl font-extrabold leading-none text-coral/35 md:block">”</span>
        </div>
        <p className="mb-8 text-lg text-muted">{activeTestimonial.detail}</p>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
          <div>
            <strong className="block text-lg">{activeTestimonial.name}</strong>
            <span className="text-sm text-muted">{activeTestimonial.pet}</span>
          </div>
          <div className="flex gap-2" aria-label="切换客户评价">
            <button
              className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-paper text-xl font-bold transition hover:border-sage hover:bg-mint"
              onClick={goToPrevious}
              type="button"
              aria-label="上一条评价"
            >
              ‹
            </button>
            <button
              className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-ink text-xl font-bold text-white transition hover:-translate-y-0.5 hover:shadow-button"
              onClick={goToNext}
              type="button"
              aria-label="下一条评价"
            >
              ›
            </button>
          </div>
        </div>
      </article>

      <div className="grid gap-4">
        {nextTestimonials.map((testimonial) => (
          <article
            className="rounded-lg border border-[var(--line)] bg-white/75 p-5 transition hover:border-sage hover:bg-white"
            key={testimonial.name}
          >
            <p className="mb-4 text-[17px] font-bold leading-relaxed">“{testimonial.quote}”</p>
            <div className="flex items-center justify-between gap-3 text-sm text-muted">
              <span>{testimonial.name}</span>
              <span>{testimonial.pet}</span>
            </div>
          </article>
        ))}
        <div className="flex gap-2" aria-label="客户评价分页">
          {testimonials.map((testimonial, index) => (
            <button
              aria-label={`查看 ${testimonial.name} 的评价`}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-9 bg-coral" : "w-2.5 bg-sage/35 hover:bg-sage"
              }`}
              key={testimonial.name}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
