import { ShoppingCart,Eye } from 'lucide-react';

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

const Produict_detaille = ({produit}:Props) => {
  return (
    <div>
      <button className="w-full text-white py-2 rounded-lg btn btn-primary transition">
        <Eye />
        Voir le produit
      </button>
    </div>
  );
};

export default Produict_detaille;
