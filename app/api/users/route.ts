import { connexion } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const [data] = await connexion.execute("SELECT * FROM user");
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message:"Erreur serveur"})
    }
}