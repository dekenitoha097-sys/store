"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LogOut ,Store} from "lucide-react";


const ShopNavbar = () => {
  const session = authClient.useSession();
  const router = useRouter();
    const handle_redirict = () =>{
        const confirm = window.confirm("Veuillez vous connecter avant de continuer");
        if(confirm){
            router.push("/sign/sign-in")
        }
    }

  return (
    <div className="navbar bg-base-100 shadow-sm space-x-4">
      <div className="flex-1">
        <p className="btn btn-ghost text-xl font-bold bg-base-300"><Store /><Link href="/">F&A Boutique</Link></p>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-info">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />{" "}
              </svg>
              <span className="badge badge-sm indicator-item">P</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
                <p className="font-black">PANIER</p>
              <div className="card-actions">
                {
                    !session.data?.user ?
                       <button className="btn btn-primary btn-block"
                        onClick={handle_redirict}
                     >Voir le panier</button> :
                    <button className="btn btn-primary btn-block"><Link href={"/panier"}>Voir le panier</Link></button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        !session.data?.user &&
        <div className="space-x-4">
          <Link href={"/sign/sign-in"} className="btn btn-primary">
            Connectez vous
          </Link>
          <Link href={"/sign/sign-up"} className="btn btn-secondary">
            Cree un compte
          </Link>
        </div>
      }
      {
        session.data?.user && 
        <div>
            <button className="btn btn-info"
                onClick={async ()=>{
                    await authClient.signOut();
                    router.push("/")
                }}
            ><LogOut/>Deconnectez vous</button>
        </div>
      }
    </div>
  );
};

export default ShopNavbar;
