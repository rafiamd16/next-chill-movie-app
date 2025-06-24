'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import useMovieStore from '@/store/useMovieStore'
import { Movie } from '@/types/movie'
import { FC } from 'react'
import { toast } from 'sonner'

interface DeleteDialogMovieProps {
  movie: Movie
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

const DeleteDialogMovie: FC<DeleteDialogMovieProps> = ({ movie, openDialog, setOpenDialog }) => {
  const deleteMovie = useMovieStore((s) => s.deleteMovie)

  const handleDelete = (id: number) => {
    deleteMovie(id)
    toast.success('Movie deleted successfully', { position: 'top-center', richColors: true })
    setOpenDialog(false)
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader className='text-foreground'>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-foreground cursor-pointer'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='cursor-pointer' onClick={() => handleDelete(movie.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialogMovie
