import { NextResponse, NextRequest } from "next/server";
import { connexion } from "@/lib/db";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const [rows]: any = await connexion.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ data: rows[0] }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Produit non trouvé" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la récupération", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await connexion.execute("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({ message: `Produit supprimé : ${id}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la suppression", error: String(error) },
      { status: 500 }
    );
  }
}



export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { image_url, nom, description, prix, stock } = await req.json();

    await connexion.execute(
      "UPDATE products SET image_url = ?, name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [image_url, nom, description, prix, stock, id] // ✅ ordre corrigé
    );

    return NextResponse.json({ message: "Produit modifié avec succès" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour", error: String(error) },
      { status: 500 }
    );
  }
}
