"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons"
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href: string | null;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean
}


const SidebarItem: React.FC<SidebarItemProps> = ({
  label, href, icon: Icon, onClick, auth, alert
}) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter()
  const loginModal = useLoginModal()

  const handleClick = useCallback(() => {
    if(onClick){
      return onClick()
    }
    if(auth && !currentUser){
      loginModal.onOpen()
    }else if(href) {
      router.push(href)
    }

  }, [router, onClick, href, auth, loginModal, currentUser])


  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full w-14 h-14 flex items-center justify-center p-4 
      hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
      >
        <Icon size={20} color="white" />
        { alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={80} /> : null }
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 
      hover:bg-slate-300 rounded-full hover:bg-opacity-10 cursor-pointer "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        { alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null }
      </div>
    </div>
  )
}

export default SidebarItem