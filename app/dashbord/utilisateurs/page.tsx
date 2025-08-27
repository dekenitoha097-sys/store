'use client'
import Users from "@/components/show_users";
import { useEffect,useState } from "react";

type User = {
    id:string,
    name:string,
    email:string,
    emailVerified:number,
    image:null,
    createdAt:string,
    updatedAt:string,
    role:string
}

const Show_Users = () => {

    const [users,setUsers] = useState<User[]>([]);

    useEffect(()=>{
        fetch("/api/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    },[])
    return ( 
        <div>
            <Users user={users}/>
        </div>
     );
}
 
export default Show_Users;