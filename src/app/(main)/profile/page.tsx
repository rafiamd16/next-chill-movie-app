'use client'

import Loading from '@/app/loading'
import MovieList from '@/components/movie-list'
import ProfileForm from '@/components/profile/profile-form'
import useUserStore from '@/store/useUserStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProfilePage = () => {
  const user = useUserStore((s) => s.currentUser)
  const hydrated = useUserStore((s) => s.hasHydrated)
  const router = useRouter()

  useEffect(() => {
    if (!hydrated) return
    if (!user) {
      router.replace('/login')
    }
  }, [hydrated, user])

  if (!hydrated || !user) return <Loading />

  return (
    <div className='px-5 py-10 md:px-20'>
      <h1 className='hidden mb-8 text-4xl font-bold lg:block'>Profil Saya</h1>
      <div className='flex flex-col-reverse w-full gap-5 mb-20 lg:gap-20 lg:flex-row'>
        <ProfileForm />

        <div className='flex justify-end w-full lg:w-1/2'>
          <div className='w-full lg:w-[558px] h-max bg-[#3D4142] p-6 gap-4 rounded-[12px]'>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-5'>
                <Image
                  src='/img/warning.png'
                  alt='image'
                  width={78}
                  height={78}
                  className='object-cover'
                />
                <div className='space-y-3'>
                  <h3 className='hidden text-lg font-bold sm:block md:text-2xl'>
                    Saat ini anda belum berlangganan
                  </h3>
                  <h3 className='block text-lg font-bold sm:hidden md:text-2xl'>Berlangganan</h3>
                  <p className='text-sm md:text-lg'>
                    Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                  </p>
                </div>
              </div>
              <Link href='#' className='self-end py-1.5 px-[22px] bg-[#2F3334] rounded-[48px]'>
                Mulai Berlangganan
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MovieList subTitle='Daftar Saya' />
    </div>
  )
}

export default ProfilePage
