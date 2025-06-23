'use client'

import CardContainer from '@/components/card-container'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselContent, CarouselItem } from '@/components/ui/carousel'
import useMovieStore from '@/store/useMovieStore'
import { useEffect } from 'react'

const MovieList = ({ subTitle }: { subTitle: string }) => {
  const movies = useMovieStore((s) => s.movies)
  const fetchMovies = useMovieStore((s) => s.fetchMovies)
  const isLoading = useMovieStore((s) => s.isLoading)

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <CardContainer subTitle={subTitle}>
      {isLoading && (
        <p className='text-3xl font-bold text-center text-background md:text-5xl'>Loading...</p>
      )}
      {!isLoading && movies.length === 0 && (
        <p className='text-3xl font-bold text-center text-background md:text-5xl'>
          Tidak ada Data.
        </p>
      )}

      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className='md:basis-1/4 lg:basis-1/5 basis-1/3'>
            <Card className='p-0 overflow-hidden border-none rounded-md bg-foreground'>
              <CardContent className='p-0 overflow-hidden rounded-md'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className='object-cover w-full rounded-md sm:max-h-[450px]'
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </CardContainer>
  )
}

export default MovieList
