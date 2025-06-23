'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, LogIn, LogOut, Star, User } from 'lucide-react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import useUserStore from '@/store/useUserStore'
import { toast } from 'sonner'

const Profile = () => {
  const [open, setOpen] = useState(false)
  const logout = useUserStore((s) => s.logout)
  const currentUser = useUserStore((s) => s.currentUser)
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    setOpen(false)
    toast.success('Logout successful', { position: 'top-center', richColors: true })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className='flex items-center gap-1 rounded-full focus:outline-none'>
        <Image
          src={currentUser?.avatar || '/img/no-pp.png'}
          width={40}
          height={40}
          alt='Profile'
          className='rounded-full select-none size-5 sm:size-10'
        />
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 text-background ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48 p-2 mt-2 rounded shadow-lg' align='end'>
        <Link href='/profile'>
          <DropdownMenuItem
            className={clsx('flex items-center gap-2 font-medium cursor-pointer', {
              'text-blue-500 font-bold': pathname === '/profile',
            })}
          >
            <User
              className={clsx('w-4 h-4 hover:text-blue-500', {
                'text-blue-500': pathname === '/profile',
              })}
            />
            Profil Saya
          </DropdownMenuItem>
        </Link>

        <Link href='/berlangganan'>
          <DropdownMenuItem
            className={clsx('flex items-center gap-2 cursor-pointer', {
              'text-blue-500 font-bold': pathname === '/berlangganan',
            })}
          >
            <Star className={clsx('w-4 h-4', { 'text-blue-500': pathname === '/berlangganan' })} />
            Ubah Premium
          </DropdownMenuItem>
        </Link>
        {currentUser !== null ? (
          <DropdownMenuItem
            onClick={handleLogout}
            className='flex items-center gap-2 cursor-pointer'
          >
            <LogOut className='w-4 h-4' />
            Keluar
          </DropdownMenuItem>
        ) : (
          <Link href='/login'>
            <DropdownMenuItem className='flex items-center gap-2 font-medium cursor-pointer'>
              <LogIn className='w-4 h-4 hover:text-blue-500' />
              Login
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
