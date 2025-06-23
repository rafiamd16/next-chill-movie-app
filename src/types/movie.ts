export interface Movie {
  id: number
  title: string
  image: string
  rating: number
}

export interface MovieState {
  movies: Movie[]
  isLoading: boolean
  fetchMovies: () => Promise<void>
  createMovie: (data: Omit<Movie, 'id'>) => Promise<void>
  updateMovie: (id: number, data: Omit<Movie, 'id'>) => Promise<void>
  deleteMovie: (id: number) => Promise<void>
}
