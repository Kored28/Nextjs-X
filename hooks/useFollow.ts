import React, { useCallback, useMemo } from 'react'
import useCurrentUser from './useCurrentUser'
import useUser from './useUser'
import useLoginModal from './useLoginModal'
import toast from 'react-hot-toast'
import axios from 'axios'

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()

  const { mutate: mutatefetchedUser } = useUser(userId)

  const loginModal = useLoginModal()
  
  const isFollowing = useMemo(() => {
    const lists = currentUser?.followingIds || [];

    return lists.includes(userId)
  }, [userId, currentUser?.followingIds])

  const toggleFollow = useCallback( async () => {
    if(!currentUser){
        return loginModal.onOpen()
    }

    try {
        let request 

        if(isFollowing) {
            request = () => axios.delete('/api/follow', { data: { userId } })
        }else{
            request = () => axios.post('/api/follow', { userId })
        }

        await request()

        mutateCurrentUser()
        mutatefetchedUser()

        toast.success('Success')

    } catch (error) {
        toast.error("Something went wrong")
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutatefetchedUser, loginModal])

  return{
    isFollowing, toggleFollow
  }
}

export default useFollow