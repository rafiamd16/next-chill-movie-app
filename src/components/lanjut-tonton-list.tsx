'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import useMovieStore from '@/store/useMovieStore'
import { Star } from 'lucide-react'

const LanjutTontonList = ({ subTitle }: { subTitle: string }) => {
  const movies = useMovieStore((s) => s.movies)
  const isLoading = useMovieStore((s) => s.isLoading)

  return (
    <div className='relative w-full'>
      <h2 className='mb-4 text-xl md:text-[32px] font-bold'>{subTitle}</h2>
      {isLoading && (
        <div className='grid grid-cols-3 gap-4 md:grid-cols-5'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Skeleton className='h-[151px] md:h-[162px]' />
            </div>
          ))}
        </div>
      )}
      {!isLoading && movies.length === 0 && (
        <p className='text-xl font-bold text-center text-background md:text-3xl'>Tidak ada Data.</p>
      )}
      <Carousel className='text-foreground'>
        <CarouselContent>
          {movies.map((movie, index) => (
            <CarouselItem key={index} className='basis-xs sm:1/3 md:1/4'>
              <div className='rounded-lg overflow-hidden relative group cursor-pointer'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  width={300}
                  height={200}
                  className='w-full h-[180px] lg:h-[162px] object-cover object-center'
                />
                <div className='absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-2 flex items-center justify-between'>
                  <p className='text-sm font-medium text-white'>{movie.title}</p>
                  <p className='text-xs text-white flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-yellow-500 text-yellow-500' />
                    {movie.rating}/5
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='-left-4' />
        <CarouselNext className='-right-4' />
      </Carousel>
    </div>
  )
}

export default LanjutTontonList
