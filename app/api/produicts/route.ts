import { connexion } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image_url, nom, description, prix, stock } = await req.json();

    await connexion.execute(
      "INSERT INTO products (image_url, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [image_url, nom, description, prix, stock]
    );

    return NextResponse.json({ message: "Produit ajouté avec succès" }, { status: 201 });
  } catch (error) {
    console.error("Erreur d'insertion produit :", error);
    return NextResponse.json(
      { message: "Erreur côté serveur", error: String(error) },
      { status: 500 }
    );
  }
}


export async function GET(req:Request) {
    try {
        const [data] = await connexion.execute("SELECT * FROM products");
        return NextResponse.json({data},{status:200})
    } catch (error) {
        return NextResponse.json({message:"aucun produits"},{status:500})
    }
}