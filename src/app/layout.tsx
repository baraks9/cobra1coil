import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://cobra1.co.il'),
  title: {
    default: "הדברה מקצועית - שירותי הדברה בפריסה ארצית",
    template: "%s | קוברה הדברה"
  },
  description: "שירותי הדברה מקצועיים לכל סוגי המזיקים. זמינות 24/7, מחירים הוגנים ואחריות מלאה. מדבירים מוסמכים עם רישיון המשרד להגנת הסביבה.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${assistant.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
