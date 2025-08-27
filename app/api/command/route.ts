import { NextResponse } from "next/server";
import { connexion } from "@/lib/db"; // adapte selon ton fichier de connexion à la BDD

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      nom_complet,
      email,
      detaille,
      localisation,
      telephone,
    } = data;

    // Validation simple
    if (!nom_complet || !email || !detaille) {
      return NextResponse.json(
        { erreur: "Nom complet, email et détail sont requis." },
        { status: 400 }
      );
    }

    // Insertion dans la base de données
    const query =
      "INSERT INTO commandes (nom_complet, email, detaille, localisation, telephone) VALUES (?, ?, ?, ?, ?)";

    await connexion.execute(query, [
      nom_complet,
      email,
      detaille,
      localisation || null,
      telephone || null,
    ]);

    return NextResponse.json({ message: "Commande insérée avec succès." }, { status: 201 });
  } catch (error) {
    console.error("Erreur insertion commande:", error);
    return NextResponse.json(
      { erreur: "Erreur serveur lors de l'insertion." },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    // Récupérer toutes les commandes
    const [rows] = await connexion.execute(
  "SELECT id, nom_complet, email, detaille, localisation, telephone, date_creation FROM commandes ORDER BY date_creation DESC"
);

    return NextResponse.json({ commandes: rows });
  } catch (error) {
    console.error("Erreur récupération commandes:", error);
    return NextResponse.json(
      { erreur: "Impossible de récupérer les commandes" },
      { status: 500 }
    );
  }
}
