"use client";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";

type Produit = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
  image_url: string;
};

type Props = {
  produit: Produit;
};

export default function MyModalComponent({ produit }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isLoading, setIsloading] = useState(false);

  const [image_url, setImageUrl] = useState(produit.image_url);
  const [nom, setNom] = useState(produit.name);
  const [description, setDescription] = useState(produit.description);
  const [prix, setPrix] = useState(produit.price);
  const [stock, setStock] = useState(produit.stock);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const handleUpdateProduict = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true)
    e.preventDefault();
    try {
      const res = await fetch("/api/produicts/" + produit.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url, nom, description, prix, stock }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {

    }finally{
        setIsloading(false)
        window.location.reload()
    }
  };
  return (
    <>
      <button className="btn btn-primary rounded-md" onClick={openModal}>
        Modifier
      </button>

      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <Card className="border-none p-4">
            <h1 className="text-2xl font-black">MODIFICATION</h1>
            <form
              action=""
              className="space-y-4"
              onSubmit={handleUpdateProduict}
            >
              <Label className="font-medium">
                Image du produit
                <p>
                  Veuillez cliquez sur cet lien pour cree lurl de limage.
                  <a href="https://postimages.org/" className="text-blue-400">
                    {" "}
                    cree lurl
                  </a>
                </p>
                <Input
                  required
                  value={image_url}
                  className="border-gray-300"
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
              </Label>

              <Label>
                Nom du produit
                <Input
                  value={nom}
                  required
                  className="border-gray-300"
                  onChange={(e) => {
                    setNom(e.target.value);
                  }}
                />
              </Label>

              <Label>
                Description du produit
                <Textarea
                  value={description}
                  required
                  className="border-gray-300 h-40"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Label>

              <Label>
                Le prix du produit
                <Input
                  value={prix}
                  required
                  className="border-gray-300"
                  type="number"
                  onChange={(e) => {
                    setPrix(e.target.value);
                  }}
                />
              </Label>

              <Label>
                Stock
                <Input
                  value={stock}
                  required
                  className="border-gray-300"
                  type="number"
                  onChange={(e) => {
                    setStock(Number(e.target.value));
                  }}
                />
              </Label>

              <Button className="w-full mt-4 text-white cursor-pointer">
                {isLoading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Ajouter le produit"
                )}
              </Button>
            </form>
          </Card>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-info" >Fermer</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
