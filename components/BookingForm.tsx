"use client";

import { FormEvent, useMemo, useState } from "react";

export function BookingForm() {
  const [toast, setToast] = useState("");
  const tomorrowDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const owner = formData.get("owner") || "主人";
    const date = formData.get("date") || "预约日期";
    const time = formData.get("time") || "预约时段";

    setToast(`${owner}，已收到 ${date} ${time} 的预约信息。`);
    form.reset();

    window.setTimeout(() => {
      setToast("");
    }, 3600);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-soft md:p-7"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="font-bold text-ink">
            主人姓名
            <input
              className="form-control"
              type="text"
              name="owner"
              placeholder="例如：小林"
              required
            />
          </label>
          <label className="font-bold text-ink">
            联系电话
            <input
              className="form-control"
              type="tel"
              name="phone"
              placeholder="请输入手机号"
              required
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="font-bold text-ink">
            宠物类型
            <select className="form-control" name="pet" required>
              <option value="">请选择</option>
              <option>小型犬</option>
              <option>中大型犬</option>
              <option>猫咪</option>
              <option>其他宠物</option>
            </select>
          </label>
          <label className="font-bold text-ink">
            服务项目
            <select className="form-control" name="service" required>
              <option value="">请选择</option>
              <option>基础洗护</option>
              <option>精致美容</option>
              <option>深层护理</option>
              <option>到店评估</option>
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="font-bold text-ink">
            预约日期
            <input
              className="form-control"
              type="date"
              name="date"
              defaultValue={tomorrowDate}
              required
            />
          </label>
          <label className="font-bold text-ink">
            预约时段
            <select className="form-control" name="time" defaultValue="09:30 - 10:30" required>
              <option value="">请选择</option>
              <option>09:30 - 10:30</option>
              <option>10:00 - 12:00</option>
              <option>12:00 - 15:00</option>
              <option>15:00 - 18:00</option>
              <option>18:00 - 20:30</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block font-bold text-ink">
          宠物情况
          <textarea
            className="form-control min-h-[118px] resize-y"
            name="message"
            placeholder="例如：怕吹风、最近掉毛多、需要修圆脸"
          />
        </label>

        <button className="button mt-5" type="submit">
          提交预约
        </button>
      </form>

      <div
        className={`fixed bottom-6 left-1/2 z-30 w-[min(520px,calc(100%-32px))] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-center font-bold text-white shadow-button transition ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
}
