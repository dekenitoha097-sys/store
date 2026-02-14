import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShopNavbar from "@/components/shop_navbar";
import { ToastProvider } from "@/components/ui/toast";
import CookieConsent from "@/components/cookie-consent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F&A Boutique – Votre Destination Mode",
  description: "Découvrez notre collection exclusive de produits de qualité. Achetez en ligne en toute simplicité.",
  keywords: ["boutique", "mode", "vêtements", "shopping", "produits", "F&A"],
  authors: [{ name: "F&A Boutique" }],
  openGraph: {
    title: "F&A Boutique – Votre Destination Mode",
    description: "Découvrez notre collection exclusive de produits de qualité.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <ToastProvider>
          <ShopNavbar />
          <main className="min-h-screen">{children}</main>
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
