'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

const genre = [
  'Aksi',
  'Anak-anak',
  'Anime',
  'Britania',
  'Drama',
  'Fantasi Ilmiah & Fantasi',
  'Kejahatan',
  'KDrama',
  'Komedi',
  'Petualangan',
  'Perang',
  'Romantis',
  'Sains & Alam',
  'Thriller',
]

const bantuan = ['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan']

const MobileFooter = () => {
  return (
    <div className='w-full mx-auto'>
      <div className='space-y-4 md:space-y-[26px] flex-1 mb-4'>
        <div className='flex items-center gap-1 font-londrina text-2xl md:text-[50px]'>
          <svg
            width='24'
            height='21'
            viewBox='0 0 43 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='md:w-[43px] md:h-[37px]'
          >
            <path
              d='M40.4169 0.496582L32.2294 1.92658L37.9377 8.41658L42.0419 7.68325L40.4169 0.496582ZM26.1044 2.98992L22.0002 3.70492L27.7294 10.1766L31.8127 9.46158L26.1044 2.98992ZM15.8961 4.74992L11.7919 5.50158L17.5211 11.9732L21.6044 11.2582L15.8961 4.74992ZM5.66689 6.58325L3.62523 6.93158C2.54269 7.12192 1.59023 7.68252 0.976979 8.49029C0.363727 9.29807 0.13981 10.287 0.354394 11.2399L1.16689 14.8332L11.3752 13.0549L5.66689 6.58325ZM1.16689 14.8332V33.1666C1.16689 35.2016 3.04189 36.8333 5.33356 36.8333H38.6669C40.9794 36.8333 42.8336 35.2016 42.8336 33.1666V14.8332H1.16689Z'
              fill='white'
            />
          </svg>
          CHILL
        </div>
        <p className='text-[#C1C2C4] text-xs md:text-base'>@2025 Chill Rights Reserved.</p>
      </div>

      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='genre'>
          <AccordionTrigger className='font-bold'>Genre</AccordionTrigger>
          <AccordionContent>
            <div className='grid grid-cols-2 gap-2'>
              {genre.map((genre) => (
                <Link href='#' key={genre} className='hover:underline text-[#C1C2C4]'>
                  {genre}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='bantuan'>
          <AccordionTrigger className='font-bold'>Bantuan</AccordionTrigger>
          <AccordionContent>
            {bantuan.map((item) => (
              <Link href='#' key={item} className='block hover:underline mb-2 text-[#C1C2C4]'>
                {item}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default MobileFooter
