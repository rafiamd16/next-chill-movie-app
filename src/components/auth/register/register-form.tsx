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
import { registerFormSchema, RegisterFormSchema } from '@/lib/zod'
import useUserStore from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const register = useUserStore((s) => s.register)
  const router = useRouter()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { username: '', password: '', confirmPassword: '' },
  })

  const { handleSubmit, control } = form

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const onSubmit = async (data: Omit<RegisterFormSchema, 'confirmPassword'>) => {
    await register(data)
    toast.success('Registration successful', { position: 'top-center', richColors: true })
    router.push('/login')
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-9'>
          <FormField
            control={control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-[10px] md:text-lg'>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan username'
                    {...field}
                    className='py-2 text-sm placeholder:text-xs md:py-3.5 rounded-full h-9 md:h-[50px] px-4 md:px-5 border-[#E7E3FC3B] selection:bg-blue-500 md:placeholder:text-base'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-[10px] md:text-lg'>Kata Sandi</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Masukkan kata sandi'
                      {...field}
                      className='py-2 text-sm placeholder:text-xs md:placeholder:text-base md:py-3.5 rounded-full h-9 md:h-[50px] px-4 md:px-5 border-[#E7E3FC3B] selection:bg-blue-500'
                    />
                  </FormControl>
                  <div
                    onClick={handleShowPassword}
                    className='absolute right-4 top-2.5 md:right-5 md:top-4 text-[#9D9EA1] cursor-pointer'
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

          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-[10px] md:text-lg'>
                  Konfirmasi Kata Sandi
                </FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Masukkan kata sandi'
                      {...field}
                      className='py-2 text-sm placeholder:text-xs md:placeholder:text-base md:py-3.5 rounded-full h-9 md:h-[50px] px-4 md:px-5 border-[#E7E3FC3B] selection:bg-blue-500'
                    />
                  </FormControl>
                  <div
                    onClick={handleShowConfirmPassword}
                    className='absolute right-4 top-2.5 md:right-5 md:top-4 text-[#9D9EA1] cursor-pointer'
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='size-4 md:size-5' />
                    ) : (
                      <Eye className='size-4 md:size-5' />
                    )}
                  </div>
                </div>
                <FormMessage />
                <p className='text-[#C1C2C4] text-[10px] md:text-base'>
                  Sudah punya akun?{' '}
                  <Link href='/login' className='text-white'>
                    Masuk
                  </Link>
                </p>
              </FormItem>
            )}
          />
          <div className='space-y-2'>
            <Button
              type='submit'
              variant='secondary'
              className='w-full rounded-full py-2 h-9 md:h-[50px] border border-[#E7E3FC3B] bg-[#3D4142] cursor-pointer text-[10px] md:text-base text-background hover:text-foreground'
            >
              Daftar
            </Button>
            <span className='text-[#9D9EA1] text-[10px] md:text-sm text-center block'>Atau</span>

            <Button
              type='submit'
              className='flex justify-center items-center w-full rounded-full py-2 h-9 md:h-[50px] border border-[#E7E3FC3B] cursor-pointer text-[10px] md:text-base text-background gap-3'
            >
              <Image
                src='/img/google.png'
                width={10}
                height={10}
                alt='google'
                className='md:w-[18] md:h-[18px]'
              />
              Daftar dengan Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm
