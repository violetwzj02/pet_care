import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "绒光宠物洗护店",
  description: "绒光提供洗护、美容、皮毛护理和基础健康观察。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
