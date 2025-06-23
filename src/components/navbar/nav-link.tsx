'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    name: 'Series',
    path: '/series',
  },
  {
    name: 'Film',
    path: '/film',
  },
  {
    name: 'Daftar Saya',
    path: '/daftar-saya',
  },
]

const NavLink = () => {
  const pathname = usePathname()

  return (
    <ul className='flex items-center gap-3 sm:gap-12 lg:gap-20'>
      <Link href='/' className='flex items-center gap-1 text-[32px]'>
        <svg
          width='17'
          height='15'
          viewBox='0 0 27 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='sm:w-[25px] sm:h-[22px]'
        >
          <path
            d='M24.6553 0.361572L19.8172 1.20657L23.1904 5.04157L25.6155 4.60824L24.6553 0.361572ZM16.1979 1.83491L13.7727 2.25741L17.1582 6.08157L19.571 5.65907L16.1979 1.83491ZM10.1657 2.87491L7.74055 3.31907L11.126 7.14324L13.5388 6.72074L10.1657 2.87491ZM4.12123 3.95824L2.91479 4.16407C2.27511 4.27654 1.7123 4.60781 1.34992 5.08513C0.987546 5.56245 0.855231 6.14681 0.982031 6.70991L1.46214 8.83324L7.49434 7.78241L4.12123 3.95824ZM1.46214 8.83324V19.6666C1.46214 20.8691 2.5701 21.8332 3.92426 21.8332H23.6212C24.9877 21.8332 26.0833 20.8691 26.0833 19.6666V8.83324H1.46214Z'
            fill='white'
          />
        </svg>
        <span className='hidden font-londrina sm:inline-block text-background'>CHILL</span>
      </Link>
      {links.map((link, i) => (
        <li key={i} className='md:text-lg sm:text-base font-medium text-[10px] group'>
          <Link
            href={link.path}
            className={clsx(
              'text-background group-hover:py-2 group-hover:px-4 group-hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-full',
              { 'py-2 px-4 bg-blue-700 font-bold': pathname === link.path },
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavLink
