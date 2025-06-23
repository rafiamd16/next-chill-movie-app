'use client'

import { Carousel, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const CardContainer = ({ children, subTitle }: { children: React.ReactNode; subTitle: string }) => {
  return (
    <div className='relative w-full'>
      <h2 className='mb-4 text-xl md:text-[32px] font-bold'>{subTitle}</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full max-w-full text-foreground'
      >
        {children}
        <CarouselPrevious className='-left-4' />
        <CarouselNext className='-right-4' />
      </Carousel>
    </div>
  )
}

export default CardContainer
