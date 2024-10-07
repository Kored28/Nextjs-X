"use client"
import React from 'react'
import useUser from '@/hooks/useUser'
import Header from '@/components/Header'
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import UserHero from './UserHero'
import UserBio from './UserBio'
import PostFeed from '../posts/PostFeed'


const User = () => {
  const params = useParams<{id: string}>()
  const { data: fetchedUser, isLoading } = useUser(params.id)


  return (
    <>
        <Header showBackArrow label={fetchedUser?.name} />
        { isLoading || !fetchedUser ? (
            <div className="flex justify-center items-center h-full">
             <ClipLoader color='lightblue' size={80} />
            </div>
        ) : (
            <>
              <UserHero  userId={params.id} />
              <UserBio  userId={params.id} />
              <PostFeed userId={params.id} />
            </>
        )}
    </>
  )
}

export default User