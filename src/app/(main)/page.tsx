'use client'

import useUserStore from '@/store/useUserStore'

const Home = () => {
  const user = useUserStore((s) => s.currentUser)

  return (
    <div className='flex flex-col gap-4 py-4'>
      <h1 className='text-5xl font-londrina'>CHILL</h1>
      <p>Welcome, {user?.username}</p>
    </div>
  )
}

export default Home
