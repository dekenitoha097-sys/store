"use client";
import { ShoppingCart, TruckElectric } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MyModalComponent from "./modify_Component";
type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

const ShowProduits = () => {
  const [dat, setData] = useState<Produit[]>([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetch("/api/produicts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
        setIsloading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch :", error);
      });
  }, []);

  async function delete_produict(id: number) {
    const response = window.confirm("Voulez vous vraiment suprimer?");
    if (response) {
      const res = await fetch("/api/produicts/" + id, {
        method: "DELETE",
      });
      const message = await res.json();
      alert(message.message);
      window.location.reload();
    }
  }

  const skelton = [1, 2, 3, 4];

  return (
    <div className="m-auto max-w-4xl p-6">
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-bold mb-4">
          <ShoppingCart className="mr-2" /> Liste des produits
        </h1>
      </div>
      {isLoading &&
        skelton.map((el, k) => (
          <div key={k} className="shadow-md p-4 space-y-2">
            <div className="flex justify-between  rounded-md">
              <div className="skeleton h-32 w-32"></div>
              <div className="skeleton h-32 w-32"></div>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="skeleton h-10 w-full"></div>
                <div className="skeleton h-10 w-full"></div>
            </div>
          </div>
        ))}

      <div className="space-y-4">
        {dat.map((produit, k) => (
          <div key={k} className="shadow-md p-4 space-y-2">
            <div className="flex justify-between  rounded-md">
              <div>
                <img
                  src={produit.image_url}
                  alt=""
                  width={70}
                  className="rounded-md"
                />
              </div>

              <div>
                <h1>Nom: {produit.name}</h1>
                <p>Prix: {produit.price} </p>
                <p>Stock: {produit.stock}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <MyModalComponent produit={produit} />
              <Button
                className="text-white cursor-pointer bg-pink-700"
                onClick={() => delete_produict(produit.id)}
              >
                Suprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduits;
