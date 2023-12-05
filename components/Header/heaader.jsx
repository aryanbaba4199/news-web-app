import React from 'react'
import Link from 'next/link';

const heaader = () => {
  return (
    <div className='w-full h-20 p-4 flex overflow-scroll justify-center bg-slate-800 text-white gap-4 font-semibold'>
        <div>
        <Link className='p-1 px-2 hover:bg-blue-600  h-fit  rounded-md' href="/">Home</Link>
        <Link className='p-1 px-2 hover:bg-blue-600  h-fit  rounded-md' href="/">Trending</Link>
        <Link className='p-1 px-2 hover:bg-blue-600  h-fit  rounded-md' href="/">Sports</Link>
        <Link className='p-1 px-2 hover:bg-blue-600  h-fit  rounded-md' href="/">Entertainment</Link>
        <Link className='p-1 px-2 hover:bg-blue-600  h-fit  rounded-md' href="/">Business</Link>
        </div>
        <div>
            <Link href="/auth/signin">Sign in</Link>
        </div>
    </div>
    
  )
}

export default heaader;