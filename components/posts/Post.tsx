"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import usePost from '@/hooks/usePost'
import Header from '../Header'
import PostItem from './PostItem'
import Form from '../forms/Form'
import CommentFeed from './CommentFeed'

const Post = () => {
  const params = useParams<{id: string}>()
  
  const { data: fetchedPost, isLoading } = usePost(params.id)
  if(isLoading || !fetchedPost){
    return(
      <div className="flex justify-center items-center h-full">
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }
  
  return (
    <>
      <Header label='Post' showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={params.id} isComment placeholder='Post your reply' />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default Post