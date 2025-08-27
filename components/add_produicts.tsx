"use client";

import { Button } from "./ui/button";
import { Plus,Minus } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";

const AddProduicts = () => {
  const [formVisile, setFormvisible] = useState(false);
  const [isLoading,setIsloading] = useState(false);

  const [image_url, setImageUrl] = useState("");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState(1);
  const [stock, setStock] = useState(1);

  const handleSetVisible = () => {
    setFormvisible(!formVisile);
  };

  const handleAddproduicts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true)
    try {
      const res = await fetch("/api/produicts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ image_url, nom, description, prix, stock }),
      });
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {

    }finally{
        setIsloading(false)
        setImageUrl("");
        setNom("");
        setDescription("");
        setPrix(1);
        setStock(1);
    }
  };
  return (
    <div className="m-auto max-w-4xl p-6">
      <div className="flex justify-between items-center border-b p-4">
        <h1 className="font-bold text-2xl">Ajouter un produit</h1>
        <Button
          className="cursor-pointer text-white"
          onClick={handleSetVisible}
        >
          {formVisile ? <Minus/> : <Plus />}
        </Button>
      </div>
      {formVisile && (
        <div className="m-4 transition-all duration-300">
          <Card className="border-none p-4">
            <form action="" className="space-y-4" onSubmit={handleAddproduicts}>
              <Label className="font-medium">
                Image du produit
                <p>Veuillez cliquez sur cet lien pour cree lurl de limage.
                     <a href="https://postimages.org/" target="_blank" className="text-blue-400
                     hover:underline"> cree lurl</a>
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
                    setPrix(Number(e.target.value));
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

              <Button className="w-full mt-4 text-white cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-dots loading-lg"></span> : "Ajouter le produit"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddProduicts;
