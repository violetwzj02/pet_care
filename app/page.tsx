import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { PlanCards } from "@/components/PlanCards";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

const navItems = [
  ["服务", "#services"],
  ["套餐", "#plans"],
  ["流程", "#process"],
  ["评价", "#testimonials"],
  ["门店", "#shop"],
];

const stats = [
  ["45min", "小型犬基础洗护起"],
  ["1v1", "护理师专属看护"],
  ["24h", "预约提醒与回访"],
];

const services = [
  {
    icon: "洗",
    title: "温和洗护",
    body: "低刺激香波、双段冲洗、吸水巾预干，减少吹风时间和紧张感。",
  },
  {
    icon: "剪",
    title: "美容修剪",
    body: "脸部圆修、脚底毛、腹底毛、卫生区和整体造型，按品种与生活习惯设计。",
  },
  {
    icon: "护",
    title: "皮毛护理",
    body: "针对干燥、打结、掉毛和异味问题，安排护毛、开结、深层清洁服务。",
  },
  {
    icon: "查",
    title: "基础观察",
    body: "护理时同步观察耳朵、指甲、皮肤和口腔状态，异常情况及时反馈。",
  },
];

const plans = [
  {
    title: "基础洗护",
    intro: "日常清洁与基础整理",
    price: "¥88",
    featured: false,
    items: ["温水清洗与护毛", "耳道清洁与指甲修剪", "脚底毛与卫生区整理", "基础皮肤状态反馈"],
  },
  {
    title: "精致美容",
    intro: "洗护加完整造型",
    price: "¥168",
    featured: true,
    items: ["基础洗护全套内容", "脸部、身体、尾巴造型", "开结与毛量修整", "护理后定妆拍照"],
  },
  {
    title: "深层护理",
    intro: "掉毛、异味、干燥专项",
    price: "¥228",
    featured: false,
    items: ["深层清洁与护毛膜", "底绒梳理与废毛处理", "皮毛问题护理建议", "7 日护理回访"],
  },
];

const steps = [
  ["01", "到店评估", "确认体型、毛结、皮肤、耳朵和情绪状态。"],
  ["02", "分区洗护", "按宠物习惯调整水流、温度、香波和护理节奏。"],
  ["03", "烘干造型", "低噪吹干、梳开底毛，再完成修剪与整理。"],
  ["04", "交付回访", "提供护理记录，必要时给出居家护理建议。"],
];

const shopInfo = [
  ["营业时间", "周一至周日 10:00 - 20:30"],
  ["门店地址", "上海市普陀区宜川路街道陕西北路1620号"],
  ["预约电话", "021-8888-6620"],
  ["接送范围", "门店周边 3 公里内可预约"],
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-paper/90 backdrop-blur-2xl">
        <nav
          className="container-shell flex min-h-[70px] items-center justify-between gap-6"
          aria-label="主导航"
        >
          <a className="flex items-center gap-3 whitespace-nowrap font-extrabold" href="#top" aria-label="绒光宠物洗护店首页">
            <span className="grid size-[42px] place-items-center rounded-[13px] bg-gradient-to-br from-sage to-coral text-[23px] text-white shadow-[0_12px_24px_rgba(122,169,150,0.28)]">
              宠
            </span>
            <span>绒光宠物洗护店</span>
          </a>

          <div className="hidden items-center gap-5 text-[15px] text-muted md:flex">
            {navItems.map(([label, href]) => (
              <a className="transition hover:text-ink" href={href} key={href}>
                {label}
              </a>
            ))}
          </div>

          <a className="button hidden md:inline-flex" href="#booking">
            立即预约
          </a>
        </nav>
      </header>

      <main id="top">
        <section
          className="grid min-h-[calc(100vh-70px)] items-stretch bg-cover bg-center md:bg-right"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,253,248,0.96) 0%, rgba(255,253,248,0.82) 42%, rgba(255,253,248,0.18) 76%), url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1800&q=82')",
          }}
        >
          <div className="container-shell grid content-center py-[72px] pb-[52px]">
            <div className="w-[min(630px,100%)]">
              <p className="eyebrow">小型犬 · 猫咪 · 中大型犬分区护理</p>
              <h1 className="mb-5 text-[clamp(42px,7vw,82px)] font-extrabold leading-[1.02] tracking-normal">
                让毛孩子干净、松软、好心情。
              </h1>
              <p className="mb-7 w-[min(560px,100%)] text-[19px] text-[#41504b]">
                绒光提供洗护、美容、皮毛护理和基础健康观察。全程可视化操作，按宠物性格安排护理节奏。
              </p>
              <div className="mb-9 flex flex-wrap gap-3.5">
                <a className="button" href="#booking">
                  预约洗护
                </a>
                <a className="button button-secondary" href="#plans">
                  查看套餐
                </a>
              </div>
              <div className="grid w-[min(560px,100%)] grid-cols-1 gap-3 sm:grid-cols-3" aria-label="门店数据">
                {stats.map(([value, label]) => (
                  <div className="min-h-[94px] rounded-lg border border-[var(--line)] bg-white/80 p-4" key={value}>
                    <strong className="block text-[25px] leading-tight">{value}</strong>
                    <span className="text-[13px] text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-band" id="services">
          <div className="container-shell">
            <div className="section-head">
              <p className="eyebrow">核心服务</p>
              <h2>从清洁到造型，每一步都照顾宠物的感受。</h2>
              <p>护理前先做皮肤、耳道、毛结和情绪评估，再选择水温、风速、梳理方式和护理产品。</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <article
                  className="min-h-[260px] rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_40px_rgba(38,50,56,0.08)]"
                  key={service.title}
                >
                  <div className="mb-5 grid size-12 place-items-center rounded-lg bg-mint text-xl font-extrabold text-[#416b5c]">
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-[22px] font-extrabold">{service.title}</h3>
                  <p className="text-muted">{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section-band-alt">
          <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[430px]">
              <Image
                className="absolute left-0 top-0 h-[330px] w-[72%] rounded-lg object-cover shadow-soft"
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=82"
                alt="刚洗护完成的狗狗坐在室内"
                width={900}
                height={660}
                sizes="(max-width: 1024px) 72vw, 420px"
                unoptimized
              />
              <Image
                className="absolute bottom-0 right-0 h-[290px] w-[58%] rounded-lg border-[10px] border-[#f3f8f4] object-cover shadow-soft"
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=82"
                alt="两只干净的狗狗在户外"
                width={700}
                height={540}
                sizes="(max-width: 1024px) 58vw, 340px"
                unoptimized
              />
            </div>

            <div>
              <p className="eyebrow">护理体验</p>
              <h2 className="mb-4 text-[clamp(30px,4vw,48px)] font-extrabold leading-tight">
                怕水、怕吹风、第一次来店，都可以慢慢来。
              </h2>
              <p className="mb-6 text-lg text-muted">
                我们会把陌生环境拆成小步骤：先闻闻工具，再接触水流，吹风从低档开始。对猫咪、幼宠和高龄宠物，会预留更安静的护理时段。
              </p>
              <ul className="grid gap-3 text-[17px]">
                {[
                  "独立洗护台与消毒工具，避免交叉使用。",
                  "护理前后拍照记录，方便对比皮毛状态。",
                  "可自带常用香波、药浴产品和安抚零食。",
                  "支持到店接送，半径 3 公里内可预约。",
                ].map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-honey font-extrabold text-ink">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-band" id="plans">
          <div className="container-shell">
            <div className="section-head">
              <p className="eyebrow">套餐价格</p>
              <h2>按体型和护理需求选择套餐。</h2>
              <p>价格会根据毛量、打结程度和宠物配合度微调，到店评估后再确认。</p>
            </div>

            <PlanCards plans={plans} />
          </div>
        </section>

        <section className="section-band section-band-alt" id="process">
          <div className="container-shell">
            <div className="section-head">
              <p className="eyebrow">服务流程</p>
              <h2>清晰流程，让主人放心，也让宠物少紧张。</h2>
              <p>每次护理都有固定记录，适合长期跟踪皮毛变化。</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map(([number, title, body]) => (
                <article className="rounded-lg bg-white p-6 shadow-[0_12px_30px_rgba(38,50,56,0.08)]" key={number}>
                  <span className="mb-6 block text-sm font-extrabold text-coral">{number}</span>
                  <h3 className="mb-2 text-xl font-extrabold">{title}</h3>
                  <p className="text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band" id="testimonials">
          <div className="container-shell">
            <div className="section-head">
              <p className="eyebrow">客户评价</p>
              <h2>常来的主人，最在意的是细节和稳定感。</h2>
              <p>这里收集了不同宠物类型、不同护理需求的真实反馈方向，方便新主人了解服务体验。</p>
            </div>

            <TestimonialsCarousel />
          </div>
        </section>

        <section className="section-band section-band-alt" id="shop">
          <div className="container-shell">
            <div className="grid overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-mint p-4 md:p-6">
                <Image
                  className="h-full min-h-[320px] w-full rounded-lg object-cover"
                  src="/assets/shop/cute-location-map.png"
                  alt="绒光宠物洗护位于陕西北路1620号的可爱手绘地图"
                  width={1200}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
              <div className="p-7 md:p-10">
                <p className="eyebrow">门店信息</p>
                <h2 className="mb-4 text-[clamp(30px,4vw,48px)] font-extrabold leading-tight">
                  安静、明亮、没有刺鼻味道的洗护空间。
                </h2>
                <p className="mb-7 text-lg text-muted">
                  店内设置犬猫分时护理、用品消毒区、等候区和拍照区。护理过程中可通过前台屏幕查看实时状态。
                </p>
                <div className="mb-7 grid gap-3 sm:grid-cols-2">
                  {shopInfo.map(([label, value]) => (
                    <div className="rounded-lg border border-[var(--line)] bg-paper p-4" key={label}>
                      <strong className="block">{label}</strong>
                      <span className="text-sm text-muted">{value}</span>
                    </div>
                  ))}
                </div>
                <a className="button" href="#booking">
                  预约到店
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-band" id="booking">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">在线预约</p>
              <h2 className="mb-4 text-[clamp(30px,4vw,48px)] font-extrabold leading-tight">
                告诉我们宠物的情况，护理师会提前准备。
              </h2>
              <p className="text-lg text-muted">提交后会显示预约提示。正式接单可连接后台、表单服务或门店微信。</p>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-ink py-7 text-white">
        <div className="container-shell flex flex-col justify-between gap-2 text-sm text-white/75 md:flex-row">
          <span>© 2026 绒光宠物洗护店</span>
          <span>洗护 · 美容 · 皮毛护理 · 到店接送</span>
        </div>
      </footer>
    </>
  );
}
