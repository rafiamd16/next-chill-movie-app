'use client'

import DeleteDialogMovie from '@/components/admin/delete-dialog-movie'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useMovieStore from '@/store/useMovieStore'
import { Movie } from '@/types/movie'
import { Ellipsis } from 'lucide-react'
import { FC, useState } from 'react'

interface MovieTableProps {
  movies: Movie[]
  handleEdit: (movie: Movie) => void
}

const MovieTable: FC<MovieTableProps> = ({ movies, handleEdit }) => {
  const [deleteDialogMovie, setDeleteDialogMovie] = useState<Movie | null>(null)
  const isLoading = useMovieStore((s) => s.isLoading)

  return (
    <Table>
      <TableCaption>A list of your recent Movie.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-background'>No</TableHead>
          <TableHead className='text-background'>Movie</TableHead>
          <TableHead className='text-background'>Title</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Skeleton */}
        {isLoading ? (
          <TableRow>
            <TableCell>
              <Skeleton className='h-5' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-5' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-5' />
            </TableCell>
          </TableRow>
        ) : isLoading && movies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        ) : (
          movies.map((movie, i) => (
            <TableRow key={movie.id}>
              <TableCell className='font-medium'>{i + 1}</TableCell>
              <TableCell className='flex items-center gap-3'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  width={50}
                  height={50}
                  className='object-cover rounded-lg aspect-square'
                />
              </TableCell>
              <TableCell className='truncate max-w-36'>
                {movie.title.split(' ').slice(0, 5).join(' ') + '...'}
              </TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='cursor-pointer'>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel className='font-bold'>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => handleEdit(movie)}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteDialogMovie(movie)}
                        className='text-red-500 cursor-pointer'
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <DeleteDialogMovie
                movie={movie}
                openDialog={deleteDialogMovie?.id === movie.id}
                setOpenDialog={(isOpen) => {
                  if (!isOpen) setDeleteDialogMovie(null)
                }}
              />
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default MovieTable
