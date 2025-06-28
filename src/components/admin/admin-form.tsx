'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MovieFormSchema, movieFormSchema } from '@/lib/zod'
import { Movie } from '@/types/movie'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface AdminFormProps {
  selectedMovie: Movie | null
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>
  onSubmit: (data: MovieFormSchema) => void
  isSubmitting: boolean
}

const AdminForm: FC<AdminFormProps> = ({
  selectedMovie,
  setSelectedMovie,
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<MovieFormSchema>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: selectedMovie || { title: '', rating: 0, image: '' },
  })

  const { control, handleSubmit, reset } = form

  const handleFormSubmit = (data: MovieFormSchema) => {
    onSubmit(data)
    reset()
  }

  useEffect(() => {
    reset(selectedMovie || { title: '', rating: 0, image: '' })
  }, [selectedMovie, reset])

  return (
    <div className='w-full bg-[#22282A] p-4 rounded-lg border border-neutral-700'>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
          <FormField
            control={control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className='h-[50px]' placeholder='Title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='rating'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input className='h-[50px]' type='number' placeholder='Rating' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input className='h-[50px]' placeholder='Enter image URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2'>
            <Button
              className='font-bold cursor-pointer bg-background text-foreground hover:text-background'
              disabled={isSubmitting}
              type='submit'
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            {selectedMovie !== null && (
              <Button
                variant='outline'
                className='font-bold text-foreground cursor-pointer'
                type='button'
                onClick={() => setSelectedMovie(null)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AdminForm
