import { connexion } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    const { image_url, nom, prix } = await req.json();
    await connexion.execute(
      "INSERT INTO cart_items (user_id,product_name,product_price,product_image) VALUES(?,?,?,?)",
      [session?.user.id, nom, , prix, image_url]
    );
    return NextResponse.json({ message: "Ajouter au panier" });
  } catch (error) {
    return NextResponse.json({ message: "Erreur d'insersion" + error });
  }
}

type CountRow = { count: number };

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    const [data] = await connexion.execute(
      "SELECT DISTINCT * FROM cart_items WHERE user_id = ? GROUP BY product_name",
      [session?.user.id]
    );

    const [total] = await connexion.execute(
      "SELECT COUNT(*) FROM cart_items  WHERE user_id = ? GROUP BY product_name",
      [session?.user.id]
    );

    return NextResponse.json({ data, total });
  } catch (error) {
    return NextResponse.json({
      message: "Erreur de recuperation du panier" + error,
    });
  }
}


export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Utilisateur non authentifié" }, { status: 401 });
    }

    await connexion.execute(
      "DELETE FROM cart_items WHERE user_id = ?", 
      [session.user.id]
    );

    return NextResponse.json({ message: "Panier vidé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du panier :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

