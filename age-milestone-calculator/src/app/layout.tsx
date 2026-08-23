import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Age Calculator — Precision Chronological Age & Astrology Insights",
  description: "Calculate exact chronological age, next birthday countdown, astrology zodiac signs, generation cohorts, and birth lore.",
  keywords: ["age calculator", "calculate age", "birthday countdown", "astrology", "zodiac sign", "generation cohort"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
