import type { Metadata } from "next";
import NavBar from "@/components/navbar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connexion } from "@/lib/db";
import { redirect } from "next/navigation";
import { RowDataPacket } from "mysql2";

// Typage du résultat SQL
interface UserRow extends RowDataPacket {
  role: string;
}

export const metadata: Metadata = {
  title: "F&A Boutique – Mode tendance",
  description: "Achetez les meilleurs vêtements chez F&A Boutique.",
  icons: {
    icon: "/favicon.ico",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Récupérer la session
  const session = await auth.api.getSession({ headers: await headers() });

  // Vérifier si l'utilisateur est connecté
  if (!session?.user?.id) {
    redirect("/");
  }

  // Récupérer le rôle depuis la BDD
  const [rows] = await connexion.execute<UserRow[]>(
    "SELECT role FROM user WHERE id = ?",
    [session.user.id]
  );

  const userRole = rows[0]?.role ?? null;

  // Vérifier si le rôle est admin
  if (userRole !== "admin") {
    redirect("/"); // Crée cette page si besoin
  }

  // Sinon, accès autorisé
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
