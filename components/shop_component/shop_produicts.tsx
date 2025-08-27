"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import CardButton from "./Card_action";
import Produict_detaille from "./Produict_detaille";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

const Shop_produicts = () => {
  const [dat, setData] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const session = authClient.useSession();

  useEffect(() => {
    fetch("/api/produicts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch :", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handle_redirict = () => {
    const confirm = window.confirm("Veuillez vous connecter avant de continuer");
    if (confirm) {
      router.push("/sign/sign-in");
    }
  };

  return (
    <div>
      <h1 className="text-center m-4 font-bold text-2xl">Produits</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 m-10">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 space-y-4 animate-pulse"
              >
                <div className="h-40 bg-gray-300 rounded w-full skeleton"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 skeleton"></div>
                <div className="h-4 bg-gray-300 rounded w-full skeleton"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 skeleton"></div>
                <div className="h-10 bg-gray-300 rounded w-full skeleton"></div>
                <div className="h-10 bg-gray-300 rounded w-full skeleton"></div>
              </div>
            ))
          : dat.map((produit, k) => (
              <div
                key={k}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={produit.image_url}
                  alt={produit.name}
                  className="w-full object-cover"
                />

                <div className="p-4 flex flex-col justify-between h-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {produit.name}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {produit.description}
                  </p>

                  <div className="mt-auto space-y-2">
                    <p className="text-lg font-bold text-primary mb-4">
                      {produit.price} MAD
                    </p>

                    {session.data?.user ? (
                      <Produict_detaille produit={produit} />
                    ) : (
                      <button
                        className="w-full text-white py-2 rounded-lg btn btn-primary transition"
                        onClick={handle_redirict}
                      >
                        <Eye />
                        Voir le produit
                      </button>
                    )}

                    {session.data?.user ? (
                      <CardButton produit={produit} />
                    ) : (
                      <button
                        className="w-full text-white py-2 rounded-lg btn btn-primary transition"
                        onClick={handle_redirict}
                      >
                        <ShoppingCart /> Ajouter au panier
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Shop_produicts;
