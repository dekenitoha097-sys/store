'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const AdminLink = () => {
  return (
    <div className="flex justify-center mt-10">
      <Link
        href="/dashbord"
        className="flex items-center gap-3 px-6 py-4 text-white bg-black rounded-lg text-2xl font-bold shadow-lg hover:bg-gray-800 transition-all"
      >
        <ShieldCheck size={28} />
        Accès Admin
      </Link>
    </div>
  );
};

export default AdminLink;
