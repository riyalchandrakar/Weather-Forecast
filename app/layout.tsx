import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Weather Forecast App",
  description: "Next.js Weather Forecasting Application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
