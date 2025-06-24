'use client'

import HeroSection from '@/components/hero-section'
import LanjutTontonList from '@/components/lanjut-tonton-list'
import MovieList from '@/components/movie-list'

const Home = () => {
  return (
    <>
      <HeroSection
        title='Duty After School'
        description='Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan
            mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera
            menjadi pejuang garis depan dalam perang.'
        image='/img/hero.png'
      />

      <div className='px-5 md:px-20 py-4 md:py-10 space-y-8 md:space-y-16'>
        <LanjutTontonList subTitle='Melanjutkan Tonton Film' />

        <MovieList subTitle='Top Rating Film dan Series hari ini' />
        <MovieList subTitle='Film Trending' />
        <MovieList subTitle='Rilis Baru' />
      </div>
    </>
  )
}

export default Home
