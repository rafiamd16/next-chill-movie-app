'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Movie } from '@/types/movie'
import { Ellipsis } from 'lucide-react'
import { FC } from 'react'

interface MovieTableProps {
  movies: Movie[]
  handleEdit: (movie: Movie) => void
  handleDelete: (id: number) => void
}

const MovieTable: FC<MovieTableProps> = ({ movies, handleEdit, handleDelete }) => {
  return (
    <Table>
      <TableCaption>A list of your recent Movie.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-background'>No</TableHead>
          <TableHead className='text-background'>Movie</TableHead>
          <TableHead className='text-background'>Title</TableHead>
          <TableHead className='text-background'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.length > 0 ? (
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
                      <DropdownMenuItem onClick={() => handleEdit(movie)}>Update</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(movie.id)}
                        className='text-red-500'
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default MovieTable
