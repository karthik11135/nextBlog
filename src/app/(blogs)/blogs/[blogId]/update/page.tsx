import React from 'react'
import UpdateBlog from '@/components/UpdateBlog'

const page = ({
  params: { blogId },
}: {
  params: { blogId: string };
}) => {
  return (
    <UpdateBlog blogId={blogId}/>
  )
}

export default page