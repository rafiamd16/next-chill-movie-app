import NavLink from '@/components/navbar/nav-link'
import Profile from '@/components/navbar/profile'

const Navbar = () => {
  return (
    <header className='w-full flex items-center justify-between sticky top-0 left-0 z-50 md:px-20 md:py-[25px] bg-foreground py-1.5 h-[56px] sm:h-[94px] px-5 gap-3'>
      <NavLink />
      <Profile />
    </header>
  )
}

export default Navbar
