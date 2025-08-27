import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "F&A Boutique – Mode tendance",
  description: "Achetez les meilleurs vêtements chez F&A Boutique.",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
      >
        {children}
      </body>
    </html>
  );
}
