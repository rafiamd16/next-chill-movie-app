'use client'

import { createData, deleteData, getAllData, updateData } from '@/services/api'
import { Movie, MovieState } from '@/types/movie'
import { create } from 'zustand'

const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  isLoading: false,
  fetchMovies: async () => {
    try {
      set({ isLoading: true })
      const data: Movie[] = await getAllData('movies')
      set({ movies: data })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  createMovie: async (data: Omit<Movie, 'id'>) => {
    try {
      set({ isLoading: true })
      const newMovie = await createData('movies', data)
      set((state) => ({
        movies: [...state.movies, newMovie],
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateMovie: async (id: number, data: Omit<Movie, 'id'>) => {
    try {
      set({ isLoading: true })
      const updateMovie = await updateData('movies', id, data)
      set((state) => ({
        movies: state.movies.map((movie) => (movie.id === id ? updateMovie : movie)),
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  deleteMovie: async (id: number) => {
    try {
      set({ isLoading: true })
      await deleteData('movies', id)
      set((state) => ({
        movies: state.movies.filter((m) => m.id !== id),
      }))
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useMovieStore
