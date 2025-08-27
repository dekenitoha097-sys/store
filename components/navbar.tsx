'use client'
import { AlignJustify,ShieldUser } from "lucide-react";
import { Menu, ShoppingCart, Users, Package, BarChart2, LogOut } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const router = useRouter();
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-none">
    <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><AlignJustify /></label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
      {/* Sidebar content here */}
      <li><p className="text-2xl font-black">Admin</p></li>
      <li><Link className="inline-flex space-x-2" href="/dashbord"><BarChart2/>Statisques</Link></li>
      <li><Link className="inline-flex" href="/dashbord/produits"> <ShoppingCart/>Produits</Link></li>
      <li><Link className="inline-flex" href="/dashbord/utilisateurs"><Users/>Clients</Link></li>
      <li><Link className="inline-flex" href="/dashbord/commandes"><Package/>Commandes</Link></li>
      <li className="bottom-0 fixed inline-flex m-4 "><button
        onClick={async ()=>{
                            await authClient.signOut();
                            router.push("/sign/sign-in")
                        }}
        className="inline-flex text-xl font-medium"
      ><LogOut/>Deconnexion</button></li>
    </ul>
  </div>
</div>
  </div>
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Admin</a>
  </div>
  <div className="flex-none">
    <h1 className="inline-flex"><ShieldUser /><span>Administrateur</span></h1>
  </div>
    </div>
  );
};

export default NavBar;
