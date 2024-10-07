"use client"
import React from 'react'
import useUser from '@/hooks/useUser';
import Avatar from '../avatar/Avatar';
import Image from 'next/image';

interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId)
  return (
    <div>
        <div className="h-44 bg-neutral-700 relative">
            {fetchedUser?.coverImage && (
                <Image 
                src={fetchedUser.coverImage}
                alt="Cover Image"
                fill
                style={{ objectFit: "cover" }}
                />
            )}
            <div className="absolute -bottom-10 left-4">
                <Avatar userId={userId} isLarge hasBorder />
            </div>
        </div>
    </div>
  )
}

export default UserHero