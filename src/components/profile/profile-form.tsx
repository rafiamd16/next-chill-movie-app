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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
import { profileFormSchema, ProfileFormSchema } from '@/lib/zod'
import useUserStore from '@/store/useUserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const user = useUserStore((s) => s.currentUser)
  const updateProfile = useUserStore((s) => s.updateProfile)
  const deleteAccount = useUserStore((s) => s.deleteAccount)
  const router = useRouter()

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { username: '', email: '', password: '' },
  })

  const { control, reset, handleSubmit } = form

  useEffect(() => {
    if (user) {
      reset({ username: user.username, email: user.email || '', password: user.password })
    }
  }, [user, reset])

  const onSubmit = async (data: ProfileFormSchema) => {
    await updateProfile(data)
    toast.success('Profile updated successfully', { position: 'top-center', richColors: true })
  }

  const handleDelete = async () => {
    await deleteAccount()
    toast.success('Account deleted successfully', { position: 'top-center', richColors: true })
    router.push('/login')
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='w-full space-y-6 lg:w-1/2'>
      <h3 className='text-xl font-bold lg:hidden'>Profil Saya</h3>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex gap-6 items-center'>
            <div>
              <Image
                src={user?.avatar || ''}
                alt='avatar'
                width={80}
                height={80}
                className='md:w-[140px] md:h-[140px] object-cover rounded-full'
              />
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Link
                href='#'
                className='font-bold text-base border border-[#3254FF] bg-transparent rounded-full py-2 px-4 text-[#3254FF]'
              >
                Ubah Foto
              </Link>
              <div className='flex items-center gap-1.5 text-[#C1C2C4]'>
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 16 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 0L16 6V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H10ZM14 18V7H9V2H2V18H14ZM8 10L12 14H9.5V17H6.5V14H4L8 10Z'
                    fill='#C1C2C4'
                  />
                </svg>
                <span className='text-xs md:text-sm'>Maksimal 2MB</span>
              </div>
            </div>
          </div>
          <FormField
            control={control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <div className='px-4 py-2 bg-[#22282A] rounded-md relative border border-[#E7E3FC3B]'>
                  <FormLabel className='text-sm font-semibold md:text-base text-[#9D9EA1]'>
                    Nama Pengguna
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='pl-0 pr-8 text-base border-none focus-visible:ring-0 selection:bg-blue-500'
                      {...field}
                    />
                  </FormControl>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute -translate-y-1/2 cursor-pointer top-1/2 right-5'
                  >
                    <path
                      d='M0 14.4601V17.5001C0 17.7801 0.22 18.0001 0.5 18.0001H3.54C3.67 18.0001 3.8 17.9501 3.89 17.8501L14.81 6.94006L11.06 3.19006L0.15 14.1001C0.0500001 14.2001 0 14.3201 0 14.4601ZM17.71 4.04006C18.1 3.65006 18.1 3.02006 17.71 2.63006L15.37 0.290059C14.98 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.13 2.12006L15.88 5.87006L17.71 4.04006Z'
                      fill='white'
                    />
                  </svg>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='px-4 py-2 bg-[#22282A] rounded-md relative border border-[#E7E3FC3B]'>
                  <FormLabel className='text-sm font-semibold md:text-base text-[#9D9EA1]'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className='pl-0 pr-8 text-base border-none focus-visible:ring-0 selection:bg-blue-500 text-[#9D9EA1]'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='px-4 py-2 bg-[#22282A] rounded-md relative border border-[#E7E3FC3B]'>
                  <FormLabel className='text-sm font-semibold md:text-base text-[#9D9EA1]'>
                    Kata Sandi
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      className='pl-0 pr-24 text-base border-none focus-visible:ring-0 selection:bg-blue-500'
                      {...field}
                    />
                  </FormControl>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute -translate-y-1/2 cursor-pointer top-1/2 right-5'
                  >
                    <path
                      d='M0 14.4601V17.5001C0 17.7801 0.22 18.0001 0.5 18.0001H3.54C3.67 18.0001 3.8 17.9501 3.89 17.8501L14.81 6.94006L11.06 3.19006L0.15 14.1001C0.0500001 14.2001 0 14.3201 0 14.4601ZM17.71 4.04006C18.1 3.65006 18.1 3.02006 17.71 2.63006L15.37 0.290059C14.98 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.13 2.12006L15.88 5.87006L17.71 4.04006Z'
                      fill='white'
                    />
                  </svg>
                  <div
                    onClick={handleShowPassword}
                    className='absolute -translate-y-1/2 cursor-pointer right-13 top-1/2'
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className='size-4 md:size-5' />
                    ) : (
                      <Eye className='size-4 md:size-5' />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center justify-between gap-4'>
            <Button
              type='submit'
              className='py-2.5 px-[26px] w-max font-bold text-sm md:text-base rounded-full bg-[#09147A] cursor-pointer'
            >
              Simpan
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className='rounded-full font-bold cursor-pointer'>
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-foreground'>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='text-foreground cursor-pointer'>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className='cursor-pointer'>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProfileForm
