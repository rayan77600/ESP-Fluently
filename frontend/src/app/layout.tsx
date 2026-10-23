import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "@/components/ui/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fluently — Pratiquez les langues en vrai",
    template: "%s · Fluently",
  },
  description:
    "Fluently vous aide à pratiquer une langue étrangère lors de rencontres réelles près de chez vous.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
