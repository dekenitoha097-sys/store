import { headers } from "next/headers";
import { connexion } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

// Typage correct du résultat SQL
interface UserRow extends RowDataPacket {
  role: string;
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    // Sécurité : vérifier si l’utilisateur est connecté
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Requête SQL avec typage
    const [rows] = await connexion.execute<UserRow[]>(
      "SELECT role FROM user WHERE id = ?",
      [session.user.id]
    );

    const userRole = rows[0]?.role ?? null;

    return NextResponse.json({ role: userRole });
  } catch (error) {
    console.error("Erreur API GET /role :", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
