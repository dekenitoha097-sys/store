import Image from "next/image";
import Welcomme from "@/components/shop_component/welcome";
import Shop_produicts from "@/components/shop_component/shop_produicts";
import Footer from "@/components/shop_component/footer";
export default function Home() {
  return (
    <div>
      <Welcomme />
      <Shop_produicts/>
      <Footer/>
    </div>
  );
}
