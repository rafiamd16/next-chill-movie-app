import DesktopFooter from '@/components/footer/desktop-footer'
import MobileFooter from '@/components/footer/mobile-footer'

const Footer = () => {
  return (
    <footer className='p-5 md:py-[60px] md:px-20 border-t border-t-[#E7E3FC3B]'>
      <div className='hidden md:block'>
        <DesktopFooter />
      </div>
      <div className='block md:hidden'>
        <MobileFooter />
      </div>
    </footer>
  )
}

export default Footer
