import { ShoppingCart, Eye } from "lucide-react";
import { useRef } from "react";
import CardButton from "./Card_action";

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

const Produict_detaille = ({ produit }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      <button
        className="w-full text-white py-2 rounded-lg btn btn-primary transition"
        onClick={openModal}
      >
        <Eye />
        Voir le produit
      </button>



      <dialog ref={modalRef} className="modal">
        
        <div className="modal-box space-y-4">
          <div className="space-y-4">
            <p className="font-bold text-2xl  pb-4">Non du produit : <span className="font-light text-lg text-info
            ">
              {produit.name}</span>
            </p>
            <img src={produit.image_url} alt="" className="w-full rounded-md" />
            <p className="font-bold text-2xl">Description  du produit :<span className="font-light text-lg text-info"> {produit.description}</span></p>
            <p  className="font-bold text-2xl">Prix du produit : <span className="font-light text-lg text-info">
               {produit.price} MAD</span></p>
              <CardButton produit={produit}/>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-secondary">Fermer</button>
            </form>
          </div>


        </div>
      </dialog>
    </div>
  );
};

export default Produict_detaille;
