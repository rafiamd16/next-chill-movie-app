'use client'

import LoginForm from '@/components/auth/login/login-form'
import useUserStore from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LoginPage = () => {
  const user = useUserStore((s) => s.currentUser)
  const router = useRouter()

  useEffect(() => {
    if (user) router.replace('/')
  }, [user])

  return (
    <div className='flex items-center justify-center min-h-screen bg-[url(/img/bg-login.jpg)] bg-cover bg-center px-2'>
      <div className='w-[350px] md:w-[529px] bg-[#181A1CD6] px-6 py-4 md:px-10 md:py-8 flex items-center flex-col gap-2 md:gap-4 rounded-[8px] md:rounded-2xl'>
        <div className='flex items-center gap-1'>
          <svg
            width='25'
            height='20'
            viewBox='0 0 43 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='md:w-[43px] md:h-[37px]'
          >
            <path
              d='M40.4167 -0.00341797L32.2292 1.42658L37.9375 7.91658L42.0417 7.18325L40.4167 -0.00341797ZM26.1042 2.48992L22 3.20492L27.7292 9.67658L31.8125 8.96158L26.1042 2.48992ZM15.8958 4.24992L11.7917 5.00158L17.5208 11.4732L21.6042 10.7582L15.8958 4.24992ZM5.66665 6.08325L3.62498 6.43158C2.54245 6.62192 1.58999 7.18252 0.976735 7.99029C0.363483 8.79807 0.139566 9.78699 0.35415 10.7399L1.16665 14.3332L11.375 12.5549L5.66665 6.08325ZM1.16665 14.3332V32.6666C1.16665 34.7016 3.04165 36.3333 5.33332 36.3333H38.6667C40.9792 36.3333 42.8333 34.7016 42.8333 32.6666V14.3332H1.16665Z'
              fill='white'
            />
          </svg>
          <span className='font-londrina md:text-[50px] text-[29px]'>CHILL</span>
        </div>
        <div className='space-y-2'>
          <h2 className='font-bold text-lg md:text-[32px] text-center'>Masuk</h2>
          <p className='text-[10px] md:text-base'>Selamat datang kembali!</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
