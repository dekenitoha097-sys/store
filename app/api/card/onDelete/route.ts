import { connexion } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    // Vérifier la session utilisateur (authentification)
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
    }

    // Récupérer le nom du produit dans le corps de la requête
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ erreur: "Le nom du produit est requis" }, { status: 400 });
    }

    // Exécuter la requête de suppression
    await connexion.execute("DELETE FROM cart_items WHERE product_name = ?", [name]);

    // Retourner une réponse de succès
    return NextResponse.json({ message: "Produit retiré du panier avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article du panier :", error);
    return NextResponse.json({ erreur: "Erreur serveur interne" }, { status: 500 });
  }
}
