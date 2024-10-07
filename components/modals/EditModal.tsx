"use client"
import React, { useEffect } from 'react'
import { useCallback, useState } from "react";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import useEditModal from '@/hooks/useEditModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import ImageUpload from '../imageUpload/ImageUpload';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatefetchedUser } = useUser(currentUser?.id)
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ])

  const [isLoading, setIsLoading] = useState(false)
  
  const onSubmit = useCallback(async() => {
    try {
      setIsLoading(true)

      await axios.patch("/api/edit", {
          name,
          username,
          bio,
          profileImage,
          coverImage
      })
      mutatefetchedUser()

      toast.success("updated")

      editModal.onClose()

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally{
      setIsLoading(false)
    }
  }, [name, username, bio, profileImage, coverImage, mutatefetchedUser, editModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
      value={profileImage}
      disabled={isLoading}
      onChange={(image)=> setProfileImage(image)}
      label="upload profile image"
      />

      <ImageUpload
      value={coverImage}
      disabled={isLoading}
      onChange={(image)=> setCoverImage(image)}
      label="upload cover image"
      />

      <Input 
      placeholder='Name'
      type='text'
      onChange={(e) => setName(e.target.value)}
      value={name}
      disabled={isLoading}
      />

      <Input 
      placeholder='Username'
      type='text'
      onChange={(e) => setUsername(e.target.value)}
      value={username}
      disabled={isLoading}
      />

      <Input 
      type='text'
      placeholder='Bio'
      onChange={(e) => setBio(e.target.value)}
      value={bio}
      disabled={isLoading}
      />
        
    </div>
  )

  return (
    <Modal 
    disabled={isLoading}
    isOpen={editModal.isOpen}
    title='Edit your profile'
    actionLabel='Save'
    onClose={editModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default EditModal