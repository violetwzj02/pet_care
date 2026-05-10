"use client";

import { KeyboardEvent } from "react";

type Plan = {
  title: string;
  intro: string;
  price: string;
  featured: boolean;
  items: string[];
};

type PlanCardsProps = {
  plans: Plan[];
};

export function PlanCards({ plans }: PlanCardsProps) {
  function choosePlan(service: string) {
    const booking = document.querySelector("#booking");
    const serviceSelect = document.querySelector<HTMLSelectElement>('select[name="service"]');

    if (serviceSelect) {
      serviceSelect.value = service;
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    booking?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, service: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choosePlan(service);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((plan) => (
        <article
          aria-label={`${plan.title}，选择套餐`}
          className="group flex cursor-pointer flex-col rounded-lg border border-[var(--line)] bg-white p-7 text-ink outline-none transition duration-200 hover:-translate-y-1 hover:border-sage/60 hover:bg-mint/45 hover:shadow-soft focus-visible:border-sage focus-visible:bg-mint/45 focus-visible:ring-4 focus-visible:ring-sage/30 active:translate-y-0"
          key={plan.title}
          onClick={() => choosePlan(plan.title)}
          onKeyDown={(event) => handleKeyDown(event, plan.title)}
          role="button"
          tabIndex={0}
        >
          <h3 className="mb-1 text-2xl font-extrabold">{plan.title}</h3>
          <p className="mb-4 text-muted">{plan.intro}</p>
          <div className="mb-5 text-[44px] font-extrabold leading-none">
            {plan.price}
            <span className="text-base font-bold"> 起</span>
          </div>
          <ul className="mb-7 grid gap-3">
            {plan.items.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="text-sage">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <span className="button button-secondary mt-auto w-full group-hover:-translate-y-0 group-hover:border-ink group-hover:bg-ink group-hover:text-white group-focus-visible:border-ink group-focus-visible:bg-ink group-focus-visible:text-white">
            选择套餐
          </span>
        </article>
      ))}
    </div>
  );
}
