'use client'

import Loading from '@/app/loading'
import AdminForm from '@/components/admin/admin-form'
import MovieTable from '@/components/admin/movie-table'
import { MovieFormSchema } from '@/lib/zod'
import useMovieStore from '@/store/useMovieStore'
import useUserStore from '@/store/useUserStore'
import { Movie } from '@/types/movie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AdminPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const movies = useMovieStore((s) => s.movies)
  const fetchMovies = useMovieStore((s) => s.fetchMovies)
  const createMovie = useMovieStore((s) => s.createMovie)
  const updateMovie = useMovieStore((s) => s.updateMovie)
  const user = useUserStore((s) => s.currentUser)
  const hydrated = useUserStore((s) => s.hasHydrated)
  const router = useRouter()

  useEffect(() => {
    if (!hydrated) return
    if (!user) router.replace('/login')
    fetchMovies()
  }, [user, hydrated, fetchMovies])

  if (!hydrated || !user) return <Loading />

  const onSubmit = async (data: MovieFormSchema) => {
    setIsSubmitting(true)
    try {
      if (selectedMovie !== null) {
        await updateMovie(selectedMovie.id, data)
        toast.success('Movie updated successfully', { position: 'top-center', richColors: true })
        setSelectedMovie(null)
      } else {
        await createMovie(data)
        toast.success('Movie created successfully', { position: 'top-center', richColors: true })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  return (
    <div className='max-w-screen-lg min-h-[90vh] px-5 md:px-20 py-10 mx-auto space-y-10'>
      <h1 className='text-xl font-bold md:text-3xl'>Admin Movie</h1>
      <AdminForm
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
      <div className='space-y-4'>
        <h2 className='text-xl font-bold md:text-2xl'>Movie List</h2>
        <div className='p-4 bg-[#22282A] rounded-md'>
          <MovieTable movies={movies} handleEdit={handleEdit} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
