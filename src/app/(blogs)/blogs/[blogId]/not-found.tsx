import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='mx-auto w-fit text-xl my-10 font-extralight'>
        Blog is not found :
        <br></br>
        <Link href={'/blogs'} className='underline text-purple-500'>Blogs</Link>
    </div>
  )
}

export default page