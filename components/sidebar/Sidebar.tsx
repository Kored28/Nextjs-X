"use client"
import React from 'react'
import { BsBellFill, BsFillHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa6'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import { BiLogOut } from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const { data: currentUser}  = useCurrentUser()
  const items = [
    {
        label: "Home",
        href: "/",
        icon: BsFillHouseFill
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: BsBellFill,
        auth: true,
        alert: currentUser?.hashNotification,
    },
    {
        label: "Profile",
        href: `/users/${currentUser?.id}`,
        icon: FaUser,
        auth: true,
    }, 
  ]  

  return (
    <div className="col-span-1 h-full pr-2">
        <div className="flex flex-col items-center">
            <div className="space-y-2 lg:w-[230px]">
                <SidebarLogo />
                {items.map((item) => (
                    <SidebarItem 
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    auth={item.auth}
                    alert={item.alert}
                    />
                ))}
                {currentUser && (
                    <SidebarItem href={null} onClick={() => signOut()} icon={BiLogOut} label='Logout'/>
                )}
                <SidebarTweetButton />
            </div>
        </div>
    </div>
  )
}

export default Sidebar