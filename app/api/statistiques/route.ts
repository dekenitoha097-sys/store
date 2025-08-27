import { connexion } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

interface RowData extends RowDataPacket {
    nbr_users:number
}

export async function GET(req:Request) {
    try {
        const [data] = await connexion.execute<RowData[]>("SELECT COUNT(*) as nbr_users FROM user");

        const nbr_users = data[0]?.nbr_users ?? null;

        const [data_car] = await connexion.execute<RowData[]>("SELECT COUNT(*) as nbr_card FROM cart_items");

        const nbr_commande = data_car[0].nbr_card

        const [data_pro] =  await connexion.execute<RowData[]>("SELECT COUNT(*) as nbr_prod FROM products");
        const nbr_produicts = data_pro[0].nbr_prod

        return NextResponse.json({nbr_users,nbr_commande,nbr_produicts})
     } catch (error) {
        return NextResponse.json({message:"Erreur"})
    }
}