import { useState } from "react";
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

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
}

const CardButton = ({produit}:Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAddToCard = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/card",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({image_url:produit.image_url,nom:produit.name,prix:produit.price})
      });
      const data = await res.json();
      
      if (res.ok) {
        showToast(data.message || "Produit ajouté au panier!", "success");
      } else {
        showToast(data.message || "Erreur lors de l'ajout", "error");
      }
    } catch (error) {
      showToast("Une erreur est survenue", "error");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <button 
      onClick={handleAddToCard}
      disabled={isLoading}
      className="flex-1 flex items-center justify-center space-x-2 btn-gradient py-3 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
      <span>{isLoading ? "Ajout..." : "Ajouter"}</span>
    </button>
  );
};

export default CardButton;
