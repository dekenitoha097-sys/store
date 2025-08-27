'use client'
import { useEffect, useState } from "react";

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

type Users = {
    user:User[]
}

const Users = ({ user }: Users) => {
    return (
        <div className="m-auto max-w-4xl p-6">
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-700">Nom</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Email</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Rôle</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {user.map((u, k) => (
                            <tr key={k} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{u.name}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2 capitalize">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

 
export default Users;