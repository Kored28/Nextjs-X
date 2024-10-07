"use client"
import React from 'react'
import Header from '../Header'
import useCurrentUser from '@/hooks/useCurrentUser'
import { redirect } from 'next/navigation'
import NotificationFeed from './NotificationFeed'


const Notification =  () => {
  const { data: currentUser}  = useCurrentUser()
  if(!currentUser){
    redirect("/")
  }
  return (
    <>
        <Header label='Notifications' showBackArrow />
        <NotificationFeed />
    </>
  )
}

export default Notification