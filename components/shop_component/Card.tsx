'use client';

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Command from "./command";
import { Button } from "../ui/button";

type Produit = {
  id: number;
  user_id: string;
  product_name: string;
  product_price: string;
  product_image: string;
};

type TotalCount = {
  "COUNT(*)": number;
};

type PanierResponse = {
  data: Produit[];
  total: TotalCount[];
};

const Cards = () => {
  const [card, setCard] = useState<Produit[]>([]);
  const [allTotal, setAlltotal] = useState<TotalCount[]>([]);

  useEffect(() => {
    fetch("/api/card")
      .then((res) => res.json())
      .then((data: PanierResponse) => {
        console.log(data);
        setCard(data.data);
        setAlltotal(data.total);
      });
  }, []);

  const handle_delete_card = async () => {
    const confirmDelete = window.confirm("Voulez-vous vider le panier ?");
    if (confirmDelete) {
      try {
        const res = await fetch("/api/card", {
          method: "DELETE",
        });

        const data = await res.json();
        alert(data.message);

        // Mise à jour locale sans recharger la page
        setCard([]);
        setAlltotal([]);
      } catch (error) {
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  async function handle_delete_on_card(name: string) {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer ce produit du panier ?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch("/api/card/onDelete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        const data = await res.json();
        alert(data.message);

        // Mise à jour locale du panier sans recharger la page
        setCard((prev) => prev.filter((p) => p.product_name !== name));
        // TODO: mettre à jour allTotal si nécessaire
      } catch (error) {
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  }

  return (
    <div className="m-auto max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-4">Mon panier (articles)</h2>

      {card.map((c, k) => (
        <div
          key={k}
          className="border rounded-lg p-4 mb-4 flex items-center gap-4 border-none shadow-md"
        >
          <img
            src={c.product_image}
            alt={c.product_name}
            width={100}
            className="rounded"
          />
          <div>
            <h1 className="text-lg font-semibold">{c.product_name}</h1>
            <p className="text-primary font-bold">{c.product_price} MAD</p>
            <p>
              Quantité: {allTotal[k] ? allTotal[k]["COUNT(*)"] : 1}
              {/* Par défaut 1 si la quantité n’est pas trouvée */}
            </p>
            <button
              className="btn btn-error text-white"
              onClick={() => handle_delete_on_card(c.product_name)}
            >
               <Trash2 />Supprimer
            </button>
          </div>
        </div>
      ))}

      <Command produit={card} prix={allTotal} />

      <Button
        className="w-full text-white mt-4 cursor-pointer"
        onClick={handle_delete_card}
      >
        <Trash2 />
        Vider le panier
      </Button>

    </div>
  );
};

export default Cards;
