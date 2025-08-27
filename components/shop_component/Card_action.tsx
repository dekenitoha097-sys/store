import { ShoppingCart } from 'lucide-react'
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
  produit:Produit;
}

const CardButton = ({produit}:Props) => {

  const handleAddToCard = async () => {
    const res = await fetch("/api/card",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({image_url:produit.image_url,nom:produit.name,prix:produit.price} )
    });
    const data = await res.json();
    alert(data.message);
  }
  return (
    <div>
      <button className="w-full text-white py-2 rounded-lg btn btn-primary transition"
        onClick={handleAddToCard}
      >
        <ShoppingCart /> Ajouter au panier
      </button>
    </div>
  );
};

export default CardButton;


