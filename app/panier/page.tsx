import Cards from "@/components/shop_component/Card";

import { ShoppingCart  } from "lucide-react";
const Card = () => {
    return ( 
        <div>
            <h1 className="m-auto max-w-4xl p-6 text-4xl text-primary font-bold
            "
            >Panier</h1>
            <Cards/>
        </div>
     );
}
 
export default Card;