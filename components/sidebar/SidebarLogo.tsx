"use client"

import { useRouter } from 'next/navigation'
import { BsTwitterX } from 'react-icons/bs';

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
    onClick={() => router.push("/")}
    className="rounded-full h-14 w-14 p-4 flex items-center justify-center
    hover:bg-blue-300 cursor-pointer transition"
    >
        <BsTwitterX size={20} color="white"/>
    </div>
  )
}

export default SidebarLogo